@echo off
title Wrist X-Ray Project Launcher
rem ============================================================
rem  One-click launcher: starts Backend + Frontend, opens browser.
rem  First run auto-installs missing dependencies.
rem ============================================================
cd /d "%~dp0"

echo ================================================
echo   Wrist X-Ray Fracture Detection System
echo   Starting backend + frontend...
echo ================================================
echo.

rem ---- First-run: install frontend packages if missing ----
if not exist "uow-frontend\node_modules" (
    echo [Setup] Installing frontend packages, please wait...
    pushd "uow-frontend"
    call npm install
    popd
)

rem ---- First-run: ensure backend Python packages are present ----
python -c "import uvicorn" 1>nul 2>nul
if errorlevel 1 (
    echo [Setup] Installing backend packages, please wait...
    pushd "uow-backend"
    python -m pip install -r requirements.txt
    popd
)

rem ---- Start backend (FastAPI on :8000) in its own window ----
start "UOW Backend (FastAPI :8000)" cmd /k "cd /d "%~dp0uow-backend" && python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload"

rem ---- Start frontend (Vite on :5173) in its own window ----
start "UOW Frontend (Vite :5173)" cmd /k "cd /d "%~dp0uow-frontend" && npm start"

rem ---- Wait for servers to boot, then open the app ----
echo.
echo Waiting for servers to start...
timeout /t 10 /nobreak >nul
start "" "http://localhost:5173"

echo.
echo Done. Two server windows opened. Close them to stop the app.
exit
