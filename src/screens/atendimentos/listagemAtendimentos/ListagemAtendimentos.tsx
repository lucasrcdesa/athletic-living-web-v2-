import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ListagemAtendimentos.css";
import HeaderPages from "../../../components/headerPages/HeaderPages";
import DataTable from "../../../components/dataTable/DataTable";
import AtendimentoCadastroService, { AtendimentoComNomes } from '../../../services/atendimento/atendimentoCadastroService';

const ListagemAtendimentos = () => {
  const navigate = useNavigate();
  const [atendimentos, setAtendimentos] = useState<AtendimentoComNomes[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const { listarAtendimentosComNomes, deletarAtendimento } = AtendimentoCadastroService();

  useEffect(() => {
    const fetchAtendimentos = async () => {
      setLoading(true);
      try {
        const atendimentosAPI = await listarAtendimentosComNomes();
        setAtendimentos(atendimentosAPI);
      } catch (error) {
        console.error('Erro ao buscar atendimentos:', error);
        setAtendimentos([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAtendimentos();
  }, []);

  const getTipoLabel = (tipo: string) => {
    const tipos = {
      'AVALIACAO_FISICA': 'Avaliação Física',
      'TREINO_PERSONALIZADO': 'Treino Personalizado',
      'CONSULTORIA_NUTRICIONAL': 'Consultoria Nutricional',
      'ACOMPANHAMENTO': 'Acompanhamento',
      'REAVALIACAO': 'Reavaliação',
      'OUTRO': 'Outro'
    };
    return tipos[tipo as keyof typeof tipos] || tipo;
  };

  const columns = [
    { 
      key: "dataHora", 
      label: "Data/Hora", 
      width: "25%", 
      sortable: true,
      render: (value: string) => new Date(value).toLocaleString('pt-BR')
    },
    { 
      key: "tipo", 
      label: "Tipo", 
      width: "30%", 
      sortable: true,
      render: (value: string) => getTipoLabel(value)
    },
    {
      key: "alunosNomes",
      label: "Aluno",
      width: "22.5%",
      sortable: false,
      render: (value: string[]) => value?.[0] || '-'
    },
    {
      key: "colaboradoresNomes",
      label: "Colaborador",
      width: "22.5%",
      sortable: false,
      render: (value: string[]) => value?.[0] || '-'
    },
  ];

  const handleRowClick = (row: AtendimentoComNomes) => {
    navigate(`/atendimentos/editar/${row.id}`);
  };

  const handleDeleteClick = async (row: AtendimentoComNomes) => {
    if (window.confirm('Tem certeza que deseja excluir este atendimento?')) {
      try {
        const success = await deletarAtendimento(row.id);
        if (success) {
          setAtendimentos(atendimentos.filter(atendimento => atendimento.id !== row.id));
          setMessage({ type: 'success', text: 'Atendimento excluído com sucesso!' });
          setTimeout(() => setMessage(null), 3000);
        } else {
          setMessage({ type: 'error', text: 'Erro ao excluir atendimento' });
          setTimeout(() => setMessage(null), 3000);
        }
      } catch (error) {
        console.error('Erro ao excluir atendimento:', error);
        setMessage({ type: 'error', text: 'Erro interno ao excluir' });
        setTimeout(() => setMessage(null), 3000);
      }
    }
  };

  const handleCloneClick = (row: AtendimentoComNomes) => {
    // Por enquanto, apenas navega para edição com dados preenchidos
    navigate(`/atendimentos/editar/${row.id}?clone=true`);
  };

  const handleAddClick = () => {
    navigate('/atendimentos/cadastrar');
  };

  if (loading) {
    return (
      <div className="app-container">
        <HeaderPages title="Atendimentos" />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando atendimentos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <HeaderPages title="Atendimentos" />
      
      {message && (
        <div className={`status-message status-${message.type}`}>
          {message.text}
        </div>
      )}
      
      <div className="listagem-container">
        <div className="table-header">
          <h2>Lista de Atendimentos</h2>
          <button 
            className="btn-adicionar"
            onClick={handleAddClick}
          >
            + Adicionar Atendimento
          </button>
        </div>
        
        <DataTable
          title=""
          columns={columns}
          data={atendimentos}
          onRowClick={handleRowClick}
          onDeleteClick={handleDeleteClick}
          onCloneClick={handleCloneClick}
          showDeleteButton={true}
          showCloneButton={true}
          emptyMessage="Nenhum atendimento cadastrado"
          pageSize={10}
        />
      </div>
    </div>
  );
};

export default ListagemAtendimentos; 