import React, { useState } from "react";
import "./CadastrarColaborador.css";
import HeaderPages from "../../../components/headerPages/HeaderPages";
import DynamicForm from "../../../components/DynamicForm/DynamicForm";
import { sections } from "../../../data/sections/colaboradores/cadastrarColaboradorMock";
import { ColaboradorFormData } from "../../../services/colaborador/colaboradorCadastroService";
import ColaboradorCadastroService from "../../../services/colaborador/colaboradorCadastroService";

const CadastrarColaborador = () => {
  const { cadastrarColaborador } = ColaboradorCadastroService();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const formatarDados = (formData: Record<string, any>): ColaboradorFormData => {
    return {
      nome: formData.nome.trim(),
      mail: formData.mail.trim(),
      cpf: formData.cpf.replace(/\D/g, ''),
      funcao: formData.funcao,
    };
  };

  const handleSubmit = async (formData: Record<string, any>) => {
    setLoading(true);
    setMessage(null);

    try {
      if (!formData.nome || !formData.mail || !formData.cpf || !formData.funcao) {
        setMessage({
          type: 'error',
          text: 'Por favor, preencha todos os campos obrigatórios.'
        });
        return;
      }

      const dadosFormatados = formatarDados(formData);
      const resultado = await cadastrarColaborador(dadosFormatados);
      
      if (resultado) {
        setMessage({
          type: 'success',
          text: 'Colaborador cadastrado com sucesso!'
        });
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage({
          type: 'error',
          text: 'Erro ao cadastrar colaborador. Tente novamente.'
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
      <HeaderPages title="Cadastrar Colaborador" />
      
      {message && (
        <div className={`status-message status-${message.type}`}>
          {message.text}
        </div>
      )}
      
      <DynamicForm 
        title="Dados do Colaborador"
        description="Preencha os dados abaixo para cadastrar um novo colaborador."
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

export default CadastrarColaborador;
