@echo off
chcp 65001 >nul
echo ========================================
echo   SUBIR PROYECTO A GITHUB
echo ========================================
echo.

cd /d "%~dp0"

echo [1/4] Verificando Git...
where git >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo ✗ ERROR: Git no está instalado
    echo.
    echo Instala Git desde: https://git-scm.com/download/win
    echo O usa la opción manual (ver instrucciones abajo)
    echo.
    pause
    exit /b 1
)

git --version
echo ✓ Git encontrado
echo.

echo [2/4] Verificando si ya es un repositorio Git...
if exist ".git" (
    echo ✓ Ya es un repositorio Git
    echo.
    echo ¿Quieres subir los cambios? (S/N)
    set /p respuesta=
    if /i "%respuesta%"=="S" (
        goto :push
    ) else (
        echo Cancelado.
        pause
        exit /b 0
    )
) else (
    echo Inicializando repositorio Git...
    git init
    echo ✓ Repositorio inicializado
)

echo.
echo [3/4] Añadiendo archivos...
git add .
echo ✓ Archivos añadidos

echo.
echo [4/4] Creando commit...
git commit -m "Demo de Walled - Dashboard financiero automático"
echo ✓ Commit creado

:push
echo.
echo ========================================
echo   CONFIGURAR REPOSITORIO REMOTO
echo ========================================
echo.
echo Ahora necesitas:
echo.
echo 1. Ve a https://github.com/new
echo 2. Crea un repositorio nuevo (ej: "walled-demo")
echo 3. NO marques "Initialize with README"
echo 4. Copia la URL del repositorio (ej: https://github.com/TU_USUARIO/walled-demo.git)
echo.
echo Pega la URL aquí y presiona Enter:
set /p repo_url=

if "%repo_url%"=="" (
    echo.
    echo ⚠ No se proporcionó URL. Puedes hacerlo manualmente después con:
    echo    git remote add origin TU_URL
    echo    git push -u origin main
    pause
    exit /b 0
)

echo.
echo Añadiendo repositorio remoto...
git remote add origin %repo_url% 2>nul
if %errorlevel% neq 0 (
    git remote set-url origin %repo_url%
    echo ✓ Repositorio remoto actualizado
) else (
    echo ✓ Repositorio remoto añadido
)

echo.
echo Creando rama main...
git branch -M main

echo.
echo ========================================
echo   SUBIENDO A GITHUB
echo ========================================
echo.
echo Esto puede pedirte credenciales de GitHub...
echo.
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo   ✓ ¡PROYECTO SUBIDO A GITHUB!
    echo ========================================
    echo.
    echo Tu repositorio está en:
    echo %repo_url%
    echo.
    echo Próximo paso: Despliega en Vercel
    echo Ve a: https://vercel.com/new
    echo.
) else (
    echo.
    echo ⚠ Hubo un problema al subir
    echo.
    echo Posibles causas:
    echo - Necesitas autenticarte en GitHub
    echo - El repositorio ya existe y tiene contenido
    echo.
    echo Solución manual:
    echo 1. Ve a https://github.com/new
    echo 2. Crea el repositorio
    echo 3. Sigue las instrucciones que GitHub te da
    echo.
)

pause

