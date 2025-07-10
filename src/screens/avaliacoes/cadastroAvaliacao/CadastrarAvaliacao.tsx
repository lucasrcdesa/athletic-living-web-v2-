import React, { useState } from "react";
import "./CadastrarAvaliacao.css";
import HeaderPages from "../../../components/headerPages/HeaderPages";
import DynamicForm from "../../../components/DynamicForm/DynamicForm";
import { sections } from "../../../data/sections/avaliacoes/cadastrarAvaliacaoMock";
import { AvaliacaoFormData } from "../../../services/avaliacao/avaliacaoCadastroService";
import AvaliacaoCadastroService from "../../../services/avaliacao/avaliacaoCadastroService";

const CadastrarAvaliacao = () => {
  const { cadastrarAvaliacao } = AvaliacaoCadastroService();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const formatarDados = (formData: Record<string, any>): AvaliacaoFormData => {
    return {
      data: formData.data || new Date().toISOString().split('T')[0],
      alunoId: parseInt(formData.alunoId) || 0,
      arquivo: formData.arquivo || '', // URL do arquivo será tratada posteriormente
    };
  };

  const handleSubmit = async (formData: Record<string, any>) => {
    setLoading(true);
    setMessage(null);

    try {
      if (!formData.data || !formData.alunoId || !formData.arquivo) {
        setMessage({
          type: 'error',
          text: 'Por favor, preencha todos os campos obrigatórios.'
        });
        return;
      }

      const dadosFormatados = formatarDados(formData);
      const resultado = await cadastrarAvaliacao(dadosFormatados);
      
      if (resultado) {
        setMessage({
          type: 'success',
          text: 'Avaliação física cadastrada com sucesso!'
        });
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage({
          type: 'error',
          text: 'Erro ao cadastrar avaliação. Tente novamente.'
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
      <HeaderPages title="Cadastrar Avaliação Física" />
      
      {message && (
        <div className={`status-message status-${message.type}`}>
          {message.text}
        </div>
      )}
      
      <DynamicForm 
        title="Dados da Avaliação Física"
        description="Preencha os dados abaixo para cadastrar uma avaliação física."
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

export default CadastrarAvaliacao; 