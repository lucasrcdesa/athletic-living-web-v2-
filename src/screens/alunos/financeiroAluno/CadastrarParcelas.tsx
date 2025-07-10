import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./CadastrarParcelas.css";
import HeaderPages from "../../../components/headerPages/HeaderPages";
import AlunoCadastroService, { Aluno } from '../../../services/aluno/alunoCadastroService';
import LancamentoCadastroService, { FinanceiroRequestDTO } from '../../../services/financeiro/lancamentoCadastroService';

const CadastrarParcelas = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [aluno, setAluno] = useState<Aluno | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [formData, setFormData] = useState({
    valorMensal: '',
    quantidadeMeses: '12',
    dataInicio: '',
    vigencia: ''
  });

  const { buscarAlunoPorId } = AlunoCadastroService();
  const { cadastrarFinanceiro } = LancamentoCadastroService();

  useEffect(() => {
    const fetchAluno = async () => {
      if (!id) return;

      setLoading(true);
      try {
        const alunoData = await buscarAlunoPorId(parseInt(id));
        if (!alunoData) {
          setMessage({ type: 'error', text: 'Aluno não encontrado' });
          return;
        }
        setAluno(alunoData);
      } catch (error) {
        console.error('Erro ao carregar dados do aluno:', error);
        setMessage({ type: 'error', text: 'Erro ao carregar dados do aluno' });
      } finally {
        setLoading(false);
      }
    };

    fetchAluno();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!aluno || !id) return;

    try {
      const dto: FinanceiroRequestDTO = {
        alunoId: parseInt(id),
        vigencia: formData.vigencia,
        valorMensal: parseFloat(formData.valorMensal),
        quantidadeMeses: parseInt(formData.quantidadeMeses),
        dataInicio: formData.dataInicio
      };

      const financeiro = await cadastrarFinanceiro(dto);
      
      if (financeiro) {
        setMessage({ type: 'success', text: 'Parcelas cadastradas com sucesso!' });
        setTimeout(() => {
          navigate(`/alunos/${id}/financeiro`);
        }, 2000);
      } else {
        setMessage({ type: 'error', text: 'Erro ao cadastrar parcelas' });
      }
    } catch (error) {
      console.error('Erro ao salvar parcelas:', error);
      setMessage({ type: 'error', text: 'Erro interno ao salvar' });
    }
  };

  const calcularDataFim = () => {
    if (!formData.dataInicio || !formData.quantidadeMeses) return '';
    
    const dataInicio = new Date(formData.dataInicio);
    const dataFim = new Date(dataInicio);
    dataFim.setMonth(dataFim.getMonth() + parseInt(formData.quantidadeMeses) - 1);
    
    return dataFim.toISOString().split('T')[0];
  };

  const calcularValorTotal = () => {
    const valor = parseFloat(formData.valorMensal) || 0;
    const meses = parseInt(formData.quantidadeMeses) || 0;
    return (valor * meses).toFixed(2);
  };

  if (loading) {
    return (
      <div className="app-container">
        <HeaderPages title="Cadastrar Parcelas" />
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
        <HeaderPages title="Cadastrar Parcelas" />
        <div className="error-container">
          <p>Aluno não encontrado</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <HeaderPages title="Cadastrar Parcelas" />
      
      {message && (
        <div className={`status-message status-${message.type}`}>
          {message.text}
        </div>
      )}
      
      <div className="cadastrar-parcelas-container">
        <div className="aluno-info">
          <h2>Cadastrar Parcelas para {aluno.nome}</h2>
          <p><strong>Email:</strong> {aluno.email}</p>
          <p><strong>Telefone:</strong> {aluno.telefone}</p>
        </div>

        <form onSubmit={handleSubmit} className="parcelas-form">
          <div className="form-section">
            <h3>Informações do Contrato</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="vigencia">Vigência do Contrato</label>
                <input
                  type="text"
                  id="vigencia"
                  name="vigencia"
                  value={formData.vigencia}
                  onChange={handleInputChange}
                  placeholder="ex: 2024-2025"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="dataInicio">Data de Início</label>
                <input
                  type="date"
                  id="dataInicio"
                  name="dataInicio"
                  value={formData.dataInicio}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="quantidadeMeses">Quantidade de Meses</label>
                <select
                  id="quantidadeMeses"
                  name="quantidadeMeses"
                  value={formData.quantidadeMeses}
                  onChange={handleInputChange}
                  required
                >
                  <option value="6">6 meses</option>
                  <option value="12">12 meses</option>
                  <option value="18">18 meses</option>
                  <option value="24">24 meses</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="valorMensal">Valor Mensal (R$)</label>
                <input
                  type="number"
                  id="valorMensal"
                  name="valorMensal"
                  value={formData.valorMensal}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  required
                />
              </div>
            </div>
          </div>

          <div className="resumo-section">
            <h3>Resumo do Contrato</h3>
            <div className="resumo-grid">
              <div className="resumo-item">
                <span className="label">Data de Início:</span>
                <span className="value">{formData.dataInicio || 'Não definida'}</span>
              </div>
              <div className="resumo-item">
                <span className="label">Data de Fim:</span>
                <span className="value">{calcularDataFim() || 'Não definida'}</span>
              </div>
              <div className="resumo-item">
                <span className="label">Quantidade de Parcelas:</span>
                <span className="value">{formData.quantidadeMeses} meses</span>
              </div>
              <div className="resumo-item">
                <span className="label">Valor por Parcela:</span>
                <span className="value">R$ {parseFloat(formData.valorMensal || '0').toFixed(2)}</span>
              </div>
              <div className="resumo-item total">
                <span className="label">Valor Total:</span>
                <span className="value">R$ {calcularValorTotal()}</span>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancelar" onClick={() => navigate(`/alunos/${id}/financeiro`)}>
              Cancelar
            </button>
            <button type="submit" className="btn-salvar">
              Cadastrar Parcelas
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CadastrarParcelas; 