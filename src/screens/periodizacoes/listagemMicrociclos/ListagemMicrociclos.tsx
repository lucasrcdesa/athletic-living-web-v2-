import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ListagemMicrociclos.css";
import HeaderPages from "../../../components/headerPages/HeaderPages";
import DataTable from "../../../components/dataTable/DataTable";
import MicrocicloService, { Microciclo } from '../../../services/periodizacao/microcicloService';
import MesocicloService, { Mesociclo } from '../../../services/periodizacao/mesocicloService';

const ListagemMicrociclos = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [microciclos, setMicrociclos] = useState<Microciclo[]>([]);
  const [mesociclo, setMesociclo] = useState<Mesociclo | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const { listarMicrociclosPorMesociclo, deletarMicrociclo } = MicrocicloService();
  const { buscarMesocicloPorId } = MesocicloService();

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      setLoading(true);
      try {
        // Buscar dados do mesociclo
        if (id) {
          const mesocicloData = await buscarMesocicloPorId(parseInt(id));
          if (mesocicloData) {
            setMesociclo(mesocicloData);
          }

          // Buscar microciclos do mesociclo
          const microciclosData = await listarMicrociclosPorMesociclo(parseInt(id));
          setMicrociclos(microciclosData);
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        setMicrociclos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const columns = [
    { 
      key: "name", 
      label: "Nome", 
      width: "30%", 
      sortable: true 
    },
    { 
      key: "caracteristica", 
      label: "Característica", 
      width: "40%", 
      sortable: true 
    },
    { 
      key: "duracao", 
      label: "Duração (dias)", 
      width: "30%", 
      sortable: true 
    },
  ];

  const handleRowClick = (row: Microciclo) => {
    navigate(`/periodizacoes/editar-microciclo/${row.id}`);
  };

  const handleDeleteClick = async (row: Microciclo) => {
    if (window.confirm('Tem certeza que deseja excluir este microciclo?')) {
      try {
        const success = await deletarMicrociclo(row.id);
        if (success) {
          setMicrociclos(microciclos.filter(microciclo => microciclo.id !== row.id));
          setMessage({ type: 'success', text: 'Microciclo excluído com sucesso!' });
          setTimeout(() => setMessage(null), 3000);
        } else {
          setMessage({ type: 'error', text: 'Erro ao excluir microciclo' });
          setTimeout(() => setMessage(null), 3000);
        }
      } catch (error) {
        console.error('Erro ao excluir microciclo:', error);
        setMessage({ type: 'error', text: 'Erro interno ao excluir' });
        setTimeout(() => setMessage(null), 3000);
      }
    }
  };

  const handleAddClick = () => {
    navigate(`/periodizacoes/microciclos/adicionar/${id}`);
  };

  const handleCloneClick = (row: Microciclo) => {
    navigate(`/periodizacoes/editar-microciclo/${row.id}`, { 
      state: { isClone: true, originalData: row } 
    });
  };

  if (loading) {
    return (
      <div className="app-container">
        <HeaderPages title="Microciclos do Mesociclo" />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando microciclos...</p>
        </div>
      </div>
    );
  }

  if (!mesociclo) {
    return (
      <div className="app-container">
        <HeaderPages title="Microciclos do Mesociclo" />
        <div className="error-container">
          <p>Mesociclo não encontrado</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <HeaderPages title={`Microciclos - ${mesociclo.name}`} />
      
      {message && (
        <div className={`status-message status-${message.type}`}>
          {message.text}
        </div>
      )}
      
      <div className="listagem-container">
        <div className="table-header">
          <h2>Microciclos de {mesociclo.name}</h2>
          <div className="table-actions">
            <button 
              className="btn-adicionar"
              onClick={() => navigate(`/periodizacoes/editar-mesociclo/${mesociclo.id}`)}
            >
              + Adicionar Microciclo
            </button>
          </div>
        </div>
        
        <DataTable
          title=""
          columns={columns}
          data={microciclos}
          onRowClick={handleRowClick}
          onDeleteClick={handleDeleteClick}
          onCloneClick={handleCloneClick}
          showDeleteButton={true}
          showCloneButton={true}
          emptyMessage="Nenhum microciclo encontrado"
          pageSize={10}
        />
      </div>
    </div>
  );
};

export default ListagemMicrociclos; 