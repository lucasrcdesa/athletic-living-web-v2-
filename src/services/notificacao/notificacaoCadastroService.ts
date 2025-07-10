import axios from "../axiosConfig";

export interface Notificacao {
    id: number;
    nome: string;
    tipo: string;
    texto: string;
    lida: boolean;
    colaboradorId?: number;
    alunoId?: number;
}

export interface NotificacaoFormData {
    nome: string;
    tipo: string;
    texto: string;
    colaboradorId?: number;
    alunoId?: number;
    lida?: boolean;
}

export interface NotificacaoUpdateDTO {
    nome?: string;
    tipo?: string;
    texto?: string;
    lida?: boolean;
    colaboradorId?: number;
    alunoId?: number;
}

const NotificacaoCadastroService = () => {
    const cadastrarNotificacao = async (notificacao: NotificacaoFormData): Promise<Notificacao | null> => {
        try {
            const response = await axios.post<Notificacao>('/notificacoes', notificacao, {
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: 10000,
            });
            
            return response.data;
        } catch (error) {
            console.error('Erro ao cadastrar notificação:', error);
            return null;
        }
    };

    const listarNotificacoes = async (): Promise<Notificacao[]> => {
        try {
            const response = await axios.get<Notificacao[]>('/notificacoes', {
                timeout: 10000,
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao listar notificações:', error);
            return [];
        }
    };

    const buscarNotificacaoPorId = async (id: number): Promise<Notificacao | null> => {
        try {
            const response = await axios.get<Notificacao>(`/notificacoes/${id}`, {
                timeout: 10000,
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar notificação:', error);
            return null;
        }
    };

    const listarNotificacoesPorAluno = async (alunoId: number): Promise<Notificacao[]> => {
        try {
            const response = await axios.get<Notificacao[]>(`/notificacoes/aluno/${alunoId}`, {
                timeout: 10000,
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao listar notificações do aluno:', error);
            return [];
        }
    };

    const listarNotificacoesPorColaborador = async (colaboradorId: number): Promise<Notificacao[]> => {
        try {
            const response = await axios.get<Notificacao[]>(`/notificacoes/colaborador/${colaboradorId}`, {
                timeout: 10000,
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao listar notificações do colaborador:', error);
            return [];
        }
    };

    const alterarNotificacao = async (id: number, dados: NotificacaoUpdateDTO): Promise<Notificacao | null> => {
        try {
            const response = await axios.patch<Notificacao>(`/notificacoes/${id}`, dados, {
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: 10000,
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao alterar notificação:', error);
            return null;
        }
    };

    const deletarNotificacao = async (id: number): Promise<boolean> => {
        try {
            await axios.delete(`/notificacoes/${id}`, {
                timeout: 10000,
            });
            return true;
        } catch (error) {
            console.error('Erro ao deletar notificação:', error);
            return false;
        }
    };

    return {
        cadastrarNotificacao,
        listarNotificacoes,
        buscarNotificacaoPorId,
        listarNotificacoesPorAluno,
        listarNotificacoesPorColaborador,
        alterarNotificacao,
        deletarNotificacao,
    };
};

export default NotificacaoCadastroService; 