import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ListagemColaboradoresNotificacao.css";
import HeaderPages from "../../../components/headerPages/HeaderPages";
import DataTable from "../../../components/dataTable/DataTable";
import ColaboradorCadastroService, { Colaborador } from '../../../services/colaborador/colaboradorCadastroService';
import NotificacaoCadastroService from '../../../services/notificacao/notificacaoCadastroService';

const ListagemColaboradoresNotificacao = () => {
  const navigate = useNavigate();
  const [colaboradores, setColaboradores] = useState<Colaborador[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const { listarColaboradores } = ColaboradorCadastroService();
  const { listarNotificacoesPorColaborador } = NotificacaoCadastroService();

  useEffect(() => {
    const fetchColaboradores = async () => {
      setLoading(true);
      try {
        const colaboradoresData = await listarColaboradores();
        
        // Para cada colaborador, buscar o número de notificações
        const colaboradoresComNotificacoes = await Promise.all(
          colaboradoresData.map(async (colaborador) => {
            try {
              const notificacoes = await listarNotificacoesPorColaborador(colaborador.id);
              return {
                ...colaborador,
                notificacoesCount: notificacoes.length
              };
            } catch (error) {
              console.error(`Erro ao buscar notificações do colaborador ${colaborador.id}:`, error);
              return {
                ...colaborador,
                notificacoesCount: 0
              };
            }
          })
        );
        
        setColaboradores(colaboradoresComNotificacoes);
      } catch (error) {
        console.error('Erro ao carregar colaboradores:', error);
        setMessage({ type: 'error', text: 'Erro ao carregar colaboradores' });
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
      width: "30%", 
      sortable: true 
    },
    { 
      key: "funcao", 
      label: "Função", 
      width: "20%", 
      sortable: true 
    },
    {
      key: "notificacoesCount",
      label: "Notificações",
      width: "20%",
      sortable: true,
      render: (value: number) => (
        <span className={`notificacoes-count ${value > 0 ? 'has-notifications' : ''}`}>
          {value} notificação{value !== 1 ? 's' : ''}
        </span>
      ),
    },
  ];

  const handleRowClick = (row: Colaborador & { notificacoesCount: number }) => {
    navigate(`/notificacoes/colaborador/${row.id}`);
  };

  if (loading) {
    return (
      <div className="app-container">
        <HeaderPages title="Colaboradores - Notificações" />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando colaboradores...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <HeaderPages title="Colaboradores - Notificações" />
      
      {message && (
        <div className={`status-message status-${message.type}`}>
          {message.text}
        </div>
      )}
      
      <div className="listagem-container">
        <div className="table-header">
          <div>
            <h2>Colaboradores</h2>
            <p>Selecione um colaborador para ver suas notificações</p>
          </div>
          <button 
            className="btn-adicionar"
            onClick={() => navigate('/notificacoes/cadastrar')}
          >
            + Adicionar Notificação
          </button>
        </div>
        
        <DataTable
          title=""
          columns={columns}
          data={colaboradores}
          onRowClick={handleRowClick}
          emptyMessage="Nenhum colaborador encontrado"
          pageSize={10}
        />
      </div>
    </div>
  );
};

export default ListagemColaboradoresNotificacao; 