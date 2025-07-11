import axios from "../axiosConfig";

export interface Colaborador {
    id: number;
    nome: string;
    mail: string;
    cpf: string;
    funcao: string;
    ponto: boolean;
    bonus: number;
}

export interface ColaboradorFormData {
    nome: string;
    mail: string;
    cpf: string;
    funcao: string;
}

// Interface específica para atualização (apenas campos que o backend aceita)
export interface AtualizarColaboradorDTO {
    nome?: string;
    mail?: string;
    funcao?: string;
}

const ColaboradorCadastroService = () => {
    const cadastrarColaborador = async (colaborador: ColaboradorFormData): Promise<Colaborador | null> => {
        try {
            const response = await axios.post<Colaborador>('/colaborador', colaborador, {
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: 10000,
            });
            
            return response.data;
        } catch (error) {
            console.error('Erro ao cadastrar colaborador:', error);
            return null;
        }
    };

    // Método para listar colaboradores
    const listarColaboradores = async (): Promise<Colaborador[]> => {
        try {
            const response = await axios.get<Colaborador[]>('/colaborador', {
                timeout: 10000,
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao listar colaboradores:', error);
            return [];
        }
    };

    // Método para buscar colaborador por ID
    const buscarColaboradorPorId = async (id: number): Promise<Colaborador | null> => {
        try {
            const response = await axios.get<Colaborador>(`/colaborador/${id}`, {
                timeout: 10000,
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar colaborador por ID:', error);
            return null;
        }
    };

    // Método para deletar colaborador
    const deletarColaborador = async (id: number): Promise<boolean> => {
        try {
            await axios.delete(`/colaborador/${id}`, {
                timeout: 10000,
            });
            return true;
        } catch (error) {
            console.error('Erro ao deletar colaborador:', error);
            return false;
        }
    };

    // Método para alterar colaborador (apenas campos permitidos)
    const alterarColaborador = async (id: number, dadosAtualizacao: AtualizarColaboradorDTO): Promise<Colaborador | null> => {
        try {
            const response = await axios.patch<Colaborador>(`/colaborador/${id}`, dadosAtualizacao, {
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: 10000,
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao alterar colaborador:', error);
            return null;
        }
    };

    return {
        cadastrarColaborador,
        listarColaboradores,
        buscarColaboradorPorId,
        deletarColaborador,
        alterarColaborador,
    };
};

export default ColaboradorCadastroService; 