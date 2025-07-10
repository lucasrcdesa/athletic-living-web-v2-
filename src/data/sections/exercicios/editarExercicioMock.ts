import { Section } from "../../../components/DynamicForm/DynamicForm";

export const sections: Section[] = [
  {
    type: "informacoes-basicas",
    fields: [
      {
        label: "Nome do Exercício",
        name: "nome",
        type: "text"
      },
      {
        label: "Categoria",
        name: "categoria",
        type: "select",
        options: [
          { label: "Peito", value: "Peito" },
          { label: "Costas", value: "Costas" },
          { label: "Ombros", value: "Ombros" },
          { label: "Bíceps", value: "Bíceps" },
          { label: "Tríceps", value: "Tríceps" },
          { label: "Pernas", value: "Pernas" },
          { label: "Abdômen", value: "Abdômen" },
          { label: "Cardio", value: "Cardio" }
        ]
      },
      {
        label: "Equipamento",
        name: "equipamento",
        type: "select",
        options: [
          { label: "Barra", value: "Barra" },
          { label: "Halteres", value: "Halteres" },
          { label: "Polia", value: "Polia" },
          { label: "Máquina", value: "Máquina" },
          { label: "Peso Corporal", value: "Peso Corporal" },
          { label: "Cabo", value: "Cabo" },
          { label: "Elástico", value: "Elástico" },
          { label: "Outros", value: "Outros" }
        ]
      },
      {
        label: "Dificuldade",
        name: "dificuldade",
        type: "select",
        options: [
          { label: "Iniciante", value: "Iniciante" },
          { label: "Intermediário", value: "Intermediário" },
          { label: "Avançado", value: "Avançado" }
        ]
      }
    ]
  },
  {
    type: "descricao",
    fields: [
      {
        label: "Descrição",
        name: "descricao",
        type: "text"
      },
      {
        label: "Instruções de Execução",
        name: "instrucoes",
        type: "text"
      },
      {
        label: "Observações",
        name: "observacoes",
        type: "text"
      }
    ]
  }
]; 