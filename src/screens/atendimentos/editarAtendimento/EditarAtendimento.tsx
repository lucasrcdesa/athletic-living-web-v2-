import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EditarAtendimento.css";
import HeaderPages from "../../../components/headerPages/HeaderPages";
import { EditForm, FormSection } from "../../../components";

// Mock de dados do atendimento (baseado no modelo Java)
const mockAtendimento = {
  id: 1,
  dataHora: "2024-02-15T10:00",
  tipo: "AVALIACAO_FISICA",
  observacoes: "Avaliação física completa do aluno João Silva",
  alunosIds: [1, 2],
  colaboradoresIds: [1]
};

const Atendimento = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [atendimento, setAtendimento] = useState(mockAtendimento);
  const [loading, setLoading] = useState(true);

  // Configuração do formulário usando o novo componente EditForm
  const formSections: FormSection[] = [
    {
      title: "Informações do Atendimento",
      fields: [
        {
          name: "dataHora",
          label: "Data e Hora",
          type: "text",
          required: true
        },
        {
          name: "tipo",
          label: "Tipo de Atendimento",
          type: "select",
          required: true,
          options: [
            { label: "Avaliação Física", value: "AVALIACAO_FISICA" },
            { label: "Consulta", value: "CONSULTA" },
            { label: "Treino", value: "TREINO" },
            { label: "Nutrição", value: "NUTRICAO" },
            { label: "Fisioterapia", value: "FISIOTERAPIA" },
            { label: "Outro", value: "OUTRO" }
          ]
        }
      ]
    },
    {
      title: "Observações",
      fields: [
        {
          name: "observacoes",
          label: "Observações",
          type: "textarea",
          rows: 4
        }
      ]
    }
  ];

  useEffect(() => {
    // Simula busca do atendimento pelo ID
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleSave = (formData: Record<string, any>) => {
    console.log('Dados do formulário:', formData);
    alert('Atendimento atualizado com sucesso!');
    navigate('/atendimentos/listagem');
  };

  return (
    <div className="app-container">
      <HeaderPages title="Atendimento" />
      
      <EditForm
        title={`Atendimento #${atendimento.id}`}
        description="Edite as informações do atendimento."
        entityName="atendimento"
        sections={formSections}
        initialData={{
          dataHora: atendimento.dataHora,
          tipo: atendimento.tipo,
          observacoes: atendimento.observacoes
        }}
        loading={loading}
        onSave={handleSave}
        backUrl="/atendimentos/listagem"
      />
    </div>
  );
};

export default Atendimento; 