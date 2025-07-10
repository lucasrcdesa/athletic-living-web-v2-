import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EditarAvaliacao.css";
import HeaderPages from "../../../components/headerPages/HeaderPages";
import { EditForm, FormSection } from "../../../components";
import AvaliacaoCadastroService, { Avaliacao, AvaliacaoUpdateDTO } from '../../../services/avaliacao/avaliacaoCadastroService';

const EditarAvaliacao = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [avaliacao, setAvaliacao] = useState<Avaliacao | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const { buscarAvaliacaoPorId, alterarAvaliacao } = AvaliacaoCadastroService();

  // Configuração do formulário usando o componente EditForm padrão
  const formSections: FormSection[] = [
    {
      title: "Dados da Avaliação",
      fields: [
        {
          name: "data",
          label: "Data da Avaliação",
          type: "date",
          required: true
        },
        {
          name: "arquivo",
          label: "Arquivo",
          type: "text",
          required: true,
          placeholder: "Ex: avaliacoes/avaliacao-aluno-1.pdf"
        }
      ]
    }
  ];

  useEffect(() => {
    const fetchAvaliacao = async () => {
      if (!id) return;

      setLoading(true);
      try {
        const avaliacaoData = await buscarAvaliacaoPorId(parseInt(id));
        if (avaliacaoData) {
          setAvaliacao(avaliacaoData);
        } else {
          setMessage({ type: 'error', text: 'Avaliação não encontrada' });
        }
      } catch (error) {
        console.error('Erro ao carregar avaliação:', error);
        setMessage({ type: 'error', text: 'Erro ao carregar dados da avaliação' });
      } finally {
        setLoading(false);
      }
    };

    fetchAvaliacao();
  }, [id]);

  const handleSave = async (formData: Record<string, any>) => {
    if (!id || !avaliacao) return;

    setSaving(true);
    setMessage(null);

    try {
      // Preparar dados para envio (apenas campos alterados)
      const dadosAlterados: AvaliacaoUpdateDTO = {};
      
      if (formData.data !== avaliacao.data) dadosAlterados.data = formData.data;
      if (formData.arquivo !== avaliacao.arquivo) dadosAlterados.arquivo = formData.arquivo;

      // Só envia se houve alterações
      if (Object.keys(dadosAlterados).length > 0) {
        const resultado = await alterarAvaliacao(parseInt(id), dadosAlterados);
        
        if (resultado) {
          setMessage({ type: 'success', text: 'Avaliação atualizada com sucesso!' });
          setTimeout(() => {
            // Volta para a listagem de avaliações do aluno
            const alunoId = avaliacao.alunoId;
            if (alunoId) {
              navigate(`/avaliacoes/aluno/${alunoId}`);
            } else {
              navigate('/avaliacoes/listagem-alunos');
            }
          }, 2000);
        } else {
          setMessage({ type: 'error', text: 'Erro ao atualizar avaliação' });
        }
      } else {
        setMessage({ type: 'success', text: 'Nenhuma alteração detectada' });
        setTimeout(() => {
          const alunoId = avaliacao.alunoId;
          if (alunoId) {
            navigate(`/avaliacoes/aluno/${alunoId}`);
          } else {
            navigate('/avaliacoes/listagem-alunos');
          }
        }, 2000);
      }
    } catch (error) {
      console.error('Erro ao salvar avaliação:', error);
      setMessage({ type: 'error', text: 'Erro interno ao salvar' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="app-container">
        <HeaderPages title="Editar Avaliação" />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando dados da avaliação...</p>
        </div>
      </div>
    );
  }

  if (!avaliacao) {
    return (
      <div className="app-container">
        <HeaderPages title="Editar Avaliação" />
        <div className="error-container">
          <p>Avaliação não encontrada</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <HeaderPages title="Editar Avaliação" />
      
      {message && (
        <div className={`status-message status-${message.type}`}>
          {message.text}
        </div>
      )}
      
      <EditForm
        title={`Editando Avaliação - ${avaliacao.nomeAluno || 'Aluno'}`}
        description="Edite os dados da avaliação."
        entityName="avaliação"
        sections={formSections}
        initialData={{
          data: avaliacao.data,
          arquivo: avaliacao.arquivo
        }}
        loading={loading}
        onSave={handleSave}
        backUrl={avaliacao.alunoId ? `/avaliacoes/aluno/${avaliacao.alunoId}` : '/avaliacoes/listagem-alunos'}
      />
    </div>
  );
};

export default EditarAvaliacao; 