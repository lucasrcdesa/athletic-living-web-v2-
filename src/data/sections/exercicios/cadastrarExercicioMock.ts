import { Section } from "../../../components/DynamicForm/DynamicForm";

export const sections: Section[] = [
  {
    type: "double",
    fields: [
      { label: "Nome", name: "nome", type: "text" },
      { label: "Nome em Inglês", name: "ingles", type: "text" },
    ],
  },
  {
    type: "double",
    fields: [
      { label: "Equipamento", name: "equipamento", type: "text" },
      { label: "Simetria", name: "simetria", type: "text" },
    ],
  },
  {
    type: "double",
    fields: [
      { label: "Mãos", name: "maos", type: "text" },
      { label: "Carga (kg)", name: "carga", type: "number" },
    ],
  },
  {
    type: "double",
    fields: [
      { label: "Bloco", name: "bloco", type: "number" },
      { label: "URL do Vídeo", name: "urlVideo", type: "text" },
    ],
  },
  {
    type: "single",
    fields: [
      { label: "Observações", name: "observacoes", type: "textarea" },
    ],
  },
  {
    type: "double",
    fields: [
      { label: "Intervalo (seg)", name: "intervalo", type: "number" },
      { label: "Repetições", name: "repeticoes", type: "number" },
    ],
  },
  {
    type: "double",
    fields: [
      { label: "Tempo ou Reps", name: "tempoOuReps", type: "number" },
      { label: "Distância (m)", name: "distancia", type: "number" },
    ],
  },
  {
    type: "double",
    fields: [
      { label: "Pace", name: "pace", type: "text" },
      { label: "Séries", name: "series", type: "number" },
    ],
  },
  {
    type: "single",
    fields: [
      { label: "Ícone", name: "icon", type: "text" },
    ],
  },
  {
    type: "single",
    fields: [
      { 
        label: "Padrões de Movimento", 
        name: "padroesDeMovimento", 
        type: "multiselect",
        options: [
          { label: "Agachamento", value: "AGACHAMENTO" },
          { label: "Levantamento Terra", value: "LEVANTAMENTO_TERRA" },
          { label: "Supino", value: "SUPINO" },
          { label: "Remada", value: "REMADA" },
          { label: "Desenvolvimento", value: "DESENVOLVIMENTO" },
          { label: "Flexão", value: "FLEXAO" },
          { label: "Barra Fixa", value: "BARRA_FIXA" },
          { label: "Corrida", value: "CORRIDA" },
          { label: "Natação", value: "NATACAO" },
          { label: "Ciclismo", value: "CICLISMO" },
        ],
      },
    ],
  },
]; 