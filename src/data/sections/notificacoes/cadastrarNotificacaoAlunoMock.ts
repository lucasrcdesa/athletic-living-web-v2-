import { Section } from "../../../components/DynamicForm/DynamicForm";

export const sections: Section[] = [
  {
    type: "single",
    fields: [
      { label: "Título da Notificação", name: "nome", type: "text" },
    ],
  },
  {
    type: "double",
    fields: [
      {
        label: "Tipo de Notificação",
        name: "tipo",
        type: "select",
        options: [
          { label: "Lembrete de Treino", value: "LEMBRETE_TREINO" },
          { label: "Avaliação Pendente", value: "AVALIACAO_PENDENTE" },
          { label: "Treino Cancelado", value: "TREINO_CANCELADO" },
          { label: "Treino Remarcado", value: "TREINO_REMARCADO" },
          { label: "Dica de Treino", value: "DICA_TREINO" },
          { label: "Motivação", value: "MOTIVACAO" },
          { label: "Sistema", value: "SISTEMA" },
          { label: "Outro", value: "OUTRO" },
        ],
      },
      {
        label: "Prioridade",
        name: "prioridade",
        type: "select",
        options: [
          { label: "Alta", value: "alta" },
          { label: "Média", value: "media" },
          { label: "Baixa", value: "baixa" },
        ],
      },
    ],
  },
  {
    type: "single",
    fields: [
      { label: "Mensagem", name: "texto", type: "textarea" },
    ],
  },
]; 