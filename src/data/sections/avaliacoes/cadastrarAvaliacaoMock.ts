import { Section } from "../../../components/DynamicForm/DynamicForm";

export const sections: Section[] = [
  {
    type: "double",
    fields: [
      { label: "Data da Avaliação", name: "data", type: "date" },
      { label: "ID do Aluno", name: "alunoId", type: "number" },
    ],
  },
  {
    type: "single",
    fields: [
      { 
        label: "Arquivo PDF", 
        name: "arquivo", 
        type: "file"
      },
    ],
  },
]; 