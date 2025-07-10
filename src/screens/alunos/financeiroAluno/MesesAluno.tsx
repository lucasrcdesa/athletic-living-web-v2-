import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./MesesAluno.css";
import HeaderPages from "../../../components/headerPages/HeaderPages";
import AlunoCadastroService, { Aluno } from '../../../services/aluno/alunoCadastroService';

// Mock de dados dos meses (mantido por enquanto até ter API financeira)
const mockMeses = [
  { mes: "Janeiro/2024", status: "pago", valor: 150.00, dataPagamento: "2024-01-15", formaPagamento: "PIX" },
  { mes: "Fevereiro/2024", status: "pago", valor: 150.00, dataPagamento: "2024-02-10", formaPagamento: "Cartão" },
  { mes: "Março/2024", status: "pendente", valor: 150.00, dataPagamento: null, formaPagamento: null },
  { mes: "Abril/2024", status: "pendente", valor: 150.00, dataPagamento: null, formaPagamento: null },
  { mes: "Maio/2024", status: "pendente", valor: 150.00, dataPagamento: null, formaPagamento: null },
  { mes: "Junho/2024", status: "pendente", valor: 150.00, dataPagamento: null, formaPagamento: null },
  { mes: "Julho/2024", status: "pendente", valor: 150.00, dataPagamento: null, formaPagamento: null },
  { mes: "Agosto/2024", status: "pendente", valor: 150.00, dataPagamento: null, formaPagamento: null },
  { mes: "Setembro/2024", status: "pendente", valor: 150.00, dataPagamento: null, formaPagamento: null },
  { mes: "Outubro/2024", status: "pendente", valor: 150.00, dataPagamento: null, formaPagamento: null },
  { mes: "Novembro/2024", status: "pendente", valor: 150.00, dataPagamento: null, formaPagamento: null },
  { mes: "Dezembro/2024", status: "pendente", valor: 150.00, dataPagamento: null, formaPagamento: null },
];

const MesesAluno = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [aluno, setAluno] = useState<Aluno | null>(null);
  const [meses, setMeses] = useState(mockMeses);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAluno = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const { buscarAlunoPorId } = AlunoCadastroService();
        const alunoData = await buscarAlunoPorId(parseInt(id));
        if (alunoData) {
          setAluno(alunoData);
        } else {
          console.error('Aluno não encontrado');
          navigate('/alunos');
        }
      } catch (error) {
        console.error('Erro ao buscar aluno:', error);
        navigate('/alunos');
      } finally {
        setLoading(false);
      }
    };

    fetchAluno();
  }, [id, navigate]);

  const handleAdicionarFechamento = () => {
    navigate(`/alunos/${id}/financeiro/novo-fechamento`);
  };

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      pago: "status-pago",
      pendente: "status-pendente",
      atrasado: "status-atrasado"
    };

    const statusLabels = {
      pago: "Pago",
      pendente: "Pendente",
      atrasado: "Atrasado"
    };

    return (
      <span className={`status-badge ${statusClasses[status as keyof typeof statusClasses]}`}>
        {statusLabels[status as keyof typeof statusLabels]}
      </span>
    );
  };

  const totalPago = meses
    .filter(mes => mes.status === "pago")
    .reduce((total, mes) => total + mes.valor, 0);

  const totalPendente = meses
    .filter(mes => mes.status === "pendente")
    .reduce((total, mes) => total + mes.valor, 0);

  if (loading) {
    return (
      <div className="app-container">
        <HeaderPages title="Financeiro - Carregando..." />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando dados financeiros...</p>
        </div>
      </div>
    );
  }

  if (!aluno) {
    return (
      <div className="app-container">
        <HeaderPages title="Financeiro - Aluno não encontrado" />
        <div className="error-container">
          <p>Aluno não encontrado</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <HeaderPages title={`Financeiro - ${aluno.nome}`} />
      
      <div className="meses-container">
        {/* Informações do aluno */}
        <div className="aluno-info">
          <h2>{aluno.nome}</h2>
          <p><strong>Email:</strong> {aluno.email}</p>
          <p><strong>Telefone:</strong> {aluno.telefone}</p>
          <p><strong>Status:</strong> {aluno.adimplente ? 'Adimplente' : 'Inadimplente'}</p>
        </div>

        {/* Resumo financeiro */}
        <div className="resumo-financeiro">
          <div className="resumo-card">
            <h3>Total Pago</h3>
            <p className="valor-positivo">R$ {totalPago.toFixed(2)}</p>
          </div>
          <div className="resumo-card">
            <h3>Total Pendente</h3>
            <p className="valor-negativo">R$ {totalPendente.toFixed(2)}</p>
          </div>
          <div className="resumo-card">
            <h3>Mensalidade</h3>
            <p>R$ 150.00</p>
          </div>
        </div>

        {/* Botão para adicionar fechamento */}
        <div className="acoes-container">
          <button 
            className="btn-adicionar-fechamento"
            onClick={handleAdicionarFechamento}
          >
            + Adicionar Fechamento
          </button>
        </div>

        {/* Lista de meses */}
        <div className="meses-lista">
          <h3>Histórico de Pagamentos</h3>
          <div className="meses-grid">
            {meses.map((mes, index) => (
              <div key={index} className="mes-card">
                <div className="mes-header">
                  <h4>{mes.mes}</h4>
                  {getStatusBadge(mes.status)}
                </div>
                <div className="mes-details">
                  <p><strong>Valor:</strong> R$ {mes.valor.toFixed(2)}</p>
                  {mes.dataPagamento && (
                    <p><strong>Data Pagamento:</strong> {new Date(mes.dataPagamento).toLocaleDateString('pt-BR')}</p>
                  )}
                  {mes.formaPagamento && (
                    <p><strong>Forma:</strong> {mes.formaPagamento}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MesesAluno; 