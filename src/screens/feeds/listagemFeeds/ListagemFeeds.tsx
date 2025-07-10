import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ListagemFeeds.css";
import HeaderPages from "../../../components/headerPages/HeaderPages";
import DataTable from "../../../components/dataTable/DataTable";
import FeedCadastroService, { Feed } from "../../../services/feed/feedCadastroService";

const ListagemFeeds = () => {
  const navigate = useNavigate();
  const [feeds, setFeeds] = useState<Feed[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const { listarFeeds, deletarFeed } = FeedCadastroService();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const feedsData = await listarFeeds();
        setFeeds(feedsData);
      } catch (error) {
        console.error('Erro ao carregar feeds:', error);
        setMessage({ type: 'error', text: 'Erro ao carregar feeds' });
        setTimeout(() => setMessage(null), 3000);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = [
    { 
      key: "titulo", 
      label: "Título", 
      width: "35%", 
      sortable: true 
    },
    { 
      key: "autor", 
      label: "Autor", 
      width: "25%", 
      sortable: true 
    },
    { 
      key: "data", 
      label: "Data", 
      width: "25%", 
      sortable: true,
      render: (value: string) => new Date(value).toLocaleDateString('pt-BR')
    },
    { 
      key: "urlFoto", 
      label: "Foto", 
      width: "15%", 
      sortable: false,
      render: (value: string) => value ? "Sim" : "Não"
    },
  ];

  const handleRowClick = (row: Feed) => {
    navigate(`/feeds/editar/${row.id}`);
  };

  const handleDeleteClick = async (row: Feed) => {
    if (window.confirm('Tem certeza que deseja excluir este feed?')) {
      try {
        const success = await deletarFeed(row.id);
        if (success) {
          setFeeds(feeds.filter(feed => feed.id !== row.id));
          setMessage({ type: 'success', text: 'Feed excluído com sucesso!' });
          setTimeout(() => setMessage(null), 3000);
        } else {
          setMessage({ type: 'error', text: 'Erro ao excluir feed' });
          setTimeout(() => setMessage(null), 3000);
        }
      } catch (error) {
        console.error('Erro ao excluir feed:', error);
        setMessage({ type: 'error', text: 'Erro interno ao excluir' });
        setTimeout(() => setMessage(null), 3000);
      }
    }
  };

  const handleCloneClick = (row: Feed) => {
    navigate(`/feeds/editar/${row.id}`, { 
      state: { isClone: true, originalData: row } 
    });
  };

  const handleAdicionarClick = () => {
    navigate("/post");
  };

  if (loading) {
    return (
      <div className="app-container">
        <HeaderPages title="Listagem de Feeds" />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando feeds...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <HeaderPages title="Listagem de Feeds" />
      
      {message && (
        <div className={`status-message status-${message.type}`}>
          {message.text}
        </div>
      )}
      
      <div className="listagem-container">
        <div className="table-header">
          <h2>Feeds</h2>
          <div className="table-actions">
            <button 
              className="btn-adicionar"
              onClick={handleAdicionarClick}
            >
              + Adicionar Feed
            </button>
          </div>
        </div>
        
        <DataTable
          title=""
          columns={columns}
          data={feeds}
          onRowClick={handleRowClick}
          onDeleteClick={handleDeleteClick}
          onCloneClick={handleCloneClick}
          showDeleteButton={true}
          showCloneButton={true}
          emptyMessage="Nenhum feed encontrado"
          pageSize={10}
        />
      </div>
    </div>
  );
};

export default ListagemFeeds; 