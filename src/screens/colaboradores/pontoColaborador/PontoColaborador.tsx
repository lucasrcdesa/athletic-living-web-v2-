import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PontoColaborador.css";
import HeaderPages from "../../../components/headerPages/HeaderPages";
import DataTable from "../../../components/dataTable/DataTable";

// Mock de dados de colaboradores
const mockColaboradores = [
  {
    id: 1,
    nome: "João Silva",
    email: "joao@academia.com",
    telefone: "(11) 99999-9999",
    cargo: "Personal Trainer",
    status: "ativo",
    ultimoPonto: "2024-02-15 18:30",
    totalHorasMes: 160
  },
  {
    id: 2,
    nome: "Maria Santos",
    email: "maria@academia.com",
    telefone: "(11) 88888-8888",
    cargo: "Recepcionista",
    status: "ativo",
    ultimoPonto: "2024-02-15 17:00",
    totalHorasMes: 140
  },
  {
    id: 3,
    nome: "Pedro Oliveira",
    email: "pedro@academia.com",
    telefone: "(11) 77777-7777",
    cargo: "Instrutor",
    status: "ativo",
    ultimoPonto: "2024-02-15 19:00",
    totalHorasMes: 180
  },
  {
    id: 4,
    nome: "Ana Costa",
    email: "ana@academia.com",
    telefone: "(11) 66666-6666",
    cargo: "Personal Trainer",
    status: "inativo",
    ultimoPonto: "2024-02-10 16:00",
    totalHorasMes: 120
  },
  {
    id: 5,
    nome: "Carlos Ferreira",
    email: "carlos@academia.com",
    telefone: "(11) 55555-5555",
    cargo: "Instrutor",
    status: "ativo",
    ultimoPonto: "2024-02-15 20:00",
    totalHorasMes: 200
  }
];

const PontoColaborador = () => {
  const navigate = useNavigate();
  const [colaboradores, setColaboradores] = useState(mockColaboradores);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula carregamento de dados
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const columns = [
    { key: "nome", label: "Nome", width: "25%", sortable: true },
    { key: "email", label: "Email", width: "25%", sortable: true },
    { key: "cargo", label: "Cargo", width: "15%", sortable: true },
    { key: "telefone", label: "Telefone", width: "15%", sortable: false },
    {
      key: "ultimoPonto",
      label: "Último Ponto",
      width: "12%",
      sortable: true,
      render: (value: string) => {
        const data = new Date(value);
        return data.toLocaleDateString('pt-BR') + ' ' + data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
      }
    },
    {
      key: "totalHorasMes",
      label: "Horas/Mês",
      width: "8%",
      sortable: true,
      render: (value: number) => `${value}h`
    },
  ];

  const handleRowClick = (row: any) => {
    navigate(`/colaboradores/${row.id}/ponto`);
  };

  if (loading) {
    return (
      <div className="app-container">
        <HeaderPages title="Ponto - Selecionar Colaborador" />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando colaboradores...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <HeaderPages title="Ponto - Selecionar Colaborador" />
      
      <div className="listagem-container">
        <DataTable
          title="Selecione um colaborador para ver o ponto"
          columns={columns}
          data={colaboradores}
          onRowClick={handleRowClick}
          showDeleteButton={false}
          emptyMessage="Nenhum colaborador cadastrado"
          pageSize={10}
        />
      </div>
    </div>
  );
};

export default PontoColaborador; 