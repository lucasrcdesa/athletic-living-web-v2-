import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SelecaoColaboradorNotificacao.css";
import HeaderPages from "../../../components/headerPages/HeaderPages";
import DataTable from "../../../components/dataTable/DataTable";

const mockColaboradores = [
  { id: 1, nome: "João Silva", email: "joao@academia.com", cargo: "Personal Trainer", status: "ativo" },
  { id: 2, nome: "Maria Santos", email: "maria@academia.com", cargo: "Recepcionista", status: "ativo" },
  { id: 3, nome: "Pedro Oliveira", email: "pedro@academia.com", cargo: "Instrutor", status: "ativo" },
  { id: 4, nome: "Ana Costa", email: "ana@academia.com", cargo: "Personal Trainer", status: "inativo" },
  { id: 5, nome: "Carlos Ferreira", email: "carlos@academia.com", cargo: "Instrutor", status: "ativo" }
];

const SelecaoColaboradorNotificacao = () => {
  const navigate = useNavigate();
  const [colaboradores, setColaboradores] = useState(mockColaboradores);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const columns = [
    { key: "nome", label: "Nome", width: "30%", sortable: true },
    { key: "email", label: "Email", width: "30%", sortable: true },
    { key: "cargo", label: "Cargo", width: "20%", sortable: true },
    { key: "status", label: "Status", width: "20%", sortable: true },
  ];

  const handleRowClick = (row: any) => {
    navigate(`/notificacoes/colaboradores/incluir/${row.id}`);
  };

  return (
    <div className="app-container">
      <HeaderPages title="Notificações - Selecione o Colaborador" />
      <div className="listagem-container">
        <DataTable
          title="Selecione um colaborador"
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

export default SelecaoColaboradorNotificacao; 