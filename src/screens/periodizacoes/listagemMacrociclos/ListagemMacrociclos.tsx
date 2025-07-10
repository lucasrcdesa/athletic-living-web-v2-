import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ListagemMacrociclos.css";
import HeaderPages from "../../../components/headerPages/HeaderPages";
import DataTable from "../../../components/dataTable/DataTable";
import MacrocicloService, { Macrociclo } from '../../../services/periodizacao/macrocicloService';
import AlunoCadastroService, { Aluno } from '../../../services/aluno/alunoCadastroService';

const ListagemMacrociclos = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [macrociclos, setMacrociclos] = useState<Macrociclo[]>([]);
  const [aluno, setAluno] = useState<Aluno | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const { listarMacrociclosPorAluno, deletarMacrociclo } = MacrocicloService();
  const { buscarAlunoPorId } = AlunoCadastroService();

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      setLoading(true);
      try {
        // Buscar dados do aluno
        if (id) {
          const alunoData = await buscarAlunoPorId(parseInt(id));
          if (alunoData) {
            setAluno(alunoData);
          }

          // Buscar macrociclos do aluno
          const macrociclosData = await listarMacrociclosPorAluno(parseInt(id));
          setMacrociclos(macrociclosData);
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        setMacrociclos([]);
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
      label: "Duração (semanas)", 
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
              navigate(`/periodizacoes/mesociclos/${row.id}`);
            }}
            title="Ver Mesociclos"
          >
            Ver Mesociclos
          </button>
        </div>
      )
    }
  ];

  const handleRowClick = (row: Macrociclo) => {
    navigate(`/periodizacoes/editar-macrociclo/${row.id}`);
  };

  const handleDeleteClick = async (row: Macrociclo) => {
    if (window.confirm('Tem certeza que deseja excluir este macrociclo?')) {
      try {
        const success = await deletarMacrociclo(row.id);
        if (success) {
          setMacrociclos(macrociclos.filter(macrociclo => macrociclo.id !== row.id));
          setMessage({ type: 'success', text: 'Macrociclo excluído com sucesso!' });
          setTimeout(() => setMessage(null), 3000);
        } else {
          setMessage({ type: 'error', text: 'Erro ao excluir macrociclo' });
          setTimeout(() => setMessage(null), 3000);
        }
      } catch (error) {
        console.error('Erro ao excluir macrociclo:', error);
        setMessage({ type: 'error', text: 'Erro interno ao excluir' });
        setTimeout(() => setMessage(null), 3000);
      }
    }
  };

  const handleCloneClick = (row: Macrociclo) => {
    navigate(`/periodizacoes/editar-macrociclo/${row.id}`, { 
      state: { isClone: true, originalData: row } 
    });
  };

  if (loading) {
    return (
      <div className="app-container">
        <HeaderPages title="Macrociclos do Aluno" />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando macrociclos...</p>
        </div>
      </div>
    );
  }

  if (!aluno) {
    return (
      <div className="app-container">
        <HeaderPages title="Macrociclos do Aluno" />
        <div className="error-container">
          <p>Aluno não encontrado</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <HeaderPages title={`Macrociclos - ${aluno.nome}`} />
      
      {message && (
        <div className={`status-message status-${message.type}`}>
          {message.text}
        </div>
      )}
      
      <div className="listagem-container">
        <div className="table-header">
          <h2>Macrociclos de {aluno.nome}</h2>
          <div className="table-actions">
            <button 
              className="btn-adicionar"
              onClick={() => navigate(`/periodizacoes/editar-macrociclo/0`, { 
                state: { isNew: true, alunoId: aluno.id } 
              })}
            >
              + Adicionar Macrociclo
            </button>
          </div>
        </div>
        
        <DataTable
          title=""
          columns={columns}
          data={macrociclos}
          onRowClick={handleRowClick}
          onDeleteClick={handleDeleteClick}
          onCloneClick={handleCloneClick}
          showDeleteButton={true}
          showCloneButton={true}
          emptyMessage="Nenhum macrociclo encontrado"
          pageSize={10}
        />
      </div>
    </div>
  );
};

export default ListagemMacrociclos; 