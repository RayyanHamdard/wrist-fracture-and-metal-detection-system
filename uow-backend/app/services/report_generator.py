"""
Human-readable AI screening report generator.

Turns the detection results into a readable text report suitable for the
"Download Report" feature. This is presentation only — it does NOT run or
change the detection model, thresholds, or class filtering.

The previous download was the raw YOLO label file
(``class_id confidence x_center y_center width height``); this module produces
a clean, clinician-friendly summary instead.
"""

from datetime import datetime
from typing import Dict, List, Any, Optional
import uuid


# Classes the model is allowed to report as medical findings. Anything else
# (e.g. an unexpected/unknown class id) is NOT shown as a finding.
KNOWN_FINDING_CLASSES = {"fracture", "metal"}

DISCLAIMER = (
    "This AI-generated report is for preliminary screening support only and is "
    "not a medical diagnosis. Please consult a qualified radiologist or doctor "
    "for final interpretation."
)


def _confidence_level(pct: float) -> str:
    """0-39% = Low, 40-69% = Medium, 70%+ = High."""
    if pct >= 70:
        return "High"
    if pct >= 40:
        return "Medium"
    return "Low"


def _region_words(bbox: List[float], width: int, height: int) -> str:
    """Convert a bounding box into simple human-readable region wording."""
    try:
        x1, y1, x2, y2 = [float(v) for v in bbox]
        if width <= 0 or height <= 0:
            raise ValueError
        xc = (x1 + x2) / 2.0 / width
        yc = (y1 + y2) / 2.0 / height
    except Exception:
        return "highlighted area on uploaded X-ray"

    # Vertical band
    if yc < 0.40:
        vertical = "upper wrist area"
    elif yc > 0.60:
        vertical = "lower wrist area"
    else:
        vertical = "center region"

    # Horizontal band
    if xc < 0.40:
        horizontal = "left side"
    elif xc > 0.60:
        horizontal = "right side"
    else:
        horizontal = None  # already "center" horizontally

    if horizontal:
        return f"{vertical}, {horizontal}"
    return vertical


def _status_for(class_name: str, detections: List[Dict[str, Any]]) -> str:
    """Detected / Low-confidence suspicion / Not Detected for one class."""
    confs = [float(d["confidence"]) for d in detections
             if d.get("class_name") == class_name]
    if not confs:
        return "Not Detected"
    best = max(confs)
    # detections shown have already passed the model's confidence threshold;
    # below 40% we report it only as a low-confidence suspicion.
    if best >= 0.40:
        return "Detected"
    return "Low-confidence suspicion"


def build_detection_report(
    detections_detailed: List[Dict[str, Any]],
    image_size: Dict[str, int],
    original_filename: str,
    *,
    patient_name: Optional[str] = None,
    image_quality_ok: bool = True,
    analyzed_at: Optional[datetime] = None,
    report_id: Optional[str] = None,
) -> str:
    """Build the readable report text.

    Parameters mirror what the upload endpoint has available. Only known
    finding classes (fracture, metal) are reported; unknown classes are
    ignored as medical findings.
    """
    now = analyzed_at or datetime.now()
    rid = report_id or f"WFMD-{now.strftime('%Y%m%d')}-{uuid.uuid4().hex[:8].upper()}"

    # Keep only recognised finding classes.
    findings = [d for d in detections_detailed
                if str(d.get("class_name", "")).lower() in KNOWN_FINDING_CLASSES]

    W = int(image_size.get("width", 0))
    H = int(image_size.get("height", 0))

    fracture_status = _status_for("fracture", findings)
    metal_status = _status_for("metal", findings)

    # Overall plain-English summary.
    if fracture_status == "Detected" and metal_status == "Detected":
        overall = ("The AI model identified both a possible fracture and a "
                   "metal/implant-like structure in the wrist X-ray.")
    elif fracture_status == "Detected":
        overall = ("The AI model identified a possible fracture in the wrist "
                   "X-ray.")
    elif metal_status == "Detected":
        overall = ("The AI model identified a metal/implant-like structure in "
                   "the wrist X-ray.")
    elif "Low-confidence suspicion" in (fracture_status, metal_status):
        overall = ("The AI model found low-confidence signs that may need a "
                   "closer look by a professional.")
    else:
        overall = ("The AI model did not detect a clear fracture or "
                   "metal-like structure in the wrist X-ray.")

    quality_note = (
        "Image quality appears acceptable for AI screening"
        if image_quality_ok else
        "Image quality may not be sufficient for reliable AI screening"
    )

    # Recommendations (can be more than one).
    recs: List[str] = []
    if fracture_status in ("Detected", "Low-confidence suspicion"):
        recs.append("Please consult a qualified radiologist or orthopedic "
                    "doctor for confirmation.")
    if metal_status in ("Detected", "Low-confidence suspicion"):
        recs.append("Metal/implant-like structure detected. Clinical history "
                    "should be reviewed by a medical professional.")
    if not recs:
        recs.append("No clear fracture or metal-like structure was detected by "
                    "the AI model. Clinical confirmation is still recommended "
                    "if symptoms are present.")

    # ---- Assemble text ----------------------------------------------------
    line = "=" * 64
    out: List[str] = []
    out.append(line)
    out.append("WRIST FRACTURE AND METAL DETECTION AI REPORT".center(64))
    out.append(line)
    out.append("")

    out.append("BASIC INFORMATION")
    out.append("-" * 64)
    out.append(f"Patient / User      : {patient_name or 'Not provided'}")
    out.append(f"Uploaded image      : {original_filename or 'Unknown'}")
    out.append(f"Date & time         : {now.strftime('%Y-%m-%d %H:%M:%S')}")
    out.append(f"Report ID           : {rid}")
    out.append("")

    out.append("AI FINDINGS SUMMARY")
    out.append("-" * 64)
    out.append(f"Fracture status     : {fracture_status}")
    out.append(f"Metal status        : {metal_status}")
    out.append(f"Overall result      : {overall}")
    out.append("")

    out.append("DETECTION DETAILS")
    out.append("-" * 64)
    if findings:
        for i, d in enumerate(findings, 1):
            pct = float(d["confidence"]) * 100.0
            region = _region_words(d.get("bbox", []), W, H)
            out.append(f"{i}. Finding         : {str(d['class_name']).capitalize()}")
            out.append(f"   Confidence      : {pct:.1f}%  ({_confidence_level(pct)})")
            out.append(f"   Detected region : {region}")
            out.append("")
    else:
        out.append("No fracture or metal-like findings were reported by the AI "
                    "model.")
        out.append("")

    out.append("IMAGE QUALITY")
    out.append("-" * 64)
    out.append(quality_note)
    out.append("")

    out.append("RECOMMENDATION")
    out.append("-" * 64)
    for r in recs:
        out.append(f"- {r}")
    out.append("")

    out.append("DISCLAIMER")
    out.append("-" * 64)
    # wrap disclaimer to ~64 cols
    words = DISCLAIMER.split()
    cur = ""
    for w in words:
        if len(cur) + len(w) + 1 > 64:
            out.append(cur)
            cur = w
        else:
            cur = f"{cur} {w}".strip()
    if cur:
        out.append(cur)
    out.append("")
    out.append(line)

    return "\n".join(out)
