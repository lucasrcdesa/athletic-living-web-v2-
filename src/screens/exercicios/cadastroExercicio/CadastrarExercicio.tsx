import React, { useState } from "react";
import "./CadastrarExercicio.css";
import HeaderPages from "../../../components/headerPages/HeaderPages";
import DynamicForm from "../../../components/DynamicForm/DynamicForm";
import { sections } from "../../../data/sections/exercicios/cadastrarExercicioMock";
import { ExercicioFormData } from "../../../services/exercicio/exercicioCadastroService";
import ExercicioCadastroService from "../../../services/exercicio/exercicioCadastroService";

const CadastrarExercicio = () => {
  const { cadastrarExercicio } = ExercicioCadastroService();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const formatarDados = (formData: Record<string, any>): ExercicioFormData => {
    return {
      nome: formData.nome.trim(),
      ingles: formData.ingles.trim(),
      equipamento: formData.equipamento.trim(),
      simetria: formData.simetria.trim(),
      maos: formData.maos.trim(),
      carga: parseFloat(formData.carga) || 0,
      bloco: parseInt(formData.bloco) || 0,
      urlVideo: formData.urlVideo.trim(),
      observacoes: formData.observacoes.trim(),
      intervalo: parseInt(formData.intervalo) || 0,
      repeticoes: parseInt(formData.repeticoes) || 0,
      tempoOuReps: parseInt(formData.tempoOuReps) || 0,
      distancia: parseInt(formData.distancia) || 0,
      pace: formData.pace.trim(),
      series: parseInt(formData.series) || 0,
      icon: formData.icon.trim(),
      padroesDeMovimento: Array.isArray(formData.padroesDeMovimento) 
        ? formData.padroesDeMovimento 
        : [],
    };
  };

  const handleSubmit = async (formData: Record<string, any>) => {
    setLoading(true);
    setMessage(null);

    try {
      if (!formData.nome || !formData.ingles) {
        setMessage({
          type: 'error',
          text: 'Por favor, preencha pelo menos o nome e nome em inglês.'
        });
        return;
      }

      const dadosFormatados = formatarDados(formData);
      const resultado = await cadastrarExercicio(dadosFormatados);
      
      if (resultado) {
        setMessage({
          type: 'success',
          text: 'Exercício cadastrado com sucesso!'
        });
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage({
          type: 'error',
          text: 'Erro ao cadastrar exercício. Tente novamente.'
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
      <HeaderPages title="Cadastrar Exercício" />
      
      {message && (
        <div className={`status-message status-${message.type}`}>
          {message.text}
        </div>
      )}
      
      <DynamicForm 
        title="Dados do Exercício"
        description="Preencha os dados abaixo para cadastrar um novo exercício."
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

export default CadastrarExercicio; 