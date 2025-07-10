import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./DiasColaborador.css";
import HeaderPages from "../../../components/headerPages/HeaderPages";

// Mock de dados do colaborador
const mockColaborador = {
  id: 1,
  nome: "João Silva",
  email: "joao@academia.com",
  cargo: "Personal Trainer",
  cargaHoraria: 160,
  salario: 2500.00
};

// Mock de dados dos dias
const mockDias = [
  { 
    data: "2024-02-15", 
    diaSemana: "Quinta-feira",
    entrada: "08:00",
    saida: "18:00",
    totalHoras: 10,
    status: "completo",
    observacoes: ""
  },
  { 
    data: "2024-02-14", 
    diaSemana: "Quarta-feira",
    entrada: "08:15",
    saida: "17:45",
    totalHoras: 9.5,
    status: "completo",
    observacoes: ""
  },
  { 
    data: "2024-02-13", 
    diaSemana: "Terça-feira",
    entrada: "08:00",
    saida: "18:30",
    totalHoras: 10.5,
    status: "completo",
    observacoes: ""
  },
  { 
    data: "2024-02-12", 
    diaSemana: "Segunda-feira",
    entrada: "08:30",
    saida: "17:00",
    totalHoras: 8.5,
    status: "incompleto",
    observacoes: "Saída antecipada"
  },
  { 
    data: "2024-02-11", 
    diaSemana: "Domingo",
    entrada: null,
    saida: null,
    totalHoras: 0,
    status: "folga",
    observacoes: "Folga"
  },
  { 
    data: "2024-02-10", 
    diaSemana: "Sábado",
    entrada: "09:00",
    saida: "15:00",
    totalHoras: 6,
    status: "completo",
    observacoes: "Expediente reduzido"
  },
  { 
    data: "2024-02-09", 
    diaSemana: "Sexta-feira",
    entrada: "08:00",
    saida: "18:00",
    totalHoras: 10,
    status: "completo",
    observacoes: ""
  },
  { 
    data: "2024-02-08", 
    diaSemana: "Quinta-feira",
    entrada: "08:00",
    saida: "18:00",
    totalHoras: 10,
    status: "completo",
    observacoes: ""
  },
  { 
    data: "2024-02-07", 
    diaSemana: "Quarta-feira",
    entrada: "08:00",
    saida: "18:00",
    totalHoras: 10,
    status: "completo",
    observacoes: ""
  },
  { 
    data: "2024-02-06", 
    diaSemana: "Terça-feira",
    entrada: "08:00",
    saida: "18:00",
    totalHoras: 10,
    status: "completo",
    observacoes: ""
  },
  { 
    data: "2024-02-05", 
    diaSemana: "Segunda-feira",
    entrada: "08:00",
    saida: "18:00",
    totalHoras: 10,
    status: "completo",
    observacoes: ""
  },
  { 
    data: "2024-02-04", 
    diaSemana: "Domingo",
    entrada: null,
    saida: null,
    totalHoras: 0,
    status: "folga",
    observacoes: "Folga"
  },
  { 
    data: "2024-02-03", 
    diaSemana: "Sábado",
    entrada: "09:00",
    saida: "15:00",
    totalHoras: 6,
    status: "completo",
    observacoes: "Expediente reduzido"
  },
  { 
    data: "2024-02-02", 
    diaSemana: "Sexta-feira",
    entrada: "08:00",
    saida: "18:00",
    totalHoras: 10,
    status: "completo",
    observacoes: ""
  },
  { 
    data: "2024-02-01", 
    diaSemana: "Quinta-feira",
    entrada: "08:00",
    saida: "18:00",
    totalHoras: 10,
    status: "completo",
    observacoes: ""
  }
];

const DiasColaborador = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [colaborador, setColaborador] = useState(mockColaborador);
  const [dias, setDias] = useState(mockDias);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula carregamento de dados
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleDiaClick = (dia: any) => {
    navigate(`/colaboradores/${id}/ponto/${dia.data}`);
  };

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      completo: "status-completo",
      incompleto: "status-incompleto",
      folga: "status-folga",
      atraso: "status-atraso"
    };

    const statusLabels = {
      completo: "Completo",
      incompleto: "Incompleto",
      folga: "Folga",
      atraso: "Atraso"
    };

    return (
      <span className={`status-badge ${statusClasses[status as keyof typeof statusClasses]}`}>
        {statusLabels[status as keyof typeof statusLabels]}
      </span>
    );
  };

  const totalHorasMes = dias
    .filter(dia => dia.status === "completo" || dia.status === "incompleto")
    .reduce((total, dia) => total + dia.totalHoras, 0);

  const diasTrabalhados = dias.filter(dia => dia.status === "completo" || dia.status === "incompleto").length;
  const diasFolga = dias.filter(dia => dia.status === "folga").length;

  if (loading) {
    return (
      <div className="app-container">
        <HeaderPages title={`Ponto - ${colaborador.nome}`} />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando dados do ponto...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <HeaderPages title={`Ponto - ${colaborador.nome}`} />
      
      <div className="dias-container">
        {/* Informações do colaborador */}
        <div className="colaborador-info">
          <h2>{colaborador.nome}</h2>
          <p><strong>Cargo:</strong> {colaborador.cargo}</p>
          <p><strong>Email:</strong> {colaborador.email}</p>
          <p><strong>Carga Horária:</strong> {colaborador.cargaHoraria}h/mês</p>
          <p><strong>Salário:</strong> R$ {colaborador.salario.toFixed(2)}</p>
        </div>

        {/* Resumo do mês */}
        <div className="resumo-mes">
          <div className="resumo-card">
            <h3>Total de Horas</h3>
            <p className="valor-horas">{totalHorasMes.toFixed(1)}h</p>
          </div>
          <div className="resumo-card">
            <h3>Dias Trabalhados</h3>
            <p>{diasTrabalhados} dias</p>
          </div>
          <div className="resumo-card">
            <h3>Dias de Folga</h3>
            <p>{diasFolga} dias</p>
          </div>
          <div className="resumo-card">
            <h3>Meta Mensal</h3>
            <p>{colaborador.cargaHoraria}h</p>
          </div>
        </div>

        {/* Lista de dias */}
        <div className="dias-lista">
          <h3>Registro de Ponto - Fevereiro/2024</h3>
          <div className="dias-grid">
            {dias.map((dia, index) => (
              <div 
                key={index} 
                className={`dia-card ${dia.status} ${dia.entrada ? 'clickable' : ''}`}
                onClick={() => dia.entrada && handleDiaClick(dia)}
              >
                <div className="dia-header">
                  <h4>{new Date(dia.data).getDate()}</h4>
                  <span className="dia-semana">{dia.diaSemana}</span>
                </div>
                <div className="dia-detalhes">
                  {dia.entrada ? (
                    <>
                      <p><strong>Entrada:</strong> {dia.entrada}</p>
                      <p><strong>Saída:</strong> {dia.saida}</p>
                      <p><strong>Total:</strong> {dia.totalHoras}h</p>
                    </>
                  ) : (
                    <p className="folga-text">Folga</p>
                  )}
                  {getStatusBadge(dia.status)}
                  {dia.observacoes && (
                    <p className="observacao"><strong>Obs:</strong> {dia.observacoes}</p>
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

export default DiasColaborador; 