import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import FinanceiroEmpresarialService from "../../services/financeiro/financeiroEmpresarialService";

const FinanceByCategoryBarChart = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { obterDadosGraficoBarras } = FinanceiroEmpresarialService();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const dados = await obterDadosGraficoBarras();
        // Transformar dados para mostrar receitas por categoria
        const dadosPorCategoria = dados.reduce((acc, item) => {
          if (!acc[item.mes]) {
            acc[item.mes] = { mes: item.mes };
          }
          // Aqui você pode adicionar lógica para categorizar as receitas
          // Por enquanto, vamos usar o valor total de receita
          acc[item.mes].receita = item.receita;
          return acc;
        }, {} as any);
        
        setData(Object.values(dadosPorCategoria));
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

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="mes" />
        <YAxis />
        <Tooltip
          formatter={(value) => [`R$ ${Number(value).toLocaleString('pt-BR')}`, "Receita"]}
          labelStyle={{ color: "#002c5f" }}
        />
        <Legend />
        <Bar 
          dataKey="receita" 
          fill="#2ecc71" 
          name="Receita Total"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default FinanceByCategoryBarChart;
