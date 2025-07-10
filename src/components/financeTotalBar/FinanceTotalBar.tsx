import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import FinanceiroEmpresarialService from "../../services/financeiro/financeiroEmpresarialService";

const FinanceTotalBarChart = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { obterDadosGraficoBarras } = FinanceiroEmpresarialService();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        console.log('Buscando dados do gráfico de barras...');
        const dados = await obterDadosGraficoBarras();
        console.log('Dados recebidos:', dados);
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

  console.log('Renderizando gráfico com dados:', data);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="mes" />
        <YAxis />
        <Tooltip
          formatter={(value, name) => {
            const formattedValue = `R$ ${Number(value).toLocaleString('pt-BR')}`;
            const label = name === 'receita' ? 'Receita' : 
                         name === 'despesa' ? 'Despesa' : 'Lucro';
            return [formattedValue, label];
          }}
          labelStyle={{ color: "#002c5f" }}
        />
        <Legend />
        <Bar 
          dataKey="receita" 
          fill="#2ecc71" 
          name="Receita"
          radius={[4, 4, 0, 0]}
        />
        <Bar 
          dataKey="despesa" 
          fill="#e74c3c" 
          name="Despesa"
          radius={[4, 4, 0, 0]}
        />
        <Bar 
          dataKey="lucro" 
          fill="#3498db" 
          name="Lucro"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default FinanceTotalBarChart;
