import React from "react";
import DataTable from "../dataTable";
import { colaboradoresData } from "../../data/mockData";
import QuickStats from "../quickStats";

const ColaboradoresSection: React.FC = () => {
  const colaboradoresStats = [
    {
      label: "Total de Colaboradores",
      value: colaboradoresData.length.toString(),
      icon: "👨‍💼",
      color: "#002c5f",
    },
    {
      label: "Colaboradores Ativos",
      value: colaboradoresData
        .filter((c) => c.status === "ativo")
        .length.toString(),
      icon: "✅",
      color: "#2ecc71",
    },
    {
      label: "Personal Trainers",
      value: colaboradoresData
        .filter((c) => c.cargo === "Personal Trainer")
        .length.toString(),
      icon: "💪",
      color: "#d36d00",
    },
    {
      label: "Folha Salarial",
      value: "R$ 16.500",
      icon: "💰",
      color: "#5e3c00",
    },
  ];

  const columns = [
    { key: "nome", label: "Nome", width: "20%", sortable: true },
    { key: "cargo", label: "Cargo", width: "15%", sortable: true },
    { key: "email", label: "Email", width: "25%", sortable: true },
    { key: "telefone", label: "Telefone", width: "15%", sortable: false },
    {
      key: "status",
      label: "Status",
      width: "10%",
      sortable: true,
      render: (value: string) => (
        <span className={`status-badge status-${value}`}>{value}</span>
      ),
    },
    { key: "salario", label: "Salário", width: "15%", sortable: true },
  ];

  const handleRowClick = (row: any) => {
    console.log("Colaborador selecionado:", row);
    // Aqui você pode abrir um modal ou navegar para detalhes do colaborador
  };

  return (
    <div className="section-content">
      <QuickStats
        stats={colaboradoresStats}
        title="Estatísticas dos Colaboradores"
      />

      <DataTable
        title="Lista de Colaboradores"
        columns={columns}
        data={colaboradoresData}
        onRowClick={handleRowClick}
        emptyMessage="Nenhum colaborador cadastrado"
        pageSize={5}
      />
    </div>
  );
};

export default ColaboradoresSection;
