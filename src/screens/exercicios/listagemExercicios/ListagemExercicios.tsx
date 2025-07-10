import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ListagemExercicios.css";
import HeaderPages from "../../../components/headerPages/HeaderPages";
import DataTable from "../../../components/dataTable/DataTable";
import ExercicioCadastroService, { Exercicio } from '../../../services/exercicio/exercicioCadastroService';

const ListagemExercicios = () => {
  const navigate = useNavigate();
  const [exercicios, setExercicios] = useState<Exercicio[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const { listarExercicios, deletarExercicio } = ExercicioCadastroService();

  useEffect(() => {
    const fetchExercicios = async () => {
      setLoading(true);
      try {
        const exerciciosAPI = await listarExercicios();
        setExercicios(exerciciosAPI);
      } catch (error) {
        console.error('Erro ao buscar exercícios:', error);
        setExercicios([]);
      } finally {
        setLoading(false);
      }
    };

    fetchExercicios();
  }, []);

  const columns = [
    { key: "nome", label: "Nome", width: "40%", sortable: true },
    { key: "equipamento", label: "Equipamento", width: "30%", sortable: true },
    { key: "equipamento", label: "Equipamento", width: "30%", sortable: true },
  ];

  const handleRowClick = (row: any) => {
    navigate(`/exercicios/editar/${row.id}`);
  };

  const handleDeleteClick = async (row: any) => {
    if (!window.confirm(`Tem certeza que deseja excluir o exercício "${row.nome}"?`)) {
      return;
    }

    try {
      const success = await deletarExercicio(row.id);
      
      if (success) {
        setMessage({
          type: 'success',
          text: `Exercício "${row.nome}" deletado com sucesso!`
        });
        
        // Remove o exercício da lista local
        setExercicios(prevExercicios => prevExercicios.filter(exercicio => exercicio.id !== row.id));
        
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      } else {
        setMessage({
          type: 'error',
          text: 'Erro ao deletar exercício. Tente novamente.'
        });
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Erro interno. Tente novamente mais tarde.'
      });
    }
  };

  const handleCloneClick = (row: any) => {
    // Por enquanto não faz nada, como solicitado
    console.log('Clonar exercício:', row);
  };

  const handleAddClick = () => {
    navigate('/exercicios/cadastrar');
  };

  if (loading) {
    return (
      <div className="app-container">
        <HeaderPages title="Listagem de Exercícios" />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando exercícios...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <HeaderPages title="Listagem de Exercícios" />
      
      {message && (
        <div className={`status-message status-${message.type}`}>
          {message.text}
        </div>
      )}
      
      <div className="listagem-container">
        <DataTable
          title="Lista de Exercícios"
          columns={columns}
          data={exercicios}
          onRowClick={handleRowClick}
          onDeleteClick={handleDeleteClick}
          onCloneClick={handleCloneClick}
          onAddClick={handleAddClick}
          showDeleteButton={true}
          showCloneButton={true}
          emptyMessage="Nenhum exercício cadastrado"
          pageSize={10}
        />
      </div>
    </div>
  );
};

export default ListagemExercicios; 