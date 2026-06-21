#!/usr/bin/env python3
"""
Recompute YOLO anchors for the wrist dataset.

Hairline fractures are small and thin; the default anchors may not match their
size/aspect, so the model gets a poor prior for them. This runs k-means (with
IoU distance) over your label boxes and prints anchors you can paste into the
YOLOv7 model `.yaml` (or pass to training).

Usage
-----
  python recompute_anchors.py --labels /data/wrist/labels/train \
      --input-size 1024 --k 12          # 12 anchors for yolov7-p6 (4 layers)
      # use --k 9 for a 3-layer (p5) model

Only normalized box sizes are needed, so image files are not required; sizes
are scaled by --input-size to anchor pixels.

Dependencies: numpy.
"""
import argparse
import glob
import os

import numpy as np


def load_wh(labels_dir):
    wh = []
    for lp in glob.glob(os.path.join(labels_dir, "*.txt")):
        for ln in open(lp):
            p = ln.split()
            if len(p) >= 5:
                w, h = float(p[3]), float(p[4])
                if w > 0 and h > 0:
                    wh.append([w, h])
    return np.array(wh, dtype=np.float64)


def iou_wh(boxes, clusters):
    # boxes: (N,2), clusters: (K,2) -> IoU (N,K) assuming aligned at origin
    inter = np.minimum(boxes[:, None, 0], clusters[None, :, 0]) * \
        np.minimum(boxes[:, None, 1], clusters[None, :, 1])
    area_b = (boxes[:, 0] * boxes[:, 1])[:, None]
    area_c = (clusters[:, 0] * clusters[:, 1])[None, :]
    return inter / (area_b + area_c - inter + 1e-9)


def kmeans(boxes, k, iters=300, seed=0):
    rng = np.random.default_rng(seed)
    clusters = boxes[rng.choice(len(boxes), k, replace=False)]
    last = np.zeros(len(boxes))
    for _ in range(iters):
        d = 1 - iou_wh(boxes, clusters)
        nearest = d.argmin(1)
        if (nearest == last).all():
            break
        for ci in range(k):
            pts = boxes[nearest == ci]
            if len(pts):
                clusters[ci] = pts.mean(0)
        last = nearest
    return clusters, nearest


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--labels", required=True)
    ap.add_argument("--input-size", type=int, default=1024)
    ap.add_argument("--k", type=int, default=12)
    ap.add_argument("--seed", type=int, default=0)
    args = ap.parse_args()

    wh = load_wh(args.labels)
    if len(wh) < args.k:
        raise SystemExit(f"Not enough boxes ({len(wh)}) for k={args.k}")

    clusters, nearest = kmeans(wh, args.k, seed=args.seed)
    clusters = clusters[np.argsort(clusters[:, 0] * clusters[:, 1])]
    px = (clusters * args.input_size).round().astype(int)

    mean_iou = iou_wh(wh, clusters).max(1).mean()
    print(f"boxes={len(wh)}  k={args.k}  input={args.input_size}px  "
          f"mean best-IoU={mean_iou:.3f}")
    print("\nAnchors (w,h) in pixels, smallest->largest:")
    flat = ", ".join(f"{w},{h}" for w, h in px)
    print("  " + flat)

    layers = 4 if args.k % 4 == 0 else 3
    per = args.k // layers
    print(f"\nGrouped for {layers} detection layers "
          f"(stride low->high), {per} anchors each:")
    for li in range(layers):
        grp = px[li * per:(li + 1) * per]
        print("  - [" + ", ".join(f"{w},{h}" for w, h in grp) + "]")
    print("\nPaste these into your YOLOv7 model .yaml `anchors:` block.")


if __name__ == "__main__":
    main()
