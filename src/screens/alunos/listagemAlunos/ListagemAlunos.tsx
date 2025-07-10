import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ListagemAlunos.css";
import HeaderPages from "../../../components/headerPages/HeaderPages";
import DataTable from "../../../components/dataTable/DataTable";
import AlunoCadastroService, { Aluno } from '../../../services/aluno/alunoCadastroService';

const ListagemAlunos = () => {
  const navigate = useNavigate();
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const { listarAlunos, deletarAluno } = AlunoCadastroService();

  useEffect(() => {
    const fetchAlunos = async () => {
      setLoading(true);
      console.log('Iniciando busca de alunos...');
      try {
        const alunosAPI = await listarAlunos();
        console.log('Alunos recebidos da API:', alunosAPI);
        console.log('Quantidade de alunos:', alunosAPI.length);
        setAlunos(alunosAPI);
      } catch (error) {
        console.error('Erro ao buscar alunos:', error);
        setAlunos([]);
      } finally {
        setLoading(false);
        console.log('Estado loading definido como false');
      }
    };
    fetchAlunos();
  }, []);

  const columns = [
    { key: "nome", label: "Nome", width: "40%", sortable: true },
    { key: "email", label: "Email", width: "40%", sortable: true },
    { 
      key: "contratoVencido", 
      label: "Contrato Vencido", 
      width: "20%", 
      sortable: true,
      render: (value: boolean) => (
        <span className={`status-badge status-${value ? 'vencido' : 'ativo'}`}>
          {value ? 'Vencido' : 'Ativo'}
        </span>
      ),
    },
  ];

  const handleRowClick = (row: any) => {
    navigate(`/alunos/editar/${row.id}`);
  };

  const handleDeleteClick = async (row: Aluno) => {
    if (!window.confirm(`Tem certeza que deseja excluir o aluno "${row.nome}"?`)) {
      return;
    }

    try {
      const success = await deletarAluno(row.id);
      
      if (success) {
        setMessage({
          type: 'success',
          text: `Aluno "${row.nome}" deletado com sucesso!`
        });
        
        // Remove o aluno da lista local
        setAlunos(prevAlunos => prevAlunos.filter(aluno => aluno.id !== row.id));
        
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      } else {
        setMessage({
          type: 'error',
          text: 'Erro ao deletar aluno. Tente novamente.'
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
    console.log('Clonar aluno:', row);
  };

  const handleAddClick = () => {
    navigate('/alunos/cadastrar');
  };

  if (loading) {
    return (
      <div className="app-container">
        <HeaderPages title="Listagem de Alunos" />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando alunos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <HeaderPages title="Listagem de Alunos" />
      
      {message && (
        <div className={`status-message status-${message.type}`}>
          {message.text}
        </div>
      )}
      
      <div className="listagem-container">
        <DataTable
          title="Lista de Alunos"
          columns={columns}
          data={alunos}
          onRowClick={handleRowClick}
          onDeleteClick={handleDeleteClick}
          onCloneClick={handleCloneClick}
          onAddClick={handleAddClick}
          showDeleteButton={true}
          emptyMessage="Nenhum aluno cadastrado"
          pageSize={10}
        />
      </div>
    </div>
  );
};

export default ListagemAlunos; 