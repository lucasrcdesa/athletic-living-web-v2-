import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./CadastrarNotificacao.css";
import HeaderPages from "../../../components/headerPages/HeaderPages";
import DynamicForm from "../../../components/DynamicForm/DynamicForm";
import SelectableList, { SelectableItem } from "../../../components/selectableList/SelectableList";
import { NotificacaoFormData } from "../../../services/notificacao/notificacaoCadastroService";
import NotificacaoCadastroService from "../../../services/notificacao/notificacaoCadastroService";
import AlunoCadastroService from "../../../services/aluno/alunoCadastroService";
import ColaboradorCadastroService from "../../../services/colaborador/colaboradorCadastroService";
// test
// Mock de dados do formulário
const mockFormData = {
  sections: [
    {
      type: "single",
      fields: [
        { label: "Título da Notificação", name: "nome", type: "text" },
      ],
    },
    {
      type: "double",
      fields: [
        {
          label: "Tipo de Notificação",
          name: "tipo",
          type: "select",
          options: [
            { label: "Lembrete de Treino", value: "LEMBRETE_TREINO" },
            { label: "Avaliação Pendente", value: "AVALIACAO_PENDENTE" },
            { label: "Treino Cancelado", value: "TREINO_CANCELADO" },
            { label: "Treino Remarcado", value: "TREINO_REMARCADO" },
            { label: "Dica de Treino", value: "DICA_TREINO" },
            { label: "Motivação", value: "MOTIVACAO" },
            { label: "Sistema", value: "SISTEMA" },
            { label: "Outro", value: "OUTRO" },
          ],
        },
        {
          label: "Prioridade",
          name: "prioridade",
          type: "select",
          options: [
            { label: "Alta", value: "alta" },
            { label: "Média", value: "media" },
            { label: "Baixa", value: "baixa" },
          ],
        },
      ],
    },
    {
      type: "single",
      fields: [
        { label: "Mensagem", name: "texto", type: "textarea" },
      ],
    },
  ]
};

