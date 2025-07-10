import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "./EditarFeed.css";
import HeaderPages from "../../../components/headerPages/HeaderPages";
import { EditForm, FormSection } from "../../../components";
import { FeedFormData, FeedUpdateDTO } from "../../../services/feed/feedCadastroService";
import FeedCadastroService from "../../../services/feed/feedCadastroService";

const EditarFeed = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const { isClone, originalData } = location.state || {};
  
  const [feed, setFeed] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const { buscarFeedPorId, alterarFeed } = FeedCadastroService();

  // Configuração do formulário usando o componente EditForm
  const formSections: FormSection[] = [
    {
      title: "Dados do Feed",
      fields: [
        {
          name: "titulo",
          label: "Título",
          type: "text",
          required: true,
          placeholder: "Ex: Feliz natal!"
        },
        {
          name: "autor",
          label: "Autor",
          type: "text",
          required: true,
          placeholder: "Ex: Pedro Rodrigues"
        },
        {
          name: "data",
          label: "Data",
          type: "date",
          required: true
        },
        {
          name: "texto",
          label: "Texto",
          type: "textarea",
          rows: 5,
          required: true,
          placeholder: "Ex: Hoje foi dia de treino funcional intenso com foco em resistência e mobilidade."
        },
        {
          name: "urlFoto",
          label: "URL da Foto",
          type: "text",
          placeholder: "Ex: https://exemplo.com/foto.jpg"
        }
      ]
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      if (!id || id === '0') return;

      setLoading(true);
      try {
        if (isClone && originalData) {
          // Modo clone - usar dados originais
          setFeed(originalData);
        } else {
          // Buscar dados do feed
          const feedData = await buscarFeedPorId(parseInt(id));
          if (feedData) {
            setFeed(feedData);
          }
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        setMessage({ type: 'error', text: 'Erro ao carregar dados' });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, isClone, originalData]);

  const handleSave = async (formData: Record<string, any>) => {
    if (!feed) return;

    setSaving(true);
    try {
      const dadosAtualizados: FeedUpdateDTO = {};
      
      // Só enviar campos que foram alterados
      if (formData.titulo !== feed.titulo) dadosAtualizados.titulo = formData.titulo;
      if (formData.texto !== feed.texto) dadosAtualizados.texto = formData.texto;
      if (formData.autor !== feed.autor) dadosAtualizados.autor = formData.autor;
      if (formData.data !== feed.data) dadosAtualizados.data = formData.data;
      if (formData.urlFoto !== feed.urlFoto) dadosAtualizados.urlFoto = formData.urlFoto;

      if (Object.keys(dadosAtualizados).length === 0) {
        setMessage({ type: 'error', text: 'Nenhuma alteração foi feita' });
        setTimeout(() => setMessage(null), 3000);
        setSaving(false);
        return;
      }

      const resultado = await alterarFeed(feed.id, dadosAtualizados);
      
      if (resultado) {
        setMessage({ type: 'success', text: 'Feed atualizado com sucesso!' });
        setTimeout(() => {
          navigate('/feeds/listagem');
        }, 2000);
      } else {
        setMessage({ type: 'error', text: 'Erro ao atualizar feed' });
      }
    } catch (error) {
      console.error('Erro ao salvar:', error);
      setMessage({ type: 'error', text: 'Erro interno ao salvar' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="app-container">
        <HeaderPages title="Editar Feed" />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando dados...</p>
        </div>
      </div>
    );
  }

  if (!feed) {
    return (
      <div className="app-container">
        <HeaderPages title="Editar Feed" />
        <div className="error-container">
          <p>Feed não encontrado</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <HeaderPages title={`Editar Feed - ${feed.titulo}`} />
      
      {message && (
        <div className={`status-message status-${message.type}`}>
          {message.text}
        </div>
      )}
      
      <EditForm
        title={`${isClone ? 'Clonar' : 'Editar'} Feed`}
        description="Edite as informações do feed abaixo."
        entityName="feed"
        sections={formSections}
        initialData={{
          titulo: feed.titulo,
          texto: feed.texto,
          autor: feed.autor,
          data: feed.data,
          urlFoto: feed.urlFoto || ''
        }}
        loading={saving}
        onSave={handleSave}
        backUrl="/feeds/listagem"
      />
    </div>
  );
};

export default EditarFeed; 