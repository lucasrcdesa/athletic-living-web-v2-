export type Financeiro = {
  id: number;
  aluno: string;
  valor: number;
  status: "Pago" | "Pendente" | "Atrasado";
  vencimento: string;
};

export const dadosFinanceiro: Financeiro[] = [
  {
    id: 1,
    aluno: "João Silva",
    valor: 120.5,
    status: "Pago",
    vencimento: "2024-06-10",
  },
  {
    id: 2,
    aluno: "Maria Souza",
    valor: 100.0,
    status: "Pendente",
    vencimento: "2024-06-20",
  },
  {
    id: 3,
    aluno: "Carlos Lima",
    valor: 150.0,
    status: "Atrasado",
    vencimento: "2024-06-01",
  },
  {
    id: 4,
    aluno: "Fernanda Dias",
    valor: 130.75,
    status: "Pago",
    vencimento: "2024-06-05",
  },
  {
    id: 5,
    aluno: "Lucas Mendes",
    valor: 90.0,
    status: "Pendente",
    vencimento: "2024-06-22",
  },
];
