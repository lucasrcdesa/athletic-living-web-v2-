import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "./EditarMicrociclo.css";
import HeaderPages from "../../../components/headerPages/HeaderPages";
import SelectableList, { SelectableItem } from "../../../components/selectableList/SelectableList";
import MicrocicloService, { Microciclo, MicrocicloUpdateDTO } from '../../../services/periodizacao/microcicloService';
import MesocicloService, { Mesociclo } from '../../../services/periodizacao/mesocicloService';
import ExercicioCadastroService, { Exercicio } from '../../../services/exercicio/exercicioCadastroService';

const EditarMicrociclo = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [microciclo, setMicrociclo] = useState<Microciclo | null>(null);
  const [mesociclo, setMesociclo] = useState<Mesociclo | null>(null);
  const [exercicios, setExercicios] = useState<Exercicio[]>([]);
  const [exerciciosSelecionados, setExerciciosSelecionados] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    caracteristica: '',
    duracao: 0
  });

  const { buscarMicrocicloPorId, alterarMicrociclo, listarMicrociclosPorMesociclo } = MicrocicloService();
  const { buscarMesocicloPorId } = MesocicloService();
  const { listarExercicios } = ExercicioCadastroService();

  const isClone = location.state?.isClone || false;
  const originalData = location.state?.originalData;

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      setLoading(true);
      try {
        // Carregar exercícios
        const exerciciosData = await listarExercicios();
        setExercicios(exerciciosData);

        // Se for clone, usar dados originais
        if (isClone && originalData) {
          setMicrociclo(originalData);
          setFormData({
            name: originalData.name,
            caracteristica: originalData.caracteristica,
            duracao: originalData.duracao
          });
          
          // Buscar dados do mesociclo
          if (originalData.mesocicloId) {
            const mesocicloData = await buscarMesocicloPorId(originalData.mesocicloId);
            if (mesocicloData) {
              setMesociclo(mesocicloData);
            }
          }
        } else if (id) {
          // Buscar dados do microciclo
          const microcicloData = await buscarMicrocicloPorId(parseInt(id));
          if (microcicloData) {
            setMicrociclo(microcicloData);
            setFormData({
              name: microcicloData.name,
              caracteristica: microcicloData.caracteristica,
              duracao: microcicloData.duracao
            });

            // Buscar dados do mesociclo - tentar encontrar através da listagem
            if (microcicloData.mesocicloId) {
              const mesocicloData = await buscarMesocicloPorId(microcicloData.mesocicloId);
              if (mesocicloData) {
                setMesociclo(mesocicloData);
              }
            } else {
              // Se não temos mesocicloId, buscar todos os mesociclos e encontrar qual contém este microciclo
              const { listarMesociclos } = MesocicloService();
              const mesociclos = await listarMesociclos();
              
              for (const mesociclo of mesociclos) {
                const microciclosDoMesociclo = await listarMicrociclosPorMesociclo(mesociclo.id);
                const microcicloEncontrado = microciclosDoMesociclo.find((m: any) => m.id === parseInt(id));
                if (microcicloEncontrado) {
                  setMesociclo(mesociclo);
                  break;
                }
              }
            }
          }
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        setMessage({ type: 'error', text: 'Erro ao carregar dados' });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, isClone, originalData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'duracao' ? parseInt(value) || 0 : value
    }));
  };

  const handleExerciciosChange = (selectedIds: number[]) => {
    setExerciciosSelecionados(selectedIds);
  };

  // Converter exercícios para o formato do SelectableList
  const exerciciosSelectable: SelectableItem[] = exercicios.map(exercicio => ({
    id: exercicio.id,
    title: exercicio.nome,
    subtitle: exercicio.equipamento,
    description: `${exercicio.series} séries x ${exercicio.repeticoes} reps`
  }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!microciclo) return;

    setSaving(true);
    try {
      const dadosAtualizados: MicrocicloUpdateDTO = {};
      
      // Só enviar campos que foram alterados
      if (formData.name !== microciclo.name) dadosAtualizados.name = formData.name;
      if (formData.caracteristica !== microciclo.caracteristica) dadosAtualizados.caracteristica = formData.caracteristica;
      if (formData.duracao !== microciclo.duracao) dadosAtualizados.duracao = formData.duracao;

      if (Object.keys(dadosAtualizados).length === 0) {
        setMessage({ type: 'error', text: 'Nenhuma alteração foi feita' });
        setTimeout(() => setMessage(null), 3000);
        setSaving(false);
        return;
      }

      const resultado = await alterarMicrociclo(microciclo.id, dadosAtualizados);
      
      if (resultado) {
        setMessage({ type: 'success', text: 'Microciclo atualizado com sucesso!' });
        setTimeout(() => {
          if (microciclo.mesocicloId) {
            navigate(`/periodizacoes/microciclos/${microciclo.mesocicloId}`);
          } else {
            navigate('/periodizacoes');
          }
        }, 2000);
      } else {
        setMessage({ type: 'error', text: 'Erro ao atualizar microciclo' });
      }
    } catch (error) {
      console.error('Erro ao salvar:', error);
      setMessage({ type: 'error', text: 'Erro interno ao salvar' });
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (microciclo && microciclo.mesocicloId) {
      navigate(`/periodizacoes/microciclos/${microciclo.mesocicloId}`);
    } else {
      navigate('/periodizacoes');
    }
  };

  if (loading) {
    return (
      <div className="app-container">
        <HeaderPages title="Editar Microciclo" />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando dados...</p>
        </div>
      </div>
    );
  }

  if (!microciclo || !mesociclo) {
    return (
      <div className="app-container">
        <HeaderPages title="Editar Microciclo" />
        <div className="error-container">
          <p>Microciclo não encontrado</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <HeaderPages title={`Editar Microciclo - ${mesociclo.name}`} />
      
      {message && (
        <div className={`status-message status-${message.type}`}>
          {message.text}
        </div>
      )}
      
      <div className="edit-container">
        <div className="form-header">
          <h2>{isClone ? 'Clonar' : 'Editar'} Microciclo</h2>
          <p>Mesociclo: {mesociclo.name}</p>
        </div>
        
        <form onSubmit={handleSubmit} className="edit-form">
          <div className="form-group">
            <label htmlFor="name">Nome do Microciclo</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="Ex: Microciclo de Adaptação"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="caracteristica">Característica</label>
            <input
              type="text"
              id="caracteristica"
              name="caracteristica"
              value={formData.caracteristica}
              onChange={handleInputChange}
              required
              placeholder="Ex: Microciclo"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="duracao">Duração (dias)</label>
            <input
              type="number"
              id="duracao"
              name="duracao"
              value={formData.duracao}
              onChange={handleInputChange}
              required
              min="1"
              max="30"
              placeholder="Ex: 7"
            />
          </div>

          <div className="form-group">
            <label>Exercícios do Microciclo</label>
            <SelectableList
              items={exerciciosSelectable}
              selectedItems={exerciciosSelecionados}
              onSelectionChange={handleExerciciosChange}
              multiSelect={true}
              placeholder="Selecione os exercícios"
              searchPlaceholder="Pesquisar exercícios..."
              title="Exercícios Disponíveis"
              description="Selecione os exercícios que farão parte deste microciclo"
              sortOptions={[
                { key: "title", label: "Nome" },
                { key: "subtitle", label: "Equipamento" }
              ]}
            />
          </div>
          
          <div className="form-actions">
            <button
              type="button"
              className="btn-cancelar"
              onClick={handleCancel}
              disabled={saving}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn-salvar"
              disabled={saving}
            >
              {saving ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarMicrociclo; 