import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ListagemAlunosPeriodizacao.css";
import HeaderPages from "../../../components/headerPages/HeaderPages";
import DataTable from "../../../components/dataTable/DataTable";
import AlunoCadastroService, { Aluno } from '../../../services/aluno/alunoCadastroService';
import MacrocicloService from '../../../services/periodizacao/macrocicloService';

const ListagemAlunosPeriodizacao = () => {
  const navigate = useNavigate();
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const { listarAlunos } = AlunoCadastroService();
  const { listarMacrociclosPorAluno } = MacrocicloService();

  useEffect(() => {
    const fetchAlunos = async () => {
      setLoading(true);
      try {
        const alunosData = await listarAlunos();
        
        // Para cada aluno, buscar o número de macrociclos
        const alunosComMacrociclos = await Promise.all(
          alunosData.map(async (aluno) => {
            try {
              const macrociclos = await listarMacrociclosPorAluno(aluno.id);
              return {
                ...aluno,
                macrociclosCount: macrociclos.length
              };
            } catch (error) {
              console.error(`Erro ao buscar macrociclos do aluno ${aluno.id}:`, error);
              return {
                ...aluno,
                macrociclosCount: 0
              };
            }
          })
        );
        
        setAlunos(alunosComMacrociclos);
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
      key: "macrociclosCount",
      label: "Macrociclos",
      width: "20%",
      sortable: true,
      render: (value: number) => (
        <span className={`macrociclos-count ${value > 0 ? 'has-macrociclos' : ''}`}>
          {value} macrociclo{value !== 1 ? 's' : ''}
        </span>
      ),
    },
  ];

  const handleRowClick = (row: Aluno & { macrociclosCount: number }) => {
    navigate(`/periodizacoes/macrociclos/${row.id}`);
  };

  if (loading) {
    return (
      <div className="app-container">
        <HeaderPages title="Alunos - Periodizações" />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando alunos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <HeaderPages title="Alunos - Periodizações" />
      
      {message && (
        <div className={`status-message status-${message.type}`}>
          {message.text}
        </div>
      )}
      
      <div className="listagem-container">
        <div className="table-header">
          <h2>Alunos</h2>
          <p>Selecione um aluno para ver suas periodizações</p>
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

export default ListagemAlunosPeriodizacao; 