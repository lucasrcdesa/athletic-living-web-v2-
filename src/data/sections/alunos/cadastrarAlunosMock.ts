import { Section } from "../../../components/DynamicForm/DynamicForm";

export const sections: Section[] = [
  {
    type: "double",
    fields: [
      { label: "Nome", name: "nome", type: "text" },
      { label: "Sobrenome", name: "sobrenome", type: "text" },
    ],
  },
  {
    type: "single",
    fields: [{ label: "Email", name: "email", type: "email" }],
  },
  {
    type: "single",
    fields: [{ label: "Telefone", name: "telefone", type: "tel" }],
  },
  {
    type: "double",
    fields: [
      { label: "CPF", name: "cpf", type: "text" },
      { label: "Nascimento", name: "nascimento", type: "date" },
    ],
  },
  {
    type: "double",
    fields: [
      { label: "Endereço", name: "endereco", type: "text" },
      { label: "CEP", name: "cep", type: "text" },
    ],
  },
];
