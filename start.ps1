# ============================================================
# start.ps1 - Sobe o sistema completo em segundo plano
#   Banco (Docker/Postgres 5432) + Backend (5002) + Frontend (5175)
#
#   Os TRES sao disparados de forma NAO-BLOQUEANTE (inclusive o
#   Docker, que vai para um processo oculto). Nenhum passo espera
#   o outro: a unica espera acontece no final, em paralelo.
#   Assim nao ha delay entre banco, backend e frontend.
#
#   Logs: .\logs\*.log   |   Idempotente: nao duplica portas em uso.
#   Uso:  .\start.ps1
# ============================================================

$ErrorActionPreference = 'Continue'

$Root = $PSScriptRoot
if (-not $Root) { $Root = (Get-Location).Path }

$LogDir     = Join-Path $Root 'logs'
$Compose    = Join-Path $Root 'docker-compose.yml'
$FrontPort  = 5175
$BackPort   = 5002
$DbPort     = 5432
$SiteUrl    = "http://localhost:$FrontPort"
$HealthUrl  = "http://localhost:$BackPort/api/health"
$DockerPipe = '\\.\pipe\dockerDesktopLinuxEngine'

function Test-PortListening([int]$Port) {
    return [bool](Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue)
}

# Dispara um comando num processo OCULTO e retorna na hora (nao espera terminar)
function Start-Hidden([string]$Name, [string]$Command, [string]$WorkDir) {
    Start-Process -FilePath 'cmd.exe' -ArgumentList '/c', $Command `
        -WorkingDirectory $WorkDir -WindowStyle Hidden `
        -RedirectStandardOutput (Join-Path $LogDir "$Name.log") `
        -RedirectStandardError  (Join-Path $LogDir "$Name.err.log") | Out-Null
}

function Test-Http([string]$Url) {
    try {
        return ((Invoke-WebRequest -Uri $Url -UseBasicParsing -TimeoutSec 3).StatusCode -eq 200)
    } catch { return $false }
}

New-Item -ItemType Directory -Force -Path $LogDir | Out-Null

Write-Host ''
Write-Host ' Supermercado - Iniciando sistema (paralelo)'
Write-Host ' ==========================================='

# ---------- Dispara os 3 servicos, um atras do outro, SEM esperar ----------
$dockerUp   = Test-Path $DockerPipe
$waitDb     = $false

# 1) Banco (Docker) - vai para processo oculto; nao bloqueia
if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
    Write-Warning ' [banco]    Docker nao instalado - login/pedidos nao funcionam.'
} elseif (-not $dockerUp) {
    Write-Warning ' [banco]    Docker parece fechado - abra o Docker Desktop. Sigo sem o banco.'
} elseif (Test-PortListening $DbPort) {
    Write-Host    ' [banco]    OK: porta 5432 ja em uso (banco provavelmente de pe).'
    $waitDb = $true
} else {
    Start-Hidden 'db' "docker compose -f `"$Compose`" up -d postgres" $Root
    Write-Host   ' [banco]    disparado (Docker, em segundo plano).'
    $waitDb = $true
}

# 2) Backend
if (Test-PortListening $BackPort) {
    Write-Host " [backend]  OK: porta $BackPort ja em uso (nao duplicado)."
} else {
    Start-Hidden 'backend' 'npm run dev' (Join-Path $Root 'backend')
    Write-Host   ' [backend]  disparado.'
}

# 3) Frontend
if (Test-PortListening $FrontPort) {
    Write-Host " [frontend] OK: porta $FrontPort ja em uso (nao duplicado)."
} else {
    Start-Hidden 'frontend' 'npm run dev' (Join-Path $Root 'supermarket-app')
    Write-Host   ' [frontend] disparado.'
}

# ---------- Espera UNICA, em paralelo, por todos ----------
Write-Host ''
Write-Host ' Aguardando os servicos responderem (compilacao inicial pode levar ~30s)...'

$backOk = $false; $frontOk = $false; $dbOk = -not $waitDb
$deadline = (Get-Date).AddSeconds(120)

while ((Get-Date) -lt $deadline) {
    if (-not $backOk  -and (Test-Http $HealthUrl)) { $backOk  = $true; Write-Host '   [OK] API respondendo (200).' }
    if (-not $frontOk -and (Test-Http $SiteUrl))   { $frontOk = $true; Write-Host '   [OK] Site respondendo (200).' }
    if (-not $dbOk -and (Test-Path $DockerPipe)) {
        if ((docker ps --filter name=braga_banco --format '{{.Status}}' 2>$null) -match 'healthy') {
            $dbOk = $true; Write-Host '   [OK] Banco healthy.'
        }
    }
    if ($backOk -and $frontOk -and $dbOk) { break }
    Start-Sleep -Seconds 1
}

if (-not $backOk)             { Write-Warning 'API nao respondeu a tempo. Veja logs\backend.err.log' }
if (-not $frontOk)            { Write-Warning 'Site nao respondeu a tempo. Veja logs\frontend.err.log' }
if ($waitDb -and -not $dbOk)  { Write-Warning 'Banco nao ficou healthy a tempo. Veja: docker logs braga_banco' }

Write-Host ''
if ($frontOk) {
    Write-Host " Sistema online: $SiteUrl"
    Write-Host " API:            $HealthUrl"
    Write-Host " Logs:           $LogDir"
    Start-Process $SiteUrl
} else {
    Write-Warning 'O site nao subiu. Confira os logs em .\logs e rode de novo.'
}
Write-Host ''
