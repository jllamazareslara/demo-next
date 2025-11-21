@echo off
chcp 65001 >nul
echo ========================================
echo   DIAGNÓSTICO DE LA DEMO
echo ========================================
echo.

cd /d "%~dp0"

echo [1] Verificando Node.js...
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo ✗ ERROR: Node.js no encontrado
    pause
    exit /b 1
)
node --version
echo ✓ Node.js OK
echo.

echo [2] Verificando npm...
where npm >nul 2>&1
if %errorlevel% neq 0 (
    echo ✗ ERROR: npm no encontrado
    pause
    exit /b 1
)
npm --version
echo ✓ npm OK
echo.

echo [3] Verificando archivo .env...
if not exist ".env" (
    echo ✗ ERROR: Archivo .env no existe
    echo Creando archivo .env...
    (
        echo DATABASE_URL=file:./dev.db
        echo NEXTAUTH_URL=http://localhost:3000
        echo NEXTAUTH_SECRET=temporal-secret-123
        echo GOOGLE_CLIENT_ID=
        echo GOOGLE_CLIENT_SECRET=
    ) > .env
    echo ✓ Archivo .env creado
) else (
    echo ✓ Archivo .env existe
    type .env
)
echo.

echo [4] Verificando node_modules...
if not exist "node_modules" (
    echo ✗ node_modules no existe, instalando...
    call npm install
) else (
    echo ✓ node_modules existe
)
echo.

echo [5] Verificando Prisma...
if exist "node_modules\prisma" (
    echo Generando cliente de Prisma...
    call node node_modules\prisma\build\index.js generate
    echo ✓ Prisma OK
) else (
    echo ✗ Prisma no encontrado
)
echo.

echo [6] Verificando base de datos...
if not exist "dev.db" (
    echo Creando base de datos...
    call node node_modules\prisma\build\index.js migrate deploy
    echo ✓ Base de datos creada
) else (
    echo ✓ Base de datos existe
)
echo.

echo [7] Intentando iniciar servidor...
echo.
echo ========================================
echo   INICIANDO SERVIDOR
echo   Si ves errores abajo, esos son el problema
echo ========================================
echo.

call npm run dev

pause

