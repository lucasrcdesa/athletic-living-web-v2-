import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./IncluirAvaliacao.css";
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
      type: "avaliacao",
      fields: [
        {
          name: "peso",
          label: "Peso (kg)",
          type: "number"
        },
        {
          name: "altura",
          label: "Altura (cm)",
          type: "number"
        },
        {
          name: "imc",
          label: "IMC",
          type: "number"
        },
        {
          name: "gordura_corporal",
          label: "Gordura Corporal (%)",
          type: "number"
        },
        {
          name: "massa_muscular",
          label: "Massa Muscular (kg)",
          type: "number"
        },
        {
          name: "circunferencia_braco",
          label: "Circunferência Braço (cm)",
          type: "number"
        },
        {
          name: "circunferencia_perna",
          label: "Circunferência Perna (cm)",
          type: "number"
        },
        {
          name: "circunferencia_cintura",
          label: "Circunferência Cintura (cm)",
          type: "number"
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

const IncluirAvaliacao = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [aluno, setAluno] = useState(mockAluno);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const handleSubmit = (formData: any) => {
    console.log('Dados da avaliação:', formData);
    alert('Avaliação registrada com sucesso!');
    navigate('/avaliacoes/selecionar-aluno');
  };

  if (loading) {
    return (
      <div className="app-container">
        <HeaderPages title={`Incluir Avaliação - ${aluno.nome}`} />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando dados do aluno...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <HeaderPages title={`Incluir Avaliação - ${aluno.nome}`} />
      
      <div className="incluir-avaliacao-container">
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

export default IncluirAvaliacao; 