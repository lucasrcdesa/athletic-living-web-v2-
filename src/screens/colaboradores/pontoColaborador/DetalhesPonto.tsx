import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./DetalhesPonto.css";
import HeaderPages from "../../../components/headerPages/HeaderPages";

// Mock de dados do colaborador
const mockColaborador = {
  id: 1,
  nome: "João Silva",
  email: "joao@academia.com",
  cargo: "Personal Trainer",
  cargaHoraria: 160
};

// Mock de dados do ponto do dia
const mockPontoDia = {
  data: "2024-02-15",
  diaSemana: "Quinta-feira",
  entrada: "08:00",
  saida: "18:00",
  totalHoras: 10,
  status: "completo",
  observacoes: "",
  horarioEsperado: {
    entrada: "08:00",
    saida: "18:00"
  },
  atrasos: {
    entrada: 0,
    saida: 0
  },
  intervalos: [
    {
      inicio: "12:00",
      fim: "13:00",
      duracao: 60
    }
  ]
};

const DetalhesPonto = () => {
  const navigate = useNavigate();
  const { id, data } = useParams();
  const [colaborador, setColaborador] = useState(mockColaborador);
  const [pontoDia, setPontoDia] = useState(mockPontoDia);
  const [loading, setLoading] = useState(true);
  
  // Estado do formulário de validação
  const [formData, setFormData] = useState({
    entrada: pontoDia.entrada,
    saida: pontoDia.saida,
    observacoes: pontoDia.observacoes,
    status: pontoDia.status
  });

  useEffect(() => {
    // Simula carregamento de dados
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.entrada || !formData.saida) {
      alert("Preencha os horários de entrada e saída.");
      return;
    }

    // Aqui você faria a chamada para a API
    console.log("Dados do ponto validado:", formData);
    
    alert("Ponto validado com sucesso!");
    navigate(`/colaboradores/${id}/ponto`);
  };

  const handleCancelar = () => {
    navigate(`/colaboradores/${id}/ponto`);
  };

  const calcularAtrasos = () => {
    const entradaEsperada = new Date(`2024-02-15 ${pontoDia.horarioEsperado.entrada}`);
    const entradaReal = new Date(`2024-02-15 ${formData.entrada}`);
    const saidaEsperada = new Date(`2024-02-15 ${pontoDia.horarioEsperado.saida}`);
    const saidaReal = new Date(`2024-02-15 ${formData.saida}`);

    const atrasoEntrada = Math.max(0, (entradaReal.getTime() - entradaEsperada.getTime()) / (1000 * 60));
    const atrasoSaida = Math.max(0, (saidaEsperada.getTime() - saidaReal.getTime()) / (1000 * 60));

    return {
      entrada: atrasoEntrada,
      saida: atrasoSaida
    };
  };

  const atrasos = calcularAtrasos();

  if (loading) {
    return (
      <div className="app-container">
        <HeaderPages title="Detalhes do Ponto" />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando dados do ponto...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <HeaderPages title="Detalhes do Ponto" />
      
      <div className="detalhes-container">
        {/* Informações do colaborador e dia */}
        <div className="info-header">
          <div className="colaborador-info">
            <h2>{colaborador.nome}</h2>
            <p><strong>Cargo:</strong> {colaborador.cargo}</p>
            <p><strong>Email:</strong> {colaborador.email}</p>
          </div>
          <div className="dia-info">
            <h3>{new Date(data!).toLocaleDateString('pt-BR')}</h3>
            <p>{pontoDia.diaSemana}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="ponto-form">
          {/* Horários */}
          <div className="form-section">
            <h3>Horários do Ponto</h3>
            
            <div className="horarios-grid">
              <div className="horario-card">
                <h4>Entrada</h4>
                <div className="horario-detalhes">
                  <div className="form-group">
                    <label htmlFor="entrada">Horário Real</label>
                    <input
                      type="time"
                      id="entrada"
                      name="entrada"
                      value={formData.entrada}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="horario-esperado">
                    <p><strong>Esperado:</strong> {pontoDia.horarioEsperado.entrada}</p>
                    {atrasos.entrada > 0 && (
                      <p className="atraso">Atraso: {atrasos.entrada.toFixed(0)} min</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="horario-card">
                <h4>Saída</h4>
                <div className="horario-detalhes">
                  <div className="form-group">
                    <label htmlFor="saida">Horário Real</label>
                    <input
                      type="time"
                      id="saida"
                      name="saida"
                      value={formData.saida}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="horario-esperado">
                    <p><strong>Esperado:</strong> {pontoDia.horarioEsperado.saida}</p>
                    {atrasos.saida > 0 && (
                      <p className="atraso">Antecipação: {atrasos.saida.toFixed(0)} min</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Resumo do dia */}
          <div className="resumo-dia">
            <h3>Resumo do Dia</h3>
            <div className="resumo-grid">
              <div className="resumo-item">
                <span>Total de Horas:</span>
                <strong>{pontoDia.totalHoras}h</strong>
              </div>
              <div className="resumo-item">
                <span>Status:</span>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option value="completo">Completo</option>
                  <option value="incompleto">Incompleto</option>
                  <option value="atraso">Atraso</option>
                  <option value="folga">Folga</option>
                </select>
              </div>
              <div className="resumo-item">
                <span>Atraso Entrada:</span>
                <strong className={atrasos.entrada > 0 ? 'atraso' : 'normal'}>
                  {atrasos.entrada > 0 ? `${atrasos.entrada.toFixed(0)} min` : 'No horário'}
                </strong>
              </div>
              <div className="resumo-item">
                <span>Antecipação Saída:</span>
                <strong className={atrasos.saida > 0 ? 'atraso' : 'normal'}>
                  {atrasos.saida > 0 ? `${atrasos.saida.toFixed(0)} min` : 'No horário'}
                </strong>
              </div>
            </div>
          </div>

          {/* Intervalos */}
          {pontoDia.intervalos.length > 0 && (
            <div className="form-section">
              <h3>Intervalos</h3>
              <div className="intervalos-lista">
                {pontoDia.intervalos.map((intervalo, index) => (
                  <div key={index} className="intervalo-item">
                    <span><strong>Início:</strong> {intervalo.inicio}</span>
                    <span><strong>Fim:</strong> {intervalo.fim}</span>
                    <span><strong>Duração:</strong> {intervalo.duracao} min</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Observações */}
          <div className="form-section">
            <h3>Observações</h3>
            <div className="form-group">
              <textarea
                name="observacoes"
                value={formData.observacoes}
                onChange={handleInputChange}
                rows={3}
                placeholder="Observações sobre o ponto..."
              />
            </div>
          </div>

          {/* Botões de ação */}
          <div className="form-actions">
            <button type="button" className="btn-cancelar" onClick={handleCancelar}>
              Cancelar
            </button>
            <button type="submit" className="btn-validar">
              Validar Ponto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DetalhesPonto; 