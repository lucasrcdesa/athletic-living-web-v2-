import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CadastrarAtendimento.css";
import HeaderPages from "../../../components/headerPages/HeaderPages";
import DynamicForm from "../../../components/DynamicForm/DynamicForm";
import { sections } from "../../../data/sections/atendimentos/cadastrarAtendimentoMock";
import { AtendimentoFormData } from "../../../services/atendimento/atendimentoCadastroService";
import AtendimentoCadastroService from "../../../services/atendimento/atendimentoCadastroService";

const CadastrarAtendimento = () => {
  const navigate = useNavigate();
  const { cadastrarAtendimento } = AtendimentoCadastroService();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});

  const formatarDados = (formData: Record<string, any>): AtendimentoFormData => {
    return {
      dataHora: formData.dataHora || new Date().toISOString().slice(0, 16),
      tipo: formData.tipo || '',
      observacoes: formData.observacoes.trim(),
      alunosIds: [],
      colaboradoresIds: [],
    };
  };

  const handleSubmit = async (formData: Record<string, any>) => {
    setLoading(true);
    setMessage(null);

    try {
      if (!formData.dataHora || !formData.tipo) {
        setMessage({
          type: 'error',
          text: 'Por favor, preencha a data/hora e o tipo de atendimento.'
        });
        return;
      }

      const dadosFormatados = formatarDados(formData);
      const resultado = await cadastrarAtendimento(dadosFormatados);
      
      if (resultado) {
        setMessage({
          type: 'success',
          text: 'Atendimento cadastrado com sucesso! Agora você pode adicionar alunos e colaboradores.'
        });
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage({
          type: 'error',
          text: 'Erro ao cadastrar atendimento. Tente novamente.'
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

  const handleSelecionarAlunos = () => {
    // Navegar para tela de seleção de alunos
    navigate('/selecionar-alunos-atendimento', { state: { atendimentoId: formData.id } });
  };

  const handleSelecionarColaboradores = () => {
    // Navegar para tela de seleção de colaboradores
    navigate('/selecionar-colaboradores-atendimento', { state: { atendimentoId: formData.id } });
  };

  return (
    <div className="app-container">
      <HeaderPages title="Cadastrar Atendimento" />
      
      {message && (
        <div className={`status-message status-${message.type}`}>
          {message.text}
        </div>
      )}
      
      <DynamicForm 
        title="Dados do Atendimento"
        description="Preencha os dados abaixo para cadastrar um novo atendimento."
        sections={sections} 
        onSubmit={handleSubmit}
        disabled={loading}
      />

      <div className="selection-buttons">
        <button 
          className="selection-button"
          onClick={handleSelecionarAlunos}
          disabled={loading}
        >
          Selecionar Alunos
        </button>
        
        <button 
          className="selection-button"
          onClick={handleSelecionarColaboradores}
          disabled={loading}
        >
          Selecionar Colaboradores
        </button>
      </div>
      
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner">Cadastrando...</div>
        </div>
      )}
    </div>
  );
};

export default CadastrarAtendimento; 