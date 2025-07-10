import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EditarLancamento.css";
import HeaderPages from "../../../components/headerPages/HeaderPages";
import { EditForm, FormSection } from "../../../components";
import LancamentoCadastroService, { FinanceiroEmpresarial, TipoFinanceiro } from "../../../services/financeiro/lancamentoCadastroService";

const EditarLancamento = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { buscarFinanceiroEmpresarialPorId, atualizarFinanceiroEmpresarial } = LancamentoCadastroService();
  const [financeiro, setFinanceiro] = useState<FinanceiroEmpresarial | null>(null);
  const [loading, setLoading] = useState(true);

  // Configuração do formulário usando o novo componente EditForm
  const formSections: FormSection[] = [
    {
      title: "Informações do Lançamento",
      fields: [
        {
          name: "tipo",
          label: "Tipo",
          type: "select",
          required: true,
          options: [
            { label: "Receita", value: TipoFinanceiro.RECEITA },
            { label: "Despesa", value: TipoFinanceiro.DESPESA },
            { label: "Faturamento", value: TipoFinanceiro.FATURAMENTO }
          ]
        },
        {
          name: "data",
          label: "Data",
          type: "date",
          required: true
        },
        {
          name: "valor",
          label: "Valor (R$)",
          type: "number",
          required: true
        }
      ]
    },
    {
      title: "Detalhes",
      fields: [
        {
          name: "descricao",
          label: "Descrição",
          type: "text",
          required: true
        },
        {
          name: "observacoes",
          label: "Observações",
          type: "textarea",
          rows: 3
        }
      ]
    }
  ];

  useEffect(() => {
    const fetchFinanceiro = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const financeiroData = await buscarFinanceiroEmpresarialPorId(parseInt(id));
        if (financeiroData) {
          setFinanceiro(financeiroData);
        } else {
          console.error('Financeiro não encontrado');
          navigate('/lancamentos/listagem');
        }
      } catch (error) {
        console.error('Erro ao buscar financeiro:', error);
        navigate('/lancamentos/listagem');
      } finally {
        setLoading(false);
      }
    };

    fetchFinanceiro();
  }, [id, navigate]);

  const handleSave = async (formData: Record<string, any>) => {
    if (!financeiro) return;

    try {
      const dadosFormatados = {
        tipo: formData.tipo,
        valor: parseFloat(formData.valor) || 0,
        descricao: formData.descricao.trim(),
        data: formData.data,
        observacoes: formData.observacoes.trim(),
      };

      const resultado = await atualizarFinanceiroEmpresarial(financeiro.id, dadosFormatados);
      
      if (resultado) {
        alert('Lançamento atualizado com sucesso!');
        navigate('/lancamentos/listagem');
      } else {
        alert('Erro ao atualizar lançamento. Tente novamente.');
      }
    } catch (error) {
      alert('Erro interno. Tente novamente mais tarde.');
    }
  };

  if (loading) {
    return (
      <div className="app-container">
        <HeaderPages title="Editar Lançamento" />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando dados do lançamento...</p>
        </div>
      </div>
    );
  }

  if (!financeiro) {
    return (
      <div className="app-container">
        <HeaderPages title="Editar Lançamento" />
        <div className="error-container">
          <p>Lançamento não encontrado</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <HeaderPages title="Editar Lançamento" />
      
      <EditForm
        title={`Editando Lançamento #${financeiro.id}`}
        description="Edite os dados do lançamento financeiro empresarial."
        entityName="lançamento"
        sections={formSections}
        initialData={{
          tipo: financeiro.tipo,
          valor: financeiro.valor,
          descricao: financeiro.descricao,
          data: financeiro.data,
          observacoes: financeiro.observacoes
        }}
        loading={loading}
        onSave={handleSave}
        backUrl="/lancamentos/listagem"
      />
    </div>
  );
};

export default EditarLancamento; 