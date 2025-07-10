import React from "react";
import Login from "../screens/login/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../screens/home/Home";
import CadastrarAluno from "../screens/alunos/cadastroAlunos/CadastroAluno";
import CadastrarColaborador from "../screens/colaboradores/cadastroColaborador/CadastrarColaborador";
import CadastrarExercicio from "../screens/exercicios/cadastroExercicio/CadastrarExercicio";
import EditarExercicio from "../screens/exercicios/editarExercicio/EditarExercicio";
import CadastrarTreino from "../screens/treinos/cadastroTreino/CadastrarTreino";
import CadastrarAtendimento from "../screens/atendimentos/cadastroAtendimento/CadastrarAtendimento";
import CadastrarNotificacaoAluno from "../screens/notificacoes/cadastroNotificacaoAluno/CadastrarNotificacaoAluno";
import CadastrarNotificacaoColaborador from "../screens/notificacoes/cadastroNotificacaoColaborador/CadastrarNotificacaoColaborador";
import CadastrarAvaliacao from "../screens/avaliacoes/cadastroAvaliacao/CadastrarAvaliacao";
import CadastrarFeed from "../screens/feeds/cadastroFeed/CadastrarFeed";
import CadastrarLancamento from "../screens/financeiro/cadastroLancamento/CadastrarLancamento";
import ListagemAlunos from "../screens/alunos/listagemAlunos/ListagemAlunos";
import ListagemColaboradores from "../screens/colaboradores/listagemColaboradores/ListagemColaboradores";
import ListagemExercicios from "../screens/exercicios/listagemExercicios/ListagemExercicios";
import ListagemTreinos from "../screens/treinos/listagemTreinos/ListagemTreinos";
import EditarAluno from "../screens/alunos/editarAluno/EditarAluno";
import EditarColaborador from "../screens/colaboradores/editarColaborador/EditarColaborador";
import EditarTreino from "../screens/treinos/editarTreino/EditarTreino";
import FinanceiroAluno from "../screens/alunos/financeiroAluno/FinanceiroAluno";
import MesesAluno from "../screens/alunos/financeiroAluno/MesesAluno";
import NovoFechamento from "../screens/alunos/financeiroAluno/NovoFechamento";
import CadastrarParcelas from "../screens/alunos/financeiroAluno/CadastrarParcelas";
import DiasColaborador from "../screens/colaboradores/pontoColaborador/DiasColaborador";
import DetalhesPonto from "../screens/colaboradores/pontoColaborador/DetalhesPonto";
import ListagemLancamentos from "../screens/financeiro/listagemLancamentos/ListagemLancamentos";
import ListagemFeeds from "../screens/feeds/listagemFeeds/ListagemFeeds";
import EditarFeed from "../screens/feeds/editarFeed/EditarFeed";
import SelecaoAlunoAtendimento from "../screens/alunos/listagemAlunos/SelecaoAlunoAtendimento";
import SelecaoAlunoNotificacao from "../screens/alunos/listagemAlunos/SelecaoAlunoNotificacao";
import SelecaoAlunoAvaliacao from "../screens/alunos/listagemAlunos/SelecaoAlunoAvaliacao";

