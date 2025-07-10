# 📊 Gráficos Financeiros - Athletic Living

## 🎯 Funcionalidades Implementadas

### **1. Gráfico de Barras (Receitas vs Despesas vs Lucro)**
- **Localização**: `src/components/financeTotalBar/FinanceTotalBar.tsx`
- **Dados**: Busca dados reais do backend via `/financeiro-empresarial`
- **Funcionalidades**:
  - Mostra receitas (verde), despesas (vermelho) e lucro (azul) por mês
  - Tooltip com formatação monetária
  - Loading state com spinner
  - Tratamento de erros

### **2. Gráfico de Pizza (Distribuição por Categoria)**
- **Localização**: `src/components/dashboardPie/DashboardPie.tsx`
- **Dados**: Busca dados reais do backend via `/financeiro-empresarial/lancamentos`
- **Funcionalidades**:
  - Mostra receitas (verde) e despesas (vermelho) por categoria
  - Labels com percentuais
  - Legend colorida
  - Tooltip com formatação monetária

### **3. Gráfico de Barras por Categoria**
- **Localização**: `src/components/financeCategoryBar/FinanceCategoryBar.tsx`
- **Dados**: Busca dados reais do backend
- **Funcionalidades**:
  - Mostra receitas por período
  - Formatação monetária
  - Loading state

### **4. Seção Financeira Atualizada**
- **Localização**: `src/components/sections/FinanceiroSection.tsx`
- **Funcionalidades**:
  - Insights dinâmicos baseados em dados reais
  - Receita Total, Despesas Totais, Lucro Total, Taxa de Lucro
  - Cálculos automáticos dos totais

## 🗄️ Serviço Backend

### **Serviço Criado**
- **Localização**: `src/services/financeiro/financeiroEmpresarialService.ts`
- **Endpoints utilizados**:
  - `GET /financeiro-empresarial` - Lista financeiros empresariais
  - `GET /financeiro-empresarial/lancamentos/financeiro/{id}` - Lista lançamentos

### **Métodos Principais**
- `obterDadosGraficoBarras()` - Dados para gráfico de barras
- `obterDadosGraficoPizza()` - Dados para gráfico de pizza
- `listarFinanceiroEmpresarial()` - Lista financeiros
- `listarLancamentosPorFinanceiro()` - Lista lançamentos

## 🧪 Dados de Teste

### **Script SQL Criado**
- **Arquivo**: `dados_teste_financeiro.sql`
- **Dados Incluídos**:
  - 48 registros de financeiro empresarial
  - 6 meses de dados (Jan-Jun 2024)
  - Receitas: Mensalidades, Suplementos, Avaliações
  - Despesas: Aluguel, Folha de Pagamento, Energia, Manutenção, Marketing

### **Cenário Realista**
- **Receitas crescentes**: Mensalidades (25k → 38k)
- **Despesas fixas**: Aluguel (8k/mês), Folha (12k → 13.8k)
- **Despesas variáveis**: Energia, Manutenção, Marketing
- **Diversas categorias**: Para testar o gráfico de pizza

## 🚀 Como Testar

### **1. Inserir Dados de Teste**
```sql
-- Execute o script no seu banco de dados
-- Arquivo: dados_teste_financeiro.sql
```

### **2. Verificar Backend**
- Certifique-se que o backend está rodando
- Verifique se os endpoints estão funcionando:
  - `GET /financeiro-empresarial`
  - `GET /financeiro-empresarial/lancamentos/financeiro/{id}`

### **3. Testar Frontend**
- Acesse a seção Financeiro na home
- Verifique se os gráficos carregam com dados
- Teste os tooltips e legendas

## 📈 Resultados Esperados

### **Gráfico de Barras**
- 6 barras (Jan-Jun)
- Cada barra com 3 valores: Receita (verde), Despesa (vermelho), Lucro (azul)
- Tooltip formatado: "R$ 25.000,00"

### **Gráfico de Pizza**
- Fatias coloridas por categoria
- Receitas em verde, despesas em vermelho
- Labels com percentuais
- Legend colorida

### **Insights Dinâmicos**
- Receita Total: ~R$ 198.000
- Despesas Totais: ~R$ 108.000
- Lucro Total: ~R$ 90.000
- Taxa de Lucro: ~45%

## 🔧 Estrutura de Dados

### **FinanceiroEmpresarial**
```typescript
{
  id: number;
  nome: string;
  descricao: string;
  valor: number;
  tipo: "RECEITA" | "DESPESA";
  categoria: string;
  data: string;
  status: "PAGO" | "PENDENTE" | "VENCIDO";
}
```

### **Lancamento**
```typescript
{
  id: number;
  descricao: string;
  valor: number;
  tipo: "RECEITA" | "DESPESA";
  categoria: string;
  data: string;
  status: "PAGO" | "PENDENTE" | "VENCIDO";
  financeiroEmpresarialId: number;
}
```

## 🎨 Cores Utilizadas

- **Receitas**: `#2ecc71` (verde)
- **Despesas**: `#e74c3c` (vermelho)
- **Lucro**: `#3498db` (azul)
- **Primária**: `#002c5f` (azul escuro)

## 📱 Responsividade

- Todos os gráficos são responsivos
- Loading states para melhor UX
- Tratamento de dados vazios
- Tooltips adaptáveis

## 🔍 Debug

### **Verificar Dados**
```javascript
// No console do navegador
const service = FinanceiroEmpresarialService();
service.obterDadosGraficoBarras().then(console.log);
service.obterDadosGraficoPizza().then(console.log);
```

### **Verificar Endpoints**
```bash
# Testar endpoints no backend
curl http://localhost:8080/financeiro-empresarial
curl http://localhost:8080/financeiro-empresarial/lancamentos/financeiro/1
```

## ✅ Checklist de Teste

- [ ] Backend rodando
- [ ] Dados inseridos no banco
- [ ] Gráfico de barras carregando
- [ ] Gráfico de pizza carregando
- [ ] Tooltips funcionando
- [ ] Legendas coloridas
- [ ] Insights dinâmicos
- [ ] Loading states
- [ ] Responsividade
- [ ] Tratamento de erros 