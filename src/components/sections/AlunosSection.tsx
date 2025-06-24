import React from "react";
import DataTable from "../dataTable";
import { alunosData } from "../../data/mockData";
import QuickStats from "../quickStats";

const AlunosSection: React.FC = () => {
  const alunosStats = [
    {
      label: "Total de Alunos",
      value: alunosData.length.toString(),
      icon: "👥",
      color: "#002c5f",
    },
    {
      label: "Alunos Ativos",
      value: alunosData.filter((a) => a.status === "ativo").length.toString(),
      icon: "✅",
      color: "#2ecc71",
    },
    {
      label: "Alunos Inativos",
      value: alunosData.filter((a) => a.status === "inativo").length.toString(),
      icon: "❌",
      color: "#e74c3c",
    },
    {
      label: "Novos este mês",
      value: "8",
      icon: "🆕",
      color: "#d36d00",
    },
  ];

  const columns = [
    { key: "nome", label: "Nome", width: "25%", sortable: true },
    { key: "email", label: "Email", width: "25%", sortable: true },
    { key: "telefone", label: "Telefone", width: "15%", sortable: false },
    { key: "plano", label: "Plano", width: "10%", sortable: true },
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
      key: "ultimoPagamento",
      label: "Último Pagamento",
      width: "15%",
      sortable: true,
    },
  ];

  const handleRowClick = (row: any) => {
    console.log("Aluno selecionado:", row);
    // Aqui você pode abrir um modal ou navegar para detalhes do aluno
  };

  return (
    <div className="section-content">
      <QuickStats stats={alunosStats} title="Estatísticas dos Alunos" />

      <DataTable
        title="Lista de Alunos"
        columns={columns}
        data={alunosData}
        onRowClick={handleRowClick}
        emptyMessage="Nenhum aluno cadastrado"
        pageSize={5}
      />
    </div>
  );
};

export default AlunosSection;
