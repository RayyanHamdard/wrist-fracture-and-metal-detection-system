@echo off
title UOW Backend (FastAPI :8000)
cd /d "%~dp0uow-backend"
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
pause
