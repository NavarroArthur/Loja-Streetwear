#!/bin/bash

echo "===================================="
echo "   Iniciando Fashion Store..."
echo "===================================="
echo ""

# Verifica se Python está instalado
if command -v python3 &> /dev/null; then
    echo "Python encontrado!"
    echo ""
    echo "Iniciando servidor na porta 8000..."
    echo "Acesse: http://localhost:8000"
    echo ""
    echo "Pressione Ctrl+C para parar o servidor"
    echo ""
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    echo "Python encontrado!"
    echo ""
    echo "Iniciando servidor na porta 8000..."
    echo "Acesse: http://localhost:8000"
    echo ""
    echo "Pressione Ctrl+C para parar o servidor"
    echo ""
    python -m http.server 8000
else
    echo "Python não encontrado!"
    echo ""
    echo "Abrindo arquivo diretamente..."
    
    # Detecta o sistema operacional
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        open index.html
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        xdg-open index.html
    else
        echo "Sistema não suportado. Abra index.html manualmente."
    fi
fi


