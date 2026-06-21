# Wrist-fracture model: recall (hairlines) and precision (false positives)

> IMPORTANT — read this first if the model is flagging fractures on NORMAL bone.
>
> Measured on a normal wrist, the current model emits ~40 raw "fracture"
> candidates with true confidences up to ~0.85. That is a **model precision**
> problem: it has not learned what normal carpal/metacarpal bone looks like.
> No post-processing can remove confident false positives without also deleting
> real fractures.
>
> What was changed in code to stop *amplifying* the problem:
> - Fusion now reports the **max** single-pass confidence instead of a noisy-OR
>   `1-prod(1-c)` (which inflated e.g. four 0.6 looks into 0.97 and created the
>   high-confidence false positives).
> - **TTA is OFF by default** and tiling is back to conservative settings, so
>   the pipeline no longer multiplies false-positive candidates.
>
> The durable fix is a **precision-focused retrain** (hard-negative mining):
> - Add many **NORMAL wrist X-rays with empty label files** to training so the
>   model learns true negatives. The GRAZPEDWRI-DX set has many such studies.
> - Use hard-negative mining: run the current model on normals, take its
>   false-positive crops, and add them as negatives.
> - Train longer; verify on a held-out set of normals that the false-positive
>   rate per image drops. Track precision/recall, not just mAP.
> - Only after precision is acceptable, re-enable TTA / the recall tooling below
>   to recover hairline sensitivity.
>
> Tuning the fracture confidence threshold (`config.CLASS_THRESHOLDS`) up is a
> blunt stopgap: it removes weak false positives but also weak true hairlines,
> and won't remove the ~0.8 false positives. Prefer the retrain.

---

# Improving hairline wrist-fracture detection

Hairline fractures are small, low-contrast findings. The fixes below are split
into what is **already applied at inference** (no retrain) and what needs a
**retrain on your existing dataset** (no new images required).

## Already applied (inference-side, live now)

These are in `app/services/xray_processor.py` + `app/core/config.py` and need
no retraining:

- **Test-time augmentation (`TTA`)** — each image is also run horizontally
  flipped (full image + tiles). Results merge through the existing fusion step,
  so a faint fracture seen in both orientations gets its confidence *boosted*
  (`1 - prod(1 - c)`) and clears the threshold without lowering it. Toggle in
  `config.TTA`.
- **More aggressive tiling** — `TILING.scale_trigger` raised to 0.95 and
  `min_overlap` to 320, so almost any image larger than the model input is also
  run as native-resolution tiles (more pixels on a hairline). Toggle/tune in
  `config.TILING`.

Trade-off: these roughly double-to-triple the number of model passes per image,
so CPU latency increases. Dial back `TTA.include_tiles` or `TILING.max_tiles`
if needed.

## Needs a retrain on your current dataset (use the scripts here)

The biggest accuracy gains require retraining the YOLOv7 model — but only with
data you already have, reshaped to expose hairlines better.

### 1. Prepare the data — `prepare_hairline_dataset.py`

```
python prepare_hairline_dataset.py \
    --images /data/wrist/images/train \
    --labels /data/wrist/labels/train \
    --out    /data/wrist_hairline \
    --fracture-class 0 \
    --clahe --crops --crop-size 640 --oversample 3
```

This produces:
- **CLAHE-preprocessed images** — boosts faint cortical-break contrast.
- **Positive crops** centred on each fracture box — a hairline goes from a
  handful of pixels to hundreds.
- **`train_oversampled.txt`** — repeats fracture images so the loss is not
  dominated by easy/negative cases.

Run it for the train split (and the val split *without* `--oversample`/`--crops`,
but *with* `--clahe` so val matches train).

### 2. Recompute anchors — `recompute_anchors.py`

```
python recompute_anchors.py --labels /data/wrist_hairline/labels --input-size 1024 --k 12
```

Paste the printed anchors into your YOLOv7-p6 model `.yaml`. Thin/small
fracture boxes need anchors that match them.

### 3. Retrain (YOLOv7) — recommended changes

- Train at **1024** (matches inference; small findings survive).
- Point `data.yaml` `train:` at `train_oversampled.txt`.
- In the hyperparameter file: keep **mosaic** on (helps small objects), raise
  the objectness/box loss gain a little, and consider **focal loss**
  (`fl_gamma: 1.5`) for the class imbalance.
- Augmentation: mild rotation/translate/scale + flips; **avoid** heavy blur or
  aggressive downscale — they erase hairlines.
- Train longer with cosine LR + EMA; pick the checkpoint with best fracture
  recall, not just mAP.

### 4. After retraining

- Export to ONNX as `best.onnx` (same input/output as now) and drop it into
  `app/services/models/`.
- If you trained **with CLAHE**, set `PREPROCESS["clahe"] = True` in
  `app/core/config.py` so inference preprocessing matches training. (Leave it
  `False` otherwise — CLAHE at inference only would hurt.)

### 5. Also worth doing (free, high ROI)

Audit the labels: make sure hairline fractures are annotated tightly and that
none are missing. A model can't learn a finding that's unlabeled.
