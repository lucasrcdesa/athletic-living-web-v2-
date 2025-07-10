import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./IncluirNotificacaoColaborador.css";
import HeaderPages from "../../../components/headerPages/HeaderPages";
import DynamicForm from "../../../components/DynamicForm/DynamicForm";

// Mock de dados do colaborador
const mockColaborador = {
  id: 1,
  nome: "Maria Santos",
  email: "maria@email.com",
  cargo: "Personal Trainer"
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

const IncluirNotificacaoColaborador = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [colaborador, setColaborador] = useState(mockColaborador);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const handleSubmit = (formData: any) => {
    console.log('Dados da notificação:', formData);
    alert('Notificação enviada com sucesso!');
    navigate('/notificacoes/selecionar-colaborador');
  };

  if (loading) {
    return (
      <div className="app-container">
        <HeaderPages title={`Incluir Notificação - ${colaborador.nome}`} />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando dados do colaborador...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <HeaderPages title={`Incluir Notificação - ${colaborador.nome}`} />
      
      <div className="incluir-notificacao-container">
        <div className="colaborador-info">
          <h3>Colaborador: {colaborador.nome}</h3>
          <p>Email: {colaborador.email}</p>
          <p>Cargo: {colaborador.cargo}</p>
        </div>
        
        <DynamicForm
          sections={mockFormData.sections}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default IncluirNotificacaoColaborador; 