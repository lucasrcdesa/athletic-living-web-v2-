import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EditarTreino.css";
import HeaderPages from "../../../components/headerPages/HeaderPages";
import { EditForm, FormSection } from "../../../components";
import SelectableList, { SelectableItem } from "../../../components/selectableList/SelectableList";
import TreinoService, { Treino } from '../../../services/treino/treinoService';
import AlunoCadastroService, { Aluno } from '../../../services/aluno/alunoCadastroService';
import ColaboradorCadastroService, { Colaborador } from '../../../services/colaborador/colaboradorCadastroService';
import ExercicioCadastroService, { Exercicio } from '../../../services/exercicio/exercicioCadastroService';

const EditarTreino = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [treino, setTreino] = useState<Treino | null>(null);
  const [alunos, setAlunos] = useState<SelectableItem[]>([]);
  const [colaboradores, setColaboradores] = useState<SelectableItem[]>([]);
  const [exercicios, setExercicios] = useState<SelectableItem[]>([]);
  const [alunosSelecionados, setAlunosSelecionados] = useState<number[]>([]);
  const [colaboradoresSelecionados, setColaboradoresSelecionados] = useState<number[]>([]);
  const [exerciciosSelecionados, setExerciciosSelecionados] = useState<number[]>([]);
  const [blocosPorExercicio, setBlocosPorExercicio] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const { buscarTreinoPorId, atualizarTreino } = TreinoService();
  const { listarAlunos } = AlunoCadastroService();
  const { listarColaboradores } = ColaboradorCadastroService();
  const { listarExercicios } = ExercicioCadastroService();

  // Configuração do formulário
  const formSections: FormSection[] = [
    {
      title: "Dados do Treino",
      fields: [
        {
          name: "nome",
          label: "Nome do Treino",
          type: "text",
          required: true
        },
        {
          name: "modalidade",
          label: "Modalidade",
          type: "text"
        },
        {
          name: "dia",
          label: "Data",
          type: "date"
        },
        {
          name: "tempoEstimado",
          label: "Tempo Estimado",
          type: "text",
          placeholder: "ex: 60 min"
        },
        {
          name: "descricao",
          label: "Descrição",
          type: "textarea",
          rows: 3
        }
      ]
    }
  ];

  useEffect(() => {
    const carregarDados = async () => {
      if (!id) return;

      setLoading(true);
      try {
        // Buscar dados do treino
        const treinoData = await buscarTreinoPorId(parseInt(id));
        if (!treinoData) {
          setMessage({ type: 'error', text: 'Treino não encontrado' });
          return;
        }
        setTreino(treinoData);

        // Buscar todos os alunos
        const alunosData = await listarAlunos();
        const alunosSelectable = alunosData.map(aluno => ({
          id: aluno.id,
          title: aluno.nome,
          subtitle: aluno.email,
          description: `Telefone: ${aluno.telefone}`
        }));
        setAlunos(alunosSelectable);

        // Buscar todos os colaboradores
        const colaboradoresData = await listarColaboradores();
        const colaboradoresSelectable = colaboradoresData.map(colaborador => ({
          id: colaborador.id,
          title: colaborador.nome,
          subtitle: colaborador.mail,
          description: `Função: ${colaborador.funcao}`
        }));
        setColaboradores(colaboradoresSelectable);

        // Buscar todos os exercícios
        const exerciciosData = await listarExercicios();
        const exerciciosSelectable = exerciciosData.map(exercicio => ({
          id: exercicio.id,
          title: exercicio.nome,
          subtitle: exercicio.equipamento,
          description: `Simetria: ${exercicio.simetria}`
        }));
        setExercicios(exerciciosSelectable);

        // Definir seleções iniciais
        setAlunosSelecionados(treinoData.alunosIds || []);
        setColaboradoresSelecionados(treinoData.colaboradoresIds || []);
        setExerciciosSelecionados(treinoData.exerciciosIds || []);

      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        setMessage({ type: 'error', text: 'Erro ao carregar dados do treino' });
      } finally {
        setLoading(false);
      }
    };

    carregarDados();
  }, [id]);

  const handleAlunosChange = (selectedIds: number[]) => {
    setAlunosSelecionados(selectedIds);
  };

  const handleColaboradoresChange = (selectedIds: number[]) => {
    setColaboradoresSelecionados(selectedIds);
  };

  const handleExerciciosChange = (selectedIds: number[]) => {
    setExerciciosSelecionados(selectedIds);
    
    // Inicializar blocos para os exercícios selecionados
    const novosBlocos: Record<number, number> = {};
    selectedIds.forEach(exercicioId => {
      novosBlocos[exercicioId] = 1; // Bloco padrão é 1
    });
    setBlocosPorExercicio(novosBlocos);
  };

  const handleBlocoChange = (exercicioId: number, bloco: number) => {
    setBlocosPorExercicio(prev => ({
      ...prev,
      [exercicioId]: bloco
    }));
  };

  // Função para obter número de blocos por exercício (sempre o mesmo do treino)
  const getNumBlocosPorExercicio = (exercicioId: number): number => {
    return treino?.numDeBlocos || 1;
  };

  const handleSave = async (formData: Record<string, any>) => {
    if (!treino) return;

    try {
      const dadosAtualizacao = {
        ...formData,
        alunosIds: alunosSelecionados,
        colaboradoresIds: colaboradoresSelecionados,
        exerciciosIds: exerciciosSelecionados,
        // Incluir dados dos blocos dos exercícios
        exerciciosComBlocos: exerciciosSelecionados.map(exercicioId => ({
          exercicioId: exercicioId,
          bloco: blocosPorExercicio[exercicioId] || 1
        }))
      };

      const treinoAtualizado = await atualizarTreino(treino.id, dadosAtualizacao);
      
      if (treinoAtualizado) {
        setMessage({ type: 'success', text: 'Treino atualizado com sucesso!' });
        setTimeout(() => {
          navigate('/treinos');
        }, 2000);
      } else {
        setMessage({ type: 'error', text: 'Erro ao atualizar treino' });
      }
    } catch (error) {
      console.error('Erro ao salvar treino:', error);
      setMessage({ type: 'error', text: 'Erro interno ao salvar' });
    }
  };

  if (loading) {
    return (
      <div className="app-container">
        <HeaderPages title="Editar Treino" />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando dados do treino...</p>
        </div>
      </div>
    );
  }

  if (!treino) {
    return (
      <div className="app-container">
        <HeaderPages title="Editar Treino" />
        <div className="error-container">
          <p>Treino não encontrado</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <HeaderPages title="Editar Treino" />
      
      {message && (
        <div className={`status-message status-${message.type}`}>
          {message.text}
        </div>
      )}
      
      <EditForm
        title={`Editando: ${treino.nome}`}
        description="Edite as informações do treino."
        entityName="treino"
        sections={formSections}
        initialData={{
          nome: treino.nome,
          modalidade: treino.modalidade || '',
          dia: treino.dia || '',
          tempoEstimado: treino.tempoEstimado || '',
          descricao: treino.caracteristica || ''
        }}
        loading={loading}
        onSave={handleSave}
        backUrl="/treinos"
      />

      <SelectableList
        title="Alunos do Treino"
        description="Selecione os alunos que participam deste treino"
        items={alunos}
        selectedItems={alunosSelecionados}
        onSelectionChange={handleAlunosChange}
        maxSelections={50}
        emptyMessage="Nenhum aluno disponível"
      />

      <SelectableList
        title="Colaboradores do Treino"
        description="Selecione os colaboradores responsáveis por este treino"
        items={colaboradores}
        selectedItems={colaboradoresSelecionados}
        onSelectionChange={handleColaboradoresChange}
        maxSelections={20}
        emptyMessage="Nenhum colaborador disponível"
      />

      <SelectableList
        title="Exercícios do Treino"
        description="Selecione os exercícios que fazem parte deste treino"
        items={exercicios}
        selectedItems={exerciciosSelecionados}
        onSelectionChange={handleExerciciosChange}
        maxSelections={100}
        emptyMessage="Nenhum exercício disponível"
        showBlocoSelector={true}
        numBlocos={treino?.numDeBlocos || 1}
        blocosPorItem={blocosPorExercicio}
        onBlocoChange={handleBlocoChange}
        getNumBlocosPorItem={getNumBlocosPorExercicio}
      />
    </div>
  );
};

export default EditarTreino; 