import { Section } from "../../../components/DynamicForm/DynamicForm";

export const sections: Section[] = [
  {
    type: "single",
    fields: [
      { label: "Nome", name: "nome", type: "text" },
    ],
  },
  {
    type: "single",
    fields: [
      { label: "Email", name: "mail", type: "email" },
    ],
  },
  {
    type: "double",
    fields: [
      { label: "CPF", name: "cpf", type: "text" },
      {
        label: "Função",
        name: "funcao",
        type: "select",
        options: [
          { label: "Personal", value: "PERSONAL" },
          { label: "Nutricionista", value: "NUTRICIONISTA" },
          { label: "Recepcionista", value: "RECEPCIONISTA" },
          { label: "Gestor", value: "GESTOR" },
        ],
      },
    ],
  },
];
