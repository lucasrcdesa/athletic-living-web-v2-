import { Section } from "../../../components/DynamicForm/DynamicForm";

export const sections: Section[] = [
  {
    type: "single",
    fields: [
      { label: "Nome do Treino", name: "nome", type: "text" },
    ],
  },
  {
    type: "double",
    fields: [
      { label: "Data", name: "dia", type: "date" },
      { label: "URL do Vídeo", name: "urlVideo", type: "text" },
    ],
  },
  {
    type: "double",
    fields: [
      { label: "Número de Blocos", name: "numDeBlocos", type: "number" },
      { label: "PSE", name: "pse", type: "number" },
    ],
  },
  {
    type: "double",
    fields: [
      { label: "PSE Estimado", name: "pseEstimado", type: "number" },
      { label: "Modalidade", name: "modalidade", type: "text" },
    ],
  },
  {
    type: "double",
    fields: [
      { label: "Tempo Estimado (min)", name: "tempoEstimado", type: "number" },
      { label: "Tempo Realizado (min)", name: "tempoRealizado", type: "number" },
    ],
  },
  {
    type: "double",
    fields: [
      { label: "Carga Estimada (kg)", name: "cargaEstimada", type: "number" },
      { label: "Carga Real (kg)", name: "cargaReal", type: "number" },
    ],
  },
  {
    type: "double",
    fields: [
      { label: "Distância Prescrita (m)", name: "distanciaPrescrita", type: "number" },
      { label: "Distância Realizada (m)", name: "distanciaRealizada", type: "number" },
    ],
  },
  {
    type: "double",
    fields: [
      { label: "Característica", name: "caracteristica", type: "text" },
      { label: "Área do Treino", name: "areaTreino", type: "text" },
    ],
  },
  {
    type: "single",
    fields: [
      { 
        label: "Padrões de Movimento", 
        name: "padraoMovimento", 
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