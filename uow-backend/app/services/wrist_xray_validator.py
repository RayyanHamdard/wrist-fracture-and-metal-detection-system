"""
Wrist X-ray input validation (runs BEFORE YOLO detection).

This module is completely independent of the YOLO / ONNX detection model. It
inspects an uploaded image and decides whether it looks like a valid wrist /
forearm radiograph. If it does not, the caller must reject the upload and must
NOT run detection, draw boxes, or generate a report.

It uses only classical image heuristics (OpenCV / NumPy), so it cannot affect
detection sensitivity, thresholds, or class filtering in any way.

DESIGN NOTE (precision of rejection):
Real wrist X-rays vary a lot — tight crops, lateral/PA/oblique views, with or
without much forearm shaft. An earlier version required the bright bone region
to be elongated (high eccentricity), which wrongly rejected valid but
square-ish wrist crops. This version instead ACCEPTS any grayscale image with
radiographic contrast, and only REJECTS when it is confident the image is not a
wrist X-ray:
  * coloured images        -> photos, screenshots, colourised/inverted X-rays
  * large white background  -> documents / logos / UI
  * no radiographic contrast
  * round + enclosed + dark-cornered cross-sections -> brain CT / MRI
This errs toward letting valid wrist X-rays through.

Public API:
    validate_wrist_xray_image(image_path) -> dict
        { is_valid, reason, image_type_detected, stats }
"""

from typing import Dict, Any

import cv2
import numpy as np


# ---------------------------------------------------------------------------
# Tunable thresholds (self-contained so detection config is never touched).
# ---------------------------------------------------------------------------
WRIST_VALIDATION = {
    "min_side_px": 100,        # reject images smaller than this on the short side
    "min_std": 5.0,            # reject blank / corrupted (near-constant) images

    # A grayscale radiograph has very little colour. Real X-rays can carry a
    # slight tint, so the bar is generous; clearly coloured images (photos,
    # screenshots, colourised X-rays) sit far above this.
    "colored_frac_max": 0.20,

    # Documents / logos / UI screenshots have a large near-white area.
    "white_frac_max": 0.55,

    # Radiographs have a dark background and bright (bone) structures.
    "dark_frac_min": 0.03,
    "fg_min": 0.04,
    "fg_max": 0.98,

    # Brain CT / MRI rejection — requires ALL THREE to be true so it cannot
    # catch a real wrist X-ray:
    #   * round main structure (low eccentricity)
    #   * "enclosed": the bright structure floats in a dark margin and does
    #     not reach the image borders (a wrist/forearm almost always runs off
    #     at least one edge)
    #   * dark corners (axial head scans have black corners)
    "brain_ecc_max": 0.55,
    "brain_max_edges": 1,      # number of image borders the structure touches
    "brain_corner_max": 0.06,  # mean corner brightness (0-1)
}

ERROR_MESSAGE = (
    "Invalid image. Please upload a clear wrist X-ray image only. "
    "MRI, CT scan, brain scan, normal photo, screenshot, or non-wrist images "
    "are not supported."
)


def _result(is_valid: bool, reason: str, image_type: str,
            stats: Dict[str, Any]) -> Dict[str, Any]:
    return {
        "is_valid": is_valid,
        "reason": reason,
        "image_type_detected": image_type,
        "stats": stats,
    }


