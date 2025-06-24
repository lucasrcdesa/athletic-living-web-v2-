import React from "react";
import DataTable from "../dataTable";
import { treinosData } from "../../data/mockData";
import QuickStats from "../quickStats";

const TreinosSection: React.FC = () => {
  const treinosStats = [
    {
      label: "Total de Treinos",
      value: treinosData.length.toString(),
      icon: "🏋️",
      color: "#002c5f",
    },
    {
      label: "Treinos Ativos",
      value: treinosData.filter((t) => t.status === "ativo").length.toString(),
      icon: "✅",
      color: "#2ecc71",
    },
    {
      label: "Total de Alunos",
      value: treinosData.reduce((acc, t) => acc + t.alunos, 0).toString(),
      icon: "👥",
      color: "#d36d00",
    },
    {
      label: "Categorias",
      value: Array.from(
        new Set(treinosData.map((t) => t.categoria))
      ).length.toString(),
      icon: "📊",
      color: "#5e3c00",
    },
  ];

  const columns = [
    { key: "nome", label: "Nome do Treino", width: "25%", sortable: true },
    { key: "categoria", label: "Categoria", width: "15%", sortable: true },
    { key: "duracao", label: "Duração", width: "10%", sortable: true },
    { key: "instrutor", label: "Instrutor", width: "20%", sortable: true },
    {
      key: "status",
      label: "Status",
      width: "10%",
      sortable: true,
      render: (value: string) => (
        <span className={`status-badge status-${value}`}>{value}</span>
      ),
    },
    {
      key: "alunos",
      label: "Alunos",
      width: "10%",
      sortable: true,
      render: (value: number) => <span className="alunos-count">{value}</span>,
    },
    { key: "descricao", label: "Descrição", width: "10%", sortable: false },
  ];

  const handleRowClick = (row: any) => {
    console.log("Treino selecionado:", row);
    // Aqui você pode abrir um modal ou navegar para detalhes do treino
  };

  return (
    <div className="section-content">
      <QuickStats stats={treinosStats} title="Estatísticas dos Treinos" />

      <DataTable
        title="Lista de Treinos"
        columns={columns}
        data={treinosData}
        onRowClick={handleRowClick}
        emptyMessage="Nenhum treino cadastrado"
        pageSize={5}
      />
    </div>
  );
};

export default TreinosSection;
