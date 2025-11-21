@echo off
cd /d "%~dp0"
echo Iniciando servidor...
start "Servidor" cmd /k npm run dev
timeout /t 20
start http://localhost:3000
echo Servidor iniciado. Revisa la ventana "Servidor" si hay errores.
pause

