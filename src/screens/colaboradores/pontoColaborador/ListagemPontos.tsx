import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ListagemPontos.css";
import HeaderPages from "../../../components/headerPages/HeaderPages";
import DataTable from "../../../components/dataTable/DataTable";
import PontoService, { PontoColaborador } from '../../../services/colaborador/pontoService';
import ColaboradorCadastroService, { Colaborador } from '../../../services/colaborador/colaboradorCadastroService';

const ListagemPontos = () => {
  const navigate = useNavigate();
  const { colaboradorId } = useParams<{ colaboradorId: string }>();
  const [pontos, setPontos] = useState<PontoColaborador[]>([]);
  const [colaborador, setColaborador] = useState<Colaborador | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const { listarPontosPorColaborador, validarPonto } = PontoService();
  const { buscarColaboradorPorId } = ColaboradorCadastroService();

  useEffect(() => {
    const fetchData = async () => {
      if (!colaboradorId) return;
      
      setLoading(true);
      try {
        // Buscar dados do colaborador
        const colaboradorData = await buscarColaboradorPorId(parseInt(colaboradorId));
        setColaborador(colaboradorData);
        
        // Buscar pontos do colaborador
        const pontosData = await listarPontosPorColaborador(parseInt(colaboradorId));
        setPontos(pontosData);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        setPontos([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [colaboradorId]);

  const formatTime = (time: string) => {
    if (!time) return "-";
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR');
  };

  const getStatusLabel = (validado: boolean) => {
    return validado ? 'Validado' : 'Pendente';
  };

  const columns = [
    { 
      key: "dia", 
      label: "Data", 
      width: "20%", 
      sortable: true,
      render: (value: string) => formatDate(value)
    },
    { 
      key: "entrada", 
      label: "Entrada", 
      width: "20%", 
      sortable: true,
      render: (value: string) => formatTime(value)
    },
    { 
      key: "saida", 
      label: "Saída", 
      width: "20%", 
      sortable: true,
      render: (value: string) => formatTime(value)
    },
    { 
      key: "entradaIntervalo", 
      label: "Entrada Intervalo", 
      width: "20%", 
      sortable: true,
      render: (value: string) => formatTime(value)
    },
    { 
      key: "saidaIntervalo", 
      label: "Saída Intervalo", 
      width: "20%", 
      sortable: true,
      render: (value: string) => formatTime(value)
    },
    { 
      key: "validado", 
      label: "Status", 
      width: "20%", 
      sortable: true,
      render: (value: boolean) => (
        <span className={`status-badge ${value ? 'validado' : 'pendente'}`}>
          {getStatusLabel(value)}
        </span>
      )
    },
  ];

  const handleRowClick = (row: PontoColaborador) => {
    // Navegar para detalhes do ponto
    navigate(`/colaboradores/${colaboradorId}/ponto/${row.dia}`);
  };

  const handleValidarClick = async (row: PontoColaborador) => {
    if (window.confirm(`Deseja ${row.validado ? 'invalidar' : 'validar'} este ponto?`)) {
      try {
        const resultado = await validarPonto(row.id, { validado: !row.validado });
        if (resultado) {
          setPontos(prev => prev.map(p => 
            p.id === row.id ? { ...p, validado: resultado.validado } : p
          ));
          setMessage({ 
            type: 'success', 
            text: `Ponto ${resultado.validado ? 'validado' : 'invalidado'} com sucesso!` 
          });
          setTimeout(() => setMessage(null), 3000);
        }
      } catch (error) {
        console.error('Erro ao validar ponto:', error);
        setMessage({ type: 'error', text: 'Erro ao validar ponto' });
        setTimeout(() => setMessage(null), 3000);
      }
    }
  };

  const handleCloneClick = (row: PontoColaborador) => {
    // Por enquanto, apenas navega para detalhes
    navigate(`/colaboradores/${colaboradorId}/ponto/${row.dia}?clone=true`);
  };

  const handleAddClick = () => {
    navigate(`/colaboradores/${colaboradorId}/ponto/registrar`);
  };

  if (loading) {
    return (
      <div className="app-container">
        <HeaderPages title="Pontos do Colaborador" />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando pontos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <HeaderPages title={`Pontos - ${colaborador?.nome || 'Colaborador'}`} />
      
      {message && (
        <div className={`status-message status-${message.type}`}>
          {message.text}
        </div>
      )}
      
      <div className="listagem-container">
        <div className="table-header">
          <h2>Pontos de {colaborador?.nome}</h2>
          <button 
            className="btn-adicionar"
            onClick={handleAddClick}
          >
            + Registrar Ponto
          </button>
        </div>
        
        <DataTable
          title=""
          columns={columns}
          data={pontos}
          onRowClick={handleRowClick}
          onDeleteClick={handleValidarClick}
          onCloneClick={handleCloneClick}
          showDeleteButton={true}
          showCloneButton={true}
          emptyMessage="Nenhum ponto registrado"
          pageSize={10}
        />
      </div>
    </div>
  );
};

export default ListagemPontos; 