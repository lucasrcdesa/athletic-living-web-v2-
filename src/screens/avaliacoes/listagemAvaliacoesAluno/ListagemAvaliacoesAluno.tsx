import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ListagemAvaliacoesAluno.css";
import HeaderPages from "../../../components/headerPages/HeaderPages";
import DataTable from "../../../components/dataTable/DataTable";
import AvaliacaoCadastroService, { Avaliacao } from '../../../services/avaliacao/avaliacaoCadastroService';
import AlunoCadastroService, { Aluno } from '../../../services/aluno/alunoCadastroService';

const ListagemAvaliacoesAluno = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [aluno, setAluno] = useState<Aluno | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const { listarAvaliacoesPorAluno, deletarAvaliacao } = AvaliacaoCadastroService();
  const { buscarAlunoPorId } = AlunoCadastroService();

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      setLoading(true);
      try {
        // Buscar dados do aluno
        const alunoData = await buscarAlunoPorId(parseInt(id));
        if (alunoData) {
          setAluno(alunoData);
        }

        // Buscar avaliações do aluno
        const avaliacoesData = await listarAvaliacoesPorAluno(parseInt(id));
        setAvaliacoes(avaliacoesData);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        setAvaliacoes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString('pt-BR');
  };

  const getNomeArquivo = (arquivo: string) => {
    const partes = arquivo.split('/');
    return partes[partes.length - 1] || arquivo;
  };

  const columns = [
    { 
      key: "data", 
      label: "Data", 
      width: "50%", 
      sortable: true,
      render: (value: string) => formatarData(value)
    },
    { 
      key: "arquivo", 
      label: "Arquivo", 
      width: "50%", 
      sortable: true,
      render: (value: string) => getNomeArquivo(value)
    },
  ];

  const handleRowClick = (row: Avaliacao) => {
    navigate(`/avaliacoes/editar/${row.id}`);
  };

  const handleDeleteClick = async (row: Avaliacao) => {
    if (window.confirm('Tem certeza que deseja excluir esta avaliação?')) {
      try {
        const success = await deletarAvaliacao(row.id);
        if (success) {
          setAvaliacoes(avaliacoes.filter(avaliacao => avaliacao.id !== row.id));
          setMessage({ type: 'success', text: 'Avaliação excluída com sucesso!' });
          setTimeout(() => setMessage(null), 3000);
        } else {
          setMessage({ type: 'error', text: 'Erro ao excluir avaliação' });
          setTimeout(() => setMessage(null), 3000);
        }
      } catch (error) {
        console.error('Erro ao excluir avaliação:', error);
        setMessage({ type: 'error', text: 'Erro interno ao excluir' });
        setTimeout(() => setMessage(null), 3000);
      }
    }
  };

  const handleAddClick = () => {
    navigate(`/avaliacoes/aluno/${id}/adicionar`);
  };

  if (loading) {
    return (
      <div className="app-container">
        <HeaderPages title="Avaliações do Aluno" />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando avaliações...</p>
        </div>
      </div>
    );
  }

  if (!aluno) {
    return (
      <div className="app-container">
        <HeaderPages title="Avaliações do Aluno" />
        <div className="error-container">
          <p>Aluno não encontrado</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <HeaderPages title={`Avaliações - ${aluno.nome}`} />
      
      {message && (
        <div className={`status-message status-${message.type}`}>
          {message.text}
        </div>
      )}
      
      <div className="listagem-container">
        <div className="table-header">
          <h2>Avaliações de {aluno.nome}</h2>
          <button 
            className="btn-adicionar"
            onClick={handleAddClick}
          >
            + Adicionar Avaliação
          </button>
        </div>
        
        <DataTable
          title=""
          columns={columns}
          data={avaliacoes}
          onRowClick={handleRowClick}
          onDeleteClick={handleDeleteClick}
          showDeleteButton={true}
          emptyMessage="Nenhuma avaliação encontrada"
          pageSize={10}
        />
      </div>
    </div>
  );
};

export default ListagemAvaliacoesAluno; 