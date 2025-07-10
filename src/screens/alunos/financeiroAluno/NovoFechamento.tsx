import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./NovoFechamento.css";
import HeaderPages from "../../../components/headerPages/HeaderPages";
import AlunoCadastroService, { Aluno } from '../../../services/aluno/alunoCadastroService';

// Mock de meses pendentes (mantido por enquanto até ter API financeira)
const mockMesesPendentes = [
  { mes: "Março/2024", valor: 150.00 },
  { mes: "Abril/2024", valor: 150.00 },
  { mes: "Maio/2024", valor: 150.00 },
  { mes: "Junho/2024", valor: 150.00 },
  { mes: "Julho/2024", valor: 150.00 },
  { mes: "Agosto/2024", valor: 150.00 },
  { mes: "Setembro/2024", valor: 150.00 },
  { mes: "Outubro/2024", valor: 150.00 },
  { mes: "Novembro/2024", valor: 150.00 },
  { mes: "Dezembro/2024", valor: 150.00 },
  { mes: "Janeiro/2025", valor: 150.00 },
  { mes: "Fevereiro/2025", valor: 150.00 },
];

const NovoFechamento = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [aluno, setAluno] = useState<Aluno | null>(null);
  const [mesesPendentes, setMesesPendentes] = useState(mockMesesPendentes);
  const [loading, setLoading] = useState(true);
  
  // Estado do formulário
  const [formData, setFormData] = useState({
    mesesSelecionados: [] as string[],
    valorTotal: 0,
    formaPagamento: "",
    dataPagamento: new Date().toISOString().split('T')[0],
    observacoes: "",
    parcelas: 1
  });

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

  const handleMesToggle = (mes: string, valor: number) => {
    const novosMeses = formData.mesesSelecionados.includes(mes)
      ? formData.mesesSelecionados.filter(m => m !== mes)
      : [...formData.mesesSelecionados, mes];

    const novoValorTotal = novosMeses.length * valor;

    setFormData({
      ...formData,
      mesesSelecionados: novosMeses,
      valorTotal: novoValorTotal
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.mesesSelecionados.length === 0) {
      alert("Selecione pelo menos um mês para pagar.");
      return;
    }

    if (!formData.formaPagamento) {
      alert("Selecione uma forma de pagamento.");
      return;
    }

    // Aqui você faria a chamada para a API
    console.log("Dados do fechamento:", formData);
    
    alert("Fechamento registrado com sucesso!");
    navigate(`/alunos/${id}/financeiro`);
  };

  const handleCancelar = () => {
    navigate(`/alunos/${id}/financeiro`);
  };

  if (loading) {
    return (
      <div className="app-container">
        <HeaderPages title="Novo Fechamento - Carregando..." />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando dados do aluno...</p>
        </div>
      </div>
    );
  }

  if (!aluno) {
    return (
      <div className="app-container">
        <HeaderPages title="Novo Fechamento - Aluno não encontrado" />
        <div className="error-container">
          <p>Aluno não encontrado</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <HeaderPages title={`Novo Fechamento - ${aluno.nome}`} />
      
      <div className="novo-fechamento-container">
        {/* Informações do aluno */}
        <div className="aluno-info">
          <h2>{aluno.nome}</h2>
          <p><strong>Email:</strong> {aluno.email}</p>
          <p><strong>Telefone:</strong> {aluno.telefone}</p>
          <p><strong>Status:</strong> {aluno.adimplente ? 'Adimplente' : 'Inadimplente'}</p>
        </div>

        {/* Formulário de fechamento */}
        <form onSubmit={handleSubmit} className="fechamento-form">
          <div className="form-section">
            <h3>Meses Pendentes</h3>
            <div className="meses-grid">
              {mesesPendentes.map((mes, index) => (
                <div 
                  key={index} 
                  className={`mes-card ${formData.mesesSelecionados.includes(mes.mes) ? 'selected' : ''}`}
                  onClick={() => handleMesToggle(mes.mes, mes.valor)}
                >
                  <div className="mes-header">
                    <h4>{mes.mes}</h4>
                    <span className="valor">R$ {mes.valor.toFixed(2)}</span>
                  </div>
                  <div className="mes-checkbox">
                    <input
                      type="checkbox"
                      checked={formData.mesesSelecionados.includes(mes.mes)}
                      onChange={() => handleMesToggle(mes.mes, mes.valor)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="form-section">
            <h3>Dados do Pagamento</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Valor Total</label>
                <input
                  type="text"
                  value={`R$ ${formData.valorTotal.toFixed(2)}`}
                  readOnly
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label>Forma de Pagamento *</label>
                <select
                  name="formaPagamento"
                  value={formData.formaPagamento}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                >
                  <option value="">Selecione...</option>
                  <option value="PIX">PIX</option>
                  <option value="Cartão de Crédito">Cartão de Crédito</option>
                  <option value="Cartão de Débito">Cartão de Débito</option>
                  <option value="Dinheiro">Dinheiro</option>
                  <option value="Transferência">Transferência</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Data do Pagamento</label>
                <input
                  type="date"
                  name="dataPagamento"
                  value={formData.dataPagamento}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label>Número de Parcelas</label>
                <input
                  type="number"
                  name="parcelas"
                  value={formData.parcelas}
                  onChange={handleInputChange}
                  min="1"
                  max="12"
                  className="form-input"
                />
              </div>
            </div>
            
            <div className="form-group full-width">
              <label>Observações</label>
              <textarea
                name="observacoes"
                value={formData.observacoes}
                onChange={handleInputChange}
                className="form-input"
                rows={3}
                placeholder="Observações sobre o pagamento..."
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={handleCancelar} className="btn-cancelar">
              Cancelar
            </button>
            <button type="submit" className="btn-salvar">
              Registrar Fechamento
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NovoFechamento; 