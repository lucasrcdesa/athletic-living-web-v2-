import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ListagemTreinos.css";
import HeaderPages from "../../../components/headerPages/HeaderPages";
import DataTable from "../../../components/dataTable/DataTable";
import TreinoService, { Treino, Aluno, Colaborador } from '../../../services/treino/treinoService';

// Interface para dados formatados da listagem
interface TreinoListagem {
  id: number;
  nome: string;
  data: string;
  colaborador: string;
  aluno: string;
  modalidade: string;
}

const ListagemTreinos = () => {
  const navigate = useNavigate();
  const [treinos, setTreinos] = useState<TreinoListagem[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const { 
    listarTreinos, 
    deletarTreino, 
    buscarAlunoPorId, 
    buscarColaboradorPorId 
  } = TreinoService();

  useEffect(() => {
    const fetchTreinos = async () => {
      setLoading(true);
      try {
        const treinosAPI = await listarTreinos();
        
        // Processar cada treino para buscar nomes de alunos e colaboradores
        const treinosProcessados = await Promise.all(
          treinosAPI.map(async (treino) => {
            // Buscar nome do primeiro colaborador (se houver)
            let colaboradorNome = "N/A";
            if (treino.colaboradoresIds && treino.colaboradoresIds.length > 0) {
              const colaborador = await buscarColaboradorPorId(treino.colaboradoresIds[0]);
              if (colaborador) {
                colaboradorNome = colaborador.nome;
              }
            }

            // Buscar nome do primeiro aluno (se houver)
            let alunoNome = "N/A";
            if (treino.alunosIds && treino.alunosIds.length > 0) {
              const aluno = await buscarAlunoPorId(treino.alunosIds[0]);
              if (aluno) {
                alunoNome = aluno.nome;
              }
            }

            return {
              id: treino.id,
              nome: treino.nome,
              data: treino.dia || "N/A",
              colaborador: colaboradorNome,
              aluno: alunoNome,
              modalidade: treino.modalidade || "N/A"
            };
          })
        );

        setTreinos(treinosProcessados);
      } catch (error) {
        console.error('Erro ao buscar treinos:', error);
        setTreinos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTreinos();
  }, []);

  const columns = [
    { key: "nome", label: "Nome do Treino", width: "25%", sortable: true },
    { key: "data", label: "Data", width: "15%", sortable: true },
    { key: "colaborador", label: "Colaborador", width: "20%", sortable: true },
    { key: "aluno", label: "Aluno", width: "20%", sortable: true },
    { key: "modalidade", label: "Modalidade", width: "20%", sortable: true },
  ];

  const handleRowClick = (row: any) => {
    navigate(`/treinos/editar/${row.id}`);
  };

  const handleDeleteClick = async (row: TreinoListagem) => {
    if (!window.confirm(`Tem certeza que deseja excluir o treino "${row.nome}"?`)) {
      return;
    }

    try {
      const success = await deletarTreino(row.id);
      
      if (success) {
        setMessage({
          type: 'success',
          text: `Treino "${row.nome}" deletado com sucesso!`
        });
        
        // Remove o treino da lista local
        setTreinos(prevTreinos => prevTreinos.filter(treino => treino.id !== row.id));
        
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      } else {
        setMessage({
          type: 'error',
          text: 'Erro ao deletar treino. Tente novamente.'
        });
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Erro interno. Tente novamente mais tarde.'
      });
    }
  };

  const handleCloneClick = (row: TreinoListagem) => {
    // Por enquanto não faz nada, como solicitado
    console.log('Clonar treino:', row);
  };

  const handleAddClick = () => {
    navigate('/treinos/cadastrar');
  };

  if (loading) {
    return (
      <div className="app-container">
        <HeaderPages title="Listagem de Treinos" />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando treinos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <HeaderPages title="Listagem de Treinos" />
      
      {message && (
        <div className={`status-message status-${message.type}`}>
          {message.text}
        </div>
      )}
      
      <div className="listagem-container">
        <DataTable
          title="Lista de Treinos"
          columns={columns}
          data={treinos}
          onRowClick={handleRowClick}
          onDeleteClick={handleDeleteClick}
          onCloneClick={handleCloneClick}
          onAddClick={handleAddClick}
          showDeleteButton={true}
          showCloneButton={true}
          emptyMessage="Nenhum treino cadastrado"
          pageSize={10}
        />
      </div>
    </div>
  );
};

export default ListagemTreinos; 