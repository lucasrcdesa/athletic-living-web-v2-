import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EditarExercicio.css";
import HeaderPages from "../../../components/headerPages/HeaderPages";
import { EditForm, FormSection } from "../../../components";
import SelectableList, { SelectableItem } from "../../../components/selectableList/SelectableList";
import ExercicioCadastroService, { Exercicio } from '../../../services/exercicio/exercicioCadastroService';
import TreinoService, { Treino } from '../../../services/treino/treinoService';

const EditarExercicio = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [exercicio, setExercicio] = useState<Exercicio | null>(null);
  const [treinos, setTreinos] = useState<SelectableItem[]>([]);
  const [treinosSelecionados, setTreinosSelecionados] = useState<number[]>([]);
  const [blocosPorTreino, setBlocosPorTreino] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const { buscarExercicioPorId, alterarExercicio } = ExercicioCadastroService();
  const { listarTreinos } = TreinoService();

  // Configuração do formulário
  const formSections: FormSection[] = [
    {
      title: "Informações Básicas",
      fields: [
        {
          name: "nome",
          label: "Nome do Exercício",
          type: "text",
          required: true
        },
        {
          name: "equipamento",
          label: "Equipamento",
          type: "text",
          required: true
        },
        {
          name: "simetria",
          label: "Simetria",
          type: "text",
          required: true
        }
      ]
    }
  ];

  useEffect(() => {
    const carregarDados = async () => {
      if (!id) return;

      setLoading(true);
      try {
        // Buscar dados do exercício
        const exercicioData = await buscarExercicioPorId(parseInt(id));
        if (!exercicioData) {
          setMessage({ type: 'error', text: 'Exercício não encontrado' });
          return;
        }
        setExercicio(exercicioData);

        // Buscar todos os treinos
        const treinosData = await listarTreinos();
        const treinosSelectable = treinosData.map(treino => ({
          id: treino.id,
          title: treino.nome,
          subtitle: treino.modalidade || 'Sem modalidade',
          description: `Data: ${treino.dia || 'N/A'} | Blocos: ${treino.numDeBlocos || 0}`
        }));
        setTreinos(treinosSelectable);

        // Inicializar blocos por treino (por enquanto vazio, será preenchido quando selecionar treinos)
        setBlocosPorTreino({});

      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        setMessage({ type: 'error', text: 'Erro ao carregar dados do exercício' });
      } finally {
        setLoading(false);
      }
    };

    carregarDados();
  }, [id]);

  const handleTreinosChange = (selectedIds: number[]) => {
    setTreinosSelecionados(selectedIds);
    
    // Buscar número de blocos para os treinos selecionados
    const buscarBlocos = async () => {
      const treinosData = await listarTreinos();
      const novosBlocos: Record<number, number> = {};
      
      selectedIds.forEach(treinoId => {
        const treino = treinosData.find(t => t.id === treinoId);
        if (treino) {
          novosBlocos[treinoId] = treino.numDeBlocos || 1;
        }
      });
      
      setBlocosPorTreino(novosBlocos);
    };
    
    buscarBlocos();
  };

  const handleBlocoChange = (treinoId: number, bloco: number) => {
    setBlocosPorTreino(prev => ({
      ...prev,
      [treinoId]: bloco
    }));
  };

  // Calcular o número máximo de blocos dos treinos selecionados
  const maxBlocos = Math.max(...Object.values(blocosPorTreino), 1);

  // Função para obter número de blocos por treino
  const getNumBlocosPorTreino = (treinoId: number): number => {
    return blocosPorTreino[treinoId] || 1;
  };

  const handleSave = async (formData: Record<string, any>) => {
    if (!exercicio) return;

    try {
      const dadosAtualizacao = {
        ...formData
      };

      const exercicioAtualizado = await alterarExercicio(exercicio.id, dadosAtualizacao);
      
      if (exercicioAtualizado) {
        setMessage({ type: 'success', text: 'Exercício atualizado com sucesso!' });
        setTimeout(() => {
          navigate('/exercicios');
        }, 2000);
      } else {
        setMessage({ type: 'error', text: 'Erro ao atualizar exercício' });
      }
    } catch (error) {
      console.error('Erro ao salvar exercício:', error);
      setMessage({ type: 'error', text: 'Erro interno ao salvar' });
    }
  };

  if (loading) {
    return (
      <div className="app-container">
        <HeaderPages title="Editar Exercício" />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando dados do exercício...</p>
        </div>
      </div>
    );
  }

  if (!exercicio) {
    return (
      <div className="app-container">
        <HeaderPages title="Editar Exercício" />
        <div className="error-container">
          <p>Exercício não encontrado</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <HeaderPages title="Editar Exercício" />
      
      {message && (
        <div className={`status-message status-${message.type}`}>
          {message.text}
        </div>
      )}
      
      <EditForm
        title={`Editando: ${exercicio.nome}`}
        description="Edite as informações do exercício."
        entityName="exercício"
        sections={formSections}
        initialData={{
          nome: exercicio.nome,
          equipamento: exercicio.equipamento,
          simetria: exercicio.simetria
        }}
        loading={loading}
        onSave={handleSave}
        backUrl="/exercicios"
      />

      <SelectableList
        title="Treinos do Exercício"
        description="Selecione os treinos onde este exercício pode ser utilizado"
        items={treinos}
        selectedItems={treinosSelecionados}
        onSelectionChange={handleTreinosChange}
        maxSelections={50}
        emptyMessage="Nenhum treino disponível"
        showBlocoSelector={true}
        numBlocos={maxBlocos}
        blocosPorItem={blocosPorTreino}
        onBlocoChange={handleBlocoChange}
        getNumBlocosPorItem={getNumBlocosPorTreino}
      />
    </div>
  );
};

export default EditarExercicio; 