import { Section } from "../../../components/DynamicForm";

export const sections: Section[] = [
  {
    type: "double",
    fields: [
      { label: "Nome", id: "nome", type: "text" },
      { label: "Sobrenome", id: "sobrenome", type: "text" },
    ],
  },
  {
    type: "single",
    fields: [{ label: "Email", id: "email", type: "email" }],
  },
  {
    type: "single",
    fields: [{ label: "Telefone", id: "telefone", type: "tel" }],
  },
  {
    type: "double",
    fields: [
      { label: "CPF", id: "cpf", type: "text" },
      { label: "Nascimento", id: "nascimento", type: "date" },
    ],
  },
  {
    type: "double",
    fields: [
      { label: "Endereço", id: "endereco", type: "text" },
      { label: "CEP", id: "cep", type: "text" },
    ],
  },
];
