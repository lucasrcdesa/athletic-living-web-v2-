import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ListagemNotificacoesColaborador.css";
import HeaderPages from "../../../components/headerPages/HeaderPages";
import DataTable from "../../../components/dataTable/DataTable";
import NotificacaoCadastroService, { Notificacao } from '../../../services/notificacao/notificacaoCadastroService';
import ColaboradorCadastroService, { Colaborador } from '../../../services/colaborador/colaboradorCadastroService';

const ListagemNotificacoesColaborador = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);
  const [colaborador, setColaborador] = useState<Colaborador | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const { listarNotificacoesPorColaborador, deletarNotificacao } = NotificacaoCadastroService();
  const { buscarColaboradorPorId } = ColaboradorCadastroService();

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      setLoading(true);
      try {
        // Buscar dados do colaborador
        const colaboradorData = await buscarColaboradorPorId(parseInt(id));
        if (colaboradorData) {
          setColaborador(colaboradorData);
        }

        // Buscar notificações do colaborador
        const notificacoesData = await listarNotificacoesPorColaborador(parseInt(id));
        setNotificacoes(notificacoesData);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        setNotificacoes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const getTipoLabel = (tipo: string) => {
    const tipos = {
      'AVALIACAO': 'Avaliação',
      'TREINO': 'Treino',
      'FINANCEIRO': 'Financeiro',
      'MOTIVACAO': 'Motivação',
      'NUTRICAO': 'Nutrição',
      'OUTRO': 'Outro'
    };
    return tipos[tipo as keyof typeof tipos] || tipo;
  };

  const columns = [
    { 
      key: "nome", 
      label: "Nome", 
      width: "40%", 
      sortable: true 
    },
    { 
      key: "tipo", 
      label: "Tipo", 
      width: "30%", 
      sortable: true,
      render: (value: string) => getTipoLabel(value)
    },
    {
      key: "lida",
      label: "Lida",
      width: "30%",
      sortable: true,
      render: (value: boolean) => (
        <span className={`status-badge status-${value ? 'lida' : 'nao-lida'}`}>
          {value ? 'Sim' : 'Não'}
        </span>
      ),
    },
  ];

  const handleRowClick = (row: Notificacao) => {
    navigate(`/notificacoes/editar/${row.id}`);
  };

  const handleDeleteClick = async (row: Notificacao) => {
    if (window.confirm('Tem certeza que deseja excluir esta notificação?')) {
      try {
        const success = await deletarNotificacao(row.id);
        if (success) {
          setNotificacoes(notificacoes.filter(notificacao => notificacao.id !== row.id));
          setMessage({ type: 'success', text: 'Notificação excluída com sucesso!' });
          setTimeout(() => setMessage(null), 3000);
        } else {
          setMessage({ type: 'error', text: 'Erro ao excluir notificação' });
          setTimeout(() => setMessage(null), 3000);
        }
      } catch (error) {
        console.error('Erro ao excluir notificação:', error);
        setMessage({ type: 'error', text: 'Erro interno ao excluir' });
        setTimeout(() => setMessage(null), 3000);
      }
    }
  };

  const handleCloneClick = (row: Notificacao) => {
    // Por enquanto, apenas navega para edição com dados preenchidos
    navigate(`/notificacoes/editar/${row.id}?clone=true`);
  };

  const handleAddClick = () => {
    // Navegar para a nova tela unificada de cadastro de notificações
    navigate('/notificacoes/cadastrar/colaborador');
  };

  if (loading) {
    return (
      <div className="app-container">
        <HeaderPages title="Notificações do Colaborador" />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando notificações...</p>
        </div>
      </div>
    );
  }

  if (!colaborador) {
    return (
      <div className="app-container">
        <HeaderPages title="Notificações do Colaborador" />
        <div className="error-container">
          <p>Colaborador não encontrado</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <HeaderPages title={`Notificações - ${colaborador.nome}`} />
      
      {message && (
        <div className={`status-message status-${message.type}`}>
          {message.text}
        </div>
      )}
      
      <div className="listagem-container">
        <div className="table-header">
          <h2>Notificações de {colaborador.nome}</h2>
          <button 
            className="btn-adicionar"
            onClick={handleAddClick}
          >
            + Adicionar Notificação
          </button>
        </div>
        
        <DataTable
          title=""
          columns={columns}
          data={notificacoes}
          onRowClick={handleRowClick}
          onDeleteClick={handleDeleteClick}
          onCloneClick={handleCloneClick}
          showDeleteButton={true}
          showCloneButton={true}
          emptyMessage="Nenhuma notificação encontrada"
          pageSize={10}
        />
      </div>
    </div>
  );
};

export default ListagemNotificacoesColaborador; 