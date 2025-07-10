import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EditarNotificacao.css";
import HeaderPages from "../../../components/headerPages/HeaderPages";
import { EditForm, FormSection } from "../../../components";
import NotificacaoCadastroService, { Notificacao, NotificacaoUpdateDTO } from '../../../services/notificacao/notificacaoCadastroService';

const EditarNotificacao = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [notificacao, setNotificacao] = useState<Notificacao | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const { buscarNotificacaoPorId, alterarNotificacao } = NotificacaoCadastroService();

  // Configuração do formulário usando o componente EditForm padrão
  const formSections: FormSection[] = [
    {
      title: "Dados da Notificação",
      fields: [
        {
          name: "nome",
          label: "Nome da Notificação",
          type: "text",
          required: true
        },
        {
          name: "tipo",
          label: "Tipo",
          type: "select",
          required: true,
          options: [
            { label: "Avaliação", value: "AVALIACAO" },
            { label: "Treino", value: "TREINO" },
            { label: "Financeiro", value: "FINANCEIRO" },
            { label: "Motivação", value: "MOTIVACAO" },
            { label: "Nutrição", value: "NUTRICAO" },
            { label: "Outro", value: "OUTRO" }
          ]
        },
        {
          name: "texto",
          label: "Texto da Notificação",
          type: "textarea",
          rows: 4,
          required: true
        }
      ]
    }
  ];

  useEffect(() => {
    const fetchNotificacao = async () => {
      if (!id) return;

      setLoading(true);
      try {
        const notificacaoData = await buscarNotificacaoPorId(parseInt(id));
        if (notificacaoData) {
          setNotificacao(notificacaoData);
        } else {
          setMessage({ type: 'error', text: 'Notificação não encontrada' });
        }
      } catch (error) {
        console.error('Erro ao carregar notificação:', error);
        setMessage({ type: 'error', text: 'Erro ao carregar dados da notificação' });
      } finally {
        setLoading(false);
      }
    };

    fetchNotificacao();
  }, [id]);

  const handleSave = async (formData: Record<string, any>) => {
    if (!id || !notificacao) return;

    setSaving(true);
    setMessage(null);

    try {
      // Preparar dados para envio (apenas campos alterados)
      const dadosAlterados: NotificacaoUpdateDTO = {};
      
      if (formData.nome !== notificacao.nome) dadosAlterados.nome = formData.nome;
      if (formData.tipo !== notificacao.tipo) dadosAlterados.tipo = formData.tipo;
      if (formData.texto !== notificacao.texto) dadosAlterados.texto = formData.texto;

      // Só envia se houve alterações
      if (Object.keys(dadosAlterados).length > 0) {
        const resultado = await alterarNotificacao(parseInt(id), dadosAlterados);
        
        if (resultado) {
          setMessage({ type: 'success', text: 'Notificação atualizada com sucesso!' });
          setTimeout(() => {
            // Volta para a listagem de notificações do aluno
            const alunoId = notificacao.alunoId;
            if (alunoId) {
              navigate(`/notificacoes/aluno/${alunoId}`);
            } else {
              navigate('/notificacoes/listagem-alunos');
            }
          }, 2000);
        } else {
          setMessage({ type: 'error', text: 'Erro ao atualizar notificação' });
        }
      } else {
        setMessage({ type: 'success', text: 'Nenhuma alteração detectada' });
        setTimeout(() => {
          const alunoId = notificacao.alunoId;
          if (alunoId) {
            navigate(`/notificacoes/aluno/${alunoId}`);
          } else {
            navigate('/notificacoes/listagem-alunos');
          }
        }, 2000);
      }
    } catch (error) {
      console.error('Erro ao salvar notificação:', error);
      setMessage({ type: 'error', text: 'Erro interno ao salvar' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="app-container">
        <HeaderPages title="Editar Notificação" />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando dados da notificação...</p>
        </div>
      </div>
    );
  }

  if (!notificacao) {
    return (
      <div className="app-container">
        <HeaderPages title="Editar Notificação" />
        <div className="error-container">
          <p>Notificação não encontrada</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <HeaderPages title="Editar Notificação" />
      
      {message && (
        <div className={`status-message status-${message.type}`}>
          {message.text}
        </div>
      )}
      
      <EditForm
        title={`Editando: ${notificacao.nome}`}
        description="Edite os dados da notificação."
        entityName="notificação"
        sections={formSections}
        initialData={{
          nome: notificacao.nome,
          tipo: notificacao.tipo,
          texto: notificacao.texto
        }}
        loading={loading}
        onSave={handleSave}
        backUrl={notificacao.alunoId ? `/notificacoes/aluno/${notificacao.alunoId}` : '/notificacoes/listagem-alunos'}
      />
    </div>
  );
};

export default EditarNotificacao; 