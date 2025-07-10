import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./FinanceiroAluno.css";
import HeaderPages from "../../../components/headerPages/HeaderPages";
import DataTable from "../../../components/dataTable/DataTable";
import AlunoCadastroService, { Aluno } from '../../../services/aluno/alunoCadastroService';

const FinanceiroAluno = () => {
  const navigate = useNavigate();
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedAluno, setSelectedAluno] = useState<Aluno | null>(null);

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
    { key: "nome", label: "Nome", width: "30%", sortable: true },
    {
      key: "adimplente",
      label: "Adimplente",
      width: "20%",
      sortable: true,
      render: (value: boolean) => (
        <span className={`status-badge ${value ? 'status-ativo' : 'status-inativo'}`}>
          {value ? 'Sim' : 'Não'}
        </span>
      ),
    },
    {
      key: "diasExpiracao",
      label: "Dias Expiração",
      width: "20%",
      sortable: true,
      render: (value: number) => (
        <span className={value > 0 ? 'text-warning' : 'text-success'}>
          {value || 0} dias
        </span>
      ),
    },
    {
      key: "diasDeTrancamento",
      label: "Dias Trancamento",
      width: "20%",
      sortable: true,
      render: (value: number) => (
        <span className={value > 0 ? 'text-danger' : 'text-success'}>
          {value || 0} dias
        </span>
      ),
    },
  ];

  const handleRowClick = (row: any) => {
    navigate(`/alunos/${row.id}/financeiro`);
  };

  const handleAdicionarParcelas = () => {
    setShowModal(true);
  };

  const handleSelectAluno = (aluno: Aluno) => {
    setSelectedAluno(aluno);
    setShowModal(false);
    navigate(`/alunos/${aluno.id}/financeiro/cadastrar-parcelas`);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAluno(null);
  };

  if (loading) {
    return (
      <div className="app-container">
        <HeaderPages title="Financeiro - Alunos" />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando dados financeiros...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <HeaderPages title="Financeiro - Alunos" />
      
      <div className="listagem-container">
        <div className="table-header">
          <h2>Lista de Alunos - Financeiro</h2>
          <button 
            className="btn-adicionar-parcelas"
            onClick={handleAdicionarParcelas}
          >
            + Adicionar Parcelas
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

        {/* Modal de Seleção de Aluno */}
        {showModal && (
          <div className="modal-overlay" onClick={handleCloseModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Selecionar Aluno</h3>
                <button className="modal-close" onClick={handleCloseModal}>
                  ×
                </button>
              </div>
              <div className="modal-body">
                <p>Selecione um aluno para cadastrar parcelas:</p>
                <div className="alunos-list">
                  {alunos.map((aluno) => (
                    <div
                      key={aluno.id}
                      className="aluno-item"
                      onClick={() => handleSelectAluno(aluno)}
                    >
                      <div className="aluno-info">
                        <strong>{aluno.nome}</strong>
                        <span>{aluno.email}</span>
                      </div>
                      <div className="aluno-actions">
                        <button className="btn-selecionar">
                          Selecionar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinanceiroAluno; 