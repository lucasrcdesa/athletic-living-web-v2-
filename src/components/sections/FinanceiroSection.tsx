import React, { useState, useEffect } from "react";
import DashboardPieChart from "../dashboardPie/DashboardPie";
import FinanceTotalBarChart from "../financeTotalBar/FinanceTotalBar";
import FinanceByCategoryBarChart from "../financeCategoryBar/FinanceCategoryBar";
import QuickStats from "../quickStats/QuickStats";
import FinanceiroEmpresarialService from "../../services/financeiro/financeiroEmpresarialService";

const FinanceiroSection: React.FC = () => {
  const [financeStats, setFinanceStats] = useState([
    {
      label: "Receita Total",
      value: "R$ 0",
      icon: "💰",
      color: "#002c5f",
    },
    {
      label: "Despesas Totais",
      value: "R$ 0",
      icon: "📉",
      color: "#d36d00",
    },
    {
      label: "Lucro Total",
      value: "R$ 0",
      icon: "📈",
      color: "#2ecc71",
    },
    {
      label: "Taxa de Lucro",
      value: "0%",
      icon: "📊",
      color: "#5e3c00",
    },
  ]);

  const { obterDadosGraficoBarras, listarFinanceiroEmpresarial } = FinanceiroEmpresarialService();

  useEffect(() => {
    const fetchFinanceData = async () => {
      try {
        console.log('Buscando dados financeiros para insights...');
        
        // Buscar dados diretos do financeiro empresarial
        const financeiros = await listarFinanceiroEmpresarial();
        console.log('Financeiros carregados:', financeiros.length);
        
        if (financeiros.length > 0) {
          const totalReceita = financeiros
            .filter(f => f.tipo === 'RECEITA')
            .reduce((acc, f) => acc + f.valor, 0);
          
          const totalDespesa = financeiros
            .filter(f => f.tipo === 'DESPESA')
            .reduce((acc, f) => acc + f.valor, 0);
          
          const totalLucro = totalReceita - totalDespesa;
          const taxaLucro = totalReceita > 0 ? ((totalLucro / totalReceita) * 100).toFixed(1) : 0;

          console.log('Totais calculados:', {
            receita: totalReceita,
            despesa: totalDespesa,
            lucro: totalLucro,
            taxaLucro
          });

          setFinanceStats([
            {
              label: "Receita Total",
              value: `R$ ${totalReceita.toLocaleString('pt-BR')}`,
              icon: "💰",
              color: "#002c5f",
            },
            {
              label: "Despesas Totais",
              value: `R$ ${totalDespesa.toLocaleString('pt-BR')}`,
              icon: "📉",
              color: "#d36d00",
            },
            {
              label: "Lucro Total",
              value: `R$ ${totalLucro.toLocaleString('pt-BR')}`,
              icon: "📈",
              color: "#2ecc71",
            },
            {
              label: "Taxa de Lucro",
              value: `${taxaLucro}%`,
              icon: "📊",
              color: "#5e3c00",
            },
          ]);
        }
      } catch (error) {
        console.error('Erro ao buscar dados financeiros:', error);
      }
    };

    fetchFinanceData();
  }, []);

  return (
    <div className="section-content">
      <QuickStats stats={financeStats} title="Resumo Financeiro" />

      <div className="dashboard-container">
        <div className="dashboard-item-1">
          <span>Distribuição por Categoria</span>
          <DashboardPieChart />
        </div>
        <div className="dashboard-item-2-container">
          <div className="dashboard-item-2">
            <span>Receitas vs Despesas vs Lucro</span>
            <FinanceTotalBarChart />
          </div>
          <div className="dashboard-item-3">
            <span>Receita por Período</span>
            <FinanceByCategoryBarChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceiroSection;
