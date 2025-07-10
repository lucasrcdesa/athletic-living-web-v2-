import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AdicionarExerciciosMicrociclo.css";
import HeaderPages from "../../components/headerPages/HeaderPages";
import SelectableList from "../../components/selectableList/SelectableList";

// Mock de dados do microciclo
const mockMicrociclo = {
  id: 7,
  nome: "Microciclo 3",
  duracao: 7,
  dataInicio: "2024-02-15",
  dataFim: "2024-02-21",
  status: "em_andamento"
};

// Mock de exercícios disponíveis
const mockExercicios = [
  { id: 1, title: "Supino Reto", subtitle: "Peito", description: "Equipamento: Barra" },
  { id: 2, title: "Supino Inclinado", subtitle: "Peito", description: "Equipamento: Barra" },
  { id: 3, title: "Supino Declinado", subtitle: "Peito", description: "Equipamento: Barra" },
  { id: 4, title: "Agachamento", subtitle: "Pernas", description: "Equipamento: Barra" },
  { id: 5, title: "Leg Press", subtitle: "Pernas", description: "Equipamento: Máquina" },
  { id: 6, title: "Hack Squat", subtitle: "Pernas", description: "Equipamento: Máquina" },
  { id: 7, title: "Remada Curvada", subtitle: "Costas", description: "Equipamento: Barra" },
  { id: 8, title: "Puxada na Frente", subtitle: "Costas", description: "Equipamento: Polia" },
  { id: 9, title: "Desenvolvimento", subtitle: "Ombros", description: "Equipamento: Barra" },
  { id: 10, title: "Elevação Lateral", subtitle: "Ombros", description: "Equipamento: Halteres" },
  { id: 11, title: "Rosca Direta", subtitle: "Bíceps", description: "Equipamento: Barra" },
  { id: 12, title: "Rosca Martelo", subtitle: "Bíceps", description: "Equipamento: Halteres" },
  { id: 13, title: "Tríceps na Polia", subtitle: "Tríceps", description: "Equipamento: Polia" },
  { id: 14, title: "Tríceps Corda", subtitle: "Tríceps", description: "Equipamento: Polia" },
  { id: 15, title: "Extensão de Pernas", subtitle: "Pernas", description: "Equipamento: Máquina" },
  { id: 16, title: "Flexão de Pernas", subtitle: "Pernas", description: "Equipamento: Máquina" },
  { id: 17, title: "Encolhimento", subtitle: "Trapézio", description: "Equipamento: Halteres" },
  { id: 18, title: "Elevação Pélvica", subtitle: "Glúteos", description: "Equipamento: Peso Corporal" },
  { id: 19, title: "Abdominal Crunch", subtitle: "Abdômen", description: "Equipamento: Peso Corporal" },
  { id: 20, title: "Plank", subtitle: "Abdômen", description: "Equipamento: Peso Corporal" }
];

