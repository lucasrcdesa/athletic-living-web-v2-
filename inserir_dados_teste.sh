#!/bin/bash

# Script para inserir dados de teste no financeiro empresarial via API
# Execute: chmod +x inserir_dados_teste.sh && ./inserir_dados_teste.sh

echo "🚀 Inserindo dados de teste no financeiro empresarial..."

# Função para inserir um financeiro empresarial
insert_financeiro() {
    local id=$1
    local nome=$2
    local descricao=$3
    local valor=$4
    local tipo=$5
    local categoria=$6
    local data=$7
    local status=$8

    echo "📝 Inserindo: $nome - R$ $valor"
    
    curl -X POST http://localhost:8080/financeiro-empresarial \
        -H "Content-Type: application/json" \
        -d "{
            \"nome\": \"$nome\",
            \"descricao\": \"$descricao\",
            \"valor\": $valor,
            \"tipo\": \"$tipo\",
            \"categoria\": \"$categoria\",
            \"data\": \"$data\",
            \"status\": \"$status\"
        }"
    
    echo ""
}

# Receitas - Mensalidades
insert_financeiro 1 "Mensalidades Janeiro" "Receita de mensalidades dos alunos" 25000.00 "RECEITA" "Mensalidades" "2024-01-15" "PAGO"
insert_financeiro 2 "Mensalidades Fevereiro" "Receita de mensalidades dos alunos" 28000.00 "RECEITA" "Mensalidades" "2024-02-15" "PAGO"
insert_financeiro 3 "Mensalidades Março" "Receita de mensalidades dos alunos" 32000.00 "RECEITA" "Mensalidades" "2024-03-15" "PAGO"
insert_financeiro 4 "Mensalidades Abril" "Receita de mensalidades dos alunos" 30000.00 "RECEITA" "Mensalidades" "2024-04-15" "PAGO"
insert_financeiro 5 "Mensalidades Maio" "Receita de mensalidades dos alunos" 35000.00 "RECEITA" "Mensalidades" "2024-05-15" "PAGO"
insert_financeiro 6 "Mensalidades Junho" "Receita de mensalidades dos alunos" 38000.00 "RECEITA" "Mensalidades" "2024-06-15" "PAGO"

# Despesas - Aluguel
insert_financeiro 7 "Aluguel Academia" "Despesa com aluguel da academia" 8000.00 "DESPESA" "Aluguel" "2024-01-05" "PAGO"
insert_financeiro 8 "Aluguel Academia" "Despesa com aluguel da academia" 8000.00 "DESPESA" "Aluguel" "2024-02-05" "PAGO"
insert_financeiro 9 "Aluguel Academia" "Despesa com aluguel da academia" 8000.00 "DESPESA" "Aluguel" "2024-03-05" "PAGO"
insert_financeiro 10 "Aluguel Academia" "Despesa com aluguel da academia" 8000.00 "DESPESA" "Aluguel" "2024-04-05" "PAGO"
insert_financeiro 11 "Aluguel Academia" "Despesa com aluguel da academia" 8000.00 "DESPESA" "Aluguel" "2024-05-05" "PAGO"
insert_financeiro 12 "Aluguel Academia" "Despesa com aluguel da academia" 8000.00 "DESPESA" "Aluguel" "2024-06-05" "PAGO"

# Despesas - Folha de Pagamento
insert_financeiro 13 "Folha de Pagamento Janeiro" "Salários dos colaboradores" 12000.00 "DESPESA" "Folha de Pagamento" "2024-01-25" "PAGO"
insert_financeiro 14 "Folha de Pagamento Fevereiro" "Salários dos colaboradores" 12500.00 "DESPESA" "Folha de Pagamento" "2024-02-25" "PAGO"
insert_financeiro 15 "Folha de Pagamento Março" "Salários dos colaboradores" 13000.00 "DESPESA" "Folha de Pagamento" "2024-03-25" "PAGO"
insert_financeiro 16 "Folha de Pagamento Abril" "Salários dos colaboradores" 13200.00 "DESPESA" "Folha de Pagamento" "2024-04-25" "PAGO"
insert_financeiro 17 "Folha de Pagamento Maio" "Salários dos colaboradores" 13500.00 "DESPESA" "Folha de Pagamento" "2024-05-25" "PAGO"
insert_financeiro 18 "Folha de Pagamento Junho" "Salários dos colaboradores" 13800.00 "DESPESA" "Folha de Pagamento" "2024-06-25" "PAGO"

# Receitas - Suplementos
insert_financeiro 19 "Venda de Suplementos Janeiro" "Receita de venda de suplementos" 5000.00 "RECEITA" "Suplementos" "2024-01-20" "PAGO"
insert_financeiro 20 "Venda de Suplementos Fevereiro" "Receita de venda de suplementos" 5500.00 "RECEITA" "Suplementos" "2024-02-20" "PAGO"
insert_financeiro 21 "Venda de Suplementos Março" "Receita de venda de suplementos" 6000.00 "RECEITA" "Suplementos" "2024-03-20" "PAGO"
insert_financeiro 22 "Venda de Suplementos Abril" "Receita de venda de suplementos" 5800.00 "RECEITA" "Suplementos" "2024-04-20" "PAGO"
insert_financeiro 23 "Venda de Suplementos Maio" "Receita de venda de suplementos" 6500.00 "RECEITA" "Suplementos" "2024-05-20" "PAGO"
insert_financeiro 24 "Venda de Suplementos Junho" "Receita de venda de suplementos" 7000.00 "RECEITA" "Suplementos" "2024-06-20" "PAGO"