const CadastrarNotificacao = () => {
  const navigate = useNavigate();
  const { tipo } = useParams<{ tipo: string }>(); // 'aluno' ou 'colaborador'
  const { cadastrarNotificacao } = NotificacaoCadastroService();
  const { listarAlunos } = AlunoCadastroService();
  const { listarColaboradores } = ColaboradorCadastroService();
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  // Estados para SelectableList
  const [alunos, setAlunos] = useState<SelectableItem[]>([]);
  const [colaboradores, setColaboradores] = useState<SelectableItem[]>([]);
  const [alunosSelecionados, setAlunosSelecionados] = useState<number[]>([]);
  const [colaboradoresSelecionados, setColaboradoresSelecionados] = useState<number[]>([]);
  const [carregandoDados, setCarregandoDados] = useState(true);

  // Carregar dados para os SelectableList
  useEffect(() => {
    const carregarDados = async () => {
      try {
        if (tipo === 'aluno' || !tipo) {
          // Carregar alunos
          const alunosData = await listarAlunos();
          const alunosSelectable = alunosData.map(aluno => ({
            id: aluno.id,
            title: aluno.nome,
            subtitle: aluno.email,
            description: `Telefone: ${aluno.telefone}`
          }));
          setAlunos(alunosSelectable);
        }

        if (tipo === 'colaborador' || !tipo) {
          // Carregar colaboradores
          const colaboradoresData = await listarColaboradores();
          const colaboradoresSelectable = colaboradoresData.map(colaborador => ({
            id: colaborador.id,
            title: colaborador.nome,
            subtitle: colaborador.mail,
            description: `Função: ${colaborador.funcao}`
          }));
          setColaboradores(colaboradoresSelectable);
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        setMessage({
          type: 'error',
          text: 'Erro ao carregar dados. Tente novamente.'
        });
      } finally {
        setCarregandoDados(false);
      }
    };

    carregarDados();
  }, [tipo]);

  const formatarDados = (formData: Record<string, any>): NotificacaoFormData => {
    return {
      nome: formData.nome?.trim() || '',
      tipo: formData.tipo || '',
      texto: formData.texto?.trim() || '',
      alunoId: tipo === 'aluno' && alunosSelecionados.length > 0 ? alunosSelecionados[0] : undefined,
      colaboradorId: tipo === 'colaborador' && colaboradoresSelecionados.length > 0 ? colaboradoresSelecionados[0] : undefined,
      lida: false,
    };
  };

  const handleAlunosChange = (selectedIds: number[]) => {
    setAlunosSelecionados(selectedIds);
  };

  const handleColaboradoresChange = (selectedIds: number[]) => {
    setColaboradoresSelecionados(selectedIds);
  };

  const handleSubmit = async (formData: Record<string, any>) => {
    setLoading(true);
    setMessage(null);

    try {
      if (!formData.nome || !formData.tipo || !formData.texto) {
        setMessage({
          type: 'error',
          text: 'Por favor, preencha todos os campos obrigatórios.'
        });
        return;
      }

      // Validar seleção baseada no tipo
      if (tipo === 'aluno' && alunosSelecionados.length === 0) {
        setMessage({
          type: 'error',
          text: 'Por favor, selecione pelo menos um aluno.'
        });
        return;
      }

      if (tipo === 'colaborador' && colaboradoresSelecionados.length === 0) {
        setMessage({
          type: 'error',
          text: 'Por favor, selecione pelo menos um colaborador.'
        });
        return;
      }

      if (!tipo && alunosSelecionados.length === 0 && colaboradoresSelecionados.length === 0) {
        setMessage({
          type: 'error',
          text: 'Por favor, selecione pelo menos um aluno ou colaborador.'
        });
        return;
      }

      const dadosFormatados = formatarDados(formData);
      console.log('Dados enviados para o backend:', dadosFormatados);
      
      const resultado = await cadastrarNotificacao(dadosFormatados);
      
      if (resultado) {
        setMessage({
          type: 'success',
          text: 'Notificação cadastrada com sucesso!'
        });
        setTimeout(() => {
          navigate('/notificacoes');
        }, 2000);
      } else {
        setMessage({
          type: 'error',
          text: 'Erro ao cadastrar notificação. Tente novamente.'
        });
      }
    } catch (error) {
      console.error('Erro ao cadastrar notificação:', error);
      setMessage({
        type: 'error',
        text: 'Erro interno. Tente novamente mais tarde.'
      });
    } finally {
      setLoading(false);
    }
  };

  const getTitulo = () => {
    if (tipo === 'aluno') return 'Cadastrar Notificação - Alunos';
    if (tipo === 'colaborador') return 'Cadastrar Notificação - Colaboradores';
    return 'Cadastrar Notificação';
  };

  const getDescricao = () => {
    if (tipo === 'aluno') return 'Preencha os dados abaixo para cadastrar uma notificação para alunos.';
    if (tipo === 'colaborador') return 'Preencha os dados abaixo para cadastrar uma notificação para colaboradores.';
    return 'Preencha os dados abaixo para cadastrar uma nova notificação.';
  };

  return (
    <div className="app-container">
      <HeaderPages title={getTitulo()} />
      
      {message && (
        <div className={`status-message status-${message.type}`}>
          {message.text}
        </div>
      )}
      
      <DynamicForm 
        title="Dados da Notificação"
        description={getDescricao()}
        sections={mockFormData.sections} 
        onSubmit={handleSubmit}
        disabled={loading}
      />

      {!carregandoDados && (
        <div className="actions-section">
          {(tipo === 'aluno' || !tipo) && (
            <div className="action-group">
              <h3>Alunos Destinatários</h3>
              <p className="current-info">
                Selecione os alunos que receberão esta notificação
              </p>
              
              <SelectableList
                items={alunos}
                selectedItems={alunosSelecionados}
                onSelectionChange={handleAlunosChange}
                maxSelections={tipo === 'aluno' ? 1 : 10}
                emptyMessage="Nenhum aluno disponível"
              />
            </div>
          )}

          {(tipo === 'colaborador' || !tipo) && (
            <div className="action-group">
              <h3>Colaboradores Destinatários</h3>
              <p className="current-info">
                Selecione os colaboradores que receberão esta notificação
              </p>
              
              <SelectableList
                items={colaboradores}
                selectedItems={colaboradoresSelecionados}
                onSelectionChange={handleColaboradoresChange}
                maxSelections={tipo === 'colaborador' ? 1 : 10}
                emptyMessage="Nenhum colaborador disponível"
              />
            </div>
          )}
        </div>
      )}
      
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner">Cadastrando...</div>
        </div>
      )}
    </div>
  );
};

export default CadastrarNotificacao; 