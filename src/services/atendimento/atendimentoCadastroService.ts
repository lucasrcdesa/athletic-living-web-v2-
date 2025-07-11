import axios from "../axiosConfig";
import AlunoCadastroService, { Aluno } from '../aluno/alunoCadastroService';
import ColaboradorCadastroService, { Colaborador } from '../colaborador/colaboradorCadastroService';

export interface Atendimento {
    id: number;
    dataHora: string;
    alunosIds: number[];
    colaboradoresIds: number[];
    observacoes: string;
    tipo: string;
}

export interface AtendimentoFormData {
    dataHora: string;
    alunosIds: number[];
    colaboradoresIds: number[];
    observacoes: string;
    tipo: string;
}

export interface AtendimentoUpdateDTO {
    dataHora?: string;
    alunosIds?: number[];
    colaboradoresIds?: number[];
    observacoes?: string;
    tipo?: string;
}

export interface AtendimentoComNomes extends Atendimento {
    alunosNomes?: string[];
    colaboradoresNomes?: string[];
}

const AtendimentoCadastroService = () => {
    const { listarAlunos, buscarAlunoPorId } = AlunoCadastroService();
    const { listarColaboradores, buscarColaboradorPorId } = ColaboradorCadastroService();

    // Função para converter data para o formato que o backend espera
    const converterDataParaBackend = (data: string): string => {
        if (!data) return new Date().toISOString();
        
        // Se já está no formato ISO, retorna como está
        if (data.includes('T')) return data;
        
        // Converte formato YYYY-MM-DD para ISO
        return `${data}T00:00:00.000Z`;
    };

    const cadastrarAtendimento = async (atendimento: AtendimentoFormData): Promise<Atendimento | null> => {
        try {
            // Converter dados para o formato que o backend espera
            const dadosBackend = {
                ...atendimento,
                dataHora: converterDataParaBackend(atendimento.dataHora)
            };

            console.log('Dados enviados para o backend:', dadosBackend);

            const response = await axios.post<Atendimento>('/atendimentos', dadosBackend, {
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: 10000,
            });
            
            return response.data;
        } catch (error) {
            console.error('Erro ao cadastrar atendimento:', error);
            return null;
        }
    };

    const listarAtendimentos = async (): Promise<Atendimento[]> => {
        try {
            const response = await axios.get<Atendimento[]>('/atendimentos', {
                timeout: 10000,
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao listar atendimentos:', error);
            return [];
        }
    };

    const buscarAtendimentoPorId = async (id: number): Promise<Atendimento | null> => {
        try {
            const response = await axios.get<Atendimento>(`/atendimentos/${id}`, {
                timeout: 10000,
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar atendimento:', error);
            return null;
        }
    };

    const alterarAtendimento = async (id: number, dados: AtendimentoUpdateDTO): Promise<Atendimento | null> => {
        try {
            // Converter dados para o formato que o backend espera
            const dadosBackend = { ...dados };
            if (dados.dataHora) {
                dadosBackend.dataHora = converterDataParaBackend(dados.dataHora);
            }

            const response = await axios.patch<Atendimento>(`/atendimentos/${id}`, dadosBackend, {
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: 10000,
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao alterar atendimento:', error);
            return null;
        }
    };

    const deletarAtendimento = async (id: number): Promise<boolean> => {
        try {
            await axios.delete(`/atendimentos/${id}`, {
                timeout: 10000,
            });
            return true;
        } catch (error) {
            console.error('Erro ao deletar atendimento:', error);
            return false;
        }
    };

    // Método para buscar nomes dos alunos
    const buscarNomesAlunos = async (alunosIds: number[]): Promise<string[]> => {
        try {
            const nomes: string[] = [];
            for (const id of alunosIds) {
                const aluno = await buscarAlunoPorId(id);
                if (aluno) {
                    nomes.push(aluno.nome);
                }
            }
            return nomes;
        } catch (error) {
            console.error('Erro ao buscar nomes dos alunos:', error);
            return [];
        }
    };

    // Método para buscar nomes dos colaboradores
    const buscarNomesColaboradores = async (colaboradoresIds: number[]): Promise<string[]> => {
        try {
            const nomes: string[] = [];
            for (const id of colaboradoresIds) {
                const colaborador = await buscarColaboradorPorId(id);
                if (colaborador) {
                    nomes.push(colaborador.nome);
                }
            }
            return nomes;
        } catch (error) {
            console.error('Erro ao buscar nomes dos colaboradores:', error);
            return [];
        }
    };

    // Método para listar atendimentos com nomes
    const listarAtendimentosComNomes = async (): Promise<AtendimentoComNomes[]> => {
        try {
            const atendimentos = await listarAtendimentos();
            const atendimentosComNomes: AtendimentoComNomes[] = [];

            for (const atendimento of atendimentos) {
                const alunosNomes = await buscarNomesAlunos(atendimento.alunosIds);
                const colaboradoresNomes = await buscarNomesColaboradores(atendimento.colaboradoresIds);

                atendimentosComNomes.push({
                    ...atendimento,
                    alunosNomes,
                    colaboradoresNomes
                });
            }

            return atendimentosComNomes;
        } catch (error) {
            console.error('Erro ao listar atendimentos com nomes:', error);
            return [];
        }
    };

    return {
        cadastrarAtendimento,
        listarAtendimentos,
        listarAtendimentosComNomes,
        buscarAtendimentoPorId,
        alterarAtendimento,
        deletarAtendimento,
        buscarNomesAlunos,
        buscarNomesColaboradores,
    };
};

export default AtendimentoCadastroService; 