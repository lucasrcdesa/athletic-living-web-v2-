import axios from "../axiosConfig";

export interface Mesociclo {
    id: number;
    name: string;
    objetivo: string;
    duracao: number;
    macrocicloId: number;
    nomeMacrociclo?: string;
}

export interface MesocicloFormData {
    name: string;
    objetivo: string;
    duracao: number;
    macrocicloId: number;
}

export interface MesocicloUpdateDTO {
    name?: string;
    objetivo?: string;
    duracao?: number;
}

const MesocicloService = () => {
    const cadastrarMesociclo = async (mesociclo: MesocicloFormData): Promise<Mesociclo | null> => {
        try {
            const response = await axios.post<Mesociclo>('/mesociclos', mesociclo, {
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: 10000,
            });
            
            return response.data;
        } catch (error) {
            console.error('Erro ao cadastrar mesociclo:', error);
            return null;
        }
    };

    const listarMesociclos = async (): Promise<Mesociclo[]> => {
        try {
            const response = await axios.get<Mesociclo[]>('/mesociclos', {
                timeout: 10000,
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao listar mesociclos:', error);
            return [];
        }
    };

    const buscarMesocicloPorId = async (id: number): Promise<Mesociclo | null> => {
        try {
            const response = await axios.get<Mesociclo>(`/mesociclos/${id}`, {
                timeout: 10000,
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar mesociclo:', error);
            return null;
        }
    };

    const listarMesociclosPorMacrociclo = async (macrocicloId: number): Promise<Mesociclo[]> => {
        try {
            const response = await axios.get<Mesociclo[]>(`/mesociclos/meus/${macrocicloId}`, {
                timeout: 10000,
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao listar mesociclos do macrociclo:', error);
            return [];
        }
    };

    const listarMesociclosPorAluno = async (alunoId: number): Promise<Mesociclo[]> => {
        try {
            const response = await axios.get<Mesociclo[]>(`/mesociclos/aluno/${alunoId}`, {
                timeout: 10000,
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao listar mesociclos do aluno:', error);
            return [];
        }
    };

    const alterarMesociclo = async (id: number, dados: MesocicloUpdateDTO): Promise<Mesociclo | null> => {
        try {
            const response = await axios.patch<Mesociclo>(`/mesociclos/${id}`, dados, {
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: 10000,
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao alterar mesociclo:', error);
            return null;
        }
    };

    const deletarMesociclo = async (id: number): Promise<boolean> => {
        try {
            await axios.delete(`/mesociclos/${id}`, {
                timeout: 10000,
            });
            return true;
        } catch (error) {
            console.error('Erro ao deletar mesociclo:', error);
            return false;
        }
    };

    return {
        cadastrarMesociclo,
        listarMesociclos,
        buscarMesocicloPorId,
        listarMesociclosPorMacrociclo,
        listarMesociclosPorAluno,
        alterarMesociclo,
        deletarMesociclo,
    };
};

export default MesocicloService; 