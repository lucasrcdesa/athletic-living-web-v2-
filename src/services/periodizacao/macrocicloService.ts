import axios from "../axiosConfig";

export interface Macrociclo {
    id: number;
    name: string;
    objetivo: string;
    duracao: number;
    alunoId: number;
    nomeAluno?: string;
}

export interface MacrocicloFormData {
    name: string;
    objetivo: string;
    duracao: number;
    alunoId: number;
}

export interface MacrocicloUpdateDTO {
    name?: string;
    objetivo?: string;
    duracao?: number;
}

const MacrocicloService = () => {
    const cadastrarMacrociclo = async (macrociclo: MacrocicloFormData): Promise<Macrociclo | null> => {
        try {
            const response = await axios.post<Macrociclo>('/macrociclos', macrociclo, {
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: 10000,
            });
            
            return response.data;
        } catch (error) {
            console.error('Erro ao cadastrar macrociclo:', error);
            return null;
        }
    };

    const listarMacrociclos = async (): Promise<Macrociclo[]> => {
        try {
            const response = await axios.get<Macrociclo[]>('/macrociclos', {
                timeout: 10000,
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao listar macrociclos:', error);
            return [];
        }
    };

    const buscarMacrocicloPorId = async (id: number): Promise<Macrociclo | null> => {
        try {
            const response = await axios.get<Macrociclo>(`/macrociclos/${id}`, {
                timeout: 10000,
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar macrociclo:', error);
            return null;
        }
    };

    const listarMacrociclosPorAluno = async (alunoId: number): Promise<Macrociclo[]> => {
        try {
            const response = await axios.get<Macrociclo[]>(`/macrociclos/meus/${alunoId}`, {
                timeout: 10000,
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao listar macrociclos do aluno:', error);
            return [];
        }
    };

    const alterarMacrociclo = async (id: number, dados: MacrocicloUpdateDTO): Promise<Macrociclo | null> => {
        try {
            const response = await axios.patch<Macrociclo>(`/macrociclos/${id}`, dados, {
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: 10000,
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao alterar macrociclo:', error);
            return null;
        }
    };

    const deletarMacrociclo = async (id: number): Promise<boolean> => {
        try {
            await axios.delete(`/macrociclos/${id}`, {
                timeout: 10000,
            });
            return true;
        } catch (error) {
            console.error('Erro ao deletar macrociclo:', error);
            return false;
        }
    };

    return {
        cadastrarMacrociclo,
        listarMacrociclos,
        buscarMacrocicloPorId,
        listarMacrociclosPorAluno,
        alterarMacrociclo,
        deletarMacrociclo,
    };
};

export default MacrocicloService; 