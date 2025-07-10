import { Section } from "../../../components/DynamicForm/DynamicForm";

export const sections: Section[] = [
  {
    type: "single",
    fields: [
      { label: "Título do Post", name: "titulo", type: "text" },
    ],
  },
  {
    type: "double",
    fields: [
      { label: "Autor", name: "autor", type: "text" },
      { label: "Data", name: "data", type: "date" },
    ],
  },
  {
    type: "single",
    fields: [
      { label: "Conteúdo", name: "texto", type: "textarea" },
    ],
  },
  {
    type: "single",
    fields: [
      { label: "URL da Foto", name: "urlFoto", type: "text" },
    ],
  },
]; 