const AdicionarExerciciosMicrociclo = () => {
  const navigate = useNavigate();
  const { id, macrocicloId, mesocicloId, microcicloId } = useParams();
  const [microciclo, setMicrociclo] = useState(mockMicrociclo);
  const [exercicios, setExercicios] = useState(mockExercicios);
  const [exerciciosSelecionados, setExerciciosSelecionados] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    series: 3,
    repeticoes: "8-10",
    carga: "",
    observacoes: ""
  });

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const handleVoltar = () => {
    navigate(`/periodizacoes/${id}/macrociclo/${macrocicloId}`);
  };

  const handleExercicioSelecionado = (exercicio: any) => {
    setExerciciosSelecionados([...exerciciosSelecionados, exercicio]);
  };

  const handleExercicioRemovido = (exercicioId: number) => {
    setExerciciosSelecionados(exerciciosSelecionados.filter(ex => ex.id !== exercicioId));
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleSalvar = () => {
    if (exerciciosSelecionados.length === 0) {
      alert('Selecione pelo menos um exercício!');
      return;
    }

    // Aqui você faria a chamada para a API
    console.log('Exercícios selecionados:', exerciciosSelecionados);
    console.log('Configurações:', formData);
    
    alert('Exercícios adicionados com sucesso!');
    handleVoltar();
  };

  const columns = [
    { key: "nome", label: "Nome", width: "40%", sortable: true },
    { key: "categoria", label: "Categoria", width: "30%", sortable: true },
    { key: "equipamento", label: "Equipamento", width: "30%", sortable: true },
  ];

  if (loading) {
    return (
      <div className="app-container">
        <HeaderPages title={`Adicionar Exercícios - ${microciclo.nome}`} />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando exercícios...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <HeaderPages title={`Adicionar Exercícios - ${microciclo.nome}`} />
      
      <div className="adicionar-exercicios-container">
        {/* Informações do microciclo */}
        <div className="microciclo-info">
          <div className="info-header">
            <button className="btn-voltar" onClick={handleVoltar}>
              ← Voltar
            </button>
            <h2>{microciclo.nome}</h2>
          </div>
          
          <div className="info-details">
            <div className="info-item">
              <strong>Duração:</strong> {microciclo.duracao} dias
            </div>
            <div className="info-item">
              <strong>Período:</strong> {new Date(microciclo.dataInicio).toLocaleDateString('pt-BR')} - {new Date(microciclo.dataFim).toLocaleDateString('pt-BR')}
            </div>
            <div className="info-item">
              <strong>Status:</strong> 
              <span className="status-badge status-em_andamento">
                Em Andamento
              </span>
            </div>
          </div>
        </div>

        {/* Configurações gerais */}
        <div className="configuracoes-section">
          <h3>Configurações Gerais</h3>
          <div className="configuracoes-grid">
            <div className="config-item">
              <label>Séries:</label>
              <input
                type="number"
                value={formData.series}
                onChange={(e) => handleInputChange('series', parseInt(e.target.value))}
                min="1"
                max="10"
              />
            </div>
            <div className="config-item">
              <label>Repetições:</label>
              <input
                type="text"
                value={formData.repeticoes}
                onChange={(e) => handleInputChange('repeticoes', e.target.value)}
                placeholder="ex: 8-10"
              />
            </div>
            <div className="config-item">
              <label>Carga (kg):</label>
              <input
                type="text"
                value={formData.carga}
                onChange={(e) => handleInputChange('carga', e.target.value)}
                placeholder="ex: 50kg"
              />
            </div>
            <div className="config-item">
              <label>Observações:</label>
              <input
                type="text"
                value={formData.observacoes}
                onChange={(e) => handleInputChange('observacoes', e.target.value)}
                placeholder="Observações adicionais"
              />
            </div>
          </div>
        </div>

        {/* Seleção de exercícios */}
        <div className="exercicios-section">
          <h3>Selecionar Exercícios</h3>
          <p className="instrucoes">
            Selecione os exercícios que deseja adicionar ao microciclo. 
            As configurações gerais serão aplicadas a todos os exercícios selecionados.
          </p>
          
          <SelectableList
            items={exercicios}
            selectedItems={exerciciosSelecionados.map(ex => ex.id)}
            onSelectionChange={(selectedIds) => {
              const selectedExercicios = exercicios.filter(ex => selectedIds.includes(ex.id));
              setExerciciosSelecionados(selectedExercicios);
            }}
            maxSelections={10}
            emptyMessage="Nenhum exercício disponível"
          />
        </div>

        {/* Botões de ação */}
        <div className="acoes-footer">
          <button className="btn-cancelar" onClick={handleVoltar}>
            Cancelar
          </button>
          <button 
            className="btn-salvar" 
            onClick={handleSalvar}
            disabled={exerciciosSelecionados.length === 0}
          >
            Salvar Exercícios ({exerciciosSelecionados.length})
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdicionarExerciciosMicrociclo; 