#!/bin/bash

# Script para inserir dados de teste de pontos
# Primeiro vamos buscar os colaboradores existentes
echo "Buscando colaboradores existentes..."

# Buscar colaboradores e pegar o primeiro
PRIMEIRO_COLABORADOR=$(curl -s "http://localhost:8080/colaboradores" | jq -r '.[0].id')
PRIMEIRO_NOME=$(curl -s "http://localhost:8080/colaboradores" | jq -r '.[0].nome')

if [ "$PRIMEIRO_COLABORADOR" = "null" ] || [ -z "$PRIMEIRO_COLABORADOR" ]; then
    echo "Erro: Não foi possível buscar colaboradores. Verifique se o backend está rodando."
    exit 1
fi

echo "Usando colaborador: $PRIMEIRO_NOME (ID: $PRIMEIRO_COLABORADOR)"

# Data atual
DATA_ATUAL=$(date +%Y-%m-%d)
DATA_ONTEM=$(date -v-1d +%Y-%m-%d 2>/dev/null || date -d "yesterday" +%Y-%m-%d)
DATA_ANTEONTEM=$(date -v-2d +%Y-%m-%d 2>/dev/null || date -d "2 days ago" +%Y-%m-%d)

echo "Inserindo pontos de teste..."

# Função para inserir ponto
inserir_ponto() {
    local colaborador_id=$1
    local dia=$2
    local entrada=$3
    local saida=$4
    local entrada_intervalo=$5
    local saida_intervalo=$6
    local validado=$7

    echo "Inserindo ponto para dia $dia..."
    
    curl -X POST "http://localhost:8080/colaboradores/$colaborador_id/ponto" \
        -H "Content-Type: application/json" \
        -d "{
            \"colaboradorId\": $colaborador_id,
            \"dia\": \"$dia\",
            \"entrada\": \"$entrada\",
            \"saida\": \"$saida\",
            \"entradaIntervalo\": \"$entrada_intervalo\",
            \"saidaIntervalo\": \"$saida_intervalo\",
            \"validado\": $validado
        }"
    
    echo ""
}

# Inserir pontos de teste
echo "=== Inserindo pontos de teste ==="

# Ponto de hoje
inserir_ponto $PRIMEIRO_COLABORADOR $DATA_ATUAL "08:00:00" "18:00:00" "12:00:00" "13:00:00" true

# Ponto de ontem
inserir_ponto $PRIMEIRO_COLABORADOR $DATA_ONTEM "08:30:00" "17:30:00" "12:00:00" "13:00:00" false

# Ponto de anteontem
inserir_ponto $PRIMEIRO_COLABORADOR $DATA_ANTEONTEM "09:00:00" "18:30:00" "12:30:00" "13:30:00" true

# Ponto sem intervalo
inserir_ponto $PRIMEIRO_COLABORADOR "2024-01-15" "08:00:00" "17:00:00" "" "" true

# Ponto pendente
inserir_ponto $PRIMEIRO_COLABORADOR "2024-01-16" "08:15:00" "17:15:00" "12:00:00" "13:00:00" false

echo "=== Pontos inseridos com sucesso! ==="
echo ""
echo "Para testar o fluxo:"
echo "1. Acesse: Home → Colaboradores → Listagem de Pontos"
echo "2. Clique no colaborador: $PRIMEIRO_NOME"
echo "3. Veja os pontos registrados"
echo ""
echo "Dados inseridos:"
echo "- $DATA_ATUAL: 08:00-18:00 (Validado)"
echo "- $DATA_ONTEM: 08:30-17:30 (Pendente)"
echo "- $DATA_ANTEONTEM: 09:00-18:30 (Validado)"
echo "- 2024-01-15: 08:00-17:00 (Validado, sem intervalo)"
echo "- 2024-01-16: 08:15-17:15 (Pendente)" 