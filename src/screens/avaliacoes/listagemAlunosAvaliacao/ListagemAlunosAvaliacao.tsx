import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ListagemAlunosAvaliacao.css";
import HeaderPages from "../../../components/headerPages/HeaderPages";
import DataTable from "../../../components/dataTable/DataTable";
import AlunoCadastroService, { Aluno } from '../../../services/aluno/alunoCadastroService';
import AvaliacaoCadastroService from '../../../services/avaliacao/avaliacaoCadastroService';

const ListagemAlunosAvaliacao = () => {
  const navigate = useNavigate();
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const { listarAlunos } = AlunoCadastroService();
  const { listarAvaliacoesPorAluno } = AvaliacaoCadastroService();

  useEffect(() => {
    const fetchAlunos = async () => {
      setLoading(true);
      try {
        const alunosData = await listarAlunos();
        
        // Para cada aluno, buscar o número de avaliações
        const alunosComAvaliacoes = await Promise.all(
          alunosData.map(async (aluno) => {
            try {
              const avaliacoes = await listarAvaliacoesPorAluno(aluno.id);
              return {
                ...aluno,
                avaliacoesCount: avaliacoes.length
              };
            } catch (error) {
              console.error(`Erro ao buscar avaliações do aluno ${aluno.id}:`, error);
              return {
                ...aluno,
                avaliacoesCount: 0
              };
            }
          })
        );
        
        setAlunos(alunosComAvaliacoes);
      } catch (error) {
        console.error('Erro ao carregar alunos:', error);
        setMessage({ type: 'error', text: 'Erro ao carregar alunos' });
        setAlunos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAlunos();
  }, []);

  const columns = [
    { 
      key: "nome", 
      label: "Nome", 
      width: "40%", 
      sortable: true 
    },
    { 
      key: "email", 
      label: "Email", 
      width: "40%", 
      sortable: true 
    },
    {
      key: "avaliacoesCount",
      label: "Avaliações",
      width: "20%",
      sortable: true,
      render: (value: number) => (
        <span className={`avaliacoes-count ${value > 0 ? 'has-avaliacoes' : ''}`}>
          {value} avaliação{value !== 1 ? 'ões' : ''}
        </span>
      ),
    },
  ];

  const handleRowClick = (row: Aluno & { avaliacoesCount: number }) => {
    navigate(`/avaliacoes/aluno/${row.id}`);
  };

  if (loading) {
    return (
      <div className="app-container">
        <HeaderPages title="Alunos - Avaliações" />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando alunos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <HeaderPages title="Alunos - Avaliações" />
      
      {message && (
        <div className={`status-message status-${message.type}`}>
          {message.text}
        </div>
      )}
      
      <div className="listagem-container">
        <div className="table-header">
          <h2>Alunos</h2>
          <p>Selecione um aluno para ver suas avaliações</p>
        </div>
        
        <DataTable
          title=""
          columns={columns}
          data={alunos}
          onRowClick={handleRowClick}
          emptyMessage="Nenhum aluno encontrado"
          pageSize={10}
        />
      </div>
    </div>
  );
};

export default ListagemAlunosAvaliacao; 