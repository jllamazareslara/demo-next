@echo off
chcp 65001 >nul
echo ========================================
echo   PREPARAR PROYECTO PARA VERCEL
echo ========================================
echo.

cd /d "%~dp0"

echo [1/3] Creando archivo .gitignore si no existe...
if not exist ".gitignore" (
    (
        echo node_modules
        echo .next
        echo .env
        echo .env.local
        echo dev.db
        echo dev.db-journal
        echo .vercel
        echo dist
    ) > .gitignore
    echo ✓ .gitignore creado
) else (
    echo ✓ .gitignore ya existe
)

echo.
echo [2/3] Creando archivo .env.example...
(
    echo DATABASE_URL=file:./dev.db
    echo NEXTAUTH_URL=https://tu-proyecto.vercel.app
    echo NEXTAUTH_SECRET=genera-uno-con-openssl-rand-base64-32
    echo GOOGLE_CLIENT_ID=
    echo GOOGLE_CLIENT_SECRET=
) > .env.example
echo ✓ .env.example creado

echo.
echo [3/3] Verificando estructura...
if exist "package.json" (
    echo ✓ package.json OK
) else (
    echo ✗ ERROR: package.json no encontrado
    pause
    exit /b 1
)

if exist "next.config.ts" (
    echo ✓ next.config.ts OK
) else (
    echo ✗ ERROR: next.config.ts no encontrado
    pause
    exit /b 1
)

echo.
echo ========================================
echo   ✓ PROYECTO LISTO PARA VERCEL
echo ========================================
echo.
echo Próximos pasos:
echo 1. Sube este proyecto a GitHub
echo 2. Ve a https://vercel.com
echo 3. Importa tu repositorio
echo 4. Configura las variables de entorno
echo 5. ¡Deploy!
echo.
echo Lee DEPLOY-VERCEL.md para instrucciones detalladas
echo.
pause

