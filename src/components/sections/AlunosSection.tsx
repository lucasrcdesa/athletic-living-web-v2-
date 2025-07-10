import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "../dataTable/DataTable";
import QuickStats from "../quickStats/QuickStats";
import AlunoCadastroService, { Aluno } from "../../services/aluno/alunoCadastroService";

const AlunosSection: React.FC = () => {
  const navigate = useNavigate();
  const { listarAlunos } = AlunoCadastroService();
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlunos = async () => {
      setLoading(true);
      try {
        const alunosData = await listarAlunos();
        setAlunos(alunosData);
      } catch (error) {
        console.error('Erro ao buscar alunos:', error);
        setAlunos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAlunos();
  }, []);

  // Cálculos para insights
  const totalAlunos = alunos.length;
  const alunosAdimplentes = alunos.filter(a => a.adimplente).length;
  const alunosInadimplentes = totalAlunos - alunosAdimplentes;
  const alunosComContratoVencido = alunos.filter(a => a.contratoVencido).length;
  const alunosComDiasExpiracao = alunos.filter(a => (a.diasExpiracao || 0) > 0).length;
  const mediaDiasTreinados = alunos.length > 0 ? 
    (alunos.reduce((acc, a) => acc + (a.diasTreinados || 0), 0) / alunos.length).toFixed(1) : 0;

  const alunosStats = [
    {
      label: "Total de Alunos",
      value: totalAlunos.toString(),
      icon: "👥",
      color: "#002c5f",
    },
    {
      label: "Adimplentes",
      value: `${alunosAdimplentes} (${totalAlunos > 0 ? ((alunosAdimplentes / totalAlunos) * 100).toFixed(1) : 0}%)`,
      icon: "✅",
      color: "#2ecc71",
    },
    {
      label: "Contratos Vencidos",
      value: alunosComContratoVencido.toString(),
      icon: "⚠️",
      color: "#e74c3c",
    },
    {
      label: "Média Dias Treinados",
      value: mediaDiasTreinados.toString(),
      icon: "📊",
      color: "#d36d00",
    },
  ];

  const columns = [
    { key: "nome", label: "Nome", width: "25%", sortable: true },
    { key: "email", label: "Email", width: "25%", sortable: true },
    { key: "telefone", label: "Telefone", width: "15%", sortable: false },
    {
      key: "adimplente",
      label: "Status",
      width: "10%",
      sortable: true,
      render: (value: boolean) => (
        <span className={`status-badge ${value ? 'status-ativo' : 'status-inativo'}`}>
          {value ? 'Adimplente' : 'Inadimplente'}
        </span>
      ),
    },
    {
      key: "diasTreinados",
      label: "Dias Treinados",
      width: "12%",
      sortable: true,
      render: (value: number) => (
        <span className={value > 0 ? 'text-success' : 'text-warning'}>
          {value || 0} dias
        </span>
      ),
    },
    {
      key: "diasExpiracao",
      label: "Dias Expiração",
      width: "13%",
      sortable: true,
      render: (value: number) => (
        <span className={value > 0 ? 'text-danger' : 'text-success'}>
          {value || 0} dias
        </span>
      ),
    },
  ];

  const handleRowClick = (row: Aluno) => {
    navigate(`/alunos/editar/${row.id}`);
  };

  if (loading) {
    return (
      <div className="section-content">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando dados dos alunos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="section-content">
      <QuickStats stats={alunosStats} title="Insights dos Alunos" />

      <DataTable
        title="Lista de Alunos"
        columns={columns}
        data={alunos}
        onRowClick={handleRowClick}
        emptyMessage="Nenhum aluno cadastrado"
        pageSize={10}
      />
    </div>
  );
};

export default AlunosSection;
