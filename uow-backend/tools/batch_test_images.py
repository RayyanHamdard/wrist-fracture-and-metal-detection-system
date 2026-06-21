#!/usr/bin/env python3
"""
Batch-test candidate X-ray images against the REAL app pipeline.

Use this to find which downloaded hairline-fracture images the model actually
detects (instead of guessing). It runs the exact same validator + detection
the web app uses, so the results match what users would see.

Usage
-----
    # from the uow-backend/ folder so `app...` imports resolve:
    cd uow-backend
    python tools/batch_test_images.py --dir path/to/candidate_images
    python tools/batch_test_images.py --dir ./candidates --conf 0.20

For every image it prints:
  * validator verdict (valid wrist X-ray or rejected, with reason)
  * whether a fracture/metal was detected at the given threshold
  * the TOP fracture confidence the model produced (even if below threshold),
    so you can see "near misses"

Pick the images that show up as DETECTED (or high top-confidence) as your
test set.
"""
import argparse
import os
import sys
import glob

# make `app` importable when run from uow-backend/
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.services.wrist_xray_validator import validate_wrist_xray_image
from app.services.xray_processor import XRayProcessor

IMG_EXTS = (".jpg", ".jpeg", ".png", ".bmp", ".tif", ".tiff", ".webp")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--dir", required=True, help="folder of candidate images")
    ap.add_argument("--conf", type=float, default=0.30,
                    help="confidence threshold (as the slider would send)")
    ap.add_argument("--out", default="./batch_test_out",
                    help="where processed images are written")
    args = ap.parse_args()

    processor = XRayProcessor()
    files = sorted(p for p in glob.glob(os.path.join(args.dir, "*"))
                   if p.lower().endswith(IMG_EXTS))
    if not files:
        print("No images found in", args.dir)
        return

    print(f"{'image':40} {'validator':12} {'detected':22} {'top_fracture_conf'}")
    print("-" * 90)
    for fp in files:
        name = os.path.basename(fp)[:38]
        v = validate_wrist_xray_image(fp)
        if not v["is_valid"]:
            print(f"{name:40} {'REJECTED':12} {'(' + v['image_type_detected'] + ')':22} -   "
                  f"  [{v['reason'][:40]}]")
            continue

        res = processor.process_image(fp, args.out, conf_threshold=args.conf,
                                      debug=True)
        dets = res.get("detections", [])
        det_str = ", ".join(f"{d['class_name']} {d['confidence']:.2f}"
                            for d in dets) or "none"

        # top fracture confidence seen by the model (pre-threshold), from debug
        raw = res.get("debug", {}).get("raw_detections", [])
        fr = [d["confidence"] for d in raw
              if d.get("class_name") == "fracture"]
        top = f"{max(fr):.3f}" if fr else "-"

        print(f"{name:40} {'valid':12} {det_str[:22]:22} {top}")

    print("\nTip: keep images shown as DETECTED, or with a high top_fracture_conf,"
          " as your hairline test set.")


if __name__ == "__main__":
    main()
