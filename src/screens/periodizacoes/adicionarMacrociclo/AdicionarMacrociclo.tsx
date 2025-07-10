import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AdicionarMacrociclo.css";
import HeaderPages from "../../../components/headerPages/HeaderPages";
import MacrocicloService, { MacrocicloFormData } from '../../../services/periodizacao/macrocicloService';
import AlunoCadastroService, { Aluno } from '../../../services/aluno/alunoCadastroService';

const AdicionarMacrociclo = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [aluno, setAluno] = useState<Aluno | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    objetivo: '',
    duracao: 0
  });

  const { cadastrarMacrociclo } = MacrocicloService();
  const { buscarAlunoPorId } = AlunoCadastroService();

  useEffect(() => {
    const fetchAluno = async () => {
      if (!id) return;

      setLoading(true);
      try {
        const alunoData = await buscarAlunoPorId(parseInt(id));
        if (alunoData) {
          setAluno(alunoData);
        }
      } catch (error) {
        console.error('Erro ao carregar dados do aluno:', error);
        setMessage({ type: 'error', text: 'Erro ao carregar dados do aluno' });
      } finally {
        setLoading(false);
      }
    };

    fetchAluno();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'duracao' ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!id || !aluno) return;

    setSaving(true);
    try {
      const dadosMacrociclo: MacrocicloFormData = {
        name: formData.name,
        objetivo: formData.objetivo,
        duracao: formData.duracao,
        alunoId: parseInt(id)
      };

      const resultado = await cadastrarMacrociclo(dadosMacrociclo);
      
      if (resultado) {
        setMessage({ type: 'success', text: 'Macrociclo cadastrado com sucesso!' });
        setTimeout(() => {
          navigate(`/periodizacoes/macrociclos/${id}`);
        }, 2000);
      } else {
        setMessage({ type: 'error', text: 'Erro ao cadastrar macrociclo' });
      }
    } catch (error) {
      console.error('Erro ao salvar:', error);
      setMessage({ type: 'error', text: 'Erro interno ao salvar' });
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate(`/periodizacoes/macrociclos/${id}`);
  };

  if (loading) {
    return (
      <div className="app-container">
        <HeaderPages title="Adicionar Macrociclo" />
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
        <HeaderPages title="Adicionar Macrociclo" />
        <div className="error-container">
          <p>Aluno não encontrado</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <HeaderPages title={`Adicionar Macrociclo - ${aluno.nome}`} />
      
      {message && (
        <div className={`status-message status-${message.type}`}>
          {message.text}
        </div>
      )}
      
      <div className="edit-container">
        <div className="form-header">
          <h2>Adicionar Macrociclo</h2>
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

export default AdicionarMacrociclo; 