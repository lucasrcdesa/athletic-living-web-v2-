import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "./ListagemMesociclos.css";
import HeaderPages from "../../../components/headerPages/HeaderPages";
import DataTable from "../../../components/dataTable/DataTable";
import MesocicloService, { Mesociclo } from '../../../services/periodizacao/mesocicloService';
import MacrocicloService, { Macrociclo } from '../../../services/periodizacao/macrocicloService';
import AlunoCadastroService, { Aluno } from '../../../services/aluno/alunoCadastroService';

const ListagemMesociclos = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [mesociclos, setMesociclos] = useState<Mesociclo[]>([]);
  const [macrociclo, setMacrociclo] = useState<Macrociclo | null>(null);
  const [aluno, setAluno] = useState<Aluno | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isAlunoView, setIsAlunoView] = useState(false);

  const { listarMesociclosPorMacrociclo, listarMesociclosPorAluno, deletarMesociclo } = MesocicloService();
  const { buscarMacrocicloPorId, listarMacrociclosPorAluno: listarMacrociclosPorAlunoService } = MacrocicloService();
  const { buscarAlunoPorId } = AlunoCadastroService();

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      setLoading(true);
      try {
        // Verificar se é uma visualização por aluno (vindo da listagem de macrociclos)
        const searchParams = new URLSearchParams(location.search);
        const alunoId = searchParams.get('alunoId');
        
        if (alunoId) {
          setIsAlunoView(true);
          // Buscar dados do aluno
          const alunoData = await buscarAlunoPorId(parseInt(alunoId));
          if (alunoData) {
            setAluno(alunoData);
          }

          // Buscar mesociclos do aluno diretamente
          const mesociclosData = await listarMesociclosPorAluno(parseInt(alunoId));
          setMesociclos(mesociclosData);
        } else if (id) {
          // Visualização normal por macrociclo
          setIsAlunoView(false);
          // Buscar dados do macrociclo
          const macrocicloData = await buscarMacrocicloPorId(parseInt(id));
          if (macrocicloData) {
            setMacrociclo(macrocicloData);
          }

          // Buscar mesociclos do macrociclo
          const mesociclosData = await listarMesociclosPorMacrociclo(parseInt(id));
          setMesociclos(mesociclosData);
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        setMesociclos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, location.search]);

  const columns = [
    { 
      key: "name", 
      label: "Nome", 
      width: "25%", 
      sortable: true 
    },
    { 
      key: "objetivo", 
      label: "Objetivo", 
      width: "35%", 
      sortable: true 
    },
    { 
      key: "duracao", 
      label: "Duração (dias)", 
      width: "25%", 
      sortable: true 
    },
    {
      key: "actions",
      label: "Ações",
      width: "15%",
      render: (value: any, row: any) => (
        <div className="action-buttons">
          <button
            type="button"
            className="btn-secondary"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/periodizacoes/microciclos/${row.id}`);
            }}
            title="Ver Microciclos"
          >
            Ver Microciclos
          </button>
        </div>
      )
    }
  ];

  const handleRowClick = (row: Mesociclo) => {
    navigate(`/periodizacoes/editar-mesociclo/${row.id}`);
  };

  const handleDeleteClick = async (row: Mesociclo) => {
    if (window.confirm('Tem certeza que deseja excluir este mesociclo?')) {
      try {
        const success = await deletarMesociclo(row.id);
        if (success) {
          setMesociclos(mesociclos.filter(mesociclo => mesociclo.id !== row.id));
          setMessage({ type: 'success', text: 'Mesociclo excluído com sucesso!' });
          setTimeout(() => setMessage(null), 3000);
        } else {
          setMessage({ type: 'error', text: 'Erro ao excluir mesociclo' });
          setTimeout(() => setMessage(null), 3000);
        }
      } catch (error) {
        console.error('Erro ao excluir mesociclo:', error);
        setMessage({ type: 'error', text: 'Erro interno ao excluir' });
        setTimeout(() => setMessage(null), 3000);
      }
    }
  };

  const handleCloneClick = (row: Mesociclo) => {
    navigate(`/periodizacoes/editar-mesociclo/${row.id}`, { 
      state: { isClone: true, originalData: row } 
    });
  };

  if (loading) {
    return (
      <div className="app-container">
        <HeaderPages title={isAlunoView ? "Mesociclos do Aluno" : "Mesociclos do Macrociclo"} />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando mesociclos...</p>
        </div>
      </div>
    );
  }

  if (!macrociclo && !isAlunoView) {
    return (
      <div className="app-container">
        <HeaderPages title="Mesociclos do Macrociclo" />
        <div className="error-container">
          <p>Macrociclo não encontrado</p>
        </div>
      </div>
    );
  }

  if (isAlunoView && !aluno) {
    return (
      <div className="app-container">
        <HeaderPages title="Mesociclos do Aluno" />
        <div className="error-container">
          <p>Aluno não encontrado</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <HeaderPages title={isAlunoView ? `Mesociclos - ${aluno?.nome}` : `Mesociclos - ${macrociclo?.name}`} />
      
      {message && (
        <div className={`status-message status-${message.type}`}>
          {message.text}
        </div>
      )}
      
      <div className="listagem-container">
        <div className="table-header">
          <h2>{isAlunoView ? `Mesociclos de ${aluno?.nome}` : `Mesociclos de ${macrociclo?.name}`}</h2>
          {!isAlunoView && macrociclo && (
            <div className="table-actions">
              <button 
                className="btn-adicionar"
                onClick={() => navigate(`/periodizacoes/editar-macrociclo/${macrociclo.id}`)}
              >
                + Adicionar Mesociclo
              </button>
            </div>
          )}
        </div>
        
        <DataTable
          title=""
          columns={columns}
          data={mesociclos}
          onRowClick={handleRowClick}
          onDeleteClick={handleDeleteClick}
          onCloneClick={handleCloneClick}
          showDeleteButton={true}
          showCloneButton={true}
          emptyMessage="Nenhum mesociclo encontrado"
          pageSize={10}
        />
      </div>
    </div>
  );
};

export default ListagemMesociclos; 