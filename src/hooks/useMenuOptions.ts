import { useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export interface MenuOption {
  label: string;
  onClick: () => void;
}

export const useMenuOptions = () => {
  const navigate = useNavigate();
  
  const alunosMenu: MenuOption[] = useMemo(() => [
    {
      label: "Cadastrar Aluno",
      onClick: () => navigate("/alunos/cadastrar"),
    },
    {
      label: "Editar Aluno",
      onClick: () => navigate("/alunos"),
    },
    {
      label: "Financeiro Aluno",
      onClick: () => navigate("/alunos/financeiro"),
    },
    {
      label: "Atendimentos",
      onClick: () => navigate("/atendimentos"),
    },
    {
      label: "Notificações",
      onClick: () => navigate("/notificacoes/listagem-alunos"),
    },
    {
      label: "Avaliações",
      onClick: () => navigate("/avaliacoes/listagem-alunos"),
    },
    {
      label: "Periodizações",
      onClick: () => navigate("/periodizacoes"),
    },
  ], [navigate]);

  const colaboradoresMenu: MenuOption[] = useMemo(() => [
    {
      label: "Cadastrar Colaborador",
      onClick: () => navigate("/colaboradores/cadastrar"),
    },
    {
      label: "Editar Colaborador",
      onClick: () => navigate("/colaboradores"),
    },
    {
      label: "Listagem de Pontos",
      onClick: () => navigate("/colaboradores/ponto"),
    },
    {
      label: "Notificações",
      onClick: () => navigate("/notificacoes/listagem-colaboradores"),
    },
  ], [navigate]);

  const treinosMenu: MenuOption[] = useMemo(() => [
    {
      label: "Cadastrar Treino",
      onClick: () => navigate("/treinos/cadastrar"),
    },
    {
      label: "Editar Treino",
      onClick: () => navigate("/treinos"),
    },
    {
      label: "Cadastrar Exercício",
      onClick: () => navigate("/exercicios/cadastrar"),
    },
    {
      label: "Editar Exercício",
      onClick: () => navigate("/exercicios"),
    },
  ], [navigate]);

  const financeiroMenu: MenuOption[] = useMemo(() => [
    {
      label: "Cadastrar Lançamento",
      onClick: () => navigate("/lancamentos"),
    },
    {
      label: "Editar Lançamento",
      onClick: () => navigate("/lancamentos/listagem"),
    },
    {
      label: "Gerenciar Postagens",
      onClick: () => navigate("/feeds/listagem"),
    },
  ], [navigate]);

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
    [alunosMenu, colaboradoresMenu, treinosMenu, financeiroMenu]
  );

  return {
    getMenuOptions,
    alunosMenu,
    colaboradoresMenu,
    treinosMenu,
    financeiroMenu,
  };
};
