import axios from "../axiosConfig";

export interface Exercicio {
    id: number;
    nome: string;
    ingles: string;
    equipamento: string;
    simetria: string;
    maos: string;
    carga: number;
    bloco: number;
    urlVideo: string;
    observacoes: string;
    intervalo: number;
    repeticoes: number;
    tempoOuReps: number;
    distancia: number;
    pace: string;
    series: number;
    icon: string;
    padroesDeMovimento: string[];
}

export interface ExercicioFormData {
    nome: string;
    ingles: string;
    equipamento: string;
    simetria: string;
    maos: string;
    carga: number;
    bloco: number;
    urlVideo: string;
    observacoes: string;
    intervalo: number;
    repeticoes: number;
    tempoOuReps: number;
    distancia: number;
    pace: string;
    series: number;
    icon: string;
    padroesDeMovimento: string[];
}

// Interface específica para atualização (apenas campos que o backend aceita)
export interface AtualizarExercicioDTO {
    nome?: string;
    equipamento?: string;
    simetria?: string;
}

const ExercicioCadastroService = () => {
    const cadastrarExercicio = async (exercicio: ExercicioFormData): Promise<Exercicio | null> => {
        try {
            const response = await axios.post<Exercicio>('/exercicios', exercicio, {
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: 10000,
            });
            
            return response.data;
        } catch (error) {
            console.error('Erro ao cadastrar exercício:', error);
            return null;
        }
    };

    // Método para listar exercícios
    const listarExercicios = async (): Promise<Exercicio[]> => {
        try {
            const response = await axios.get<Exercicio[]>('/exercicios', {
                timeout: 10000,
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao listar exercícios:', error);
            return [];
        }
    };

    // Método para buscar exercício por ID
    const buscarExercicioPorId = async (id: number): Promise<Exercicio | null> => {
        try {
            const response = await axios.get<Exercicio>(`/exercicios/${id}`, {
                timeout: 10000,
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar exercício por ID:', error);
            return null;
        }
    };

    // Método para deletar exercício
    const deletarExercicio = async (id: number): Promise<boolean> => {
        try {
            await axios.delete(`/exercicios/${id}`, {
                timeout: 10000,
            });
            return true;
        } catch (error) {
            console.error('Erro ao deletar exercício:', error);
            return false;
        }
    };

    // Método para alterar exercício (apenas campos permitidos)
    const alterarExercicio = async (id: number, dadosAtualizacao: AtualizarExercicioDTO): Promise<Exercicio | null> => {
        try {
            const response = await axios.patch<Exercicio>(`/exercicios/${id}`, dadosAtualizacao, {
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: 10000,
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao alterar exercício:', error);
            return null;
        }
    };

    return {
        cadastrarExercicio,
        listarExercicios,
        buscarExercicioPorId,
        deletarExercicio,
        alterarExercicio,
    };
};

export default ExercicioCadastroService; 