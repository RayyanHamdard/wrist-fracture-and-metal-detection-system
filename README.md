# Wrist Fracture and Metal Detection System

An AI-powered web application that detects **fractures** and **metal implants** in
wrist X-ray images, returns confidence-scored results and a readable screening
report, and provides role-based dashboards for clients, hospitals, and admins.

> ⚕️ **Medical disclaimer:** This system is a preliminary **screening aid**, not a
> diagnostic device. All results must be confirmed by a qualified radiologist.

## Model performance

Evaluated on a held-out test set (YOLOv7-p6, GRAZPEDWRI-DX wrist dataset):

| Metric | Value |
| --- | --- |
| mAP@0.5 (all classes) | **0.884** |
| Fracture AP@0.5 | **0.914** |
| Metal AP@0.5 | **0.855** |
| Best F1 | **0.85** |

Full PR / F1 / confusion-matrix charts are shown on the app's **Evidence** page.

## Tech stack

- **Frontend:** React + TypeScript + Vite, Tailwind CSS, MUI, Framer Motion
- **Backend:** FastAPI (Python), ONNX Runtime + OpenCV inference, SQLAlchemy
- **Database:** PostgreSQL
- **Model:** YOLOv7-p6 exported to ONNX

## Repository structure

```
uow-backend/    FastAPI backend, ONNX inference, auth, dashboards
uow-frontend/   React (Vite) frontend
```

## Model weights (not in the repo)

The trained `.onnx` model is **not committed** (it exceeds GitHub's 100 MB limit).
Download it and place it at `uow-backend/app/services/models/best.onnx` before running:

**Download the model:** https://drive.google.com/file/d/1isN3AVLINeNHz_ybYwDtTyjPTvUETiju/view?usp=sharing

It is a YOLOv7-p6 detector trained for two classes — `fracture` and `metal`.
Set the active model in `uow-backend/app/core/config.py` (`MODEL_FILE` + `MODEL_CLASSES`).
On a container host you can instead set `MODEL_URL` to a **direct-download** link
and `start.sh` fetches it on boot.

## Local development

### Backend
```bash
cd uow-backend
python -m venv uow-env && source uow-env/bin/activate   # Windows: uow-env\Scripts\activate
pip install -r requirements.txt
cp env.example.txt .env        # then edit values (DB, SECRET_KEY, ALLOWED_ORIGINS)
uvicorn app.main:app --reload  # http://localhost:8000
```

### Frontend
```bash
cd uow-frontend
npm install
cp .env.example .env           # set VITE_API_URL=http://localhost:8000
npm run dev                    # http://localhost:5173
```

## Environment variables

**Backend (`uow-backend/.env`):**

| Var | Purpose |
| --- | --- |
| `DATABASE_URL` | PostgreSQL connection string |
| `SECRET_KEY` | JWT signing secret (use a long random value) |
| `ALLOWED_ORIGINS` | Comma-separated allowed frontend origins (CORS) |

**Frontend (`uow-frontend/.env`):**

| Var | Purpose |
| --- | --- |
| `VITE_API_URL` | Base URL of the backend API |

## Acknowledgements

The detection model in this project was trained by the project author. It is
built on the **YOLOv7** object-detection architecture
([WongKinYiu/yolov7](https://github.com/WongKinYiu/yolov7), GPL-3.0) and trained
on the public **GRAZPEDWRI-DX** wrist-radiograph dataset
([Nagy et al., 2022](https://www.nature.com/articles/s41597-022-01328-z)).
