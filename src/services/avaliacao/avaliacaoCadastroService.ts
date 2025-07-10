import axios from "../axiosConfig";

export interface Avaliacao {
    id: number;
    data: string;
    arquivo: string;
    alunoId: number;
    nomeAluno?: string;
}

export interface AvaliacaoFormData {
    data: string;
    arquivo: string;
    alunoId: number;
}

export interface AvaliacaoUpdateDTO {
    data?: string;
    arquivo?: string;
}

const AvaliacaoCadastroService = () => {
    const cadastrarAvaliacao = async (avaliacao: AvaliacaoFormData): Promise<Avaliacao | null> => {
        try {
            const response = await axios.post<Avaliacao>('/avaliacoes', avaliacao, {
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: 10000,
            });
            
            return response.data;
        } catch (error) {
            console.error('Erro ao cadastrar avaliação:', error);
            return null;
        }
    };

    const listarAvaliacoes = async (): Promise<Avaliacao[]> => {
        try {
            const response = await axios.get<Avaliacao[]>('/avaliacoes', {
                timeout: 10000,
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao listar avaliações:', error);
            return [];
        }
    };

    const buscarAvaliacaoPorId = async (id: number): Promise<Avaliacao | null> => {
        try {
            const response = await axios.get<Avaliacao>(`/avaliacoes/${id}`, {
                timeout: 10000,
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar avaliação:', error);
            return null;
        }
    };

    const listarAvaliacoesPorAluno = async (alunoId: number): Promise<Avaliacao[]> => {
        try {
            const response = await axios.get<Avaliacao[]>('/avaliacoes', {
                timeout: 10000,
            });
            
            // Filtrar avaliações por alunoId
            const avaliacoesDoAluno = response.data.filter(avaliacao => avaliacao.alunoId === alunoId);
            
            return avaliacoesDoAluno;
        } catch (error: any) {
            console.error('Erro ao listar avaliações do aluno:', error);
            return [];
        }
    };

    const alterarAvaliacao = async (id: number, dados: AvaliacaoUpdateDTO): Promise<Avaliacao | null> => {
        try {
            const response = await axios.patch<Avaliacao>(`/avaliacoes/${id}`, dados, {
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: 10000,
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao alterar avaliação:', error);
            return null;
        }
    };

    const deletarAvaliacao = async (id: number): Promise<boolean> => {
        try {
            await axios.delete(`/avaliacoes/${id}`, {
                timeout: 10000,
            });
            return true;
        } catch (error) {
            console.error('Erro ao deletar avaliação:', error);
            return false;
        }
    };

    return {
        cadastrarAvaliacao,
        listarAvaliacoes,
        buscarAvaliacaoPorId,
        listarAvaliacoesPorAluno,
        alterarAvaliacao,
        deletarAvaliacao,
    };
};

export default AvaliacaoCadastroService; 