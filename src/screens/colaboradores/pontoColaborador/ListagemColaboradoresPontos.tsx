import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ListagemColaboradoresPontos.css";
import HeaderPages from "../../../components/headerPages/HeaderPages";
import DataTable from "../../../components/dataTable/DataTable";
import ColaboradorCadastroService, { Colaborador } from '../../../services/colaborador/colaboradorCadastroService';

const ListagemColaboradoresPontos = () => {
  const navigate = useNavigate();
  const [colaboradores, setColaboradores] = useState<Colaborador[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const { listarColaboradores } = ColaboradorCadastroService();

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

  const columns = [
    { 
      key: "nome", 
      label: "Nome", 
      width: "30%", 
      sortable: true 
    },
    { 
      key: "mail", 
      label: "Email", 
      width: "25%", 
      sortable: true 
    },
    { 
      key: "funcao", 
      label: "Função", 
      width: "20%", 
      sortable: true 
    },
    {
      key: "ponto",
      label: "Ponto",
      width: "15%",
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
    // Navegar para a lista de pontos do colaborador específico
    navigate(`/colaboradores/ponto/listagem/${row.id}`);
  };

  const handleCloneClick = (row: Colaborador) => {
    // Por enquanto, apenas navega para edição do colaborador
    navigate(`/colaboradores/editar/${row.id}`);
  };

  const handleAddClick = () => {
    navigate('/colaboradores/cadastrar');
  };

  if (loading) {
    return (
      <div className="app-container">
        <HeaderPages title="Colaboradores - Pontos" />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando colaboradores...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <HeaderPages title="Colaboradores - Pontos" />
      
      {message && (
        <div className={`status-message status-${message.type}`}>
          {message.text}
        </div>
      )}
      
      <div className="listagem-container">
        <div className="table-header">
          <h2>Lista de Colaboradores</h2>
          <button 
            className="btn-adicionar"
            onClick={handleAddClick}
          >
            + Adicionar Colaborador
          </button>
        </div>
        
        <DataTable
          title=""
          columns={columns}
          data={colaboradores}
          onRowClick={handleRowClick}
          onCloneClick={handleCloneClick}
          showCloneButton={true}
          emptyMessage="Nenhum colaborador cadastrado"
          pageSize={10}
        />
      </div>
    </div>
  );
};

export default ListagemColaboradoresPontos; 