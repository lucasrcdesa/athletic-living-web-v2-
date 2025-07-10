import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./MacrociclosAluno.css";
import HeaderPages from "../../components/headerPages/HeaderPages";
import DataTable from "../../components/dataTable/DataTable";

// Mock de dados do aluno
const mockAluno = {
  id: 1,
  nome: "João Silva",
  email: "joao@email.com"
};

// Mock de dados dos macrociclos
const mockMacrociclos = [
  {
    id: 1,
    nome: "Macrociclo 1 - Hipertrofia",
    objetivo: "Ganho de massa muscular",
    duracao: 90,
    dataInicio: "2024-01-01",
    dataFim: "2024-03-31",
    status: "em_andamento",
    mesociclos: 3,
    progresso: 65
  },
  {
    id: 2,
    nome: "Macrociclo 2 - Força",
    objetivo: "Aumento de força máxima",
    duracao: 90,
    dataInicio: "2024-04-01",
    dataFim: "2024-06-30",
    status: "planejado",
    mesociclos: 3,
    progresso: 0
  },
  {
    id: 3,
    nome: "Macrociclo 3 - Definição",
    objetivo: "Redução de gordura e definição muscular",
    duracao: 90,
    dataInicio: "2024-07-01",
    dataFim: "2024-09-30",
    status: "planejado",
    mesociclos: 3,
    progresso: 0
  },
  {
    id: 4,
    nome: "Macrociclo 4 - Manutenção",
    objetivo: "Manutenção da forma física",
    duracao: 90,
    dataInicio: "2024-10-01",
    dataFim: "2024-12-31",
    status: "planejado",
    mesociclos: 3,
    progresso: 0
  }
];

const MacrociclosAluno = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [aluno, setAluno] = useState(mockAluno);
  const [macrociclos, setMacrociclos] = useState(mockMacrociclos);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula carregamento de dados
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const columns = [
    { key: "nome", label: "Nome", width: "25%", sortable: true },
    { key: "objetivo", label: "Objetivo", width: "25%", sortable: true },
    { 
      key: "duracao", 
      label: "Duração", 
      width: "10%", 
      sortable: true,
      render: (value: number) => `${value} dias`
    },
    {
      key: "dataInicio",
      label: "Início",
      width: "12%",
      sortable: true,
      render: (value: string) => new Date(value).toLocaleDateString('pt-BR')
    },
    {
      key: "dataFim",
      label: "Fim",
      width: "12%",
      sortable: true,
      render: (value: string) => new Date(value).toLocaleDateString('pt-BR')
    },
    {
      key: "status",
      label: "Status",
      width: "10%",
      sortable: true,
      render: (value: string) => (
        <span className={`status-badge status-${value}`}>
          {value === 'em_andamento' ? 'Em Andamento' : 
           value === 'planejado' ? 'Planejado' : 
           value === 'concluido' ? 'Concluído' : value}
        </span>
      ),
    },
    {
      key: "progresso",
      label: "Progresso",
      width: "6%",
      sortable: true,
      render: (value: number) => `${value}%`
    },
  ];

  const handleRowClick = (row: any) => {
    navigate(`/periodizacoes/${id}/macrociclo/${row.id}`);
  };

  const handleDeleteClick = (row: any) => {
    if (window.confirm('Tem certeza que deseja excluir este macrociclo?')) {
      setMacrociclos(macrociclos.filter(macrociclo => macrociclo.id !== row.id));
    }
  };

  const handleCloneClick = (row: any) => {
    const novoId = Math.max(...macrociclos.map(m => m.id)) + 1;
    const macrocicloClonado = {
      ...row,
      id: novoId,
      nome: `${row.nome} (Cópia)`,
      status: "planejado",
      progresso: 0
    };
    setMacrociclos([...macrociclos, macrocicloClonado]);
    alert('Macrociclo clonado com sucesso!');
  };

  const handleAdicionarClick = () => {
    navigate(`/periodizacoes/${id}/macrociclo/novo`);
  };

  if (loading) {
    return (
      <div className="app-container">
        <HeaderPages title={`Periodizações - ${aluno.nome}`} />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando macrociclos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <HeaderPages title={`Periodizações - ${aluno.nome}`} />
      
      <div className="macrociclos-container">
        {/* Informações do aluno */}
        <div className="aluno-info">
          <h2>{aluno.nome}</h2>
          <p><strong>Email:</strong> {aluno.email}</p>
        </div>

        {/* Botão para adicionar macrociclo */}
        <div className="acoes-header">
          <button 
            className="btn-adicionar"
            onClick={handleAdicionarClick}
          >
            + Novo Macrociclo
          </button>
        </div>

        {/* Lista de macrociclos */}
        <div className="listagem-container">
          <DataTable
            title="Macrociclos do Aluno"
            columns={columns}
            data={macrociclos}
            onRowClick={handleRowClick}
            onDeleteClick={handleDeleteClick}
            onCloneClick={handleCloneClick}
            showDeleteButton={true}
            emptyMessage="Nenhum macrociclo cadastrado"
            pageSize={10}
          />
        </div>
      </div>
    </div>
  );
};

export default MacrociclosAluno; 