@echo off
chcp 65001 >nul
echo ========================================
echo   Iniciando Demo de Walled (FIXED)
echo ========================================
echo.

cd /d "%~dp0"

echo Verificando que todo esté listo...
if not exist "node_modules" (
    echo Instalando dependencias...
    call npm install
)

echo.
echo Iniciando servidor en 0.0.0.0:3000 (accesible desde cualquier red)...
echo.

start "Servidor Next.js - NO CERRAR" cmd /k "npm run dev"

echo Esperando 25 segundos a que el servidor inicie completamente...
timeout /t 25 /nobreak >nul

echo.
echo Verificando servidor...
netstat -ano | findstr :3000 >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ Servidor detectado en puerto 3000
    echo.
    echo Abriendo navegador...
    start "" "http://localhost:3000"
    start "" "http://127.0.0.1:3000"
    echo.
    echo ========================================
    echo   Servidor corriendo en:
    echo   - http://localhost:3000
    echo   - http://127.0.0.1:3000
    echo ========================================
    echo.
    echo Si aún no carga, espera 10 segundos más y recarga (F5)
) else (
    echo ⚠ El servidor no se detectó aún
    echo Revisa la ventana "Servidor Next.js" para ver errores
    echo.
    start "" "http://localhost:3000"
)

echo.
echo Presiona cualquier tecla para cerrar esta ventana
echo (El servidor seguirá corriendo)
pause >nul

