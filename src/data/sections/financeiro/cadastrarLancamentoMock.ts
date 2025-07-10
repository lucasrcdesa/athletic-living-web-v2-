import { Section } from "../../../components/DynamicForm/DynamicForm";

export const sections: Section[] = [
  {
    type: "double",
    fields: [
      {
        label: "Tipo",
        name: "tipo",
        type: "select",
        options: [
          { label: "Receita", value: "RECEITA" },
          { label: "Despesa", value: "DESPESA" },
          { label: "Faturamento", value: "FATURAMENTO" },
        ],
      },
      {
        label: "Data",
        name: "data",
        type: "date",
      },
    ],
  },
  {
    type: "double",
    fields: [
      { label: "Valor (R$)", name: "valor", type: "number" },
    ],
  },
  {
    type: "single",
    fields: [
      { label: "Descrição", name: "descricao", type: "text" },
    ],
  },
  {
    type: "single",
    fields: [
      { label: "Observações", name: "observacoes", type: "textarea" },
    ],
  },
]; 