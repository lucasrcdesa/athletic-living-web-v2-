import { Section } from "../../../components/DynamicForm";

export const sections: Section[] = [
  {
    type: "double",
    fields: [
      { label: "Nome", id: "nome", type: "text" },
      { label: "Email", id: "mail", type: "email" },
    ],
  },
  {
    type: "double",
    fields: [
      { label: "CPF", id: "cpf", type: "text" },
      {
        label: "Função",
        id: "funcao",
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
