import React from "react";
import DashboardPieChart from "../dashboardPie";
import FinanceTotalBarChart from "../financeTotalBar";
import FinanceByCategoryBarChart from "../financeCategoryBar";
import QuickStats from "../quickStats";

const FinanceiroSection: React.FC = () => {
  const financeStats = [
    {
      label: "Receita Mensal",
      value: "R$ 45.200",
      icon: "💰",
      color: "#002c5f",
    },
    {
      label: "Despesas",
      value: "R$ 28.500",
      icon: "📉",
      color: "#d36d00",
    },
    {
      label: "Lucro",
      value: "R$ 16.700",
      icon: "📈",
      color: "#2ecc71",
    },
    {
      label: "Alunos Ativos",
      value: "156",
      icon: "👥",
      color: "#5e3c00",
    },
  ];

  return (
    <div className="section-content">
      <QuickStats stats={financeStats} title="Resumo Financeiro" />

      <div className="dashboard-container">
        <div className="dashboard-item-1">
          <span>Distribuição de Receitas</span>
          <DashboardPieChart />
        </div>
        <div className="dashboard-item-2-container">
          <div className="dashboard-item-2">
            <span>Receita Mensal</span>
            <FinanceTotalBarChart />
          </div>
          <div className="dashboard-item-3">
            <span>Receita por Categoria</span>
            <FinanceByCategoryBarChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceiroSection;