# Despesas - Energia
insert_financeiro 25 "Conta de Luz Janeiro" "Despesa com energia elétrica" 1500.00 "DESPESA" "Energia" "2024-01-10" "PAGO"
insert_financeiro 26 "Conta de Luz Fevereiro" "Despesa com energia elétrica" 1600.00 "DESPESA" "Energia" "2024-02-10" "PAGO"
insert_financeiro 27 "Conta de Luz Março" "Despesa com energia elétrica" 1700.00 "DESPESA" "Energia" "2024-03-10" "PAGO"
insert_financeiro 28 "Conta de Luz Abril" "Despesa com energia elétrica" 1650.00 "DESPESA" "Energia" "2024-04-10" "PAGO"
insert_financeiro 29 "Conta de Luz Maio" "Despesa com energia elétrica" 1800.00 "DESPESA" "Energia" "2024-05-10" "PAGO"
insert_financeiro 30 "Conta de Luz Junho" "Despesa com energia elétrica" 1900.00 "DESPESA" "Energia" "2024-06-10" "PAGO"

# Receitas - Avaliações
insert_financeiro 31 "Avaliações Físicas Janeiro" "Receita de avaliações físicas" 3000.00 "RECEITA" "Avaliações" "2024-01-30" "PAGO"
insert_financeiro 32 "Avaliações Físicas Fevereiro" "Receita de avaliações físicas" 3200.00 "RECEITA" "Avaliações" "2024-02-30" "PAGO"
insert_financeiro 33 "Avaliações Físicas Março" "Receita de avaliações físicas" 3500.00 "RECEITA" "Avaliações" "2024-03-30" "PAGO"
insert_financeiro 34 "Avaliações Físicas Abril" "Receita de avaliações físicas" 3300.00 "RECEITA" "Avaliações" "2024-04-30" "PAGO"
insert_financeiro 35 "Avaliações Físicas Maio" "Receita de avaliações físicas" 3800.00 "RECEITA" "Avaliações" "2024-05-30" "PAGO"
insert_financeiro 36 "Avaliações Físicas Junho" "Receita de avaliações físicas" 4000.00 "RECEITA" "Avaliações" "2024-06-30" "PAGO"

# Despesas - Manutenção
insert_financeiro 37 "Manutenção Equipamentos Janeiro" "Despesa com manutenção" 2000.00 "DESPESA" "Manutenção" "2024-01-15" "PAGO"
insert_financeiro 38 "Manutenção Equipamentos Fevereiro" "Despesa com manutenção" 1800.00 "DESPESA" "Manutenção" "2024-02-15" "PAGO"
insert_financeiro 39 "Manutenção Equipamentos Março" "Despesa com manutenção" 2200.00 "DESPESA" "Manutenção" "2024-03-15" "PAGO"
insert_financeiro 40 "Manutenção Equipamentos Abril" "Despesa com manutenção" 1900.00 "DESPESA" "Manutenção" "2024-04-15" "PAGO"
insert_financeiro 41 "Manutenção Equipamentos Maio" "Despesa com manutenção" 2400.00 "DESPESA" "Manutenção" "2024-05-15" "PAGO"
insert_financeiro 42 "Manutenção Equipamentos Junho" "Despesa com manutenção" 2100.00 "DESPESA" "Manutenção" "2024-06-15" "PAGO"

# Despesas - Marketing
insert_financeiro 43 "Marketing Digital Janeiro" "Despesa com marketing" 3000.00 "DESPESA" "Marketing" "2024-01-08" "PAGO"
insert_financeiro 44 "Marketing Digital Fevereiro" "Despesa com marketing" 3200.00 "DESPESA" "Marketing" "2024-02-08" "PAGO"
insert_financeiro 45 "Marketing Digital Março" "Despesa com marketing" 3500.00 "DESPESA" "Marketing" "2024-03-08" "PAGO"
insert_financeiro 46 "Marketing Digital Abril" "Despesa com marketing" 3300.00 "DESPESA" "Marketing" "2024-04-08" "PAGO"
insert_financeiro 47 "Marketing Digital Maio" "Despesa com marketing" 3800.00 "DESPESA" "Marketing" "2024-05-08" "PAGO"
insert_financeiro 48 "Marketing Digital Junho" "Despesa com marketing" 4000.00 "DESPESA" "Marketing" "2024-06-08" "PAGO"

echo "✅ Dados de teste inseridos com sucesso!"
echo "📊 Agora você pode testar os gráficos na seção Financeiro da home"
echo ""
echo "🔍 Para verificar os dados inseridos:"
echo "curl -X GET http://localhost:8080/financeiro-empresarial" 