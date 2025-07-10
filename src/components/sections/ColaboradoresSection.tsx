import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "../dataTable/DataTable";
import QuickStats from "../quickStats/QuickStats";
import ColaboradorCadastroService, { Colaborador } from "../../services/colaborador/colaboradorCadastroService";

const ColaboradoresSection: React.FC = () => {
  const navigate = useNavigate();
  const { listarColaboradores } = ColaboradorCadastroService();
  const [colaboradores, setColaboradores] = useState<Colaborador[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchColaboradores = async () => {
      setLoading(true);
      try {
        const colaboradoresData = await listarColaboradores();
        setColaboradores(colaboradoresData);
      } catch (error) {
        console.error('Erro ao buscar colaboradores:', error);
        setColaboradores([]);
      } finally {
        setLoading(false);
      }
    };

    fetchColaboradores();
  }, []);

  // Cálculos para insights
  const totalColaboradores = colaboradores.length;
  const colaboradoresComPonto = colaboradores.filter(c => c.ponto).length;
  const colaboradoresSemPonto = totalColaboradores - colaboradoresComPonto;
  const totalBonus = colaboradores.reduce((acc, c) => acc + (c.bonus || 0), 0);
  const mediaBonus = totalColaboradores > 0 ? (totalBonus / totalColaboradores).toFixed(2) : 0;
  
  // Contagem por função
  const funcoes = colaboradores.reduce((acc, c) => {
    acc[c.funcao] = (acc[c.funcao] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const funcaoMaisComum = Object.entries(funcoes).sort((a, b) => b[1] - a[1])[0];

  const colaboradoresStats = [
    {
      label: "Total de Colaboradores",
      value: totalColaboradores.toString(),
      icon: "👥",
      color: "#002c5f",
    },
    {
      label: "Com Ponto",
      value: `${colaboradoresComPonto} (${totalColaboradores > 0 ? ((colaboradoresComPonto / totalColaboradores) * 100).toFixed(1) : 0}%)`,
      icon: "⏰",
      color: "#2ecc71",
    },
    {
      label: "Média de Bônus",
      value: `R$ ${mediaBonus}`,
      icon: "💰",
      color: "#f39c12",
    },
    {
      label: "Função Mais Comum",
      value: funcaoMaisComum ? `${funcaoMaisComum[0]} (${funcaoMaisComum[1]})` : "N/A",
      icon: "🎯",
      color: "#9b59b6",
    },
  ];

  const columns = [
    { key: "nome", label: "Nome", width: "25%", sortable: true },
    { key: "mail", label: "Email", width: "25%", sortable: true },
    { key: "cpf", label: "CPF", width: "15%", sortable: false },
    { key: "funcao", label: "Função", width: "15%", sortable: true },
    {
      key: "ponto",
      label: "Ponto",
      width: "10%",
      sortable: true,
      render: (value: boolean) => (
        <span className={`status-badge ${value ? 'status-ativo' : 'status-inativo'}`}>
          {value ? 'Sim' : 'Não'}
        </span>
      ),
    },
    {
      key: "bonus",
      label: "Bônus",
      width: "10%",
      sortable: true,
      render: (value: number) => (
        <span className="text-success">
          R$ {value?.toFixed(2) || '0.00'}
        </span>
      ),
    },
  ];

  const handleRowClick = (row: Colaborador) => {
    navigate(`/colaboradores/editar/${row.id}`);
  };

  if (loading) {
    return (
      <div className="section-content">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando dados dos colaboradores...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="section-content">
      <QuickStats stats={colaboradoresStats} title="Insights dos Colaboradores" />

      <DataTable
        title="Lista de Colaboradores"
        columns={columns}
        data={colaboradores}
        onRowClick={handleRowClick}
        emptyMessage="Nenhum colaborador cadastrado"
        pageSize={10}
      />
    </div>
  );
};

export default ColaboradoresSection;
