@echo off
chcp 65001 >nul
echo ========================================
echo   DEMO DE WALLED - VERSIÓN FINAL
echo ========================================
echo.

cd /d "%~dp0"

echo Iniciando servidor...
echo.

start "Servidor Next.js" cmd /k "npm run dev"

echo Esperando 20 segundos...
timeout /t 20 /nobreak >nul

echo.
echo Abriendo navegador en:
echo - http://localhost:3000 (página de inicio)
echo - http://localhost:3000/demo/login (login directo)
echo.

start "" "http://localhost:3000"
timeout /t 2
start "" "http://localhost:3000/demo/login"

echo.
echo ========================================
echo   Si la página está en blanco:
echo   1. Espera 30 segundos más
echo   2. Recarga la página (F5)
echo   3. Revisa la ventana "Servidor" por errores
echo ========================================
echo.
pause

