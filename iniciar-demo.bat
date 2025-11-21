@echo off
chcp 65001 >nul
echo ========================================
echo   Iniciando Demo de Walled
echo ========================================
echo.

cd /d "%~dp0"

echo [1/4] Verificando Node.js...
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js no está instalado o no está en el PATH
    pause
    exit /b 1
)
echo ✓ Node.js encontrado

echo.
echo [2/4] Verificando dependencias...
if not exist "node_modules" (
    echo Instalando dependencias por primera vez (esto puede tardar)...
    call "C:\Program Files\nodejs\npm.cmd" install
    if %errorlevel% neq 0 (
        echo ERROR: No se pudieron instalar las dependencias
        pause
        exit /b 1
    )
)
echo ✓ Dependencias OK

echo.
echo [3/4] Generando cliente de Prisma...
call "C:\Program Files\nodejs\node.exe" node_modules\prisma\build\index.js generate >nul 2>&1
if %errorlevel% neq 0 (
    echo ADVERTENCIA: Error al generar Prisma, pero continuando...
) else (
    echo ✓ Prisma generado
)

echo.
echo [4/4] Iniciando servidor...
echo.
echo ========================================
echo   El servidor se está iniciando...
echo   Espera 20 segundos y luego se abrirá Chrome
echo ========================================
echo.
echo Si ves errores en rojo, presiona Ctrl+C y avísame
echo.

start "Servidor Next.js - NO CERRAR" cmd /k "C:\Program Files\nodejs\npm.cmd" run dev

echo Esperando 20 segundos a que el servidor esté listo...
timeout /t 20 /nobreak >nul

echo.
echo Verificando si el servidor está corriendo...
netstat -ano | findstr :3000 >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ Servidor detectado en el puerto 3000
    echo.
    echo Abriendo Chrome...
    start "" "http://localhost:3000"
    start "" "http://localhost:3000/demo"
    echo.
    echo ========================================
    echo   ✓ Demo abierta en Chrome
    echo ========================================
    echo.
    echo IMPORTANTE: NO cierres la ventana "Servidor Next.js"
    echo Para detener el servidor, cierra esa ventana
) else (
    echo.
    echo ⚠ ADVERTENCIA: El servidor no se detectó en el puerto 3000
    echo.
    echo Posibles causas:
    echo - El servidor aún está iniciando (espera 30 segundos más)
    echo - Hay un error en el código
    echo.
    echo Revisa la ventana "Servidor Next.js" para ver los errores
    echo.
    echo Abriendo Chrome de todas formas...
    start "" "http://localhost:3000"
    start "" "http://localhost:3000/demo"
)

echo.
echo Presiona cualquier tecla para cerrar esta ventana
echo (El servidor seguirá corriendo en la otra ventana)
pause >nul
