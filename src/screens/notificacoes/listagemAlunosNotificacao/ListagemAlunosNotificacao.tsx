import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ListagemAlunosNotificacao.css";
import HeaderPages from "../../../components/headerPages/HeaderPages";
import DataTable from "../../../components/dataTable/DataTable";
import AlunoCadastroService, { Aluno } from '../../../services/aluno/alunoCadastroService';

const ListagemAlunosNotificacao = () => {
  const navigate = useNavigate();
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const { listarAlunos } = AlunoCadastroService();

  useEffect(() => {
    const fetchAlunos = async () => {
      setLoading(true);
      try {
        const alunosAPI = await listarAlunos();
        setAlunos(alunosAPI);
      } catch (error) {
        console.error('Erro ao buscar alunos:', error);
        setAlunos([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAlunos();
  }, []);

  const columns = [
    { key: "nome", label: "Nome", width: "40%", sortable: true },
    { key: "email", label: "Email", width: "40%", sortable: true },
    { key: "telefone", label: "Telefone", width: "20%", sortable: false },
  ];

  const handleRowClick = (row: Aluno) => {
    navigate(`/notificacoes/aluno/${row.id}`);
  };

  const handleAddClick = () => {
    // Por enquanto, navega para o primeiro aluno se existir
    if (alunos.length > 0) {
      navigate(`/notificacoes/aluno/${alunos[0].id}`);
    }
  };

  if (loading) {
    return (
      <div className="app-container">
        <HeaderPages title="Notificações - Alunos" />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando alunos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <HeaderPages title="Notificações - Alunos" />
      
      {message && (
        <div className={`status-message status-${message.type}`}>
          {message.text}
        </div>
      )}
      
      <div className="listagem-container">
        <div className="table-header">
          <h2>Lista de Alunos</h2>
          <button 
            className="btn-adicionar"
            onClick={handleAddClick}
          >
            + Adicionar Notificação
          </button>
        </div>
        
        <DataTable
          title=""
          columns={columns}
          data={alunos}
          onRowClick={handleRowClick}
          emptyMessage="Nenhum aluno cadastrado"
          pageSize={10}
        />
      </div>
    </div>
  );
};

export default ListagemAlunosNotificacao; 