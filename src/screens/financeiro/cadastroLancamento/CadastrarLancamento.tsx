import React, { useState } from "react";
import "./CadastrarLancamento.css";
import HeaderPages from "../../../components/headerPages/HeaderPages";
import DynamicForm from "../../../components/DynamicForm/DynamicForm";
import { sections } from "../../../data/sections/financeiro/cadastrarLancamentoMock";
import { FinanceiroEmpresarialFormData } from "../../../services/financeiro/lancamentoCadastroService";
import LancamentoCadastroService from "../../../services/financeiro/lancamentoCadastroService";

const CadastrarLancamento = () => {
  const { cadastrarFinanceiroEmpresarial } = LancamentoCadastroService();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const formatarDados = (formData: Record<string, any>): FinanceiroEmpresarialFormData => {
    return {
      tipo: formData.tipo,
      valor: parseFloat(formData.valor) || 0,
      descricao: formData.descricao.trim(),
      data: formData.data,
      observacoes: formData.observacoes.trim(),
    };
  };

  const handleSubmit = async (formData: Record<string, any>) => {
    setLoading(true);
    setMessage(null);

    try {
      if (!formData.tipo || !formData.valor || !formData.descricao || !formData.data) {
        setMessage({
          type: 'error',
          text: 'Por favor, preencha tipo, valor, descrição e data.'
        });
        return;
      }

      const dadosFormatados = formatarDados(formData);
      const resultado = await cadastrarFinanceiroEmpresarial(dadosFormatados);
      
      if (resultado) {
        setMessage({
          type: 'success',
          text: 'Lançamento cadastrado com sucesso!'
        });
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage({
          type: 'error',
          text: 'Erro ao cadastrar lançamento. Tente novamente.'
        });
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Erro interno. Tente novamente mais tarde.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <HeaderPages title="Cadastrar Lançamento Financeiro" />
      
      {message && (
        <div className={`status-message status-${message.type}`}>
          {message.text}
        </div>
      )}
      
      <DynamicForm 
        title="Dados do Lançamento"
        description="Preencha os dados abaixo para cadastrar um novo lançamento financeiro empresarial."
        sections={sections} 
        onSubmit={handleSubmit}
        disabled={loading}
      />
      
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner">Cadastrando...</div>
        </div>
      )}
    </div>
  );
};

export default CadastrarLancamento; 