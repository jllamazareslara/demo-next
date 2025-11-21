# Script para iniciar la demo de Next.js
Write-Host "Iniciando servidor de desarrollo..." -ForegroundColor Green

# Cambiar al directorio del proyecto
Set-Location $PSScriptRoot

# Iniciar el servidor en segundo plano
$job = Start-Job -ScriptBlock {
    Set-Location $using:PSScriptRoot
    & "C:\Program Files\nodejs\npm.cmd" run dev
}

# Esperar a que el servidor inicie
Write-Host "Esperando a que el servidor inicie..." -ForegroundColor Yellow
Start-Sleep -Seconds 12

# Verificar si el puerto está en uso
$portCheck = netstat -ano | findstr :3000
if ($portCheck) {
    Write-Host "Servidor iniciado correctamente en http://localhost:3000/demo" -ForegroundColor Green
    Start-Process "http://localhost:3000/demo"
    Write-Host "Presiona Ctrl+C para detener el servidor" -ForegroundColor Yellow
    # Mantener el script corriendo
    Wait-Job $job | Out-Null
} else {
    Write-Host "Error: El servidor no se inició correctamente" -ForegroundColor Red
    Receive-Job $job
    Stop-Job $job
    Remove-Job $job
}

