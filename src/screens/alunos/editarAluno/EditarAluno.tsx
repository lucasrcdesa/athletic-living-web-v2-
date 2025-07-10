import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EditarAluno.css";
import HeaderPages from "../../../components/headerPages/HeaderPages";
import { EditForm, FormSection } from "../../../components";
import SelectableList, { SelectableItem } from "../../../components/selectableList/SelectableList";
import AlunoCadastroService, { Aluno, AtualizarAlunoDTO } from '../../../services/aluno/alunoCadastroService';
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

const EditarAluno = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [aluno, setAluno] = useState<Aluno | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [treinosSelecionados, setTreinosSelecionados] = useState<number[]>([]);
  const [treinosDisponiveis, setTreinosDisponiveis] = useState<SelectableItem[]>([]);
  const [treinosCarregando, setTreinosCarregando] = useState(false);
  const [treinosAlterados, setTreinosAlterados] = useState(false);
  const [treinosIniciais, setTreinosIniciais] = useState<number[]>([]);

  const { buscarAlunoPorId, alterarAluno } = AlunoCadastroService();
  const { listarTreinos, buscarTreinosPorAluno, atualizarTreino } = TreinoService();

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
          name: "telefone",
          label: "Telefone",
          type: "tel",
          required: true
        },
        {
          name: "endereco",
          label: "Endereço",
          type: "text"
        },
        {
          name: "cep",
          label: "CEP",
          type: "text"
        }
      ]
    }
  ];

  useEffect(() => {
    const fetchAluno = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const alunoData = await buscarAlunoPorId(parseInt(id));
        if (alunoData) {
          setAluno(alunoData);
          
          // Carregar treinos do aluno
          setTreinosCarregando(true);
          try {
            const treinosDoAluno = await buscarTreinosPorAluno(parseInt(id));
            const treinosIds = treinosDoAluno.map(t => t.id);
            setTreinosSelecionados(treinosIds);
            setTreinosIniciais(treinosIds); // Armazenar treinos iniciais
          } catch (error) {
            console.error('Erro ao buscar treinos do aluno:', error);
            setTreinosSelecionados([]);
            setTreinosIniciais([]);
          } finally {
            setTreinosCarregando(false);
          }
        } else {
          console.error('Aluno não encontrado');
          navigate('/alunos');
        }
      } catch (error) {
        console.error('Erro ao buscar aluno:', error);
        navigate('/alunos');
      } finally {
        setLoading(false);
      }
    };

    fetchAluno();
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

  const formatarDadosParaAtualizacao = (formData: Record<string, any>): AtualizarAlunoDTO => {
    const dadosAtualizacao: AtualizarAlunoDTO = {};
    
    // Só inclui campos que foram alterados e são permitidos pelo backend
    if (formData.nome && formData.nome.trim() !== aluno?.nome) {
      dadosAtualizacao.nome = formData.nome.trim();
    }
    
    if (formData.telefone && formData.telefone.replace(/\D/g, '') !== aluno?.telefone) {
      dadosAtualizacao.telefone = formData.telefone.replace(/\D/g, '');
    }
    
    if (formData.endereco !== aluno?.endereco) {
      dadosAtualizacao.endereco = formData.endereco?.trim() || '';
    }
    
    if (formData.cep !== aluno?.cep) {
      dadosAtualizacao.cep = formData.cep?.replace(/\D/g, '') || '';
    }
    
    return dadosAtualizacao;
  };

  const handleSave = async (formData: Record<string, any>) => {
    if (!aluno || !id) return;

    setSaving(true);
    setMessage(null);

    try {
      // Validar campos obrigatórios
      if (!formData.nome || !formData.telefone) {
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
      
      // Atualizar dados do aluno
      let resultado = null;
      if (Object.keys(dadosAtualizacao).length > 0) {
        resultado = await alterarAluno(parseInt(id), dadosAtualizacao);
      }
      
      // Atualizar treinos se houve mudança
      if (treinosAlterados && aluno) {
        try {
          // Primeiro, remover o aluno dos treinos que não estão mais selecionados
          const treinosParaRemover = treinosIniciais.filter(id => !treinosSelecionados.includes(id));
          
          for (const treinoId of treinosParaRemover) {
            // Buscar o treino atual para obter a lista completa de alunos
            const treinosAtuais = await listarTreinos();
            const treinoAtual = treinosAtuais.find(t => t.id === treinoId);
            
            if (treinoAtual) {
              // Remover apenas este aluno da lista de alunos do treino
              const alunosAtualizados = treinoAtual.alunosIds.filter(id => id !== aluno.id);
              
              await atualizarTreino(treinoId, {
                alunosIds: alunosAtualizados
              });
            }
          }
          
          // Depois, adicionar o aluno aos treinos selecionados
          const treinosParaAdicionar = treinosSelecionados.filter(id => !treinosIniciais.includes(id));
          
          for (const treinoId of treinosParaAdicionar) {
            // Buscar o treino atual para obter a lista completa de alunos
            const treinosAtuais = await listarTreinos();
            const treinoAtual = treinosAtuais.find(t => t.id === treinoId);
            
            if (treinoAtual) {
              // Adicionar este aluno à lista de alunos do treino
              const alunosAtualizados = [...treinoAtual.alunosIds, aluno.id];
              
              await atualizarTreino(treinoId, {
                alunosIds: alunosAtualizados
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
          text: 'Aluno atualizado com sucesso!'
        });
        
        // Atualiza os dados do aluno localmente se houve mudança nos dados
        if (resultado) {
          setAluno(resultado);
        }
        
        // Resetar flag de treinos alterados
        setTreinosAlterados(false);
        setTreinosIniciais(treinosSelecionados);
        
        setTimeout(() => {
          setMessage(null);
          navigate('/alunos');
        }, 2000);
      } else {
        setMessage({
          type: 'error',
          text: 'Erro ao atualizar aluno. Tente novamente.'
        });
      }
    } catch (error) {
      console.error('Erro ao atualizar aluno:', error);
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
        <HeaderPages title="Editar Aluno" />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando dados do aluno...</p>
        </div>
      </div>
    );
  }

  if (!aluno) {
    return (
      <div className="app-container">
        <HeaderPages title="Editar Aluno" />
        <div className="error-container">
          <p>Aluno não encontrado</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <HeaderPages title="Editar Aluno" />
      
      {message && (
        <div className={`status-message status-${message.type}`}>
          {message.text}
        </div>
      )}
      
      <EditForm
        title={`Editando: ${aluno.nome}`}
        description="Edite os dados cadastrais do aluno. Apenas os campos alterados serão enviados."
        entityName="aluno"
        sections={formSections}
        initialData={{
          nome: aluno.nome,
          telefone: aluno.telefone,
          endereco: aluno.endereco,
          cep: aluno.cep
        }}
        loading={loading || saving}
        onSave={handleSave}
        backUrl="/alunos"
      />

      {!loading && !saving && (
        <div className="actions-section">
          <div className="action-group">
            <h3>Treinos do Aluno</h3>
            <p className="current-info">
              Selecione os treinos que o aluno deve realizar
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

export default EditarAluno; 