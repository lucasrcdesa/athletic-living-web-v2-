import axios from "../axiosConfig";

export interface Treino {
  id: number;
  nome: string;
  feito: boolean;
  dia: string;
  urlVideo?: string;
  numDeBlocos?: number;
  pse?: number;
  pseEstimado?: number;
  modalidade?: string;
  tempoEstimado?: string;
  tempoRealizado?: string;
  cargaEstimada?: number;
  cargaReal?: number;
  padraoMovimento?: string;
  distanciaPrescrita?: number;
  distanciaRealizada?: number;
  caracteristica?: string;
  areaTreino?: string;
  microcicloId?: number;
  alunosIds: number[];
  colaboradoresIds: number[];
  exerciciosIds: number[];
}

export interface TreinoRequestDTO {
  nome?: string;
  feito?: boolean;
  dia?: string;
  urlVideo?: string;
  numDeBlocos?: number;
  pse?: number;
  pseEstimado?: number;
  modalidade?: string;
  tempoEstimado?: string;
  tempoRealizado?: string;
  cargaEstimada?: number;
  cargaReal?: number;
  padraoMovimento?: string;
  distanciaPrescrita?: number;
  distanciaRealizada?: number;
  caracteristica?: string;
  areaTreino?: string;
  microcicloId?: number;
  alunosIds?: number[];
  colaboradoresIds?: number[];
  exerciciosIds?: number[];
}

// Interfaces para buscar nomes de alunos e colaboradores
export interface Aluno {
  id: number;
  nome: string;
}

export interface Colaborador {
  id: number;
  nome: string;
}

const TreinoService = () => {
  // Listar todos os treinos
  const listarTreinos = async (): Promise<Treino[]> => {
    try {
      const response = await axios.get<Treino[]>('/treinos', {
        timeout: 10000,
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao listar treinos:', error);
      return [];
    }
  };

  // Buscar treino por ID
  const buscarTreinoPorId = async (treinoId: number): Promise<Treino | null> => {
    try {
      const response = await axios.get<Treino>(`/treinos/${treinoId}`, {
        timeout: 10000,
      });
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar treino ${treinoId}:`, error);
      return null;
    }
  };

  // Buscar treinos por aluno
  const buscarTreinosPorAluno = async (alunoId: number): Promise<Treino[]> => {
    try {
      const response = await axios.get<Treino[]>(`/treinos/aluno/treinos/${alunoId}`, {
        timeout: 10000,
      });
      return response.data;
    } catch (error: any) {
      console.error(`Erro ao buscar treinos do aluno ${alunoId}:`, error);
      return [];
    }
  };

  // Buscar treinos por colaborador
  const buscarTreinosPorColaborador = async (colaboradorId: number): Promise<Treino[]> => {
    try {
      const response = await axios.get<Treino[]>(`/treinos/colaborador/treinos/${colaboradorId}`, {
        timeout: 10000,
      });
      return response.data;
    } catch (error: any) {
      console.error(`Erro ao buscar treinos do colaborador ${colaboradorId}:`, error);
      return [];
    }
  };

  // Atualizar treino
  const atualizarTreino = async (treinoId: number, dados: TreinoRequestDTO): Promise<Treino | null> => {
    try {
      const response = await axios.patch<Treino>(`/treinos/${treinoId}`, dados, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000,
      });
      return response.data;
    } catch (error: any) {
      console.error(`Erro ao atualizar treino ${treinoId}:`, error);
      return null;
    }
  };

  // Deletar treino
  const deletarTreino = async (treinoId: number): Promise<boolean> => {
    try {
      await axios.delete(`/treinos/${treinoId}`, {
        timeout: 10000,
      });
      return true;
    } catch (error: any) {
      console.error(`Erro ao deletar treino ${treinoId}:`, error);
      return false;
    }
  };

  // Buscar aluno por ID
  const buscarAlunoPorId = async (alunoId: number): Promise<Aluno | null> => {
    try {
      const response = await axios.get<Aluno>(`/CadastrarAlunos/${alunoId}`, {
        timeout: 10000,
      });
      return response.data;
    } catch (error: any) {
      console.error(`Erro ao buscar aluno ${alunoId}:`, error);
      return null;
    }
  };

  // Buscar colaborador por ID
  const buscarColaboradorPorId = async (colaboradorId: number): Promise<Colaborador | null> => {
    try {
      const response = await axios.get<Colaborador>(`/colaboradores/${colaboradorId}`, {
        timeout: 10000,
      });
      return response.data;
    } catch (error: any) {
      console.error(`Erro ao buscar colaborador ${colaboradorId}:`, error);
      return null;
    }
  };

  return {
    listarTreinos,
    buscarTreinoPorId,
    buscarTreinosPorAluno,
    buscarTreinosPorColaborador,
    atualizarTreino,
    deletarTreino,
    buscarAlunoPorId,
    buscarColaboradorPorId,
  };
};

export default TreinoService; 