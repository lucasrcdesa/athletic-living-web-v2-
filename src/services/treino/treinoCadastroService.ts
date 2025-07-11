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

// Interface para o formato que o backend espera
interface TreinoBackendDTO {
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
    // Função para converter tempo no formato ISO 8601 (PT40M)
    const converterTempoParaISO = (tempo: string): string => {
        if (!tempo || tempo === "00:00:00") return "PT0M";
        
        // Se já está no formato PT, retorna como está
        if (tempo.startsWith('PT')) return tempo;
        
        // Converte formato HH:MM:SS para PT
        const partes = tempo.split(':');
        if (partes.length >= 2) {
            const horas = parseInt(partes[0]) || 0;
            const minutos = parseInt(partes[1]) || 0;
            
            if (horas > 0) {
                return `PT${horas}H${minutos > 0 ? minutos + 'M' : ''}`;
            } else {
                return `PT${minutos}M`;
            }
        }
        
        return "PT0M";
    };

    // Função para converter data para o formato que o backend espera
    const converterDataParaBackend = (data: string): string => {
        if (!data) return new Date().toISOString();
        
        // Se já está no formato ISO, retorna como está
        if (data.includes('T')) return data;
        
        // Converte formato YYYY-MM-DD para ISO
        return `${data}T00:00:00.000Z`;
    };

    const cadastrarTreino = async (treino: TreinoFormData): Promise<Treino | null> => {
        try {
            // Converter dados para o formato que o backend espera
            const dadosBackend: TreinoBackendDTO = {
                nome: treino.nome,
                feito: treino.feito,
                dia: converterDataParaBackend(treino.dia),
                urlVideo: treino.urlVideo,
                numDeBlocos: treino.numDeBlocos,
                pse: treino.pse,
                pseEstimado: treino.pseEstimado,
                modalidade: treino.modalidade,
                tempoEstimado: converterTempoParaISO(treino.tempoEstimado),
                tempoRealizado: converterTempoParaISO(treino.tempoRealizado),
                cargaEstimada: treino.cargaEstimada,
                cargaReal: treino.cargaReal,
                padraoMovimento: treino.padraoMovimento,
                distanciaPrescrita: treino.distanciaPrescrita,
                distanciaRealizada: treino.distanciaRealizada,
                caracteristica: treino.caracteristica,
                areaTreino: treino.areaTreino,
                microcicloId: treino.microcicloId,
                alunosIds: treino.alunosIds,
                colaboradoresIds: treino.colaboradoresIds,
                exerciciosIds: treino.exerciciosIds,
            };

            console.log('Dados enviados para o backend:', dadosBackend);

            const response = await axios.post<Treino>('/treinos', dadosBackend, {
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
            // Converter dados para o formato que o backend espera
            const dadosBackend: Partial<TreinoBackendDTO> = {};
            
            if (treino.nome !== undefined) dadosBackend.nome = treino.nome;
            if (treino.feito !== undefined) dadosBackend.feito = treino.feito;
            if (treino.dia !== undefined) dadosBackend.dia = converterDataParaBackend(treino.dia);
            if (treino.urlVideo !== undefined) dadosBackend.urlVideo = treino.urlVideo;
            if (treino.numDeBlocos !== undefined) dadosBackend.numDeBlocos = treino.numDeBlocos;
            if (treino.pse !== undefined) dadosBackend.pse = treino.pse;
            if (treino.pseEstimado !== undefined) dadosBackend.pseEstimado = treino.pseEstimado;
            if (treino.modalidade !== undefined) dadosBackend.modalidade = treino.modalidade;
            if (treino.tempoEstimado !== undefined) dadosBackend.tempoEstimado = converterTempoParaISO(treino.tempoEstimado);
            if (treino.tempoRealizado !== undefined) dadosBackend.tempoRealizado = converterTempoParaISO(treino.tempoRealizado);
            if (treino.cargaEstimada !== undefined) dadosBackend.cargaEstimada = treino.cargaEstimada;
            if (treino.cargaReal !== undefined) dadosBackend.cargaReal = treino.cargaReal;
            if (treino.padraoMovimento !== undefined) dadosBackend.padraoMovimento = treino.padraoMovimento;
            if (treino.distanciaPrescrita !== undefined) dadosBackend.distanciaPrescrita = treino.distanciaPrescrita;
            if (treino.distanciaRealizada !== undefined) dadosBackend.distanciaRealizada = treino.distanciaRealizada;
            if (treino.caracteristica !== undefined) dadosBackend.caracteristica = treino.caracteristica;
            if (treino.areaTreino !== undefined) dadosBackend.areaTreino = treino.areaTreino;
            if (treino.microcicloId !== undefined) dadosBackend.microcicloId = treino.microcicloId;
            if (treino.alunosIds !== undefined) dadosBackend.alunosIds = treino.alunosIds;
            if (treino.colaboradoresIds !== undefined) dadosBackend.colaboradoresIds = treino.colaboradoresIds;
            if (treino.exerciciosIds !== undefined) dadosBackend.exerciciosIds = treino.exerciciosIds;

            const response = await axios.patch<Treino>(`/treinos/${id}`, dadosBackend, {
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