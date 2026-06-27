import os
import cv2
import numpy as np
import onnxruntime as ort
from PIL import Image
from typing import Tuple, Dict, List, Optional, Any

from app.core.config import (
    DEFAULT_CONF_THRESHOLD,
    CLASS_THRESHOLDS,
    ALLOWED_CLASSES,
    DISPLAY_NAMES,
    MIN_BOX_SIZE_PX,
    VALIDATION,
    TILING,
    FUSION_IOU,
    EDGE_SLIVER,
    CORROBORATION,
    MODEL_DECODE,
    TTA,
    PREPROCESS,
    MODEL_FILE,
    MODEL_CLASSES,
)


class XRayProcessor:
    def __init__(self):
        self.model_path = os.path.join(os.path.dirname(__file__), "models", MODEL_FILE)
        self.colors = self._color_list()
        self.id2names = dict(MODEL_CLASSES)
        self._session = None  # lazy-loaded, reused across requests
        # Input size is auto-detected from the model (falls back to 640 for
        # models with a dynamic input). Tiling uses self.w/self.h too.
        self.h, self.w = self._detect_input_size()

    def _detect_input_size(self) -> Tuple[int, int]:
        try:
            shape = self._get_session().get_inputs()[0].shape  # [b, 3, h, w]
            h = shape[2] if isinstance(shape[2], int) and shape[2] > 0 else 640
            w = shape[3] if isinstance(shape[3], int) and shape[3] > 0 else 640
            return int(h), int(w)
        except Exception:
            return 640, 640

    def _get_session(self) -> ort.InferenceSession:
        if self._session is None:
            self._session = ort.InferenceSession(self.model_path, providers=["CPUExecutionProvider"])
        return self._session

    def _color_list(self) -> List[Tuple[int, int, int]]:
        """Generate list of colors for different classes"""
        # Using a simplified color list for demonstration
        return [
            (255, 0, 0), (0, 255, 0), (0, 0, 255),
            (255, 255, 0), (255, 0, 255), (0, 255, 255),
            (128, 0, 0), (0, 128, 0), (0, 0, 128)
        ]

    # ------------------------------------------------------------------
    # X-ray validation (heuristic, no extra model)
    # ------------------------------------------------------------------
    def validate_image(self, file_path: str) -> Dict[str, Any]:
        """
        Heuristically decide whether an uploaded image looks like an X-ray.

        Returns dict with:
          status: "valid" | "uncertain" | "invalid"
          reason: human-readable explanation
          stats:  measured values (for debug)

        Policy: only OBVIOUS non-X-rays (color photos, documents, UI
        screenshots) are rejected. Anything ambiguous is "uncertain" and
        detection still runs, with a warning returned to the user.
        """
        img = cv2.imread(file_path)
        if img is None:
            return {"status": "invalid", "reason": "File could not be decoded as an image", "stats": {}}

        H, W = img.shape[:2]
        if min(H, W) < VALIDATION["min_side_px"]:
            return {"status": "invalid", "reason": "Image too small", "stats": {"size": [W, H]}}

        small = cv2.resize(img, (256, 256), interpolation=cv2.INTER_AREA)
        hsv = cv2.cvtColor(small, cv2.COLOR_BGR2HSV).astype(np.float32)
        hue, sat, val = hsv[:, :, 0], hsv[:, :, 1], hsv[:, :, 2]
        gray = cv2.cvtColor(small, cv2.COLOR_BGR2GRAY).astype(np.float32)

        # Fraction of clearly colored pixels (X-rays are grayscale)
        colored = (sat > 40) & (val > 40)
        colored_frac = float(colored.mean())

        # Fraction of near-white pixels (documents / white-bg screenshots)
        white_frac = float((gray > 240).mean())

        # Fraction of perfectly flat 8x8 blocks (UI / screenshots / graphics;
        # real radiographs always carry sensor noise)
        blocks = gray[:256, :256].reshape(32, 8, 32, 8)
        flat_frac = float((blocks.std(axis=(1, 3)) < 1.0).mean())

        # For colored images: is hue a function of brightness (colormapped
        # X-ray) or independent of it (natural photograph)?
        hue_value_spread = 0.0
        if colored_frac >= 0.05:
            spreads = []
            for lo in range(0, 256, 32):
                m = colored & (val >= lo) & (val < lo + 32)
                if m.sum() > 50:
                    ang = hue[m] / 180.0 * 2 * np.pi
                    r = np.sqrt(np.cos(ang).mean() ** 2 + np.sin(ang).mean() ** 2)
                    r = min(max(float(r), 1e-6), 1.0)
                    spreads.append(float(np.sqrt(-2 * np.log(r))))
            if spreads:
                hue_value_spread = float(np.median(spreads))

        stats = {
            "size": [W, H],
            "colored_frac": round(colored_frac, 3),
            "white_frac": round(white_frac, 3),
            "flat_frac": round(flat_frac, 3),
            "hue_value_spread": round(hue_value_spread, 3),
        }

        if colored_frac < VALIDATION["colored_frac_gray"]:
            # Grayscale image
            if white_frac > VALIDATION["white_frac_max"]:
                return {"status": "invalid", "reason": "Looks like a document or white-background screenshot", "stats": stats}
            if flat_frac > VALIDATION["flat_frac_max"]:
                return {"status": "uncertain", "reason": "Grayscale but contains large flat regions (possible screenshot)", "stats": stats}
            return {"status": "valid", "reason": "Grayscale, X-ray-like intensity distribution", "stats": stats}

        # Colored image
        if hue_value_spread > VALIDATION["hue_value_spread_photo"]:
            return {"status": "invalid", "reason": "Looks like a natural color photograph", "stats": stats}
        if white_frac > VALIDATION["white_frac_max"] or flat_frac > VALIDATION["flat_frac_max"]:
            return {"status": "invalid", "reason": "Looks like a UI screenshot or document", "stats": stats}
        return {"status": "uncertain", "reason": "Colored image; possibly a colormapped/inverted X-ray", "stats": stats}

    # ------------------------------------------------------------------
    # Model inference (single 1024x1024 input; raw YOLO output decoded +
    # per-class NMS applied here — the retrained model has no NMS in graph)
    # ------------------------------------------------------------------
    def model_inference(self, image_np: np.ndarray) -> np.ndarray:
        """Output columns: x1, y1, x2, y2, score, class_id (in input space).

        The retrained ONNX model emits RAW predictions of shape
        (1, num_boxes, 5 + num_classes) = (cx, cy, w, h, obj, cls...),
        with NMS NOT baked into the graph. Decoding and per-class NMS are
        done here so the returned contract (an Nx6 array in input-pixel
        space) is identical to what the rest of the pipeline expects.
        """
        session = self._get_session()
        input_name = session.get_inputs()[0].name
        output_name = session.get_outputs()[0].name
        out = np.asarray(session.run([output_name], {input_name: image_np})[0])
        # Two supported formats:
        #  * end2end (NMS in graph): 2D [N, K] where the first 6 columns are
        #    x1, y1, x2, y2, score, class_id (original 9-class model).
        #  * raw YOLO (no NMS): 3D [1, N, 5+num_classes] (2-class retrain),
        #    decoded + per-class NMS by _decode.
        if out.ndim == 3:
            return self._decode(out[0])
        if out.ndim == 2 and out.shape[1] >= 6:
            return out[:, :6].astype(np.float32)
        return np.zeros((0, 6), dtype=np.float32)

    def _decode(self, pred: np.ndarray) -> np.ndarray:
        """Decode raw YOLO output (N, 5 + num_classes) into Nx6 detections
        (x1, y1, x2, y2, score, class_id) and run per-class NMS."""
        if pred.ndim != 2 or pred.shape[0] == 0:
            return np.zeros((0, 6), dtype=np.float32)
        obj = pred[:, 4]
        cls = pred[:, 5:]
        class_ids = cls.argmax(axis=1)
        scores = obj * cls[np.arange(cls.shape[0]), class_ids]
        keep = scores >= MODEL_DECODE["pre_nms_conf"]
        if not np.any(keep):
            return np.zeros((0, 6), dtype=np.float32)
        cx, cy = pred[keep, 0], pred[keep, 1]
        w, h = pred[keep, 2], pred[keep, 3]
        xyxy = np.stack([cx - w / 2, cy - h / 2, cx + w / 2, cy + h / 2], axis=1)
        scores = scores[keep]
        class_ids = class_ids[keep]
        kept = self._nms_per_class(xyxy, scores, class_ids, MODEL_DECODE["nms_iou"])
        if kept.size == 0:
            return np.zeros((0, 6), dtype=np.float32)
        return np.concatenate(
            [xyxy[kept], scores[kept, None], class_ids[kept, None].astype(np.float32)],
            axis=1,
        ).astype(np.float32)

    @staticmethod
    def _nms_per_class(boxes: np.ndarray, scores: np.ndarray,
                       class_ids: np.ndarray, iou_thr: float) -> np.ndarray:
        """Greedy per-class non-max suppression. Returns indices to keep."""
        keep: List[int] = []
        x1, y1, x2, y2 = boxes[:, 0], boxes[:, 1], boxes[:, 2], boxes[:, 3]
        areas = np.maximum(0.0, x2 - x1) * np.maximum(0.0, y2 - y1)
        for c in np.unique(class_ids):
            idxs = np.where(class_ids == c)[0]
            order = idxs[scores[idxs].argsort()[::-1]]
            while order.size > 0:
                i = int(order[0])
                keep.append(i)
                if order.size == 1:
                    break
                rest = order[1:]
                xx1 = np.maximum(x1[i], x1[rest]); yy1 = np.maximum(y1[i], y1[rest])
                xx2 = np.minimum(x2[i], x2[rest]); yy2 = np.minimum(y2[i], y2[rest])
                iw = np.maximum(0.0, xx2 - xx1); ih = np.maximum(0.0, yy2 - yy1)
                inter = iw * ih
                iou = inter / (areas[i] + areas[rest] - inter + 1e-9)
                order = rest[iou <= iou_thr]
        return np.array(sorted(keep), dtype=int)

    def _infer_tensor(self, img640: np.ndarray) -> np.ndarray:
        tensor = img640.astype(np.float32).transpose(2, 0, 1) / 255
        return self.model_inference(np.expand_dims(tensor, axis=0))

    # ------------------------------------------------------------------
    # Detection passes (all results in ORIGINAL image coordinates)
    # ------------------------------------------------------------------
    def _full_pass(self, img: np.ndarray) -> Tuple[List[Dict], Dict]:
        """Letterbox the whole image to 640x640 (aspect ratio preserved)."""
        H, W = img.shape[:2]
        scale = min(self.h / H, self.w / W)
        nh, nw = int(round(H * scale)), int(round(W * scale))
        interp = cv2.INTER_AREA if scale < 1 else cv2.INTER_LINEAR
        resized = cv2.resize(img, (nw, nh), interpolation=interp)
        canvas = np.full((self.h, self.w, 3), 114, dtype=np.uint8)
        py, px = (self.h - nh) // 2, (self.w - nw) // 2
        canvas[py:py + nh, px:px + nw] = resized

        dets = []
        for row in self._infer_tensor(canvas):
            x1, y1, x2, y2, score, label = row
            dets.append(self._make_det(
                (float(x1) - px) / scale, (float(y1) - py) / scale,
                (float(x2) - px) / scale, (float(y2) - py) / scale,
                float(score), int(label), W, H, "full"))
        meta = {"scale": round(scale, 4), "pad_x": px, "pad_y": py}
        return dets, meta

    @staticmethod
    def _tile_origins(dim: int, tile: int, min_overlap: int) -> List[int]:
        """Start offsets so tiles cover [0, dim) with at least min_overlap."""
        if dim <= tile:
            return [0]
        span = dim - tile
        n = int(np.ceil(span / (tile - min_overlap))) + 1
        return [int(round(i * span / (n - 1))) for i in range(n)]

    def _tile_passes(self, img: np.ndarray) -> List[Dict]:
        """Run the model on native-resolution 640x640 tiles of a large image.
        Restores hairline-fracture / tiny-metal detail lost when the whole
        image is downscaled to 640."""
        H, W = img.shape[:2]
        ts = TILING["tile_size"]
        xs = self._tile_origins(W, ts, TILING["min_overlap"])
        ys = self._tile_origins(H, ts, TILING["min_overlap"])
        origins = [(x, y) for y in ys for x in xs][:TILING["max_tiles"]]

        dets = []
        for (ox, oy) in origins:
            tile = img[oy:oy + ts, ox:ox + ts]
            th, tw = tile.shape[:2]
            if th < ts or tw < ts:  # pad edge tiles
                pad = np.full((ts, ts, 3), 114, dtype=np.uint8)
                pad[:th, :tw] = tile
                tile = pad
            for row in self._infer_tensor(tile):
                x1, y1, x2, y2, score, label = [float(v) for v in row[:5]] + [int(row[5])]
                # Drop boxes cut by an INTERIOR tile edge — the overlapping
                # neighbour tile sees that finding whole. (Edges that coincide
                # with the real image border are kept.)
                m = 4.0
                if (x1 < m and ox > 0) or (y1 < m and oy > 0) or \
                   (x2 > tw - m and ox + ts < W) or (y2 > th - m and oy + ts < H):
                    continue
                dets.append(self._make_det(
                    x1 + ox, y1 + oy, x2 + ox, y2 + oy,
                    score, label, W, H, f"tile_{ox}_{oy}"))
        return dets

    # ------------------------------------------------------------------
    # Preprocessing & test-time augmentation
    # ------------------------------------------------------------------
    def _apply_clahe(self, img: np.ndarray) -> np.ndarray:
        """Contrast-limited adaptive histogram equalization (luminance only).

        Boosts the visibility of faint hairline fractures. Only meaningful if
        the model was trained on CLAHE images (see config.PREPROCESS)."""
        clahe = cv2.createCLAHE(
            clipLimit=float(PREPROCESS.get("clahe_clip", 2.0)),
            tileGridSize=(int(PREPROCESS.get("clahe_grid", 8)),) * 2,
        )
        lab = cv2.cvtColor(img, cv2.COLOR_RGB2LAB)
        lab[:, :, 0] = clahe.apply(lab[:, :, 0])
        return cv2.cvtColor(lab, cv2.COLOR_LAB2RGB)

    def _tta_flip_passes(self, img: np.ndarray, run_tiles: bool) -> List[Dict]:
        """Horizontal-flip test-time augmentation.

        Runs the existing full (and optionally tile) passes on a horizontally
        flipped copy of the image, then maps every box back into the original
        coordinate frame. Sources are suffixed with "_flip" so fusion treats
        them as independent passes (boosting corroborated findings)."""
        H, W = img.shape[:2]
        flipped = cv2.flip(img, 1)  # horizontal flip
        flip_dets, _ = self._full_pass(flipped)
        if run_tiles and TTA.get("include_tiles", True):
            flip_dets = flip_dets + self._tile_passes(flipped)

        remapped = []
        for d in flip_dets:
            x1, y1, x2, y2 = d["bbox"]
            nx1 = max(W - 1.0 - x2, 0.0)
            nx2 = min(W - 1.0 - x1, W - 1.0)
            remapped.append(dict(
                d,
                bbox=[round(nx1, 1), y1, round(nx2, 1), y2],
                source=f"{d['source']}_flip",
            ))
        return remapped

    def _make_det(self, x1, y1, x2, y2, score, label, W, H, source) -> Dict:
        x1 = max(x1, 0.0); y1 = max(y1, 0.0)
        x2 = min(x2, W - 1.0); y2 = min(y2, H - 1.0)
        return {
            "class_id": label,
            "class_name": self.id2names.get(label, f"unknown_{label}"),
            "confidence": round(float(score), 4),
            "bbox": [round(x1, 1), round(y1, 1), round(x2, 1), round(y2, 1)],
            "source": source,
        }

    # ------------------------------------------------------------------
    # Cross-pass fusion + artifact filtering
    # ------------------------------------------------------------------
    @staticmethod
    def _iou(a: List[float], b: List[float]) -> float:
        ix1, iy1 = max(a[0], b[0]), max(a[1], b[1])
        ix2, iy2 = min(a[2], b[2]), min(a[3], b[3])
        iw, ih = max(ix2 - ix1, 0.0), max(iy2 - iy1, 0.0)
        inter = iw * ih
        if inter <= 0:
            return 0.0
        area_a = (a[2] - a[0]) * (a[3] - a[1])
        area_b = (b[2] - b[0]) * (b[3] - b[1])
        return inter / (area_a + area_b - inter)

    def _fuse(self, dets: List[Dict]) -> List[Dict]:
        """Greedy same-class clustering across passes. Each cluster becomes one
        detection: the highest-confidence box, and its confidence is the BEST
        single-pass confidence across the passes that saw it.

        NOTE: a noisy-OR combine (1 - prod(1 - c)) was used previously, but the
        passes (full image, overlapping tiles, horizontal-flip TTA) are
        different VIEWS OF THE SAME REGION, not independent evidence. Noisy-OR
        therefore inflated confidence (e.g. four 0.6 looks -> 0.97) and
        manufactured high-confidence false positives. Taking the max keeps the
        reported confidence faithful to what the model actually produced;
        cross-pass agreement is still tracked via `passes_agreeing` and used by
        the corroboration filter."""
        fused = []
        used = [False] * len(dets)
        order = sorted(range(len(dets)), key=lambda i: -dets[i]["confidence"])
        for i in order:
            if used[i]:
                continue
            used[i] = True
            cluster = [dets[i]]
            for j in order:
                if used[j] or dets[j]["class_id"] != dets[i]["class_id"]:
                    continue
                if self._iou(dets[i]["bbox"], dets[j]["bbox"]) >= FUSION_IOU:
                    used[j] = True
                    cluster.append(dets[j])
            best_per_pass: Dict[str, float] = {}
            for d in cluster:
                best_per_pass[d["source"]] = max(best_per_pass.get(d["source"], 0.0), d["confidence"])
            conf = max(best_per_pass.values())
            top = cluster[0]
            fused.append({
                "class_id": top["class_id"],
                "class_name": top["class_name"],
                "confidence": round(conf, 4),
                "bbox": top["bbox"],
                "sources": sorted(best_per_pass.keys()),
                "passes_agreeing": len(best_per_pass),
            })
        return fused

    @staticmethod
    def _is_border_sliver(det: Dict, W: int, H: int) -> bool:
        """Thin box glued to the image border = cut-off-anatomy artifact."""
        b = EDGE_SLIVER["border_px"]
        tf = EDGE_SLIVER["max_thickness_frac"]
        x1, y1, x2, y2 = det["bbox"]
        w, h = x2 - x1, y2 - y1
        if (y1 <= b or y2 >= H - 1 - b) and h < tf * H:
            return True
        if (x1 <= b or x2 >= W - 1 - b) and w < tf * W:
            return True
        return False

    # ------------------------------------------------------------------
    # Threshold helpers
    # ------------------------------------------------------------------
    @staticmethod
    def effective_thresholds(requested: float) -> Dict[str, float]:
        """Clamp the requested (frontend) threshold into each class's range."""
        return {
            name: min(max(requested, cfg["min"]), cfg["max"])
            for name, cfg in CLASS_THRESHOLDS.items()
        }

    # ------------------------------------------------------------------
    # Drawing
    # ------------------------------------------------------------------
    def _draw(self, img: np.ndarray, final_detections: List[Dict]) -> np.ndarray:
        img = img.astype(np.uint8).copy()
        H = img.shape[0]
        for d in final_detections:
            x1, y1, x2, y2 = [int(v) for v in d["bbox"]]
            color = self.colors[d["class_id"] % len(self.colors)]
            txt = f"{d['display_name']} {d['confidence']:.2f}"
            (tw, th), _ = cv2.getTextSize(txt, cv2.FONT_HERSHEY_SIMPLEX, 0.5, 2)
            cv2.rectangle(img, (x1, y1), (x2, y2), color, 2)
            ty = y1 if y1 - th - 10 >= 0 else min(y2 + th + 10, H - 1)
            cv2.rectangle(img, (x1 - 2, ty - th - 10), (x1 + tw + 2, ty), color, -1)
            cv2.putText(img, txt, (x1, ty - 5), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2)
        y_offset = H - 10
        for i, d in enumerate(final_detections):
            cv2.putText(img, f"{d['display_name']}: {d['confidence']:.2f}",
                        (10, y_offset - i * 25), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 2)
        return img

    # ------------------------------------------------------------------
    # Main entry
    # ------------------------------------------------------------------
    def process_image(
        self,
        file_path: str,
        output_dir: str,
        conf_threshold: float = DEFAULT_CONF_THRESHOLD,
        debug: bool = False,
    ) -> Dict[str, Any]:
        """Main processing function"""
        os.makedirs(output_dir, exist_ok=True)

        img = cv2.imread(file_path)
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        if PREPROCESS.get("clahe", False):
            img = self._apply_clahe(img)
        H, W = img.shape[:2]
        thresholds = self.effective_thresholds(conf_threshold)

        # --- detection passes -----------------------------------------
        full_dets, lb_meta = self._full_pass(img)
        scale = min(self.h / H, self.w / W)
        tiled = TILING["enabled"] and scale < TILING["scale_trigger"]
        tile_dets = self._tile_passes(img) if tiled else []

        # Test-time augmentation (horizontal flip) — extra evidence for faint
        # hairline fractures, merged via fusion. Does not change the model.
        tta_used = bool(TTA.get("enabled") and TTA.get("hflip"))
        tta_dets = self._tta_flip_passes(img, run_tiles=tiled) if tta_used else []

        raw = full_dets + tile_dets + tta_dets

        # A detection is "corroborated" when several independent passes exist
        # (multiple tiles and/or the flip pass).
        multi_pass = tiled or tta_used

        # --- fusion + filters ------------------------------------------
        fused = self._fuse(raw)
        removed_sliver = [d for d in fused if self._is_border_sliver(d, W, H)]
        fused = [d for d in fused if not self._is_border_sliver(d, W, H)]

        # corroboration: with multiple passes, a fracture seen by only ONE
        # pass at modest confidence is one-off noise (metal classes exempt)
        removed_corrob = []
        if multi_pass:
            keep = []
            for d in fused:
                if (d["class_name"] in CORROBORATION["classes"]
                        and d["passes_agreeing"] < 2
                        and d["confidence"] < CORROBORATION["min_single_pass_conf"]):
                    removed_corrob.append(d)
                else:
                    keep.append(d)
            fused = keep

        removed_class, removed_thresh, removed_small, final_detections = [], [], [], []
        for d in sorted(fused, key=lambda x: -x["confidence"]):
            if d["class_name"] not in ALLOWED_CLASSES:
                removed_class.append(d)
                continue
            if d["confidence"] < thresholds[d["class_name"]]:
                removed_thresh.append(d)
                continue
            x1, y1, x2, y2 = d["bbox"]
            if MIN_BOX_SIZE_PX > 0 and ((x2 - x1) < MIN_BOX_SIZE_PX or (y2 - y1) < MIN_BOX_SIZE_PX):
                removed_small.append(d)
                continue
            final_detections.append(dict(d, display_name=DISPLAY_NAMES.get(d["class_name"], d["class_name"])))

        # --- outputs ----------------------------------------------------
        processed_img = self._draw(img, final_detections)

        label_txt = ""
        for d in final_detections:
            x1, y1, x2, y2 = d["bbox"]
            xc, yc = 0.5 * (x1 + x2) / W, 0.5 * (y1 + y2) / H
            bw, bh = (x2 - x1) / W, (y2 - y1) / H
            label_txt += f"{d['class_id']} {d['confidence']:.5f} {xc:.5f} {yc:.5f} {bw:.5f} {bh:.5f}\n"

        base_name = os.path.splitext(os.path.basename(file_path))[0]
        processed_path = os.path.join(output_dir, f"{base_name}_processed.png")
        detections_path = os.path.join(output_dir, f"{base_name}_detections.txt")
        heatmap_path = os.path.join(output_dir, f"{base_name}_heatmap.png")
        cv2.imwrite(processed_path, cv2.cvtColor(processed_img, cv2.COLOR_RGB2BGR))
        with open(detections_path, 'w') as f:
            f.write(label_txt)

        # Generate a simple heatmap of the highest-confidence fracture region
        heatmap_saved = False
        fractures = [d for d in final_detections if d["class_name"] == "fracture"]
        if fractures:
            best_frac = max(fractures, key=lambda x: x["confidence"])
            x1, y1, x2, y2 = [int(v) for v in best_frac["bbox"]]
            crop = img[y1:y2, x1:x2]
            if crop.size > 0:
                gray_crop = cv2.cvtColor(crop, cv2.COLOR_RGB2GRAY)
                # Apply a colormap to simulate a heatmap of the density
                heatmap_img = cv2.applyColorMap(gray_crop, cv2.COLORMAP_JET)
                cv2.imwrite(heatmap_path, heatmap_img)
                heatmap_saved = True

        # User-facing detections: display names only (never raw classes like "text")
        detections = [
            {"class_name": d["display_name"], "confidence": round(d["confidence"], 2)}
            for d in final_detections
        ]

        # Detailed detections (display name + confidence + bbox) for building a
        # human-readable report. Purely additive: detection logic is unchanged.
        detections_detailed = [
            {
                "class_name": d["display_name"],
                "class_id": d["class_id"],
                "confidence": round(float(d["confidence"]), 4),
                "bbox": d["bbox"],
            }
            for d in final_detections
        ]

        result = {
            "processed_image": processed_path,
            "heatmap_path": heatmap_path if heatmap_saved else None,
            "detections_file": detections_path,
            "detections": detections,
            "detections_detailed": detections_detailed,
            "image_size": {"width": W, "height": H},
        }
        if debug:
            result["debug"] = {
                "threshold_received_from_frontend": conf_threshold,
                "backend_thresholds_used": thresholds,
                "original_image_size": {"width": W, "height": H},
                "model_input_size": {"width": self.w, "height": self.h},
                "letterbox": lb_meta,
                "tiling_used": tiled,
                "tta_used": tta_used,
                "clahe_used": bool(PREPROCESS.get("clahe", False)),
                "num_passes": len(set(d["source"] for d in raw)) if raw else 1,
                "raw_detections": raw,
                "fused_detections": fused + removed_sliver,
                "removed_by_border_sliver_filter": removed_sliver,
                "removed_by_corroboration": removed_corrob,
                "removed_by_class_filter": removed_class,
                "removed_by_threshold": removed_thresh,
                "removed_by_nms": [],
                "nms_note": "Per-pass NMS runs in _decode (raw model output); cross-pass duplicates are merged by fusion (see fused_detections).",
                "removed_by_small_box_filter": removed_small,
                "small_box_filter_px": MIN_BOX_SIZE_PX,
                "final_detections": final_detections,
            }
        return result
