import React, { useState } from "react";
import "./CadastrarFeed.css";
import HeaderPages from "../../../components/headerPages/HeaderPages";
import DynamicForm from "../../../components/DynamicForm/DynamicForm";
import { sections } from "../../../data/sections/feeds/cadastrarFeedMock";
import { FeedFormData } from "../../../services/feed/feedCadastroService";
import FeedCadastroService from "../../../services/feed/feedCadastroService";

const CadastrarFeed = () => {
  const { cadastrarFeed } = FeedCadastroService();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const formatarDados = (formData: Record<string, any>): FeedFormData => {
    return {
      titulo: formData.titulo.trim(),
      texto: formData.texto.trim(),
      autor: formData.autor.trim(),
      data: formData.data || new Date().toISOString().split('T')[0],
      urlFoto: formData.urlFoto?.trim() || null,
    };
  };

  const handleSubmit = async (formData: Record<string, any>) => {
    setLoading(true);
    setMessage(null);

    try {
      if (!formData.titulo || !formData.texto || !formData.autor) {
        setMessage({
          type: 'error',
          text: 'Por favor, preencha título, conteúdo e autor.'
        });
        return;
      }

      const dadosFormatados = formatarDados(formData);
      const resultado = await cadastrarFeed(dadosFormatados);
      
      if (resultado) {
        setMessage({
          type: 'success',
          text: 'Post do feed cadastrado com sucesso!'
        });
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage({
          type: 'error',
          text: 'Erro ao cadastrar post. Tente novamente.'
        });
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Erro interno. Tente novamente mais tarde.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <HeaderPages title="Cadastrar Post do Feed" />
      
      {message && (
        <div className={`status-message status-${message.type}`}>
          {message.text}
        </div>
      )}
      
      <DynamicForm 
        title="Dados do Post"
        description="Preencha os dados abaixo para cadastrar um novo post no feed."
        sections={sections} 
        onSubmit={handleSubmit}
        disabled={loading}
      />
      
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner">Cadastrando...</div>
        </div>
      )}
    </div>
  );
};

export default CadastrarFeed; 