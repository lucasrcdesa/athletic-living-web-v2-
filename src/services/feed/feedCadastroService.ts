import axios from "axios";

export interface Feed {
    id: number;
    titulo: string;
    texto: string;
    autor: string;
    data: string;
    urlFoto: string | null;
    comentarios: Comment[];
}

export interface Comment {
    id: number;
    texto: string;
    autor: string;
    data: string;
}

export interface FeedFormData {
    titulo: string;
    texto: string;
    autor: string;
    data: string;
    urlFoto?: string;
}

export interface FeedUpdateDTO {
    titulo?: string;
    texto?: string;
    autor?: string;
    data?: string;
    urlFoto?: string;
}

const FeedCadastroService = () => {
    const cadastrarFeed = async (feed: FeedFormData): Promise<Feed | null> => {
        try {
            const response = await axios.post<Feed>('/feed', feed, {
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: 10000,
            });
            
            return response.data;
        } catch (error) {
            console.error('Erro ao cadastrar feed:', error);
            return null;
        }
    };

    const listarFeeds = async (): Promise<Feed[]> => {
        try {
            const response = await axios.get<Feed[]>('/feed', {
                timeout: 10000,
            });
            
            return response.data;
        } catch (error) {
            console.error('Erro ao listar feeds:', error);
            return [];
        }
    };

    const buscarFeedPorId = async (id: number): Promise<Feed | null> => {
        try {
            const response = await axios.get<Feed>(`/feed/${id}`, {
                timeout: 10000,
            });
            
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar feed:', error);
            return null;
        }
    };

    const alterarFeed = async (id: number, dadosAtualizados: FeedUpdateDTO): Promise<Feed | null> => {
        try {
            const response = await axios.patch<Feed>(`/feed/${id}`, dadosAtualizados, {
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: 10000,
            });
            
            return response.data;
        } catch (error) {
            console.error('Erro ao alterar feed:', error);
            return null;
        }
    };

    const deletarFeed = async (id: number): Promise<boolean> => {
        try {
            await axios.delete(`/feed/${id}`, {
                timeout: 10000,
            });
            
            return true;
        } catch (error) {
            console.error('Erro ao deletar feed:', error);
            return false;
        }
    };

    return {
        cadastrarFeed,
        listarFeeds,
        buscarFeedPorId,
        alterarFeed,
        deletarFeed,
    };
};

export default FeedCadastroService; 