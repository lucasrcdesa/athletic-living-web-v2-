import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./DetalhesMacrociclo.css";
import HeaderPages from "../../components/headerPages/HeaderPages";

// Mock de dados do macrociclo
const mockMacrociclo = {
  id: 1,
  nome: "Macrociclo 1 - Hipertrofia",
  objetivo: "Ganho de massa muscular",
  duracao: 90,
  dataInicio: "2024-01-01",
  dataFim: "2024-03-31",
  status: "em_andamento",
  progresso: 65
};

// Mock de dados dos mesociclos
const mockMesociclos = [
  {
    id: 1,
    nome: "Mesociclo 1 - Adaptação",
    objetivo: "Adaptação ao treino",
    duracao: 30,
    dataInicio: "2024-01-01",
    dataFim: "2024-01-30",
    status: "concluido",
    progresso: 100,
    microciclos: [
      {
        id: 1,
        nome: "Microciclo 1",
        duracao: 7,
        dataInicio: "2024-01-01",
        dataFim: "2024-01-07",
        status: "concluido",
        exercicios: [
          { id: 1, nome: "Supino Reto", series: 3, repeticoes: "8-10", status: "concluido" },
          { id: 2, nome: "Agachamento", series: 3, repeticoes: "8-10", status: "concluido" },
          { id: 3, nome: "Remada Curvada", series: 3, repeticoes: "8-10", status: "concluido" }
        ]
      },
      {
        id: 2,
        nome: "Microciclo 2",
        duracao: 7,
        dataInicio: "2024-01-08",
        dataFim: "2024-01-14",
        status: "concluido",
        exercicios: [
          { id: 4, nome: "Desenvolvimento", series: 3, repeticoes: "8-10", status: "concluido" },
          { id: 5, nome: "Leg Press", series: 3, repeticoes: "8-10", status: "concluido" },
          { id: 6, nome: "Puxada na Frente", series: 3, repeticoes: "8-10", status: "concluido" }
        ]
      },
      {
        id: 3,
        nome: "Microciclo 3",
        duracao: 7,
        dataInicio: "2024-01-15",
        dataFim: "2024-01-21",
        status: "concluido",
        exercicios: [
          { id: 7, nome: "Rosca Direta", series: 3, repeticoes: "8-10", status: "concluido" },
          { id: 8, nome: "Extensão de Pernas", series: 3, repeticoes: "8-10", status: "concluido" },
          { id: 9, nome: "Tríceps na Polia", series: 3, repeticoes: "8-10", status: "concluido" }
        ]
      },
      {
        id: 4,
        nome: "Microciclo 4",
        duracao: 7,
        dataInicio: "2024-01-22",
        dataFim: "2024-01-28",
        status: "concluido",
        exercicios: [
          { id: 10, nome: "Elevação Lateral", series: 3, repeticoes: "8-10", status: "concluido" },
          { id: 11, nome: "Flexão de Pernas", series: 3, repeticoes: "8-10", status: "concluido" },
          { id: 12, nome: "Encolhimento", series: 3, repeticoes: "8-10", status: "concluido" }
        ]
      }
    ]
  },
  {
    id: 2,
    nome: "Mesociclo 2 - Hipertrofia",
    objetivo: "Foco em hipertrofia",
    duracao: 30,
    dataInicio: "2024-02-01",
    dataFim: "2024-03-01",
    status: "em_andamento",
    progresso: 75,
    microciclos: [
      {
        id: 5,
        nome: "Microciclo 1",
        duracao: 7,
        dataInicio: "2024-02-01",
        dataFim: "2024-02-07",
        status: "concluido",
        exercicios: [
          { id: 13, nome: "Supino Inclinado", series: 4, repeticoes: "6-8", status: "concluido" },
          { id: 14, nome: "Agachamento Livre", series: 4, repeticoes: "6-8", status: "concluido" },
          { id: 15, nome: "Remada T", series: 4, repeticoes: "6-8", status: "concluido" }
        ]
      },
      {
        id: 6,
        nome: "Microciclo 2",
        duracao: 7,
        dataInicio: "2024-02-08",
        dataFim: "2024-02-14",
        status: "concluido",
        exercicios: [
          { id: 16, nome: "Desenvolvimento com Halteres", series: 4, repeticoes: "6-8", status: "concluido" },
          { id: 17, nome: "Hack Squat", series: 4, repeticoes: "6-8", status: "concluido" },
          { id: 18, nome: "Puxada na Frente Aberta", series: 4, repeticoes: "6-8", status: "concluido" }
        ]
      },
      {
        id: 7,
        nome: "Microciclo 3",
        duracao: 7,
        dataInicio: "2024-02-15",
        dataFim: "2024-02-21",
        status: "em_andamento",
        exercicios: [
          { id: 19, nome: "Rosca Martelo", series: 4, repeticoes: "6-8", status: "em_andamento" },
          { id: 20, nome: "Extensão de Pernas Unilateral", series: 4, repeticoes: "6-8", status: "em_andamento" },
          { id: 21, nome: "Tríceps Corda", series: 4, repeticoes: "6-8", status: "em_andamento" }
        ]
      },
      {
        id: 8,
        nome: "Microciclo 4",
        duracao: 7,
        dataInicio: "2024-02-22",
        dataFim: "2024-02-28",
        status: "planejado",
        exercicios: []
      }
    ]
  },
  {
    id: 3,
    nome: "Mesociclo 3 - Finalização",
    objetivo: "Finalização e manutenção",
    duracao: 30,
    dataInicio: "2024-03-01",
    dataFim: "2024-03-31",
    status: "planejado",
    progresso: 0,
    microciclos: [
      {
        id: 9,
        nome: "Microciclo 1",
        duracao: 7,
        dataInicio: "2024-03-01",
        dataFim: "2024-03-07",
        status: "planejado",
        exercicios: []
      },
      {
        id: 10,
        nome: "Microciclo 2",
        duracao: 7,
        dataInicio: "2024-03-08",
        dataFim: "2024-03-14",
        status: "planejado",
        exercicios: []
      },
      {
        id: 11,
        nome: "Microciclo 3",
        duracao: 7,
        dataInicio: "2024-03-15",
        dataFim: "2024-03-21",
        status: "planejado",
        exercicios: []
      },
      {
        id: 12,
        nome: "Microciclo 4",
        duracao: 7,
        dataInicio: "2024-03-22",
        dataFim: "2024-03-28",
        status: "planejado",
        exercicios: []
      }
    ]
  }
];

