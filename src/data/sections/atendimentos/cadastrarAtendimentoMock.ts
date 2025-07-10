import { Section } from "../../../components/DynamicForm/DynamicForm";

export const sections: Section[] = [
  {
    type: "double",
    fields: [
      { label: "Data e Hora", name: "dataHora", type: "datetime-local" },
      {
        label: "Tipo de Atendimento",
        name: "tipo",
        type: "select",
        options: [
          { label: "Avaliação Física", value: "AVALIACAO_FISICA" },
          { label: "Treino Personalizado", value: "TREINO_PERSONALIZADO" },
          { label: "Consultoria Nutricional", value: "CONSULTORIA_NUTRICIONAL" },
          { label: "Acompanhamento", value: "ACOMPANHAMENTO" },
          { label: "Reavaliação", value: "REAVALIACAO" },
          { label: "Outro", value: "OUTRO" },
        ],
      },
    ],
  },
  {
    type: "single",
    fields: [
      { label: "Observações", name: "observacoes", type: "textarea" },
    ],
  },
]; 