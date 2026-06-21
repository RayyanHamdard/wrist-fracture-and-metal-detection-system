@echo off
rem ============================================================
rem  Optional: creates a proper Desktop shortcut (with an icon)
rem  for the Wrist Fracture & Metal Detection System.
rem  Just double-click this file ONCE.
rem ============================================================
set "PROJ=%~dp0"
set "DESK=%USERPROFILE%\Desktop"
set "VBS=%TEMP%\mk_uow_shortcut.vbs"

> "%VBS%" echo Set oWS = WScript.CreateObject("WScript.Shell")
>>"%VBS%" echo Set oLink = oWS.CreateShortcut("%DESK%\Wrist X-Ray Project.lnk")
>>"%VBS%" echo oLink.TargetPath = "%PROJ%Run-Wrist-XRay-Project.bat"
>>"%VBS%" echo oLink.WorkingDirectory = "%PROJ:~0,-1%"
>>"%VBS%" echo oLink.IconLocation = "%SystemRoot%\System32\imageres.dll, 2"
>>"%VBS%" echo oLink.Description = "Launch the Wrist Fracture and Metal Detection System"
>>"%VBS%" echo oLink.Save

cscript //nologo "%VBS%"
del "%VBS%" >nul 2>&1

rem Remove the plain .bat launcher so there is only one clean icon
if exist "%DESK%\Wrist X-Ray Project.bat" del "%DESK%\Wrist X-Ray Project.bat" >nul 2>&1

echo.
echo Done. A "Wrist X-Ray Project" shortcut is now on your Desktop.
echo (To change its picture: right-click it - Properties - Change Icon.)
echo.
pause
