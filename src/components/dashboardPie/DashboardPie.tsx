import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import FinanceiroEmpresarialService from "../../services/financeiro/financeiroEmpresarialService";

// Cores que combinam com o tema da aplicação
const COLORS = [
  "#2ecc71", // verde - receitas
  "#e74c3c", // vermelho - despesas
  "#3498db", // azul
  "#f39c12", // laranja
  "#9b59b6", // roxo
  "#1abc9c", // verde água
  "#e67e22", // laranja escuro
  "#34495e", // cinza escuro
];

const DashboardPieChart = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { obterDadosGraficoPizza } = FinanceiroEmpresarialService();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        console.log('Buscando dados do gráfico de pizza...');
        const dados = await obterDadosGraficoPizza();
        console.log('Dados recebidos (pizza):', dados);
        setData(dados);
      } catch (error) {
        console.error('Erro ao buscar dados do gráfico:', error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="loading-spinner"></div>
        <p style={{ marginLeft: 10 }}>Carregando dados...</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>Nenhum dado financeiro disponível</p>
      </div>
    );
  }

  console.log('Renderizando gráfico de pizza com dados:', data);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent, value }) => {
            if (!percent || percent < 0.05) return ''; // Não mostra labels muito pequenos
            return `${name} (${(percent * 100).toFixed(1)}%)`;
          }}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={entry.tipo === 'receita' ? COLORS[0] : COLORS[1]} 
            />
          ))}
        </Pie>
        <Tooltip
          formatter={(value, name) => [
            `R$ ${Number(value).toLocaleString('pt-BR')}`, 
            name
          ]}
          labelStyle={{ color: "#002c5f" }}
        />
        <Legend 
          formatter={(value, entry) => {
            const isReceita = (entry.payload as any)?.tipo === 'receita';
            return [
              <span style={{ color: isReceita ? '#2ecc71' : '#e74c3c' }}>
                {value}
              </span>,
              value
            ];
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default DashboardPieChart;
