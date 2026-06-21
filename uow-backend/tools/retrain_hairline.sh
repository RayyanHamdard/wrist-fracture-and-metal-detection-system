#!/usr/bin/env bash
# =============================================================================
# Turnkey retrain of the wrist fracture/metal YOLOv7-p6 model, tuned for
# HAIRLINE fracture detection (recall) WITHOUT exploding false positives
# (precision via hard negatives). Run on a GPU machine or Google Colab.
#
# This is the real fix: the live model can only be pushed so far with
# thresholds/TTA. Retraining on better-presented data is what actually makes
# hairline detection reliable.
#
# Run from the uow-backend/ folder:
#     bash tools/retrain_hairline.sh /path/to/dataset
#
# DATASET LAYOUT expected (YOLO format, classes mapped to 0=fracture,1=metal):
#     <dataset>/images/train  <dataset>/images/val
#     <dataset>/labels/train  <dataset>/labels/val
# Use your existing 2-class wrist data (the same kind you trained best.onnx on).
# For precision, ALSO include many NORMAL wrist X-rays with EMPTY .txt labels
# (hard negatives) in images/train + labels/train.
# =============================================================================
set -e
DATA=${1:-./dataset}
HERE=$(pwd)                      # uow-backend/

# 1. YOLOv7 (the original repo this model architecture comes from)
[ -d yolov7 ] || git clone https://github.com/WongKinYiu/yolov7.git
pip install -r yolov7/requirements.txt onnx onnxsim onnxruntime >/dev/null

# 2. Preprocess: CLAHE + native-resolution positive crops + oversampling.
python tools/prepare_hairline_dataset.py \
    --images "$DATA/images/train" --labels "$DATA/labels/train" \
    --out ./hairline_train --fracture-class 0 \
    --clahe --crops --crop-size 640 --oversample 3
# Val set: CLAHE only (must match train preprocessing), no crops/oversample.
python tools/prepare_hairline_dataset.py \
    --images "$DATA/images/val" --labels "$DATA/labels/val" \
    --out ./hairline_val --fracture-class 0 --clahe

# 3. Recompute anchors for the fracture box-size distribution (12 = p6, 4 layers).
echo ">>> Paste the anchors printed below into cfg/training/yolov7-p6.yaml"
python tools/recompute_anchors.py --labels ./hairline_train/labels --input-size 1024 --k 12

# 4. data.yaml
cat > hairline_data.yaml <<EOF
train: $HERE/hairline_train/train_oversampled.txt
val:   $HERE/hairline_val/images
nc: 2
names: ['fracture','metal']
EOF

# 5. Train at 1024 (matches inference) with the tuned hyperparameters.
#    Edit cfg/training/yolov7-p6.yaml: set nc: 2 and the anchors from step 3.
cd yolov7
python train_aux.py --workers 8 --device 0 --batch-size 8 --epochs 120 \
    --img 1024 1024 --data "$HERE/hairline_data.yaml" \
    --hyp "$HERE/tools/hyp_hairline.yaml" \
    --cfg cfg/training/yolov7-p6.yaml --weights yolov7-p6_training.pt \
    --name hairline

# 6. Export ONNX in the EXACT format the app expects:
#    input 1x3x1024x1024, raw output [1,N,7] (grid-decoded, NO NMS in graph).
python export.py --weights runs/train/hairline/weights/best.pt \
    --grid --simplify --img-size 1024 1024
cd "$HERE"

# 7. Install the new model.
cp yolov7/runs/train/hairline/weights/best.onnx app/services/models/best.onnx
echo ">>> Done. New model installed at app/services/models/best.onnx"
echo ">>> If you trained WITH CLAHE, set PREPROCESS['clahe']=True in app/core/config.py"
echo ">>> Then validate on a held-out set of REAL radiographs (normals + fractures)"
echo ">>> and check the per-image false-positive rate with tools/batch_test_images.py"
