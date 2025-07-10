import React, { useState } from "react";
import "./CadastroAlunos.css";
import HeaderPages from "../../../components/headerPages/HeaderPages";
import DynamicForm from "../../../components/DynamicForm/DynamicForm";
import { sections } from "../../../data/sections/alunos/cadastrarAlunosMock";
import { AlunoFormData } from "../../../services/aluno/alunoCadastroService";
import AlunoCadastroService from "../../../services/aluno/alunoCadastroService";

const CadastrarAluno = () => {
  const { cadastrarAluno } = AlunoCadastroService();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const formatarDados = (formData: Record<string, any>): AlunoFormData => {
    const nomeCompleto = `${formData.nome} ${formData.sobrenome}`.trim();
    
    return {
      nome: nomeCompleto,
      nascimento: formData.nascimento,
      telefone: formData.telefone.replace(/\D/g, ''),
      email: formData.email.trim(),
      endereco: formData.endereco?.trim() || '',
      cep: formData.cep?.replace(/\D/g, '') || '',
      cpf: formData.cpf.replace(/\D/g, ''),
    };
  };

  const handleSubmit = async (formData: Record<string, any>) => {
    setLoading(true);
    setMessage(null);

    try {
      if (!formData.nome || !formData.sobrenome || !formData.email || !formData.cpf) {
        setMessage({
          type: 'error',
          text: 'Por favor, preencha todos os campos obrigatórios.'
        });
        return;
      }

      const dadosFormatados = formatarDados(formData);
      const resultado = await cadastrarAluno(dadosFormatados);
      
      if (resultado) {
        setMessage({
          type: 'success',
          text: 'Aluno cadastrado com sucesso!'
        });
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage({
          type: 'error',
          text: 'Erro ao cadastrar aluno. Tente novamente.'
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
      <HeaderPages title="Cadastrar Aluno" />
      
      {message && (
        <div className={`status-message status-${message.type}`}>
          {message.text}
        </div>
      )}
      
      <DynamicForm 
        title="Dados do Aluno"
        description="Preencha os dados abaixo para cadastrar um novo aluno."
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

export default CadastrarAluno;
