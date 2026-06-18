@echo off
chcp 65001 > nul
title Supermercado Neemias
cls

set ROOT=%~dp0

echo.
echo  Supermercado Neemias - Iniciando Sistema
echo  ========================================
echo.

:: Banco
echo  1/3  Banco de Dados...

docker info > nul 2>&1
if %errorlevel% neq 0 (
    echo       AVISO: Docker nao encontrado. Login e pedidos NAO funcionarao
    echo       sem o banco. Abra o Docker Desktop e rode de novo.
    goto backend
)

:: Ja esta rodando?
docker ps -q -f "name=braga_banco" -f "status=running" 2>nul | findstr . > nul
if %errorlevel% equ 0 (
    echo       OK: PostgreSQL ja esta rodando porta 5432
    goto backend
)

:: Porta 5432 ocupada por outro processo (ex: PostgreSQL nativo do Windows)?
netstat -ano | findstr "LISTENING" | findstr ":5432 " > nul 2>&1
if %errorlevel% equ 0 (
    echo       AVISO: Porta 5432 ocupada por OUTRO PostgreSQL fora do projeto
    echo       ^(servico postgresql-x64-16/18?^). Pare-o e rode de novo,
    echo       senao login e pedidos NAO funcionarao.
    goto backend
)

:: Religa container existente
docker start braga_banco > nul 2>&1
if %errorlevel% equ 0 (
    timeout /t 3 /nobreak > nul
    docker ps -q -f "name=braga_banco" -f "status=running" 2>nul | findstr . > nul
    if not errorlevel 1 (
        echo       OK: PostgreSQL iniciado porta 5432
        goto backend
    )
    echo       AVISO: Container subiu mas caiu. Veja: docker logs braga_banco
    goto backend
)

:: Cria container novo (docker compose v2, depois v1)
docker compose -f "%ROOT%docker-compose.yml" up -d postgres > nul 2>&1
if %errorlevel% equ 0 (
    echo       OK: PostgreSQL criado e iniciado porta 5432
    timeout /t 3 /nobreak > nul
    goto backend
)

docker-compose -f "%ROOT%docker-compose.yml" up -d postgres > nul 2>&1
if %errorlevel% equ 0 (
    echo       OK: PostgreSQL criado e iniciado porta 5432
    timeout /t 3 /nobreak > nul
    goto backend
)

echo       AVISO: Nao foi possivel iniciar o banco.
echo       Login e pedidos NAO funcionarao. Veja: docker logs braga_banco

:backend
:: Backend
echo  2/3  Backend...
start "BRAGA-BACKEND" cmd /k "cd /d %ROOT%backend && npm run dev"
timeout /t 5 /nobreak > nul
echo       OK: Backend iniciado porta 5002

:: Frontend
echo  3/3  Frontend...
start "BRAGA-FRONTEND" cmd /k "cd /d %ROOT%supermarket-app && npm run dev"
timeout /t 5 /nobreak > nul
echo       OK: Frontend iniciado porta 5175

cls
echo.
echo  Supermercado Neemias - Sistema Online
echo  =====================================
echo.
echo  Site:  http://localhost:5175
echo  API:   http://localhost:5002/api/health
echo.
echo  Pressione qualquer tecla para abrir o site...
pause > nul
start http://localhost:5175
exit
