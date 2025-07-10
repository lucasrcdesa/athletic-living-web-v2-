import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./IncluirNotificacaoAluno.css";
import HeaderPages from "../../../components/headerPages/HeaderPages";
import DynamicForm from "../../../components/DynamicForm/DynamicForm";

// Mock de dados do aluno
const mockAluno = {
  id: 1,
  nome: "João Silva",
  email: "joao@email.com"
};

// Mock de dados do formulário
const mockFormData = {
  sections: [
    {
      type: "notificacao",
      fields: [
        {
          name: "titulo",
          label: "Título",
          type: "text"
        },
        {
          name: "mensagem",
          label: "Mensagem",
          type: "text"
        },
        {
          name: "tipo",
          label: "Tipo",
          type: "select",
          options: [
            { value: "info", label: "Informação" },
            { value: "aviso", label: "Aviso" },
            { value: "urgente", label: "Urgente" }
          ]
        },
        {
          name: "prioridade",
          label: "Prioridade",
          type: "select",
          options: [
            { value: "baixa", label: "Baixa" },
            { value: "media", label: "Média" },
            { value: "alta", label: "Alta" }
          ]
        },
        {
          name: "observacoes",
          label: "Observações",
          type: "text"
        }
      ]
    }
  ]
};

const IncluirNotificacaoAluno = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [aluno, setAluno] = useState(mockAluno);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const handleSubmit = (formData: any) => {
    console.log('Dados da notificação:', formData);
    alert('Notificação enviada com sucesso!');
    navigate('/notificacoes/selecionar-aluno');
  };

  if (loading) {
    return (
      <div className="app-container">
        <HeaderPages title={`Incluir Notificação - ${aluno.nome}`} />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando dados do aluno...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <HeaderPages title={`Incluir Notificação - ${aluno.nome}`} />
      
      <div className="incluir-notificacao-container">
        <div className="aluno-info">
          <h3>Aluno: {aluno.nome}</h3>
          <p>Email: {aluno.email}</p>
        </div>
        
        <DynamicForm
          sections={mockFormData.sections}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default IncluirNotificacaoAluno; 