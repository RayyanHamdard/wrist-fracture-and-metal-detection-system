@echo off
rem One-click launcher: backend + frontend + Chrome
start "UOW Backend (FastAPI :8000)" cmd /k "cd /d "%~dp0uow-backend" && python -m uvicorn app.main:app --host 127.0.0.1 --port 8000"
start "UOW Frontend (Vite :5173)" cmd /k "cd /d "%~dp0uow-frontend" && npm start"
rem Give the servers a few seconds to boot, then open Chrome
timeout /t 8 /nobreak >nul
start "" chrome "http://localhost:5173"
exit
