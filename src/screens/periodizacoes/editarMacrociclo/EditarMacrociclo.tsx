import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "./EditarMacrociclo.css";
import HeaderPages from "../../../components/headerPages/HeaderPages";
import DataTable from "../../../components/dataTable/DataTable";
import MacrocicloService, { Macrociclo, MacrocicloUpdateDTO } from '../../../services/periodizacao/macrocicloService';
import MesocicloService, { Mesociclo, MesocicloFormData } from '../../../services/periodizacao/mesocicloService';
import AlunoCadastroService, { Aluno } from '../../../services/aluno/alunoCadastroService';

const EditarMacrociclo = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [macrociclo, setMacrociclo] = useState<Macrociclo | null>(null);
  const [aluno, setAluno] = useState<Aluno | null>(null);
  const [mesociclos, setMesociclos] = useState<Mesociclo[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    objetivo: '',
    duracao: 0
  });
  const [novoMesociclo, setNovoMesociclo] = useState({
    name: '',
    objetivo: '',
    duracao: 0
  });
  const [showAddMesociclo, setShowAddMesociclo] = useState(false);

  const { buscarMacrocicloPorId, alterarMacrociclo, cadastrarMacrociclo } = MacrocicloService();
  const { listarMesociclosPorMacrociclo, cadastrarMesociclo, deletarMesociclo } = MesocicloService();
  const { buscarAlunoPorId } = AlunoCadastroService();

  const isClone = location.state?.isClone || false;
  const originalData = location.state?.originalData;
  const isNew = location.state?.isNew || false;
  const alunoId = location.state?.alunoId;

  useEffect(() => {
    const fetchData = async () => {
      if (!id && !isNew) return;

      setLoading(true);
      try {
        // Se for novo macrociclo
        if (isNew && alunoId) {
          // Buscar dados do aluno
          const alunoData = await buscarAlunoPorId(alunoId);
          if (alunoData) {
            setAluno(alunoData);
          }
          setMesociclos([]);
        }
        // Se for clone, usar dados originais
        else if (isClone && originalData) {
          setMacrociclo(originalData);
          setFormData({
            name: originalData.name,
            objetivo: originalData.objetivo,
            duracao: originalData.duracao
          });
          
          // Buscar dados do aluno
          const alunoData = await buscarAlunoPorId(originalData.alunoId);
          if (alunoData) {
            setAluno(alunoData);
          }
        } else if (id && id !== '0') {
          // Buscar dados do macrociclo
          const macrocicloData = await buscarMacrocicloPorId(parseInt(id));
          if (macrocicloData) {
            setMacrociclo(macrocicloData);
            setFormData({
              name: macrocicloData.name,
              objetivo: macrocicloData.objetivo,
              duracao: macrocicloData.duracao
            });

            // Buscar dados do aluno
            const alunoData = await buscarAlunoPorId(macrocicloData.alunoId);
            if (alunoData) {
              setAluno(alunoData);
            }
          }
        }

        // Buscar mesociclos do macrociclo (apenas se não for novo)
        if (!isNew && id && id !== '0') {
          const mesociclosData = await listarMesociclosPorMacrociclo(parseInt(id as string));
          setMesociclos(mesociclosData);
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        setMessage({ type: 'error', text: 'Erro ao carregar dados' });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, isClone, originalData, isNew, alunoId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'duracao' ? parseInt(value) || 0 : value
    }));
  };

  const handleNovoMesocicloChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNovoMesociclo(prev => ({
      ...prev,
      [name]: name === 'duracao' ? parseInt(value) || 0 : value
    }));
  };

  const handleMesociclosChange = (selectedIds: number[]) => {
    // This function is no longer needed as SelectableList is removed
    // Keeping it for now in case it's used elsewhere or for future refactoring
  };

  const handleAddMesociclo = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!macrociclo) return;

    setSaving(true);
    try {
      const mesocicloData: MesocicloFormData = {
        name: novoMesociclo.name,
        objetivo: novoMesociclo.objetivo,
        duracao: novoMesociclo.duracao,
        macrocicloId: macrociclo.id
      };

      const resultado = await cadastrarMesociclo(mesocicloData);
      
      if (resultado) {
        // Adicionar o novo mesociclo à lista
        setMesociclos([...mesociclos, resultado]);
        setNovoMesociclo({ name: '', objetivo: '', duracao: 0 });
        setShowAddMesociclo(false);
        setMessage({ type: 'success', text: 'Mesociclo criado com sucesso!' });
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage({ type: 'error', text: 'Erro ao criar mesociclo' });
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
    
    setSaving(true);
    try {
      if (isNew && alunoId) {
        // Criar novo macrociclo
        const novoMacrocicloData = {
          name: formData.name,
          objetivo: formData.objetivo,
          duracao: formData.duracao,
          alunoId: alunoId
        };

        const resultado = await cadastrarMacrociclo(novoMacrocicloData);
        
        if (resultado) {
          setMessage({ type: 'success', text: 'Macrociclo criado com sucesso!' });
          setTimeout(() => {
            navigate(`/periodizacoes/macrociclos/${alunoId}`);
          }, 2000);
        } else {
          setMessage({ type: 'error', text: 'Erro ao criar macrociclo' });
        }
      } else if (macrociclo) {
        // Atualizar macrociclo existente
        const dadosAtualizados: MacrocicloUpdateDTO = {};
        
        // Só enviar campos que foram alterados
        if (formData.name !== macrociclo.name) dadosAtualizados.name = formData.name;
        if (formData.objetivo !== macrociclo.objetivo) dadosAtualizados.objetivo = formData.objetivo;
        if (formData.duracao !== macrociclo.duracao) dadosAtualizados.duracao = formData.duracao;

        if (Object.keys(dadosAtualizados).length === 0) {
          setMessage({ type: 'error', text: 'Nenhuma alteração foi feita' });
          setTimeout(() => setMessage(null), 3000);
          setSaving(false);
          return;
        }

        const resultado = await alterarMacrociclo(macrociclo.id, dadosAtualizados);
        
        if (resultado) {
          setMessage({ type: 'success', text: 'Macrociclo atualizado com sucesso!' });
          setTimeout(() => {
            navigate(`/periodizacoes/macrociclos/${macrociclo.alunoId}`);
          }, 2000);
        } else {
          setMessage({ type: 'error', text: 'Erro ao atualizar macrociclo' });
        }
      }
    } catch (error) {
      console.error('Erro ao salvar:', error);
      setMessage({ type: 'error', text: 'Erro interno ao salvar' });
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (isNew && alunoId) {
      navigate(`/periodizacoes/macrociclos/${alunoId}`);
    } else if (macrociclo) {
      navigate(`/periodizacoes/macrociclos/${macrociclo.alunoId}`);
    } else {
      navigate('/periodizacoes');
    }
  };

  if (loading) {
    return (
      <div className="app-container">
        <HeaderPages title="Editar Macrociclo" />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando dados...</p>
        </div>
      </div>
    );
  }

  if (!aluno) {
    return (
      <div className="app-container">
        <HeaderPages title="Editar Macrociclo" />
        <div className="error-container">
          <p>Aluno não encontrado</p>
        </div>
      </div>
    );
  }

  if (!isNew && !macrociclo) {
    return (
      <div className="app-container">
        <HeaderPages title="Editar Macrociclo" />
        <div className="error-container">
          <p>Macrociclo não encontrado</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <HeaderPages title={`${isNew ? 'Novo' : 'Editar'} Macrociclo - ${aluno.nome}`} />
      
      {message && (
        <div className={`status-message status-${message.type}`}>
          {message.text}
        </div>
      )}
      
      <div className="edit-container">
        <div className="form-header">
          <h2>{isNew ? 'Novo' : isClone ? 'Clonar' : 'Editar'} Macrociclo</h2>
          <p>Aluno: {aluno.nome}</p>
        </div>
        
        <form onSubmit={handleSubmit} className="edit-form">
          <div className="form-group">
            <label htmlFor="name">Nome do Macrociclo</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="Ex: Macrociclo de Hipertrofia"
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
              placeholder="Descreva o objetivo deste macrociclo"
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
              max="52"
              placeholder="Ex: 12"
            />
          </div>

          <div className="form-group">
            <div className="section-header">
              <label>Mesociclos do Macrociclo</label>
              {!isNew && (
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setShowAddMesociclo(!showAddMesociclo)}
                >
                  {showAddMesociclo ? 'Cancelar' : '+ Adicionar Mesociclo'}
                </button>
              )}
            </div>
            
            {!isNew && showAddMesociclo && (
              <div className="add-mesociclo-form">
                <h4>Novo Mesociclo</h4>
                <form onSubmit={handleAddMesociclo}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="novo-name">Nome</label>
                      <input
                        type="text"
                        id="novo-name"
                        name="name"
                        value={novoMesociclo.name}
                        onChange={handleNovoMesocicloChange}
                        required
                        placeholder="Ex: Mesociclo de Adaptação"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="novo-duracao">Duração (dias)</label>
                      <input
                        type="number"
                        id="novo-duracao"
                        name="duracao"
                        value={novoMesociclo.duracao}
                        onChange={handleNovoMesocicloChange}
                        required
                        min="1"
                        max="30"
                        placeholder="Ex: 7"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="novo-objetivo">Objetivo</label>
                    <textarea
                      id="novo-objetivo"
                      name="objetivo"
                      value={novoMesociclo.objetivo}
                      onChange={handleNovoMesocicloChange}
                      required
                      placeholder="Descreva o objetivo deste mesociclo"
                      rows={2}
                    />
                  </div>
                  <div className="form-actions">
                    <button
                      type="submit"
                      className="btn-salvar"
                      disabled={saving}
                    >
                      {saving ? 'Criando...' : 'Criar Mesociclo'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {!isNew && (
              <DataTable
                title="Mesociclos do Macrociclo"
                columns={[
                  { key: "name", label: "Nome", width: "30%" },
                  { key: "objetivo", label: "Objetivo", width: "40%" },
                  { key: "duracao", label: "Duração (dias)", width: "30%" }
                ]}
                data={mesociclos}
                onRowClick={(mesociclo) => navigate(`/periodizacoes/editar-mesociclo/${mesociclo.id}`)}
                onDeleteClick={async (mesociclo) => {
                  if (window.confirm('Tem certeza que deseja excluir este mesociclo?')) {
                    try {
                      const success = await deletarMesociclo(mesociclo.id);
                      if (success) {
                        setMesociclos(mesociclos.filter(m => m.id !== mesociclo.id));
                        setMessage({ type: 'success', text: 'Mesociclo excluído com sucesso!' });
                        setTimeout(() => setMessage(null), 3000);
                      } else {
                        setMessage({ type: 'error', text: 'Erro ao excluir mesociclo' });
                        setTimeout(() => setMessage(null), 3000);
                      }
                    } catch (error) {
                      console.error('Erro ao excluir mesociclo:', error);
                      setMessage({ type: 'error', text: 'Erro interno ao excluir' });
                      setTimeout(() => setMessage(null), 3000);
                    }
                  }
                }}
                onCloneClick={(mesociclo) => {
                  navigate(`/periodizacoes/editar-mesociclo/${mesociclo.id}`, { 
                    state: { isClone: true, originalData: mesociclo } 
                  });
                }}
                showDeleteButton={true}
                showCloneButton={true}
                emptyMessage="Nenhum mesociclo encontrado"
                pageSize={10}
              />
            )}
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

export default EditarMacrociclo; 