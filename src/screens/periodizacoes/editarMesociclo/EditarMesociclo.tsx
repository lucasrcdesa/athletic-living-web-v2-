import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "./EditarMesociclo.css";
import HeaderPages from "../../../components/headerPages/HeaderPages";
import DataTable from "../../../components/dataTable/DataTable";
import MesocicloService, { Mesociclo, MesocicloUpdateDTO, MesocicloFormData } from '../../../services/periodizacao/mesocicloService';
import MicrocicloService, { Microciclo, MicrocicloFormData } from '../../../services/periodizacao/microcicloService';
import MacrocicloService, { Macrociclo } from '../../../services/periodizacao/macrocicloService';

const EditarMesociclo = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [mesociclo, setMesociclo] = useState<Mesociclo | null>(null);
  const [macrociclo, setMacrociclo] = useState<Macrociclo | null>(null);
  const [microciclos, setMicrociclos] = useState<Microciclo[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    objetivo: '',
    duracao: 0
  });
  const [novoMicrociclo, setNovoMicrociclo] = useState({
    name: '',
    caracteristica: '',
    duracao: 0
  });
  const [showAddMicrociclo, setShowAddMicrociclo] = useState(false);

  const { buscarMesocicloPorId, alterarMesociclo, listarMesociclosPorMacrociclo } = MesocicloService();
  const { listarMicrociclosPorMesociclo, cadastrarMicrociclo, deletarMicrociclo } = MicrocicloService();
  const { buscarMacrocicloPorId } = MacrocicloService();

  const isClone = location.state?.isClone || false;
  const originalData = location.state?.originalData;
  const isNew = location.state?.isNew || false;
  const macrocicloId = location.state?.macrocicloId;

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      setLoading(true);
      try {
        // Se for clone, usar dados originais
        if (isClone && originalData) {
          setMesociclo(originalData);
          setFormData({
            name: originalData.name,
            objetivo: originalData.objetivo,
            duracao: originalData.duracao
          });
          
          // Buscar dados do macrociclo
          const macrocicloData = await buscarMacrocicloPorId(originalData.macrocicloId);
          if (macrocicloData) {
            setMacrociclo(macrocicloData);
          }
        } else if (id) {
          // Buscar dados do mesociclo
          const mesocicloData = await buscarMesocicloPorId(parseInt(id));
          if (mesocicloData) {
            setMesociclo(mesocicloData);
            setFormData({
              name: mesocicloData.name,
              objetivo: mesocicloData.objetivo,
              duracao: mesocicloData.duracao
            });

            // Buscar dados do macrociclo
            const macrocicloData = await buscarMacrocicloPorId(mesocicloData.macrocicloId);
            if (macrocicloData) {
              setMacrociclo(macrocicloData);
            }
          }
        }

        // Buscar microciclos do mesociclo
        if (id) {
          const microciclosData = await listarMicrociclosPorMesociclo(parseInt(id));
          setMicrociclos(microciclosData);
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

  const handleNovoMicrocicloChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNovoMicrociclo(prev => ({
      ...prev,
      [name]: name === 'duracao' ? parseInt(value) || 0 : value
    }));
  };

  const handleMicrociclosChange = (selectedIds: number[]) => {
    // This function is no longer needed as SelectableList is removed
  };

  const handleAddMicrociclo = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!mesociclo) return;

    setSaving(true);
    try {
      const microcicloData: MicrocicloFormData = {
        name: novoMicrociclo.name,
        caracteristica: novoMicrociclo.caracteristica,
        duracao: novoMicrociclo.duracao,
        mesocicloId: mesociclo.id
      };

      const resultado = await cadastrarMicrociclo(microcicloData);
      
      if (resultado) {
        // Adicionar o novo microciclo à lista
        setMicrociclos([...microciclos, resultado]);
        setNovoMicrociclo({ name: '', caracteristica: '', duracao: 0 });
        setShowAddMicrociclo(false);
        setMessage({ type: 'success', text: 'Microciclo criado com sucesso!' });
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage({ type: 'error', text: 'Erro ao criar microciclo' });
      }
    } catch (error) {
      console.error('Erro ao salvar:', error);
      setMessage({ type: 'error', text: 'Erro interno ao salvar' });
    } finally {
      setSaving(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!mesociclo) return;

    setSaving(true);
    try {
      const dadosAtualizados: MesocicloUpdateDTO = {};
      
      // Só enviar campos que foram alterados
      if (formData.name !== mesociclo.name) dadosAtualizados.name = formData.name;
      if (formData.objetivo !== mesociclo.objetivo) dadosAtualizados.objetivo = formData.objetivo;
      if (formData.duracao !== mesociclo.duracao) dadosAtualizados.duracao = formData.duracao;

      if (Object.keys(dadosAtualizados).length === 0) {
        setMessage({ type: 'error', text: 'Nenhuma alteração foi feita' });
        setTimeout(() => setMessage(null), 3000);
        setSaving(false);
        return;
      }

      const resultado = await alterarMesociclo(mesociclo.id, dadosAtualizados);
      
      if (resultado) {
        setMessage({ type: 'success', text: 'Mesociclo atualizado com sucesso!' });
        setTimeout(() => {
          navigate(`/periodizacoes/mesociclos/${mesociclo.macrocicloId}`);
        }, 2000);
      } else {
        setMessage({ type: 'error', text: 'Erro ao atualizar mesociclo' });
      }
    } catch (error) {
      console.error('Erro ao salvar:', error);
      setMessage({ type: 'error', text: 'Erro interno ao salvar' });
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (mesociclo) {
      navigate(`/periodizacoes/mesociclos/${mesociclo.macrocicloId}`);
    } else {
      navigate('/periodizacoes');
    }
  };

  if (loading) {
    return (
      <div className="app-container">
        <HeaderPages title="Editar Mesociclo" />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando dados...</p>
        </div>
      </div>
    );
  }

  if (!mesociclo || !macrociclo) {
    return (
      <div className="app-container">
        <HeaderPages title="Editar Mesociclo" />
        <div className="error-container">
          <p>Mesociclo não encontrado</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <HeaderPages title={`Editar Mesociclo - ${macrociclo.name}`} />
      
      {message && (
        <div className={`status-message status-${message.type}`}>
          {message.text}
        </div>
      )}
      
      <div className="edit-container">
        <div className="form-header">
          <h2>{isClone ? 'Clonar' : 'Editar'} Mesociclo</h2>
          <p>Macrociclo: {macrociclo.name}</p>
        </div>
        
        <form onSubmit={handleSubmit} className="edit-form">
          <div className="form-group">
            <label htmlFor="name">Nome do Mesociclo</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="Ex: Mesociclo de Adaptação"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="objetivo">Objetivo</label>
            <textarea
              id="objetivo"
              name="objetivo"
              value={formData.objetivo}
              onChange={handleInputChange}
              required
              placeholder="Descreva o objetivo deste mesociclo"
              rows={3}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="duracao">Duração (semanas)</label>
            <input
              type="number"
              id="duracao"
              name="duracao"
              value={formData.duracao}
              onChange={handleInputChange}
              required
              min="1"
              max="12"
              placeholder="Ex: 4"
            />
          </div>

          <div className="form-group">
            <div className="section-header">
              <label>Microciclos do Mesociclo</label>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setShowAddMicrociclo(!showAddMicrociclo)}
              >
                {showAddMicrociclo ? 'Cancelar' : '+ Adicionar Microciclo'}
              </button>
            </div>
            
            {showAddMicrociclo && (
              <div className="add-microciclo-form">
                <h4>Novo Microciclo</h4>
                <form onSubmit={handleAddMicrociclo}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="novo-name">Nome</label>
                      <input
                        type="text"
                        id="novo-name"
                        name="name"
                        value={novoMicrociclo.name}
                        onChange={handleNovoMicrocicloChange}
                        required
                        placeholder="Ex: Microciclo de Adaptação"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="novo-duracao">Duração (dias)</label>
                      <input
                        type="number"
                        id="novo-duracao"
                        name="duracao"
                        value={novoMicrociclo.duracao}
                        onChange={handleNovoMicrocicloChange}
                        required
                        min="1"
                        max="30"
                        placeholder="Ex: 7"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="novo-caracteristica">Característica</label>
                    <input
                      type="text"
                      id="novo-caracteristica"
                      name="caracteristica"
                      value={novoMicrociclo.caracteristica}
                      onChange={handleNovoMicrocicloChange}
                      required
                      placeholder="Ex: Microciclo"
                    />
                  </div>
                  <div className="form-actions">
                    <button
                      type="submit"
                      className="btn-salvar"
                      disabled={saving}
                    >
                      {saving ? 'Criando...' : 'Criar Microciclo'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            <DataTable
              title="Microciclos do Mesociclo"
              columns={[
                { key: "name", label: "Nome", width: "30%" },
                { key: "caracteristica", label: "Característica", width: "40%" },
                { key: "duracao", label: "Duração (dias)", width: "30%" }
              ]}
              data={microciclos}
              onRowClick={(microciclo) => navigate(`/periodizacoes/editar-microciclo/${microciclo.id}`)}
              onDeleteClick={async (microciclo) => {
                if (window.confirm('Tem certeza que deseja excluir este microciclo?')) {
                  try {
                    const success = await deletarMicrociclo(microciclo.id);
                    if (success) {
                      setMicrociclos(microciclos.filter(m => m.id !== microciclo.id));
                      setMessage({ type: 'success', text: 'Microciclo excluído com sucesso!' });
                      setTimeout(() => setMessage(null), 3000);
                    } else {
                      setMessage({ type: 'error', text: 'Erro ao excluir microciclo' });
                      setTimeout(() => setMessage(null), 3000);
                    }
                  } catch (error) {
                    console.error('Erro ao excluir microciclo:', error);
                    setMessage({ type: 'error', text: 'Erro interno ao excluir' });
                    setTimeout(() => setMessage(null), 3000);
                  }
                }
              }}
              onCloneClick={(microciclo) => {
                navigate(`/periodizacoes/editar-microciclo/${microciclo.id}`, { 
                  state: { isClone: true, originalData: microciclo } 
                });
              }}
              showDeleteButton={true}
              showCloneButton={true}
              emptyMessage="Nenhum microciclo encontrado"
              pageSize={10}
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

export default EditarMesociclo; 