import React, { useState } from "react";
import "./CadastrarNotificacaoColaborador.css";
import HeaderPages from "../../../components/headerPages/HeaderPages";
import DynamicForm from "../../../components/DynamicForm/DynamicForm";
import { sections } from "../../../data/sections/notificacoes/cadastrarNotificacaoColaboradorMock";
import { NotificacaoFormData } from "../../../services/notificacao/notificacaoCadastroService";
import NotificacaoCadastroService from "../../../services/notificacao/notificacaoCadastroService";

const CadastrarNotificacaoColaborador = () => {
  const { cadastrarNotificacao } = NotificacaoCadastroService();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const formatarDados = (formData: Record<string, any>): NotificacaoFormData => {
    return {
      nome: formData.nome.trim(),
      tipo: formData.tipo,
      texto: formData.texto.trim(),
      colaboradorId: parseInt(formData.colaboradorId) || undefined,
      alunoId: undefined,
      lida: false,
    };
  };

  const handleSubmit = async (formData: Record<string, any>) => {
    setLoading(true);
    setMessage(null);

    try {
      if (!formData.nome || !formData.tipo || !formData.texto || !formData.colaboradorId) {
        setMessage({
          type: 'error',
          text: 'Por favor, preencha todos os campos obrigatórios.'
        });
        return;
      }

      const dadosFormatados = formatarDados(formData);
      const resultado = await cadastrarNotificacao(dadosFormatados);
      
      if (resultado) {
        setMessage({
          type: 'success',
          text: 'Notificação para colaborador cadastrada com sucesso!'
        });
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage({
          type: 'error',
          text: 'Erro ao cadastrar notificação. Tente novamente.'
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
      <HeaderPages title="Cadastrar Notificação - Colaborador" />
      
      {message && (
        <div className={`status-message status-${message.type}`}>
          {message.text}
        </div>
      )}
      
      <DynamicForm 
        title="Dados da Notificação para Colaborador"
        description="Preencha os dados abaixo para cadastrar uma notificação para o colaborador."
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

export default CadastrarNotificacaoColaborador; 