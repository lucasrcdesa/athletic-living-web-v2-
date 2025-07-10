import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ListagemColaboradores.css";
import HeaderPages from "../../../components/headerPages/HeaderPages";
import DataTable from "../../../components/dataTable/DataTable";
import ColaboradorCadastroService, { Colaborador } from '../../../services/colaborador/colaboradorCadastroService';

const ListagemColaboradores = () => {
  const navigate = useNavigate();
  const [colaboradores, setColaboradores] = useState<Colaborador[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const { listarColaboradores, deletarColaborador } = ColaboradorCadastroService();

  useEffect(() => {
    const fetchColaboradores = async () => {
      setLoading(true);
      console.log('Iniciando busca de colaboradores...');
      try {
        const colaboradoresAPI = await listarColaboradores();
        console.log('Colaboradores recebidos da API:', colaboradoresAPI);
        console.log('Quantidade de colaboradores:', colaboradoresAPI.length);
        setColaboradores(colaboradoresAPI);
      } catch (error) {
        console.error('Erro ao buscar colaboradores:', error);
        setColaboradores([]);
      } finally {
        setLoading(false);
        console.log('Estado loading definido como false');
      }
    };
    fetchColaboradores();
  }, []);

  const columns = [
    { key: "nome", label: "Nome", width: "30%", sortable: true },
    { key: "mail", label: "Email", width: "35%", sortable: true },
    { key: "telefone", label: "Telefone", width: "20%", sortable: false },
    { key: "funcao", label: "Função", width: "15%", sortable: true },
  ];

  const handleRowClick = (row: any) => {
    navigate(`/colaboradores/editar/${row.id}`);
  };

  const handleDeleteClick = async (row: Colaborador) => {
    if (!window.confirm(`Tem certeza que deseja excluir o colaborador "${row.nome}"?`)) {
      return;
    }

    try {
      const success = await deletarColaborador(row.id);
      
      if (success) {
        setMessage({
          type: 'success',
          text: `Colaborador "${row.nome}" deletado com sucesso!`
        });
        
        // Remove o colaborador da lista local
        setColaboradores(prevColaboradores => prevColaboradores.filter(colaborador => colaborador.id !== row.id));
        
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      } else {
        setMessage({
          type: 'error',
          text: 'Erro ao deletar colaborador. Tente novamente.'
        });
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Erro interno. Tente novamente mais tarde.'
      });
    }
  };

  const handleAddClick = () => {
    navigate('/colaboradores/cadastrar');
  };

  const handleCloneClick = (row: any) => {
    // Por enquanto não faz nada, como solicitado
    console.log('Clonar colaborador:', row);
  };

  if (loading) {
    return (
      <div className="app-container">
        <HeaderPages title="Listagem de Colaboradores" />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando colaboradores...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <HeaderPages title="Listagem de Colaboradores" />
      
      {message && (
        <div className={`status-message status-${message.type}`}>
          {message.text}
        </div>
      )}
      
      <div className="listagem-container">
        <DataTable
          title="Lista de Colaboradores"
          columns={columns}
          data={colaboradores}
          onRowClick={handleRowClick}
          onDeleteClick={handleDeleteClick}
          onCloneClick={handleCloneClick}
          onAddClick={handleAddClick}
          showDeleteButton={true}
          emptyMessage="Nenhum colaborador cadastrado"
          pageSize={10}
        />
      </div>
    </div>
  );
};

export default ListagemColaboradores; 