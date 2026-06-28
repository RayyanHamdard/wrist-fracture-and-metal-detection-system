from fastapi import APIRouter, UploadFile, File, Form, HTTPException, Header
from fastapi.responses import FileResponse
from typing import List, Dict, Any, Optional
from app.services.xray_processor import XRayProcessor
from app.services.wrist_xray_validator import (
    validate_wrist_xray_image,
    ERROR_MESSAGE as WRIST_VALIDATION_MESSAGE,
)

from app.core.utils import save_file1
from app.core.config import (
    DEFAULT_CONF_THRESHOLD,
    ALLOWED_EXTENSIONS,
    INVALID_IMAGE_MESSAGE,
)
import os

router = APIRouter()
processor = XRayProcessor()


def _resolve_patient_name(authorization: Optional[str]) -> Optional[str]:
    """Resolve the logged-in user's display name from the JWT, if present.

    Returns the user's name, falling back to their email, or None when the
    request is unauthenticated or the token is invalid. Detection is never
    gated on this — an anonymous upload simply produces no patient name.
    The User model / DB session live in app.main, so they are imported lazily
    here (at request time) to avoid a circular import.
    """
    if not authorization or not authorization.lower().startswith("bearer "):
        return None
    token = authorization.split(" ", 1)[1].strip()
    try:
        from jose import jwt, JWTError
        from app.main import SECRET_KEY, ALGORITHM, SessionLocal, User

        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        except JWTError:
            return None
        email = payload.get("sub")
        if not email:
            return None

        db = SessionLocal()
        try:
            user = db.query(User).filter(User.email == email).first()
        finally:
            db.close()
        if user is None:
            return None

        name = (getattr(user, "name", None) or "").strip()
        return name or (getattr(user, "email", None) or None)
    except Exception:
        # Never let report-name resolution break the detection flow.
        return None


def _record_analysis_safe(authorization: Optional[str], original_filename: Optional[str],
                          file_path: str, result: Dict[str, Any]) -> None:
    """Best-effort: write one AnalysisHistory row for a completed detection.

    Runs server-side so the admin "Total Analyses" stat increments for EVERY
    successful analysis — including anonymous uploads (user_id stays NULL).
    Any failure here is swallowed so it can never break the detection response.
    """
    try:
        import json
        from jose import jwt, JWTError
        from app.main import SessionLocal, User, HospitalStaff, AnalysisHistory, SECRET_KEY, ALGORITHM

        user_id = None
        hospital_id = None
        db = SessionLocal()
        try:
            if authorization and authorization.lower().startswith("bearer "):
                token = authorization.split(" ", 1)[1].strip()
                try:
                    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
                    email = payload.get("sub")
                except JWTError:
                    email = None
                if email:
                    user = db.query(User).filter(User.email == email).first()
                    if user:
                        user_id = user.id
                        if user.role == "hospital":
                            staff = db.query(HospitalStaff).filter(
                                HospitalStaff.user_id == user.id).first()
                            if staff:
                                hospital_id = staff.hospital_id

            processed = result.get("processed_image") or ""
            analysis = AnalysisHistory(
                user_id=user_id,
                hospital_id=hospital_id,
                image_type="xray",
                original_filename=(original_filename or os.path.basename(file_path)),
                processed_filename=(os.path.basename(processed) or None),
                detections=json.dumps(result.get("detections", [])),
            )
            db.add(analysis)
            db.commit()
        finally:
            db.close()
    except Exception:
        # Recording is non-critical; never surface an error to the user.
        pass


@router.post("/", response_model=Dict[str, Any])  # Accept any type for values
async def upload_xray_image(
    file: UploadFile = File(...),
    # Form(...) so the value the frontend sends in FormData is actually read
    # (previously this was a query param, so the slider value was ignored).
    conf_threshold: float = Form(DEFAULT_CONF_THRESHOLD),
    debug: bool = False,
    authorization: Optional[str] = Header(None),
):
    # Step 1: validate file type before doing anything else
    ext = os.path.splitext(file.filename or "")[1].lower()
    if ext not in ALLOWED_EXTENSIONS or not (file.content_type or "").startswith("image/"):
        raise HTTPException(status_code=400, detail=INVALID_IMAGE_MESSAGE)

    # Save uploaded file
    file_path = save_file1(file, "xray")

    # Step 2: wrist X-ray validation layer (runs BEFORE the detection model).
    # This independent, classical-image check rejects anything that is not a
    # wrist/forearm radiograph (photos, screenshots, documents, logos, MRI,
    # CT, brain/chest/dental scans, etc.). It does NOT use the YOLO model and
    # does NOT change detection thresholds or sensitivity. If the image is not
    # a valid wrist X-ray, we stop here: no inference, no bounding boxes, no
    # detection report.
    validation = validate_wrist_xray_image(file_path)
    if not validation["is_valid"]:
        if debug:
            return {"error": WRIST_VALIDATION_MESSAGE, "validation": validation}
        raise HTTPException(status_code=422, detail=WRIST_VALIDATION_MESSAGE)

    try:
        # Step 3: run detection on the validated wrist X-ray (UNCHANGED).
        result = processor.process_image(
            file_path=file_path,
            output_dir="processed",
            conf_threshold=conf_threshold,
            debug=debug,
        )

        # Record this analysis server-side so the admin "Total Analyses" stat
        # increments for every successful detection — logged-in or anonymous.
        _record_analysis_safe(authorization, file.filename, file_path, result)

        # Build a human-readable AI screening report (replaces the raw YOLO
        # label file as the user-facing "Download Report").
        base_name = os.path.splitext(os.path.basename(file_path))[0]
        report_path = os.path.join("processed", f"{base_name}_report.pdf")
        from app.services.report_generator import generate_pdf_report
        generate_pdf_report(
            detections_detailed=result.get("detections_detailed", []),
            image_size=result.get("image_size", {}),
            original_filename=file.filename or os.path.basename(file_path),
            processed_image_path=result["processed_image"],
            heatmap_path=result.get("heatmap_path"),
            report_path=report_path,
            patient_name=_resolve_patient_name(authorization),
            image_quality_ok=validation.get("is_valid", True),
        )

        response: Dict[str, Any] = {
            "processed_image_url": result["processed_image"],
            "detections_url": result["detections_file"],
            "report_url": report_path,
            "detections": result["detections"],  # List of dictionaries
        }
        if debug:
            response["debug"] = dict(result["debug"], validation=validation)
        return response

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/download/{file_path:path}")
async def download_xray_image(file_path: str):
    # SECURITY: restrict downloads to the generated-output directories and block
    # path traversal ("..", absolute paths). Without this, a request such as
    # /xray/download/../.env could read the SECRET_KEY, DATABASE_URL, or source
    # code. We resolve the real path and require it to live under an allowed root.
    cwd = os.getcwd()
    allowed_roots = [
        os.path.realpath(os.path.join(cwd, "processed")),
        os.path.realpath(os.path.join(cwd, "app", "static")),
    ]
    requested = os.path.realpath(os.path.join(cwd, file_path))
    if not any(requested == root or requested.startswith(root + os.sep) for root in allowed_roots):
        raise HTTPException(status_code=403, detail="Invalid file path")

    if not os.path.isfile(requested):
        raise HTTPException(status_code=404, detail="File not found")

    return FileResponse(requested)
