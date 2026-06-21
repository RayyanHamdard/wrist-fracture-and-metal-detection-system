#!/usr/bin/env python3
"""
Dataset preparation for improving HAIRLINE FRACTURE detection (no new data).

Given a YOLO-format dataset (images + .txt labels with `class xc yc w h`
normalized), this script produces training data that makes faint hairline
fractures easier for the model to learn:

  1. CLAHE preprocessing  - boosts faint cortical-break contrast. Apply the
                            SAME transform at inference (config.PREPROCESS).
  2. Positive crops       - native-resolution crops centred on each fracture
                            box, so a hairline occupies many more pixels.
  3. Oversample list      - a train list that repeats fracture images so the
                            loss is not dominated by easy/negative samples.

Usage
-----
  python prepare_hairline_dataset.py \
      --images /data/wrist/images/train \
      --labels /data/wrist/labels/train \
      --out    /data/wrist_hairline \
      --fracture-class 0 \
      --clahe --crops --crop-size 640 --oversample 3

Then point your YOLOv7 training `data.yaml` at the generated images/labels and
retrain. After retraining WITH --clahe, set PREPROCESS["clahe"] = True in
app/core/config.py so inference matches training.

Dependencies: opencv-python, numpy.
"""
import argparse
import os
import glob
import shutil

import cv2
import numpy as np

IMG_EXTS = (".jpg", ".jpeg", ".png", ".bmp", ".tif", ".tiff")


def apply_clahe(img, clip=2.0, grid=8):
    lab = cv2.cvtColor(img, cv2.COLOR_BGR2LAB)
    clahe = cv2.createCLAHE(clipLimit=clip, tileGridSize=(grid, grid))
    lab[:, :, 0] = clahe.apply(lab[:, :, 0])
    return cv2.cvtColor(lab, cv2.COLOR_LAB2BGR)


def read_label(path):
    rows = []
    if not os.path.exists(path):
        return rows
    for ln in open(path):
        p = ln.split()
        if len(p) >= 5:
            rows.append([int(float(p[0])), *map(float, p[1:5])])
    return rows


def write_label(path, rows):
    with open(path, "w") as f:
        for c, xc, yc, w, h in rows:
            f.write(f"{c} {xc:.6f} {yc:.6f} {w:.6f} {h:.6f}\n")


def make_crop(img, rows, cx, cy, size, fracture_class):
    """Crop `size`x`size` around (cx,cy) px; return crop + remapped labels."""
    H, W = img.shape[:2]
    half = size // 2
    x0 = int(np.clip(cx - half, 0, max(W - size, 0)))
    y0 = int(np.clip(cy - half, 0, max(H - size, 0)))
    crop = img[y0:y0 + size, x0:x0 + size]
    ch, cw = crop.shape[:2]
    if ch < size or cw < size:  # pad small images
        pad = np.full((size, size, 3), 114, np.uint8)
        pad[:ch, :cw] = crop
        crop = pad
        ch, cw = size, size
    new_rows = []
    for c, xc, yc, w, h in rows:
        bx, by, bw, bh = xc * W, yc * H, w * W, h * H
        nx, ny = (bx - x0) / cw, (by - y0) / ch
        nw, nh = bw / cw, bh / ch
        if 0 < nx < 1 and 0 < ny < 1 and nw > 0 and nh > 0:
            new_rows.append([c, nx, ny, min(nw, 1.0), min(nh, 1.0)])
    return crop, new_rows


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--images", required=True)
    ap.add_argument("--labels", required=True)
    ap.add_argument("--out", required=True)
    ap.add_argument("--fracture-class", type=int, default=0)
    ap.add_argument("--clahe", action="store_true")
    ap.add_argument("--clahe-clip", type=float, default=2.0)
    ap.add_argument("--clahe-grid", type=int, default=8)
    ap.add_argument("--crops", action="store_true")
    ap.add_argument("--crop-size", type=int, default=640)
    ap.add_argument("--oversample", type=int, default=1,
                    help="times to repeat fracture images in the train list")
    args = ap.parse_args()

    out_img = os.path.join(args.out, "images")
    out_lbl = os.path.join(args.out, "labels")
    os.makedirs(out_img, exist_ok=True)
    os.makedirs(out_lbl, exist_ok=True)

    imgs = [p for p in glob.glob(os.path.join(args.images, "*"))
            if p.lower().endswith(IMG_EXTS)]
    train_list = []
    n_base, n_crop = 0, 0

    for ip in imgs:
        stem = os.path.splitext(os.path.basename(ip))[0]
        lp = os.path.join(args.labels, stem + ".txt")
        img = cv2.imread(ip)
        if img is None:
            print("skip unreadable:", ip)
            continue
        rows = read_label(lp)
        if args.clahe:
            img = apply_clahe(img, args.clahe_clip, args.clahe_grid)

        base_img = os.path.join(out_img, stem + ".png")
        base_lbl = os.path.join(out_lbl, stem + ".txt")
        cv2.imwrite(base_img, img)
        write_label(base_lbl, rows)
        n_base += 1

        has_fr = any(c == args.fracture_class for c, *_ in rows)
        reps = args.oversample if has_fr else 1
        train_list += [base_img] * reps

        if args.crops and has_fr:
            H, W = img.shape[:2]
            for i, (c, xc, yc, w, h) in enumerate(rows):
                if c != args.fracture_class:
                    continue
                crop, crows = make_crop(img, rows, xc * W, yc * H,
                                        args.crop_size, args.fracture_class)
                if not crows:
                    continue
                cstem = f"{stem}_crop{i}"
                cimg = os.path.join(out_img, cstem + ".png")
                cv2.imwrite(cimg, crop)
                write_label(os.path.join(out_lbl, cstem + ".txt"), crows)
                train_list += [cimg] * args.oversample
                n_crop += 1

    list_path = os.path.join(args.out, "train_oversampled.txt")
    with open(list_path, "w") as f:
        f.write("\n".join(train_list) + "\n")

    print(f"Done. base images={n_base}, positive crops={n_crop}, "
          f"train-list entries={len(train_list)}")
    print(f"Train list: {list_path}")
    print(f"Images: {out_img}\nLabels: {out_lbl}")
    if args.clahe:
        print("NOTE: trained WITH CLAHE -> set PREPROCESS['clahe']=True in "
              "app/core/config.py for inference.")


if __name__ == "__main__":
    main()
