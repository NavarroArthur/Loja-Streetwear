@echo off
echo ====================================
echo   Iniciando Servidor Local...
echo ====================================
echo.
echo Verificando Python...

python --version >nul 2>&1
if %errorlevel% == 0 (
    echo Python encontrado!
    echo.
    echo Iniciando servidor na porta 8000...
    echo Acesse: http://localhost:8000
    echo.
    echo Pressione Ctrl+C para parar o servidor
    echo.
    python -m http.server 8000
) else (
    echo Python nao encontrado!
    echo.
    echo Tentando abrir arquivo diretamente...
    start index.html
    echo.
    echo Dica: Instale Python para usar servidor local
    echo Ou use o arquivo run.bat para abrir diretamente
    pause
)