const DetalhesMacrociclo = () => {
  const navigate = useNavigate();
  const { id, macrocicloId } = useParams();
  const [macrociclo, setMacrociclo] = useState(mockMacrociclo);
  const [mesociclos, setMesociclos] = useState(mockMesociclos);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const handleVoltar = () => {
    navigate(`/periodizacoes/${id}`);
  };

  const handleAdicionarExercicio = (mesocicloId: number, microcicloId: number) => {
    navigate(`/periodizacoes/${id}/macrociclo/${macrocicloId}/mesociclo/${mesocicloId}/microciclo/${microcicloId}/exercicios`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'concluido': return '#28a745';
      case 'em_andamento': return '#ffc107';
      case 'planejado': return '#6c757d';
      default: return '#6c757d';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'concluido': return 'Concluído';
      case 'em_andamento': return 'Em Andamento';
      case 'planejado': return 'Planejado';
      default: return status;
    }
  };

  if (loading) {
    return (
      <div className="app-container">
        <HeaderPages title={`${macrociclo.nome}`} />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando detalhes do macrociclo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <HeaderPages title={`${macrociclo.nome}`} />
      
      <div className="detalhes-container">
        {/* Informações do macrociclo */}
        <div className="macrociclo-info">
          <div className="info-header">
            <button className="btn-voltar" onClick={handleVoltar}>
              ← Voltar
            </button>
            <h2>{macrociclo.nome}</h2>
          </div>
          
          <div className="info-details">
            <div className="info-item">
              <strong>Objetivo:</strong> {macrociclo.objetivo}
            </div>
            <div className="info-item">
              <strong>Duração:</strong> {macrociclo.duracao} dias
            </div>
            <div className="info-item">
              <strong>Período:</strong> {new Date(macrociclo.dataInicio).toLocaleDateString('pt-BR')} - {new Date(macrociclo.dataFim).toLocaleDateString('pt-BR')}
            </div>
            <div className="info-item">
              <strong>Status:</strong> 
              <span className="status-badge" style={{ backgroundColor: getStatusColor(macrociclo.status) }}>
                {getStatusText(macrociclo.status)}
              </span>
            </div>
            <div className="info-item">
              <strong>Progresso:</strong> {macrociclo.progresso}%
            </div>
          </div>
        </div>

        {/* Lista de mesociclos */}
        <div className="mesociclos-section">
          <h3>Mesociclos ({mesociclos.length})</h3>
          
          {mesociclos.map((mesociclo) => (
            <div key={mesociclo.id} className="mesociclo-card">
              <div className="mesociclo-header">
                <h4>{mesociclo.nome}</h4>
                <div className="mesociclo-status">
                  <span className="status-badge" style={{ backgroundColor: getStatusColor(mesociclo.status) }}>
                    {getStatusText(mesociclo.status)}
                  </span>
                  <span className="progresso">{mesociclo.progresso}%</span>
                </div>
              </div>
              
              <div className="mesociclo-details">
                <p><strong>Objetivo:</strong> {mesociclo.objetivo}</p>
                <p><strong>Duração:</strong> {mesociclo.duracao} dias</p>
                <p><strong>Período:</strong> {new Date(mesociclo.dataInicio).toLocaleDateString('pt-BR')} - {new Date(mesociclo.dataFim).toLocaleDateString('pt-BR')}</p>
              </div>

              {/* Microciclos */}
              <div className="microciclos-section">
                <h5>Microciclos ({mesociclo.microciclos.length})</h5>
                
                <div className="microciclos-grid">
                  {mesociclo.microciclos.map((microciclo) => (
                    <div key={microciclo.id} className="microciclo-card">
                      <div className="microciclo-header">
                        <h6>{microciclo.nome}</h6>
                        <span className="status-badge" style={{ backgroundColor: getStatusColor(microciclo.status) }}>
                          {getStatusText(microciclo.status)}
                        </span>
                      </div>
                      
                      <div className="microciclo-details">
                        <p><strong>Duração:</strong> {microciclo.duracao} dias</p>
                        <p><strong>Período:</strong> {new Date(microciclo.dataInicio).toLocaleDateString('pt-BR')} - {new Date(microciclo.dataFim).toLocaleDateString('pt-BR')}</p>
                        <p><strong>Exercícios:</strong> {microciclo.exercicios.length}</p>
                      </div>

                      {/* Lista de exercícios */}
                      {microciclo.exercicios.length > 0 && (
                        <div className="exercicios-list">
                          <h6>Exercícios:</h6>
                          {microciclo.exercicios.map((exercicio) => (
                            <div key={exercicio.id} className="exercicio-item">
                              <span className="exercicio-nome">{exercicio.nome}</span>
                              <span className="exercicio-series">{exercicio.series}x{exercicio.repeticoes}</span>
                              <span className={`status-badge status-${exercicio.status}`}>
                                {getStatusText(exercicio.status)}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      <button 
                        className="btn-adicionar-exercicio"
                        onClick={() => handleAdicionarExercicio(mesociclo.id, microciclo.id)}
                      >
                        + Adicionar Exercício
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetalhesMacrociclo; 