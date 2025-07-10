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
          { label: "Reunião", value: "REUNIAO" },
          { label: "Treino Cancelado", value: "TREINO_CANCELADO" },
          { label: "Novo Aluno", value: "NOVO_ALUNO" },
          { label: "Sistema", value: "SISTEMA" },
          { label: "Outro", value: "OUTRO" },
        ],
      },
      { label: "ID do Colaborador", name: "colaboradorId", type: "number" },
    ],
  },
  {
    type: "single",
    fields: [
      { label: "Mensagem", name: "texto", type: "textarea" },
    ],
  },
]; 