def _measure(img: np.ndarray) -> Dict[str, Any]:
    """Appearance / shape features, computed on a fixed 256x256 version."""
    s = cv2.resize(img, (256, 256), interpolation=cv2.INTER_AREA)
    hsv = cv2.cvtColor(s, cv2.COLOR_BGR2HSV).astype(np.float32)
    sat, val = hsv[:, :, 1], hsv[:, :, 2]
    gray = cv2.cvtColor(s, cv2.COLOR_BGR2GRAY).astype(np.float32)

    colored_frac = float(((sat > 40) & (val > 40)).mean())
    white_frac = float((gray > 240).mean())
    dark_frac = float((gray < 40).mean())
    bright_frac = float((gray > 210).mean())

    gu = gray.astype(np.uint8)
    _, mask = cv2.threshold(gu, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    mb = (mask > 0).astype(np.uint8)
    fg_frac = float(mb.mean())

    ecc = 0.0
    n, lab, cc_stats, _ = cv2.connectedComponentsWithStats(mb, 8)
    if n > 1:
        i = 1 + int(np.argmax(cc_stats[1:, cv2.CC_STAT_AREA]))
        comp = (lab == i).astype(np.uint8)
        m = cv2.moments(comp, binaryImage=True)
        if m["m00"] > 0:
            mu20 = m["mu20"] / m["m00"]
            mu02 = m["mu02"] / m["m00"]
            mu11 = m["mu11"] / m["m00"]
            common = np.sqrt(max((mu20 - mu02) ** 2 + 4 * mu11 ** 2, 0))
            l1 = (mu20 + mu02 + common) / 2
            l2 = (mu20 + mu02 - common) / 2
            ecc = float(np.sqrt(1 - l2 / l1)) if l1 > 0 else 0.0

    # How many image borders the bright structure touches (a wrist/forearm
    # almost always reaches at least one edge; an axial brain scan reaches none).
    band = 6
    touches = (
        int(mb[:band, :].mean() > 0.02)
        + int(mb[-band:, :].mean() > 0.02)
        + int(mb[:, :band].mean() > 0.02)
        + int(mb[:, -band:].mean() > 0.02)
    )

    corner = float(np.mean([
        gray[:40, :40].mean(), gray[:40, -40:].mean(),
        gray[-40:, :40].mean(), gray[-40:, -40:].mean(),
    ])) / 255.0

    return {
        "std": round(float(gray.std()), 2),
        "colored_frac": round(colored_frac, 3),
        "white_frac": round(white_frac, 3),
        "dark_frac": round(dark_frac, 3),
        "bright_frac": round(bright_frac, 3),
        "fg_frac": round(fg_frac, 3),
        "eccentricity": round(ecc, 3),
        "border_edges_touched": touches,
        "corner_brightness": round(corner, 3),
    }


def validate_wrist_xray_image(image_path: str) -> Dict[str, Any]:
    """Validate that ``image_path`` is a wrist / forearm radiograph.

    Must be called BEFORE running the detection model; if ``is_valid`` is False
    the caller should reject the upload and skip detection entirely.
    """
    cfg = WRIST_VALIDATION

    img = cv2.imread(image_path)
    if img is None:
        return _result(False, "File could not be read as an image.",
                       "unknown", {})
    H, W = img.shape[:2]
    if min(H, W) < cfg["min_side_px"]:
        return _result(False, "Image resolution is too low for analysis.",
                       "unknown", {"size": [W, H]})

    stats = _measure(img)
    stats["size"] = [W, H]

    if stats["std"] < cfg["min_std"]:
        return _result(False, "Image is blank or corrupted.", "unknown", stats)

    # 1. Must be a (mostly) grayscale radiograph.
    if stats["colored_frac"] >= cfg["colored_frac_max"]:
        return _result(False,
                       "Image is colourful; a wrist X-ray is a grayscale "
                       "radiograph.", "non_xray", stats)

    # 2. Documents / logos / white-background graphics.
    if stats["white_frac"] >= cfg["white_frac_max"]:
        return _result(False,
                       "Image has a large white background (looks like a logo "
                       "or document, not an X-ray).", "non_xray", stats)

    # 3. Radiographic contrast (dark background + bright anatomy).
    if stats["dark_frac"] < cfg["dark_frac_min"]:
        return _result(False,
                       "Image lacks the dark background typical of an X-ray.",
                       "non_xray", stats)
    if not (cfg["fg_min"] <= stats["fg_frac"] <= cfg["fg_max"]):
        return _result(False,
                       "Image does not contain X-ray-like bone structures.",
                       "non_xray", stats)

    # 4. Reject round + enclosed + dark-cornered cross-sections (brain CT/MRI).
    #    All three conditions must hold, so a wrist/forearm (which runs off an
    #    edge and is elongated) is never caught here.
    if (stats["eccentricity"] < cfg["brain_ecc_max"]
            and stats["border_edges_touched"] <= cfg["brain_max_edges"]
            and stats["corner_brightness"] < cfg["brain_corner_max"]):
        itype = "ct" if stats["bright_frac"] >= 0.03 else "mri"
        label = "a CT scan" if itype == "ct" else "an MRI / brain scan"
        return _result(False,
                       f"Image looks like {label}, not a wrist/forearm X-ray.",
                       itype, stats)

    # Passed: a grayscale radiograph that is not a clear non-wrist scan.
    return _result(True,
                   "Grayscale radiograph consistent with a wrist/forearm "
                   "X-ray.", "wrist_xray", stats)
