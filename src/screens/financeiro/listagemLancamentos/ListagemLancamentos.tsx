import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ListagemLancamentos.css";
import HeaderPages from "../../../components/headerPages/HeaderPages";
import DataTable from "../../../components/dataTable/DataTable";
import LancamentoCadastroService, { FinanceiroEmpresarial } from "../../../services/financeiro/lancamentoCadastroService";

const ListagemLancamentos = () => {
  const navigate = useNavigate();
  const { listarFinanceirosEmpresariais, excluirFinanceiroEmpresarial, clonarFinanceiroEmpresarial } = LancamentoCadastroService();
  const [financeiros, setFinanceiros] = useState<FinanceiroEmpresarial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFinanceiros = async () => {
      setLoading(true);
      try {
        const financeirosAPI = await listarFinanceirosEmpresariais();
        setFinanceiros(financeirosAPI);
      } catch (error) {
        console.error('Erro ao buscar financeiros:', error);
        setFinanceiros([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFinanceiros();
  }, []);

  const columns = [
    { 
      key: "descricao", 
      label: "Descrição", 
      width: "25%", 
      sortable: true 
    },
    { 
      key: "tipo", 
      label: "Tipo", 
      width: "15%", 
      sortable: true,
      render: (value: string) => (
        <span className={`tipo-badge tipo-${value.toLowerCase()}`}>
          {value}
        </span>
      )
    },
    { 
      key: "valor", 
      label: "Valor", 
      width: "15%", 
      sortable: true,
      render: (value: number) => `R$ ${value.toFixed(2)}`
    },
    {
      key: "data",
      label: "Data",
      width: "15%",
      sortable: true,
      render: (value: string) => new Date(value).toLocaleDateString('pt-BR')
    },
    {
      key: "lancamentos",
      label: "Lançamentos",
      width: "10%",
      sortable: false,
      render: (value: any[]) => value?.length || 0
    },
    {
      key: "observacoes",
      label: "Observações",
      width: "20%",
      sortable: false,
      render: (value: string) => value || '-'
    },
  ];

  const handleRowClick = (row: FinanceiroEmpresarial) => {
    navigate(`/lancamentos/editar/${row.id}`);
  };

  const handleDeleteClick = async (row: FinanceiroEmpresarial) => {
    if (window.confirm('Tem certeza que deseja excluir este lançamento?')) {
      const success = await excluirFinanceiroEmpresarial(row.id);
      if (success) {
        setFinanceiros(financeiros.filter(financeiro => financeiro.id !== row.id));
      } else {
        alert('Erro ao excluir lançamento. Tente novamente.');
      }
    }
  };

  const handleCloneClick = async (row: FinanceiroEmpresarial) => {
    const cloned = await clonarFinanceiroEmpresarial(row.id);
    if (cloned) {
      setFinanceiros([...financeiros, cloned]);
      alert('Lançamento clonado com sucesso!');
    } else {
      alert('Erro ao clonar lançamento. Tente novamente.');
    }
  };

  if (loading) {
    return (
      <div className="app-container">
        <HeaderPages title="Listagem de Lançamentos" />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando lançamentos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <HeaderPages title="Listagem de Lançamentos" />
      
      <div className="listagem-container">
        <DataTable
          title="Lista de Lançamentos Financeiros"
          columns={columns}
          data={financeiros}
          onRowClick={handleRowClick}
          onDeleteClick={handleDeleteClick}
          onCloneClick={handleCloneClick}
          showDeleteButton={true}
          showCloneButton={true}
          emptyMessage="Nenhum lançamento cadastrado"
          pageSize={10}
        />
      </div>
    </div>
  );
};

export default ListagemLancamentos; 