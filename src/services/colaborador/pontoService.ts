import axios from "../axiosConfig";

export interface PontoColaborador {
    id: number;
    colaborador: {
        id: number;
        nome: string;
        mail: string;
        cpf: string;
        funcao: string;
        ponto: boolean;
        bonus: number;
    };
    dia: string;
    entrada: string;
    saida: string | null;
    saidaIntervalo: string | null;
    entradaIntervalo: string | null;
    validado: boolean;
}

export interface PontoFormData {
    colaboradorId: number;
    dia: string;
    entrada: string;
    saida?: string;
    saidaIntervalo?: string;
    entradaIntervalo?: string;
}

export interface ValidarPontoDTO {
    validado: boolean;
}

const PontoService = () => {
    // Buscar todos os pontos para validação
    const listarPontosParaValidacao = async (): Promise<PontoColaborador[]> => {
        try {
            const response = await axios.get<PontoColaborador[]>('/colaboradores/ponto/validacao', {
                timeout: 10000,
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao listar pontos para validação:', error);
            return [];
        }
    };

    // Buscar pontos de um colaborador específico
    const listarPontosPorColaborador = async (colaboradorId: number): Promise<PontoColaborador[]> => {
        try {
            const response = await axios.get<PontoColaborador[]>(`/pontos/meus/${colaboradorId}`, {
                timeout: 10000,
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao listar pontos do colaborador:', error);
            return [];
        }
    };

    // Buscar ponto específico por ID
    const buscarPontoPorId = async (id: number): Promise<PontoColaborador | null> => {
        try {
            const response = await axios.get<PontoColaborador>(`/colaboradores/ponto/${id}`, {
                timeout: 10000,
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar ponto por ID:', error);
            return null;
        }
    };

    // Registrar entrada de ponto
    const registrarEntrada = async (colaboradorId: number): Promise<PontoColaborador | null> => {
        try {
            const response = await axios.post<PontoColaborador>(`/colaboradores/${colaboradorId}/ponto/entrada`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: 10000,
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao registrar entrada:', error);
            return null;
        }
    };

    // Registrar saída de ponto
    const registrarSaida = async (colaboradorId: number): Promise<PontoColaborador | null> => {
        try {
            const response = await axios.post<PontoColaborador>(`/colaboradores/${colaboradorId}/ponto/saida`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: 10000,
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao registrar saída:', error);
            return null;
        }
    };

    // Validar ponto (aprovar/rejeitar)
    const validarPonto = async (pontoId: number, validacao: ValidarPontoDTO): Promise<PontoColaborador | null> => {
        try {
            const response = await axios.patch<PontoColaborador>(`/colaboradores/ponto/${pontoId}/validar`, validacao, {
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: 10000,
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao validar ponto:', error);
            return null;
        }
    };

    // Buscar pontos pendentes de validação
    const listarPontosPendentes = async (): Promise<PontoColaborador[]> => {
        try {
            const response = await axios.get<PontoColaborador[]>('/colaboradores/ponto/pendentes', {
                timeout: 10000,
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao listar pontos pendentes:', error);
            return [];
        }
    };

    // Buscar estatísticas de ponto
    const obterEstatisticasPonto = async (colaboradorId?: number): Promise<any> => {
        try {
            const url = colaboradorId 
                ? `/colaboradores/${colaboradorId}/ponto/estatisticas`
                : '/colaboradores/ponto/estatisticas';
            
            const response = await axios.get(url, {
                timeout: 10000,
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao obter estatísticas de ponto:', error);
            return null;
        }
    };

    return {
        listarPontosParaValidacao,
        listarPontosPorColaborador,
        buscarPontoPorId,
        registrarEntrada,
        registrarSaida,
        validarPonto,
        listarPontosPendentes,
        obterEstatisticasPonto,
    };
};

export default PontoService; 