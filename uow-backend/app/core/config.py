"""
Central configuration for X-ray detection and validation (single source of truth).

All confidence thresholds, class filtering, and validation tuning live here
so they can be changed in ONE place without touching processing code.
"""

# ---------------------------------------------------------------------------
# Detection configuration
# ---------------------------------------------------------------------------

# Default confidence threshold when the frontend does not send one.
DEFAULT_CONF_THRESHOLD = 0.30

# ---------------------------------------------------------------------------
# Active model. Switch models by changing MODEL_FILE + MODEL_CLASSES here.
# The processor auto-detects the input size and output format (the original
# mdciri model has NMS baked in; the 2-class retrain outputs raw predictions).
#
# Currently active: the 2-class retrain (best.onnx). To use the original
# published 9-class model instead, set:
#     MODEL_FILE = "yolov7-p6-bonefracture.onnx"
#     MODEL_CLASSES = {0:"boneanomaly",1:"bonelesion",2:"foreignbody",
#                      3:"fracture",4:"metal",5:"periostealreaction",
#                      6:"pronatorsign",7:"softtissue",8:"text"}
#     (and restore the 9-class CLASS_THRESHOLDS / ALLOWED_CLASSES below)
# ---------------------------------------------------------------------------
MODEL_FILE = "best.onnx"
MODEL_CLASSES = {0: "fracture", 1: "metal"}

# Per-class thresholds. The threshold requested by the frontend slider is
# CLAMPED into [min, max] for each class, so a slider set to e.g. 0.70 can
# never suppress subtle fracture / tiny metal detections, and a slider set
# very low cannot flood the output with noise.
#
# PRECISION (original) PROFILE — active: the fracture band is kept at the
# standard 0.25-0.35 so the model does not surface its weak/low-confidence
# false positives (e.g. spurious "fracture" on finger/metacarpal tips). For a
# more sensitive (hairline) profile, lower fracture min/max (e.g. 0.18/0.30)
# and set TTA.enabled = True below — at the cost of more false positives.
CLASS_THRESHOLDS = {
    "fracture":    {"min": 0.25, "max": 0.35},
    "metal":       {"min": 0.25, "max": 0.30},
}

# Model classes allowed in user-facing output. The 2-class retrain emits only
# these two classes.
ALLOWED_CLASSES = ["fracture", "metal"]

# Display-name mapping for user-facing output (none needed for the 2-class
# model). For the 9-class model, add {"foreignbody": "metal_implant"}.
DISPLAY_NAMES = {
}

# ---------------------------------------------------------------------------
# Raw-model output decoding. The retrained ONNX model outputs raw YOLO
# predictions (cx, cy, w, h, obj, cls...) WITHOUT NMS in the graph, so the
# processor decodes them and runs per-class NMS. pre_nms_conf is a low floor
# (below the smallest per-class threshold above) used only to discard
# near-zero boxes before NMS; the user-facing gate remains CLASS_THRESHOLDS.
# ---------------------------------------------------------------------------
MODEL_DECODE = {
    "pre_nms_conf": 0.05,
    "nms_iou": 0.45,
}

# Minimum bounding-box side length in pixels (original-image space).
# 0 = DISABLED: tiny metal fragments must never be removed by box size.
MIN_BOX_SIZE_PX = 0

# ---------------------------------------------------------------------------
# Multi-pass (tiled) inference — improves hairline fracture / tiny metal
# detection on high-resolution images. The model accepts 1024x1024, so a
# big X-ray downscaled to 1024 loses hairline detail; native-resolution tiles
# restore it. Detections from all passes are fused in original coordinates.
# NOTE: tile_size MUST equal the model input size (see XRayProcessor.h/.w),
# because tiles are fed to the model without rescaling.
# ---------------------------------------------------------------------------
TILING = {
    "enabled": True,
    "tile_size": 1024,      # MUST equal the model input size (1024 for best.onnx)
    "min_overlap": 256,     # px overlap between adjacent tiles
    # tiling only runs when the full-image letterbox scale is below this
    # (i.e. the image is meaningfully larger than the model input).
    "scale_trigger": 0.80,
    "max_tiles": 12,        # safety cap on number of tiles
}

# ---------------------------------------------------------------------------
# Test-time augmentation (TTA). Runs the SAME model again on a horizontally-
# flipped copy of the image (and its tiles) and merges the results through the
# existing fusion step. A faint hairline fracture the model catches in only one
# orientation gets a second chance; a finding seen in BOTH orientations has its
# confidence boosted by fusion (1 - prod(1 - c)), helping subtle true positives
# clear the threshold WITHOUT lowering it or changing the model. Disable if
# inference latency matters (it roughly doubles the number of model passes).
# ---------------------------------------------------------------------------
TTA = {
    # Optional horizontal-flip pass for extra recall. Left OFF with the
    # 9-class model (it localises well and extra passes mainly add cost).
    "enabled": False,
    "hflip": True,          # horizontal-flip pass
    "include_tiles": True,  # also run the flip on native-resolution tiles
}

# ---------------------------------------------------------------------------
# Image preprocessing applied to the radiograph BEFORE inference.
#
# CLAHE (contrast-limited adaptive histogram equalization) makes faint cortical
# breaks (hairline fractures) far more visible. IMPORTANT: only enable this if
# the model was RE-TRAINED on CLAHE-preprocessed images. The current model was
# not, and enabling CLAHE at inference only would create a train/inference
# mismatch that HURTS accuracy. The training tools in `tools/` apply the same
# CLAHE so you can retrain, then set "clahe": True here.
# ---------------------------------------------------------------------------
PREPROCESS = {
    "clahe": False,         # keep False until the model is retrained with CLAHE
    "clahe_clip": 2.0,
    "clahe_grid": 8,
}

# IoU above which same-class detections from different passes are considered
# the same finding and fused (confidence combined: 1 - prod(1 - c_i)).
FUSION_IOU = 0.50

# Corroboration rule (only applies when multiple passes ran): a detection of
# the listed classes is kept only if it was seen by >= 2 passes OR its single-
# pass confidence is at least min_single_pass_conf. Filters one-off noise
# (e.g. false "fracture" on cut-off anatomy) without touching metal classes.
CORROBORATION = {
    "classes": ["fracture"],
    "min_single_pass_conf": 0.45,
}

# Border-sliver artifact filter: the model sometimes emits thin false boxes
# glued to the image border where anatomy is cut off. A detection is dropped
# if it touches the image border (within border_px) and its thickness in
# that direction is below max_thickness_frac of the image dimension.
EDGE_SLIVER = {
    "border_px": 8,
    "max_thickness_frac": 0.05,
}

# ---------------------------------------------------------------------------
# Upload / validation configuration
# ---------------------------------------------------------------------------

ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".bmp", ".gif", ".webp", ".tif", ".tiff"}

INVALID_IMAGE_MESSAGE = "Invalid image. Please upload a valid wrist X-ray image."

UNCERTAIN_IMAGE_WARNING = (
    "This image does not look like a standard grayscale X-ray. "
    "Results may be unreliable."
)

# Heuristic X-ray validation thresholds (calibrated on sample uploads).
VALIDATION = {
    "min_side_px": 64,            # reject images smaller than this
    "colored_frac_gray": 0.10,    # below this fraction of colored pixels -> grayscale image
    "white_frac_max": 0.50,       # more near-white pixels -> document / white-bg screenshot
    "flat_frac_max": 0.35,        # more perfectly-flat 8x8 blocks -> UI / screenshot / graphic
    "hue_value_spread_photo": 0.55,  # hue independent of brightness -> natural color photo
}
