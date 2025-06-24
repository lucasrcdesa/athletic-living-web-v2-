import { useCallback } from "react";

interface MenuOption {
  label: string;
  onClick: () => void;
}

export const useMenuOptions = () => {
  const alunosMenu: MenuOption[] = [
    {
      label: "Cadastrar Aluno",
      onClick: () => console.log("Cadastrar Aluno"),
    },
    {
      label: "Financeiro Aluno",
      onClick: () => console.log("Financeiro Aluno"),
    },
    {
      label: "Alterar Dados",
      onClick: () => console.log("Alterar Dados"),
    },
    {
      label: "Periodizações",
      onClick: () => {},
    },
  ];

  const colaboradoresMenu: MenuOption[] = [
    {
      label: "Cadastrar Colaborador",
      onClick: () => console.log("Cadastrar Colaborador"),
    },
    {
      label: "Ponto Colaborador",
      onClick: () => console.log("Ponto Colaborador"),
    },
    {
      label: "Alterar Dados",
      onClick: () => console.log("Alterar Dados"),
    },
  ];

  const treinosMenu: MenuOption[] = [
    {
      label: "Cadastrar Treino",
      onClick: () => console.log("Cadastrar Treino"),
    },
    {
      label: "Alterar Treino",
      onClick: () => console.log("Alterar Treino"),
    },
  ];

  const financeiroMenu: MenuOption[] = [
    {
      label: "Cadastrar Lançamento",
      onClick: () => console.log("Cadastrar Lançamento"),
    },
    {
      label: "Alterar Lançamento",
      onClick: () => console.log("Alterar Lançamento"),
    },
  ];

  const getMenuOptions = useCallback(
    (menuType: string | null): MenuOption[] => {
      switch (menuType) {
        case "alunos":
          return alunosMenu;
        case "colaboradores":
          return colaboradoresMenu;
        case "treinos":
          return treinosMenu;
        case "financeiro":
          return financeiroMenu;
        default:
          return [];
      }
    },
    []
  );

  return {
    getMenuOptions,
    alunosMenu,
    colaboradoresMenu,
    treinosMenu,
    financeiroMenu,
  };
};
