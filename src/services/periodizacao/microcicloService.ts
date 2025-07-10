import axios from "../axiosConfig";

export interface Microciclo {
    id: number;
    name: string;
    caracteristica: string;
    duracao: number;
    mesocicloId?: number;
    nomeMesociclo?: string;
}

export interface MicrocicloFormData {
    name: string;
    caracteristica: string;
    duracao: number;
    mesocicloId: number;
}

export interface MicrocicloUpdateDTO {
    name?: string;
    caracteristica?: string;
    duracao?: number;
}

const MicrocicloService = () => {
    const cadastrarMicrociclo = async (microciclo: MicrocicloFormData): Promise<Microciclo | null> => {
        try {
            const response = await axios.post<Microciclo>('/microciclos', microciclo, {
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: 10000,
            });
            
            return response.data;
        } catch (error) {
            console.error('Erro ao cadastrar microciclo:', error);
            return null;
        }
    };

    const listarMicrociclos = async (): Promise<Microciclo[]> => {
        try {
            const response = await axios.get<Microciclo[]>('/microciclos', {
                timeout: 10000,
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao listar microciclos:', error);
            return [];
        }
    };

    const buscarMicrocicloPorId = async (id: number): Promise<Microciclo | null> => {
        try {
            const response = await axios.get<Microciclo>(`/microciclos/${id}`, {
                timeout: 10000,
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar microciclo:', error);
            return null;
        }
    };

    const listarMicrociclosPorMesociclo = async (mesocicloId: number): Promise<Microciclo[]> => {
        try {
            const response = await axios.get<Microciclo[]>(`/microciclos/mesociclo/${mesocicloId}`, {
                timeout: 10000,
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao listar microciclos do mesociclo:', error);
            return [];
        }
    };

    const alterarMicrociclo = async (id: number, dados: MicrocicloUpdateDTO): Promise<Microciclo | null> => {
        try {
            const response = await axios.patch<Microciclo>(`/microciclos/${id}`, dados, {
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: 10000,
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao alterar microciclo:', error);
            return null;
        }
    };

    const deletarMicrociclo = async (id: number): Promise<boolean> => {
        try {
            await axios.delete(`/microciclos/${id}`, {
                timeout: 10000,
            });
            return true;
        } catch (error) {
            console.error('Erro ao deletar microciclo:', error);
            return false;
        }
    };

    return {
        cadastrarMicrociclo,
        listarMicrociclos,
        buscarMicrocicloPorId,
        listarMicrociclosPorMesociclo,
        alterarMicrociclo,
        deletarMicrociclo,
    };
};

export default MicrocicloService; 