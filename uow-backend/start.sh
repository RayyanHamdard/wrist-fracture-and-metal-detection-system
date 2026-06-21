#!/usr/bin/env bash
set -e

# Runtime directories are gitignored, so recreate them on a fresh deploy.
mkdir -p app/static/uploads/xray app/static/uploads/ct_scan processed app/services/models

# Model weights are NOT committed to git (too large for GitHub's 100 MB limit).
# If the model file is missing and MODEL_URL is provided, download it on boot.
# MODEL_FILE must match config.MODEL_FILE (default: best.onnx).
MODEL_FILE="${MODEL_FILE:-best.onnx}"
MODEL_PATH="app/services/models/${MODEL_FILE}"
if [ ! -f "$MODEL_PATH" ] && [ -n "$MODEL_URL" ]; then
  echo "Model not found — downloading from MODEL_URL ..."
  curl -fL "$MODEL_URL" -o "$MODEL_PATH"
fi

# $PORT is provided by most hosts; Hugging Face Spaces uses 7860.
exec uvicorn app.main:app --host 0.0.0.0 --port "${PORT:-7860}"
