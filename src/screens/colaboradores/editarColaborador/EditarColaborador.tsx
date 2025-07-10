import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EditarColaborador.css";
import HeaderPages from "../../../components/headerPages/HeaderPages";
import { EditForm, FormSection } from "../../../components";
import SelectableList, { SelectableItem } from "../../../components/selectableList/SelectableList";
import ColaboradorCadastroService, { Colaborador, AtualizarColaboradorDTO } from '../../../services/colaborador/colaboradorCadastroService';
import TreinoService, { Treino } from '../../../services/treino/treinoService';

// Converter treinos da API para o formato do SelectableList
const converterTreinosParaSelectable = (treinos: Treino[]): SelectableItem[] => {
  return treinos.map(treino => ({
    id: treino.id,
    title: treino.nome,
    subtitle: treino.modalidade || 'Treino',
    description: treino.caracteristica || `Dia: ${treino.dia}`
  }));
};

const EditarColaborador = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [colaborador, setColaborador] = useState<Colaborador | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [treinosSelecionados, setTreinosSelecionados] = useState<number[]>([]);
  const [treinosDisponiveis, setTreinosDisponiveis] = useState<SelectableItem[]>([]);
  const [treinosCarregando, setTreinosCarregando] = useState(false);
  const [treinosAlterados, setTreinosAlterados] = useState(false);
  const [treinosIniciais, setTreinosIniciais] = useState<number[]>([]);

  const { buscarColaboradorPorId, alterarColaborador } = ColaboradorCadastroService();
  const { listarTreinos, buscarTreinosPorColaborador, atualizarTreino } = TreinoService();

  // Configuração do formulário usando o novo componente EditForm
  const formSections: FormSection[] = [
    {
      title: "Dados Pessoais",
      fields: [
        {
          name: "nome",
          label: "Nome Completo",
          type: "text",
          required: true
        },
        {
          name: "mail",
          label: "Email",
          type: "email",
          required: true
        },
        {
          name: "funcao",
          label: "Função",
          type: "text",
          required: true
        }
      ]
    }
  ];

  useEffect(() => {
    const fetchColaborador = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const colaboradorData = await buscarColaboradorPorId(parseInt(id));
        if (colaboradorData) {
          setColaborador(colaboradorData);
          
          // Carregar treinos do colaborador
          setTreinosCarregando(true);
          try {
            const treinosDoColaborador = await buscarTreinosPorColaborador(parseInt(id));
            const treinosIds = treinosDoColaborador.map(t => t.id);
            setTreinosSelecionados(treinosIds);
            setTreinosIniciais(treinosIds); // Armazenar treinos iniciais
          } catch (error) {
            console.error('Erro ao buscar treinos do colaborador:', error);
            setTreinosSelecionados([]);
            setTreinosIniciais([]);
          } finally {
            setTreinosCarregando(false);
          }
        } else {
          console.error('Colaborador não encontrado');
          navigate('/colaboradores');
        }
      } catch (error) {
        console.error('Erro ao buscar colaborador:', error);
        navigate('/colaboradores');
      } finally {
        setLoading(false);
      }
    };

    fetchColaborador();
  }, [id, navigate]);

  // Carregar todos os treinos disponíveis
  useEffect(() => {
    const fetchTreinos = async () => {
      setTreinosCarregando(true);
      try {
        const treinos = await listarTreinos();
        const treinosSelectable = converterTreinosParaSelectable(treinos);
        setTreinosDisponiveis(treinosSelectable);
      } catch (error) {
        console.error('Erro ao carregar treinos:', error);
        setTreinosDisponiveis([]);
      } finally {
        setTreinosCarregando(false);
      }
    };

    fetchTreinos();
  }, []);

  const handleTreinosChange = (selectedIds: number[]) => {
    setTreinosSelecionados(selectedIds);
    
    // Verificar se houve mudança nos treinos selecionados
    const treinosMudaram = selectedIds.length !== treinosIniciais.length ||
                            !selectedIds.every(id => treinosIniciais.includes(id)) ||
                            !treinosIniciais.every(id => selectedIds.includes(id));
    
    setTreinosAlterados(treinosMudaram);
  };

  const formatarDadosParaAtualizacao = (formData: Record<string, any>): AtualizarColaboradorDTO => {
    const dadosAtualizacao: AtualizarColaboradorDTO = {};
    
    // Só inclui campos que foram alterados e são permitidos pelo backend
    if (formData.nome && formData.nome.trim() !== colaborador?.nome) {
      dadosAtualizacao.nome = formData.nome.trim();
    }
    
    if (formData.mail && formData.mail.trim() !== colaborador?.mail) {
      dadosAtualizacao.mail = formData.mail.trim();
    }
    
    if (formData.funcao && formData.funcao.trim() !== colaborador?.funcao) {
      dadosAtualizacao.funcao = formData.funcao.trim();
    }
    
    return dadosAtualizacao;
  };

  const handleSave = async (formData: Record<string, any>) => {
    if (!colaborador || !id) return;

    setSaving(true);
    setMessage(null);

    try {
      // Validar campos obrigatórios
      if (!formData.nome || !formData.mail || !formData.funcao) {
        setMessage({
          type: 'error',
          text: 'Por favor, preencha todos os campos obrigatórios.'
        });
        return;
      }

      const dadosAtualizacao = formatarDadosParaAtualizacao(formData);
      
      // Verifica se há dados para atualizar (incluindo treinos)
      const temDadosParaAtualizar = Object.keys(dadosAtualizacao).length > 0 || treinosAlterados;
      
      if (!temDadosParaAtualizar) {
        setMessage({
          type: 'error',
          text: 'Nenhum dado foi alterado.'
        });
        return;
      }

      console.log('Dados para atualização:', dadosAtualizacao);
      
      // Atualizar dados do colaborador
      let resultado = null;
      if (Object.keys(dadosAtualizacao).length > 0) {
        resultado = await alterarColaborador(parseInt(id), dadosAtualizacao);
      }
      
      // Atualizar treinos se houve mudança
      if (treinosAlterados && colaborador) {
        try {
          // Primeiro, remover o colaborador dos treinos que não estão mais selecionados
          const treinosParaRemover = treinosIniciais.filter(id => !treinosSelecionados.includes(id));
          
          for (const treinoId of treinosParaRemover) {
            // Buscar o treino atual para obter a lista completa de colaboradores
            const treinosAtuais = await listarTreinos();
            const treinoAtual = treinosAtuais.find(t => t.id === treinoId);
            
            if (treinoAtual) {
              // Remover apenas este colaborador da lista de colaboradores do treino
              const colaboradoresAtualizados = treinoAtual.colaboradoresIds.filter(id => id !== colaborador.id);
              
              await atualizarTreino(treinoId, {
                colaboradoresIds: colaboradoresAtualizados
              });
            }
          }
          
          // Depois, adicionar o colaborador aos treinos selecionados
          const treinosParaAdicionar = treinosSelecionados.filter(id => !treinosIniciais.includes(id));
          
          for (const treinoId of treinosParaAdicionar) {
            // Buscar o treino atual para obter a lista completa de colaboradores
            const treinosAtuais = await listarTreinos();
            const treinoAtual = treinosAtuais.find(t => t.id === treinoId);
            
            if (treinoAtual) {
              // Adicionar este colaborador à lista de colaboradores do treino
              const colaboradoresAtualizados = [...treinoAtual.colaboradoresIds, colaborador.id];
              
              await atualizarTreino(treinoId, {
                colaboradoresIds: colaboradoresAtualizados
              });
            }
          }
        } catch (error) {
          console.error('Erro ao atualizar treinos:', error);
          setMessage({
            type: 'error',
            text: 'Erro ao atualizar treinos. Tente novamente.'
          });
          return;
        }
      }
      
      if (resultado || treinosAlterados) {
        setMessage({
          type: 'success',
          text: 'Colaborador atualizado com sucesso!'
        });
        
        // Atualiza os dados do colaborador localmente se houve mudança nos dados
        if (resultado) {
          setColaborador(resultado);
        }
        
        // Resetar flag de treinos alterados
        setTreinosAlterados(false);
        setTreinosIniciais(treinosSelecionados);
        
        setTimeout(() => {
          setMessage(null);
          navigate('/colaboradores');
        }, 2000);
      } else {
        setMessage({
          type: 'error',
          text: 'Erro ao atualizar colaborador. Tente novamente.'
        });
      }
    } catch (error) {
      console.error('Erro ao atualizar colaborador:', error);
      setMessage({
        type: 'error',
        text: 'Erro interno. Tente novamente mais tarde.'
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="app-container">
        <HeaderPages title="Editar Colaborador" />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando dados do colaborador...</p>
        </div>
      </div>
    );
  }

  if (!colaborador) {
    return (
      <div className="app-container">
        <HeaderPages title="Editar Colaborador" />
        <div className="error-container">
          <p>Colaborador não encontrado</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <HeaderPages title="Editar Colaborador" />
      
      {message && (
        <div className={`status-message status-${message.type}`}>
          {message.text}
        </div>
      )}
      
      <EditForm
        title={`Editando: ${colaborador.nome}`}
        description="Edite os dados cadastrais do colaborador. Apenas os campos alterados serão enviados."
        entityName="colaborador"
        sections={formSections}
        initialData={{
          nome: colaborador.nome,
          mail: colaborador.mail,
          funcao: colaborador.funcao
        }}
        loading={loading || saving}
        onSave={handleSave}
        backUrl="/colaboradores"
      />

      {!loading && !saving && (
        <div className="actions-section">
          <div className="action-group">
            <h3>Treinos do Colaborador</h3>
            <p className="current-info">
              Selecione os treinos que o colaborador deve realizar
            </p>
            {treinosCarregando ? (
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Carregando treinos...</p>
              </div>
            ) : (
              <SelectableList
                items={treinosDisponiveis}
                selectedItems={treinosSelecionados}
                onSelectionChange={handleTreinosChange}
                maxSelections={10}
                emptyMessage="Nenhum treino disponível"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EditarColaborador; 