import IncluirNotificacaoAluno from "../screens/notificacoes/cadastroNotificacaoAluno/IncluirNotificacaoAluno";
import IncluirAvaliacao from "../screens/avaliacoes/cadastroAvaliacao/IncluirAvaliacao";
import SelecaoColaboradorNotificacao from "../screens/colaboradores/listagemColaboradores/SelecaoColaboradorNotificacao";
import IncluirNotificacaoColaborador from "../screens/notificacoes/cadastroNotificacaoColaborador/IncluirNotificacaoColaborador";
import SelecaoAlunoPeriodizacao from "../screens/alunos/listagemAlunos/SelecaoAlunoPeriodizacao";
import ListagemAlunosPeriodizacao from "../screens/periodizacoes/listagemAlunosPeriodizacao/ListagemAlunosPeriodizacao";
import ListagemMacrociclos from "../screens/periodizacoes/listagemMacrociclos/ListagemMacrociclos";
import ListagemMesociclos from "../screens/periodizacoes/listagemMesociclos/ListagemMesociclos";
import ListagemMicrociclos from "../screens/periodizacoes/listagemMicrociclos/ListagemMicrociclos";
import EditarMacrociclo from "../screens/periodizacoes/editarMacrociclo/EditarMacrociclo";
import AdicionarMacrociclo from "../screens/periodizacoes/adicionarMacrociclo/AdicionarMacrociclo";
import EditarMesociclo from "../screens/periodizacoes/editarMesociclo/EditarMesociclo";
import EditarMicrociclo from "../screens/periodizacoes/editarMicrociclo/EditarMicrociclo";
import EditarLancamento from "../screens/financeiro/editarLancamento/EditarLancamento";
import ListagemAtendimentos from "../screens/atendimentos/listagemAtendimentos/ListagemAtendimentos";
import EditarAtendimento from "../screens/atendimentos/editarAtendimento/EditarAtendimento";
import ListagemAlunosNotificacao from "../screens/notificacoes/listagemAlunosNotificacao/ListagemAlunosNotificacao";
import ListagemNotificacoesAluno from "../screens/notificacoes/listagemNotificacoesAluno/ListagemNotificacoesAluno";
import EditarNotificacao from "../screens/notificacoes/editarNotificacao/EditarNotificacao";
import ListagemColaboradoresNotificacao from "../screens/notificacoes/listagemColaboradoresNotificacao/ListagemColaboradoresNotificacao";
import ListagemNotificacoesColaborador from "../screens/notificacoes/listagemNotificacoesColaborador/ListagemNotificacoesColaborador";
import ListagemAlunosAvaliacao from "../screens/avaliacoes/listagemAlunosAvaliacao/ListagemAlunosAvaliacao";
import ListagemAvaliacoesAluno from "../screens/avaliacoes/listagemAvaliacoesAluno/ListagemAvaliacoesAluno";
import EditarAvaliacao from "../screens/avaliacoes/editarAvaliacao/EditarAvaliacao";
import ListagemColaboradoresPontos from "../screens/colaboradores/pontoColaborador/ListagemColaboradoresPontos";
import ListagemPontos from "../screens/colaboradores/pontoColaborador/ListagemPontos";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        
        {/* Rotas de Alunos */}
        <Route path="/alunos/cadastrar" element={<CadastrarAluno />} />
        <Route path="/alunos/editar/:id" element={<EditarAluno />} />
        <Route path="/alunos/:id/treinos" element={<div>Página de Treinos do Aluno (a ser implementada)</div>} />
        <Route path="/alunos" element={<ListagemAlunos />} />
        <Route path="/alunos/financeiro" element={<FinanceiroAluno />} />
        <Route path="/alunos/:id/financeiro/cadastrar-parcelas" element={<CadastrarParcelas />} />
        <Route path="/alunos/:id/financeiro" element={<MesesAluno />} />
        <Route path="/alunos/:id/financeiro/novo-fechamento" element={<NovoFechamento />} />
        
        {/* Rotas de Colaboradores */}
        <Route path="/colaboradores/cadastrar" element={<CadastrarColaborador />} />
        <Route path="/colaboradores/editar/:id" element={<EditarColaborador />} />
        <Route path="/colaboradores/:id/treinos" element={<div>Página de Treinos do Colaborador (a ser implementada)</div>} />
        <Route path="/colaboradores" element={<ListagemColaboradores />} />
        <Route path="/colaboradores/ponto" element={<ListagemColaboradoresPontos />} />
        <Route path="/colaboradores/ponto/listagem/:colaboradorId" element={<ListagemPontos />} />
        <Route path="/colaboradores/:id/ponto" element={<DiasColaborador />} />
        <Route path="/colaboradores/:id/ponto/:data" element={<DetalhesPonto />} />
        
        {/* Rotas de Exercícios */}
        <Route path="/exercicios/cadastrar" element={<CadastrarExercicio />} />
        <Route path="/exercicios/editar/:id" element={<EditarExercicio />} />
        <Route path="/exercicios" element={<ListagemExercicios />} />
        
        {/* Rotas de Treinos */}
        <Route path="/treinos/cadastrar" element={<CadastrarTreino />} />
        <Route path="/treinos/editar/:id" element={<EditarTreino />} /> 
        <Route path="/treinos" element={<ListagemTreinos />} />
        
        {/* Rotas de Atendimentos */}
        <Route path="/atendimentos" element={<ListagemAtendimentos />} />
        <Route path="/atendimentos/cadastrar" element={<CadastrarAtendimento />} />
        <Route path="/atendimentos/editar/:id" element={<EditarAtendimento />} />
        
        {/* Rotas de Notificações */}
        <Route path="/notificacoes/alunos" element={<CadastrarNotificacaoAluno />} />
        <Route path="/notificacoes/colaboradores" element={<CadastrarNotificacaoColaborador />} />
        <Route path="/notificacoes/listagem-alunos" element={<ListagemAlunosNotificacao />} />
        <Route path="/notificacoes/aluno/:id" element={<ListagemNotificacoesAluno />} />
        <Route path="/notificacoes/editar/:id" element={<EditarNotificacao />} />
        <Route path="/notificacoes/selecionar-aluno" element={<SelecaoAlunoNotificacao />} />
        <Route path="/notificacoes/alunos/incluir/:id" element={<IncluirNotificacaoAluno />} />
        <Route path="/notificacoes/listagem-colaboradores" element={<ListagemColaboradoresNotificacao />} />
        <Route path="/notificacoes/colaborador/:id" element={<ListagemNotificacoesColaborador />} />
        <Route path="/notificacoes/selecionar-colaborador" element={<SelecaoColaboradorNotificacao />} />
        <Route path="/notificacoes/colaboradores/incluir/:id" element={<IncluirNotificacaoColaborador />} />
        
        {/* Rotas de Avaliações */}
        <Route path="/avaliacao" element={<CadastrarAvaliacao />} />
        <Route path="/avaliacoes/selecionar-aluno" element={<SelecaoAlunoAvaliacao />} />
        <Route path="/avaliacao/incluir/:id" element={<IncluirAvaliacao />} />
        <Route path="/avaliacoes/listagem-alunos" element={<ListagemAlunosAvaliacao />} />
        <Route path="/avaliacoes/aluno/:id" element={<ListagemAvaliacoesAluno />} />
        <Route path="/avaliacoes/editar/:id" element={<EditarAvaliacao />} />
        
        {/* Rotas de Feeds */}
        <Route path="/post" element={<CadastrarFeed />} />
        <Route path="/feeds/listagem" element={<ListagemFeeds />} />
        <Route path="/feeds/editar/:id" element={<EditarFeed />} />
        
        {/* Rotas de Financeiro */}
        <Route path="/lancamentos" element={<CadastrarLancamento />} />
        <Route path="/lancamentos/listagem" element={<ListagemLancamentos />} />
        <Route path="/lancamentos/editar/:id" element={<EditarLancamento />} />
        
        {/* Rotas de Periodizações */}
        <Route path="/periodizacoes" element={<ListagemAlunosPeriodizacao />} />
        <Route path="/periodizacoes/macrociclos/:id" element={<ListagemMacrociclos />} />
        <Route path="/periodizacoes/mesociclos/:id" element={<ListagemMesociclos />} />
        <Route path="/periodizacoes/microciclos/:id" element={<ListagemMicrociclos />} />
        <Route path="/periodizacoes/editar-macrociclo/:id" element={<EditarMacrociclo />} />
        <Route path="/periodizacoes/editar-mesociclo/:id" element={<EditarMesociclo />} />
        <Route path="/periodizacoes/editar-microciclo/:id" element={<EditarMicrociclo />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
