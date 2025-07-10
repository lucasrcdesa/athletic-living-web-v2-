import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CadastrarTreino.css";
import HeaderPages from "../../../components/headerPages/HeaderPages";
import DynamicForm from "../../../components/DynamicForm/DynamicForm";
import { sections } from "../../../data/sections/treinos/cadastrarTreinoMock";
import { TreinoFormData } from "../../../services/treino/treinoCadastroService";
import TreinoCadastroService from "../../../services/treino/treinoCadastroService";

const CadastrarTreino = () => {
  const navigate = useNavigate();
  const { cadastrarTreino } = TreinoCadastroService();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});

  const formatarDados = (formData: Record<string, any>): TreinoFormData => {
    return {
      nome: formData.nome.trim(),
      feito: false,
      dia: formData.dia || new Date().toISOString().split('T')[0],
      urlVideo: formData.urlVideo.trim(),
      numDeBlocos: parseFloat(formData.numDeBlocos) || 0,
      pse: parseInt(formData.pse) || 0,
      pseEstimado: parseInt(formData.pseEstimado) || 0,
      modalidade: formData.modalidade.trim(),
      tempoEstimado: formData.tempoEstimado ? `${formData.tempoEstimado}:00` : "00:00:00",
      tempoRealizado: formData.tempoRealizado ? `${formData.tempoRealizado}:00` : "00:00:00",
      cargaEstimada: parseInt(formData.cargaEstimada) || 0,
      cargaReal: parseInt(formData.cargaReal) || 0,
      padraoMovimento: Array.isArray(formData.padraoMovimento) 
        ? formData.padraoMovimento 
        : [],
      distanciaPrescrita: parseFloat(formData.distanciaPrescrita) || 0,
      distanciaRealizada: parseFloat(formData.distanciaRealizada) || 0,
      caracteristica: formData.caracteristica.trim(),
      areaTreino: formData.areaTreino.trim(),
      microcicloId: null,
      alunosIds: [],
      colaboradoresIds: [],
      exerciciosIds: [],
    };
  };

  const handleFormChange = (data: Record<string, any>) => {
    setFormData(data);
  };

  const handleSubmit = async (formData: Record<string, any>) => {
    setLoading(true);
    setMessage(null);

    try {
      if (!formData.nome) {
        setMessage({
          type: 'error',
          text: 'Por favor, preencha pelo menos o nome do treino.'
        });
        return;
      }

      const dadosFormatados = formatarDados(formData);
      const resultado = await cadastrarTreino(dadosFormatados);
      
      if (resultado) {
        setMessage({
          type: 'success',
          text: 'Treino cadastrado com sucesso! Agora você pode adicionar exercícios, alunos e colaboradores.'
        });
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage({
          type: 'error',
          text: 'Erro ao cadastrar treino. Tente novamente.'
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

  const handleSelecionarExercicios = () => {
    // Navegar para tela de seleção de exercícios
    navigate('/selecionar-exercicios', { state: { treinoId: formData.id } });
  };

  const handleSelecionarAlunos = () => {
    // Navegar para tela de seleção de alunos
    navigate('/selecionar-alunos', { state: { treinoId: formData.id } });
  };

  const handleSelecionarColaboradores = () => {
    // Navegar para tela de seleção de colaboradores
    navigate('/selecionar-colaboradores', { state: { treinoId: formData.id } });
  };

  return (
    <div className="app-container">
      <HeaderPages title="Cadastrar Treino" />
      
      {message && (
        <div className={`status-message status-${message.type}`}>
          {message.text}
        </div>
      )}
      
      <DynamicForm 
        title="Dados do Treino"
        description="Preencha os dados abaixo para cadastrar um novo treino."
        sections={sections} 
        onSubmit={handleSubmit}
        disabled={loading}
      />

      <div className="selection-buttons">
        <button 
          className="selection-button"
          onClick={handleSelecionarExercicios}
          disabled={loading}
        >
          Selecionar Exercícios
        </button>
        
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

export default CadastrarTreino; 