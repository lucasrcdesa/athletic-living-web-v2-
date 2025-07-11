import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CadastrarAtendimento.css";
import HeaderPages from "../../../components/headerPages/HeaderPages";
import DynamicForm from "../../../components/DynamicForm/DynamicForm";
import SelectableList, { SelectableItem } from "../../../components/selectableList/SelectableList";
import { sections } from "../../../data/sections/atendimentos/cadastrarAtendimentoMock";
import { AtendimentoFormData } from "../../../services/atendimento/atendimentoCadastroService";
import AtendimentoCadastroService from "../../../services/atendimento/atendimentoCadastroService";
import AlunoCadastroService from "../../../services/aluno/alunoCadastroService";
import ColaboradorCadastroService from "../../../services/colaborador/colaboradorCadastroService";

const CadastrarAtendimento = () => {
  const navigate = useNavigate();
  const { cadastrarAtendimento } = AtendimentoCadastroService();
  const { listarAlunos } = AlunoCadastroService();
  const { listarColaboradores } = ColaboradorCadastroService();
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  
  // Estados para SelectableList
  const [alunos, setAlunos] = useState<SelectableItem[]>([]);
  const [colaboradores, setColaboradores] = useState<SelectableItem[]>([]);
  const [alunosSelecionados, setAlunosSelecionados] = useState<number[]>([]);
  const [colaboradoresSelecionados, setColaboradoresSelecionados] = useState<number[]>([]);
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

  const formatarDados = (formData: Record<string, any>): AtendimentoFormData => {
    return {
      dataHora: formData.dataHora || new Date().toISOString().slice(0, 16),
      tipo: formData.tipo || '',
      observacoes: formData.observacoes.trim(),
      alunosIds: alunosSelecionados,
      colaboradoresIds: colaboradoresSelecionados,
    };
  };

  const handleAlunosChange = (selectedIds: number[]) => {
    setAlunosSelecionados(selectedIds);
  };

  const handleColaboradoresChange = (selectedIds: number[]) => {
    setColaboradoresSelecionados(selectedIds);
  };

  const handleSubmit = async (formData: Record<string, any>) => {
    setLoading(true);
    setMessage(null);

    try {
      if (!formData.dataHora || !formData.tipo) {
        setMessage({
          type: 'error',
          text: 'Por favor, preencha a data/hora e o tipo de atendimento.'
        });
        return;
      }

      const dadosFormatados = formatarDados(formData);
      const resultado = await cadastrarAtendimento(dadosFormatados);
      
      if (resultado) {
        setMessage({
          type: 'success',
          text: 'Atendimento cadastrado com sucesso!'
        });
        setTimeout(() => {
          navigate('/atendimentos');
        }, 2000);
      } else {
        setMessage({
          type: 'error',
          text: 'Erro ao cadastrar atendimento. Tente novamente.'
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
      <HeaderPages title="Cadastrar Atendimento" />
      
      {message && (
        <div className={`status-message status-${message.type}`}>
          {message.text}
        </div>
      )}
      
      <DynamicForm 
        title="Dados do Atendimento"
        description="Preencha os dados abaixo para cadastrar um novo atendimento."
        sections={sections} 
        onSubmit={handleSubmit}
        disabled={loading}
      />

      {!carregandoDados && (
        <div className="actions-section">
          <div className="action-group">
            <h3>Alunos do Atendimento</h3>
            <p className="current-info">
              Selecione os alunos que participarão deste atendimento
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
            <h3>Colaboradores do Atendimento</h3>
            <p className="current-info">
              Selecione os colaboradores responsáveis por este atendimento
            </p>
            
            <SelectableList
              items={colaboradores}
              selectedItems={colaboradoresSelecionados}
              onSelectionChange={handleColaboradoresChange}
              maxSelections={20}
              emptyMessage="Nenhum colaborador disponível"
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

export default CadastrarAtendimento; 