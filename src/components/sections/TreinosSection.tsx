import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "../dataTable/DataTable";
import QuickStats from "../quickStats/QuickStats";
import TreinoCadastroService, { Treino } from "../../services/treino/treinoCadastroService";

const TreinosSection: React.FC = () => {
  const navigate = useNavigate();
  const { listarTreinos } = TreinoCadastroService();
  const [treinos, setTreinos] = useState<Treino[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTreinos = async () => {
      setLoading(true);
      try {
        const treinosData = await listarTreinos();
        setTreinos(treinosData);
      } catch (error) {
        console.error('Erro ao buscar treinos:', error);
        setTreinos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTreinos();
  }, []);

  // Cálculos para insights
  const totalTreinos = treinos.length;
  const treinosFeitos = treinos.filter(t => t.feito).length;
  const treinosPendentes = totalTreinos - treinosFeitos;
  const taxaConclusao = totalTreinos > 0 ? ((treinosFeitos / totalTreinos) * 100).toFixed(1) : 0;
  
  // Média de PSE
  const mediaPSE = treinos.length > 0 ? 
    (treinos.reduce((acc, t) => acc + (t.pse || 0), 0) / treinos.length).toFixed(1) : 0;
  
  // Contagem por modalidade
  const modalidades = treinos.reduce((acc, t) => {
    acc[t.modalidade] = (acc[t.modalidade] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const modalidadeMaisComum = Object.entries(modalidades).sort((a, b) => b[1] - a[1])[0];

  // Média de carga
  const mediaCarga = treinos.length > 0 ? 
    (treinos.reduce((acc, t) => acc + (t.cargaEstimada || 0), 0) / treinos.length).toFixed(0) : 0;

  const treinosStats = [
    {
      label: "Total de Treinos",
      value: totalTreinos.toString(),
      icon: "💪",
      color: "#002c5f",
    },
    {
      label: "Taxa de Conclusão",
      value: `${taxaConclusao}%`,
      icon: "✅",
      color: "#2ecc71",
    },
    {
      label: "Média PSE",
      value: mediaPSE.toString(),
      icon: "📊",
      color: "#e74c3c",
    },
    {
      label: "Modalidade Mais Comum",
      value: modalidadeMaisComum ? `${modalidadeMaisComum[0]} (${modalidadeMaisComum[1]})` : "N/A",
      icon: "🎯",
      color: "#9b59b6",
    },
  ];

  const columns = [
    { key: "nome", label: "Nome", width: "20%", sortable: true },
    { key: "modalidade", label: "Modalidade", width: "15%", sortable: true },
    {
      key: "dia",
      label: "Data",
      width: "12%",
      sortable: true,
      render: (value: string) => {
        const date = new Date(value);
        return date.toLocaleDateString('pt-BR');
      },
    },
    {
      key: "feito",
      label: "Status",
      width: "10%",
      sortable: true,
      render: (value: boolean) => (
        <span className={`status-badge ${value ? 'status-ativo' : 'status-inativo'}`}>
          {value ? 'Concluído' : 'Pendente'}
        </span>
      ),
    },
    {
      key: "pse",
      label: "PSE",
      width: "8%",
      sortable: true,
      render: (value: number) => (
        <span className={value >= 8 ? 'text-danger' : value >= 6 ? 'text-warning' : 'text-success'}>
          {value || 0}
        </span>
      ),
    },
    {
      key: "cargaEstimada",
      label: "Carga (kg)",
      width: "10%",
      sortable: true,
      render: (value: number) => (
        <span className="text-info">
          {value || 0}
        </span>
      ),
    },
    {
      key: "tempoEstimado",
      label: "Tempo",
      width: "10%",
      sortable: true,
      render: (value: string) => {
        if (!value) return '-';
        // Converte PT1H30M para 1h30min
        const match = value.match(/PT(\d+H)?(\d+M)?/);
        if (match) {
          const horas = match[1] ? match[1].replace('H', '') : '0';
          const minutos = match[2] ? match[2].replace('M', '') : '0';
          return `${horas}h${minutos}min`;
        }
        return value;
      },
    },
    {
      key: "numDeBlocos",
      label: "Blocos",
      width: "8%",
      sortable: true,
      render: (value: number) => (
        <span className="text-secondary">
          {value || 0}
        </span>
      ),
    },
  ];

  const handleRowClick = (row: Treino) => {
    navigate(`/treinos/editar/${row.id}`);
  };

  if (loading) {
    return (
      <div className="section-content">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando dados dos treinos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="section-content">
      <QuickStats stats={treinosStats} title="Insights dos Treinos" />

      <DataTable
        title="Lista de Treinos"
        columns={columns}
        data={treinos}
        onRowClick={handleRowClick}
        emptyMessage="Nenhum treino cadastrado"
        pageSize={10}
      />
    </div>
  );
};

export default TreinosSection;
