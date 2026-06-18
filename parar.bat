@echo off
chcp 65001 > nul
title Supermercado Neemias - Parando
cls

set ROOT=%~dp0

echo.
echo  Supermercado Neemias - Encerrando Sistema
echo  ==========================================
echo.

:: Frontend porta 5175
echo  1/3  Parando Frontend porta 5175...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr "LISTENING" ^| findstr ":5175 " 2^>nul') do taskkill /F /PID %%a > nul 2>&1
echo       OK

:: Backend porta 5002
echo  2/3  Parando Backend porta 5002...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr "LISTENING" ^| findstr ":5002 " 2^>nul') do taskkill /F /PID %%a > nul 2>&1
echo       OK

:: Banco
echo  3/3  Parando Banco de Dados...

docker info > nul 2>&1
if %errorlevel% neq 0 (
    echo       SKIP: Docker nao disponivel.
    goto fim
)

:: Para e REMOVE o container + rede do projeto com "docker compose down".
:: O "docker stop" apenas para (o container fica listado como "Exited", o que
:: passa a impressao de que "nao parou"). O "down" tira ele da lista de vez.
:: Os dados ficam salvos no volume nomeado (braga_banco_data), nada e perdido.

:: Ja nao existe nenhum container do projeto (nem parado)?
docker ps -aq -f "name=braga_banco" 2>nul | findstr . > nul
if %errorlevel% neq 0 (
    echo       OK: Banco ja estava parado.
    goto verifica
)

echo       Executando docker compose down...
docker compose -f "%ROOT%docker-compose.yml" down > nul 2>&1
if %errorlevel% neq 0 docker-compose -f "%ROOT%docker-compose.yml" down > nul 2>&1

:: Pausa de ~2s a prova de redirecionamento (ping em vez de timeout,
:: que falha quando a entrada padrao esta redirecionada).
ping -n 3 127.0.0.1 > nul

:: Confirma: nao pode sobrar container do projeto, nem parado.
docker ps -aq -f "name=braga_banco" 2>nul | findstr . > nul
if %errorlevel% neq 0 (
    echo       OK: Banco encerrado e removido ^(dados preservados no volume^).
    goto verifica
)

echo       ERRO: O container ainda existe. Rode manualmente:
echo         docker compose -f "%ROOT%docker-compose.yml" down
goto fim

:verifica
:: Sobrou algum PostgreSQL FORA do projeto ocupando a porta 5432?
netstat -ano | findstr "LISTENING" | findstr ":5432 " > nul 2>&1
if %errorlevel% equ 0 (
    echo.
    echo       AVISO: A porta 5432 continua ocupada por OUTRO PostgreSQL
    echo       que nao pertence ao projeto - provavelmente os servicos
    echo       do Windows postgresql-x64-16 ou postgresql-x64-18.
    echo       Para parar, abra um terminal como ADMINISTRADOR e rode:
    echo         net stop postgresql-x64-18
    echo         net stop postgresql-x64-16
)

:fim
echo.
echo  Sistema encerrado.
echo.
ping -n 4 127.0.0.1 > nul
