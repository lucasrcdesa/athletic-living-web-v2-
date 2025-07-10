import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SelecaoAlunoNotificacao.css";
import HeaderPages from "../../../components/headerPages/HeaderPages";
import DataTable from "../../../components/dataTable/DataTable";
import AlunoCadastroService, { Aluno } from '../../../services/aluno/alunoCadastroService';

const SelecaoAlunoNotificacao = () => {
  const navigate = useNavigate();
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlunos = async () => {
      setLoading(true);
      try {
        const { listarAlunos } = AlunoCadastroService();
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

  const handleRowClick = (row: any) => {
    navigate(`/notificacoes/alunos/incluir/${row.id}`);
  };

  if (loading) {
    return (
      <div className="app-container">
        <HeaderPages title="Notificações - Selecione o Aluno" />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando alunos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <HeaderPages title="Notificações - Selecione o Aluno" />
      <div className="listagem-container">
        <DataTable
          title="Selecione um aluno"
          columns={columns}
          data={alunos}
          onRowClick={handleRowClick}
          showDeleteButton={false}
          emptyMessage="Nenhum aluno cadastrado"
          pageSize={10}
        />
      </div>
    </div>
  );
};

export default SelecaoAlunoNotificacao; 