import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CadastrarTreino.css";
import HeaderPages from "../../../components/headerPages/HeaderPages";
import DynamicForm from "../../../components/DynamicForm/DynamicForm";
import SelectableList, { SelectableItem } from "../../../components/selectableList/SelectableList";
import { sections } from "../../../data/sections/treinos/cadastrarTreinoMock";
import { TreinoFormData } from "../../../services/treino/treinoCadastroService";
import TreinoCadastroService from "../../../services/treino/treinoCadastroService";
import AlunoCadastroService from "../../../services/aluno/alunoCadastroService";
import ColaboradorCadastroService from "../../../services/colaborador/colaboradorCadastroService";
import ExercicioCadastroService from "../../../services/exercicio/exercicioCadastroService";

const CadastrarTreino = () => {
  const navigate = useNavigate();
  const { cadastrarTreino } = TreinoCadastroService();
  const { listarAlunos } = AlunoCadastroService();
  const { listarColaboradores } = ColaboradorCadastroService();
  const { listarExercicios } = ExercicioCadastroService();
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  
  // Estados para SelectableList
  const [alunos, setAlunos] = useState<SelectableItem[]>([]);
  const [colaboradores, setColaboradores] = useState<SelectableItem[]>([]);
  const [exercicios, setExercicios] = useState<SelectableItem[]>([]);
  const [alunosSelecionados, setAlunosSelecionados] = useState<number[]>([]);
  const [colaboradoresSelecionados, setColaboradoresSelecionados] = useState<number[]>([]);
  const [exerciciosSelecionados, setExerciciosSelecionados] = useState<number[]>([]);
  const [carregandoDados, setCarregandoDados] = useState(true);

  // Carregar dados para os SelectableList
  useEffect(() => {
    const carregarDados = async () => {
      try {
        // Carregar alunos
        const alunosData = await listarAlunos();
        const alunosSelectable = alunosData.map(aluno => ({
          id: aluno.id,
          title: aluno.nome,
          subtitle: aluno.email,
          description: `Telefone: ${aluno.telefone}`
        }));
        setAlunos(alunosSelectable);

        // Carregar colaboradores
        const colaboradoresData = await listarColaboradores();
        const colaboradoresSelectable = colaboradoresData.map(colaborador => ({
          id: colaborador.id,
          title: colaborador.nome,
          subtitle: colaborador.mail,
          description: `Função: ${colaborador.funcao}`
        }));
        setColaboradores(colaboradoresSelectable);

        // Carregar exercícios
        const exerciciosData = await listarExercicios();
        const exerciciosSelectable = exerciciosData.map(exercicio => ({
          id: exercicio.id,
          title: exercicio.nome,
          subtitle: exercicio.equipamento,
          description: `Simetria: ${exercicio.simetria}`
        }));
        setExercicios(exerciciosSelectable);
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
  }, []);

  const formatarDados = (formData: Record<string, any>): TreinoFormData => {
    return {
      nome: formData.nome.trim(),
      feito: false,
      dia: formData.dia || new Date().toISOString().split('T')[0],
      urlVideo: formData.urlVideo?.trim() || '',
      numDeBlocos: parseFloat(formData.numDeBlocos) || 0,
      pse: parseInt(formData.pse) || 0,
      pseEstimado: parseInt(formData.pseEstimado) || 0,
      modalidade: formData.modalidade?.trim() || '',
      tempoEstimado: formData.tempoEstimado || "00:00:00",
      tempoRealizado: formData.tempoRealizado || "00:00:00",
      cargaEstimada: parseInt(formData.cargaEstimada) || 0,
      cargaReal: parseInt(formData.cargaReal) || 0,
      padraoMovimento: Array.isArray(formData.padraoMovimento) 
        ? formData.padraoMovimento 
        : [],
      distanciaPrescrita: parseFloat(formData.distanciaPrescrita) || 0,
      distanciaRealizada: parseFloat(formData.distanciaRealizada) || 0,
      caracteristica: formData.caracteristica?.trim() || '',
      areaTreino: formData.areaTreino?.trim() || '',
      microcicloId: null,
      alunosIds: alunosSelecionados,
      colaboradoresIds: colaboradoresSelecionados,
      exerciciosIds: exerciciosSelecionados,
    };
  };

  const handleAlunosChange = (selectedIds: number[]) => {
    setAlunosSelecionados(selectedIds);
  };

  const handleColaboradoresChange = (selectedIds: number[]) => {
    setColaboradoresSelecionados(selectedIds);
  };

  const handleExerciciosChange = (selectedIds: number[]) => {
    setExerciciosSelecionados(selectedIds);
  };

  const handleSubmit = async (formData: Record<string, any>) => {
    setLoading(true);
    setMessage(null);

    try {
      if (!formData.nome) {
        setMessage({
          type: 'error',
          text: 'Por favor, preencha pelo menos o nome do treino.'
        });
        return;
      }

      const dadosFormatados = formatarDados(formData);
      const resultado = await cadastrarTreino(dadosFormatados);
      
      if (resultado) {
        setMessage({
          type: 'success',
          text: 'Treino cadastrado com sucesso!'
        });
        setTimeout(() => {
          navigate('/treinos');
        }, 2000);
      } else {
        setMessage({
          type: 'error',
          text: 'Erro ao cadastrar treino. Tente novamente.'
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
      <HeaderPages title="Cadastrar Treino" />
      
      {message && (
        <div className={`status-message status-${message.type}`}>
          {message.text}
        </div>
      )}
      
      <DynamicForm 
        title="Dados do Treino"
        description="Preencha os dados abaixo para cadastrar um novo treino."
        sections={sections} 
        onSubmit={handleSubmit}
        disabled={loading}
      />

      {!carregandoDados && (
        <div className="actions-section">
          <div className="action-group">
            <h3>Alunos do Treino</h3>
            <p className="current-info">
              Selecione os alunos que participarão deste treino
            </p>
            
            <SelectableList
              items={alunos}
              selectedItems={alunosSelecionados}
              onSelectionChange={handleAlunosChange}
              maxSelections={50}
              emptyMessage="Nenhum aluno disponível"
            />
          </div>

          <div className="action-group">
            <h3>Colaboradores do Treino</h3>
            <p className="current-info">
              Selecione os colaboradores responsáveis por este treino
            </p>
            
            <SelectableList
              items={colaboradores}
              selectedItems={colaboradoresSelecionados}
              onSelectionChange={handleColaboradoresChange}
              maxSelections={20}
              emptyMessage="Nenhum colaborador disponível"
            />
          </div>

          <div className="action-group">
            <h3>Exercícios do Treino</h3>
            <p className="current-info">
              Selecione os exercícios que fazem parte deste treino
            </p>
            
            <SelectableList
              items={exercicios}
              selectedItems={exerciciosSelecionados}
              onSelectionChange={handleExerciciosChange}
              maxSelections={100}
              emptyMessage="Nenhum exercício disponível"
            />
          </div>
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

export default CadastrarTreino; 