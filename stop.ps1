# ============================================================
# stop.ps1 - Derruba o sistema completo com um comando
#   Mata os processos das portas 5175 (site) e 5002 (API)
#   e para/remove o container do banco (dados ficam no volume).
#   Uso: .\stop.ps1
# ============================================================

$ErrorActionPreference = 'Continue'

$Root = $PSScriptRoot
if (-not $Root) { $Root = (Get-Location).Path }

$Ports = @(5175, 5002)

Write-Host ''
Write-Host ' Supermercado - Encerrando sistema'
Write-Host ' ================================='

function Get-TopAncestorPid([int]$ProcId) {
    # Sobe a arvore de processos enquanto o pai for node/cmd
    # (wrappers do npm / ts-node-dev / next), para matar o grupo todo.
    $current = $ProcId
    for ($i = 0; $i -lt 5; $i++) {
        $proc = Get-CimInstance Win32_Process -Filter "ProcessId=$current" -ErrorAction SilentlyContinue
        if (-not $proc) { break }
        $parent = Get-CimInstance Win32_Process -Filter "ProcessId=$($proc.ParentProcessId)" -ErrorAction SilentlyContinue
        if ($parent -and ($parent.Name -eq 'node.exe' -or $parent.Name -eq 'cmd.exe')) {
            $current = $parent.ProcessId
        } else {
            break
        }
    }
    return $current
}

# ---------- Frontend e Backend (por porta) ----------
foreach ($port in $Ports) {
    $conns = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue
    if (-not $conns) {
        Write-Host " [porta $port] ja estava livre."
        continue
    }
    $procIds = $conns | Select-Object -ExpandProperty OwningProcess -Unique
    foreach ($procId in $procIds) {
        $top = Get-TopAncestorPid $procId
        taskkill /PID $top /T /F *> $null
    }
    Start-Sleep -Milliseconds 800
    if (Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue) {
        Write-Warning " [porta $port] ainda ocupada. Verifique manualmente (netstat -ano | findstr $port)."
    } else {
        Write-Host " [porta $port] processos encerrados."
    }
}

# ---------- Banco (Docker) ----------
if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
    Write-Host ' [banco] Docker nao instalado - nada a parar.'
} else {
    docker info *> $null
    if ($LASTEXITCODE -ne 0) {
        Write-Host ' [banco] Docker nao esta rodando - nada a parar.'
    } else {
        $exists = docker ps -aq -f name=braga_banco 2>$null
        if ($exists) {
            docker compose -f (Join-Path $Root 'docker-compose.yml') down *> $null
            $still = docker ps -aq -f name=braga_banco 2>$null
            if ($still) {
                Write-Warning ' [banco] container ainda existe. Rode manualmente: docker compose down'
            } else {
                Write-Host ' [banco] container parado e removido (dados preservados no volume).'
            }
        } else {
            Write-Host ' [banco] ja estava parado.'
        }
    }
}

Write-Host ''
Write-Host ' Sistema encerrado.'
Write-Host ''
