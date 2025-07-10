import axios from "../axiosConfig";

export interface Treino {
    id: number;
    nome: string;
    feito: boolean;
    dia: string;
    urlVideo: string;
    numDeBlocos: number;
    pse: number;
    pseEstimado: number;
    modalidade: string;
    tempoEstimado: string;
    tempoRealizado: string;
    cargaEstimada: number;
    cargaReal: number;
    padraoMovimento: string[];
    distanciaPrescrita: number;
    distanciaRealizada: number;
    caracteristica: string;
    areaTreino: string;
    microcicloId: number | null;
    alunosIds: number[];
    colaboradoresIds: number[];
    exerciciosIds: number[];
}

export interface TreinoFormData {
    nome: string;
    feito: boolean;
    dia: string;
    urlVideo: string;
    numDeBlocos: number;
    pse: number;
    pseEstimado: number;
    modalidade: string;
    tempoEstimado: string;
    tempoRealizado: string;
    cargaEstimada: number;
    cargaReal: number;
    padraoMovimento: string[];
    distanciaPrescrita: number;
    distanciaRealizada: number;
    caracteristica: string;
    areaTreino: string;
    microcicloId: number | null;
    alunosIds: number[];
    colaboradoresIds: number[];
    exerciciosIds: number[];
}

const TreinoCadastroService = () => {
    const cadastrarTreino = async (treino: TreinoFormData): Promise<Treino | null> => {
        try {
            const response = await axios.post<Treino>('/treinos', treino, {
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: 10000,
            });
            
            return response.data;
        } catch (error) {
            console.error('Erro ao cadastrar treino:', error);
            return null;
        }
    };

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

    const buscarTreinoPorId = async (id: number): Promise<Treino | null> => {
        try {
            const response = await axios.get<Treino>(`/treinos/${id}`, {
                timeout: 10000,
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar treino por ID:', error);
            return null;
        }
    };

    const atualizarTreino = async (id: number, treino: Partial<TreinoFormData>): Promise<Treino | null> => {
        try {
            const response = await axios.patch<Treino>(`/treinos/${id}`, treino, {
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: 10000,
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao atualizar treino:', error);
            return null;
        }
    };

    const excluirTreino = async (id: number): Promise<boolean> => {
        try {
            await axios.delete(`/treinos/${id}`, {
                timeout: 10000,
            });
            return true;
        } catch (error) {
            console.error('Erro ao excluir treino:', error);
            return false;
        }
    };

    return {
        cadastrarTreino,
        listarTreinos,
        buscarTreinoPorId,
        atualizarTreino,
        excluirTreino,
    };
};

export default TreinoCadastroService; 