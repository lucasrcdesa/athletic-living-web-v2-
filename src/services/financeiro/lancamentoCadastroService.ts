import axios from "../axiosConfig";

// Interfaces baseadas no modelo Java
export interface FinanceiroEmpresarial {
    id: number;
    tipo: TipoFinanceiro;
    valor: number;
    descricao: string;
    data: string; // formato ISO: "2024-01-01"
    observacoes: string;
    lancamentos: Lancamento[];
}

export interface Lancamento {
    id: number;
    operacao: Operacao;
    tipo: string;
    valor: number;
    texto: string;
    observacoes: string;
    financeiroEmpresarial?: FinanceiroEmpresarial;
}

export interface FinanceiroEmpresarialFormData {
    tipo: TipoFinanceiro;
    valor: number;
    descricao: string;
    data: string;
    observacoes: string;
}

export interface LancamentoFormData {
    operacao: Operacao;
    tipo: string;
    valor: number;
    texto: string;
    observacoes: string;
}

// Interfaces para Financeiro de Alunos (mantidas para compatibilidade)
export interface Financeiro {
    id: number;
    alunoId: number;
    vigencia: string;
    parcelas: ParcelaFinanceira[];
}

export interface FinanceiroRequestDTO {
    alunoId: number;
    vigencia: string;
    valorMensal: number;
    quantidadeMeses: number;
    dataInicio: string; // formato ISO: "2024-01-01"
}

export interface ParcelaFinanceira {
    id: number;
    mes: string;
    valor: number;
    pago: boolean;
    dataVencimento: string; // formato ISO: "2024-01-01"
    financeiroId: number;
}

export enum TipoFinanceiro {
    RECEITA = "RECEITA",
    DESPESA = "DESPESA",
    FATURAMENTO = "FATURAMENTO"
}

export enum Operacao {
    POSITIVO = "POSITIVO",
    NEGATIVO = "NEGATIVO"
}

const LancamentoCadastroService = () => {
    // Buscar todos os financeiros empresariais
    const listarFinanceirosEmpresariais = async (): Promise<FinanceiroEmpresarial[]> => {
        try {
            const response = await axios.get<FinanceiroEmpresarial[]>('/financeiro-empresarial', {
                timeout: 10000,
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao listar financeiros empresariais:', error);
            return [];
        }
    };

    // Buscar financeiro empresarial por ID
    const buscarFinanceiroEmpresarialPorId = async (id: number): Promise<FinanceiroEmpresarial | null> => {
        try {
            const response = await axios.get<FinanceiroEmpresarial>(`/financeiro-empresarial/${id}`, {
                timeout: 10000,
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar financeiro empresarial:', error);
            return null;
        }
    };

    // Cadastrar financeiro empresarial
    const cadastrarFinanceiroEmpresarial = async (financeiro: FinanceiroEmpresarialFormData): Promise<FinanceiroEmpresarial | null> => {
        try {
            const response = await axios.post<FinanceiroEmpresarial>('/financeiro-empresarial', financeiro, {
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: 10000,
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao cadastrar financeiro empresarial:', error);
            return null;
        }
    };

    // Atualizar financeiro empresarial
    const atualizarFinanceiroEmpresarial = async (id: number, financeiro: FinanceiroEmpresarialFormData): Promise<FinanceiroEmpresarial | null> => {
        try {
            const response = await axios.patch<FinanceiroEmpresarial>(`/financeiro-empresarial/${id}`, financeiro, {
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: 10000,
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao atualizar financeiro empresarial:', error);
            return null;
        }
    };

    // Excluir financeiro empresarial
    const excluirFinanceiroEmpresarial = async (id: number): Promise<boolean> => {
        try {
            await axios.delete(`/financeiro-empresarial/${id}`, {
                timeout: 10000,
            });
            return true;
        } catch (error) {
            console.error('Erro ao excluir financeiro empresarial:', error);
            return false;
        }
    };

    // Clonar financeiro empresarial
    const clonarFinanceiroEmpresarial = async (id: number): Promise<FinanceiroEmpresarial | null> => {
        try {
            const response = await axios.post<FinanceiroEmpresarial>(`/financeiro-empresarial/${id}/clone`, {}, {
                timeout: 10000,
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao clonar financeiro empresarial:', error);
            return null;
        }
    };

    // Buscar lançamentos por financeiro empresarial
    const buscarLancamentosPorFinanceiro = async (financeiroId: number): Promise<Lancamento[]> => {
        try {
            const response = await axios.get<Lancamento[]>(`/financeiro-empresarial/${financeiroId}/lancamentos`, {
                timeout: 10000,
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar lançamentos:', error);
            return [];
        }
    };

    // Cadastrar lançamento
    const cadastrarLancamento = async (lancamento: LancamentoFormData): Promise<Lancamento | null> => {
        try {
            const response = await axios.post<Lancamento>('/financeiro-empresarial/lancamentos', lancamento, {
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: 10000,
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao cadastrar lançamento:', error);
            return null;
        }
    };

    // Atualizar lançamento
    const atualizarLancamento = async (id: number, lancamento: LancamentoFormData): Promise<Lancamento | null> => {
        try {
            const response = await axios.patch<Lancamento>(`/financeiro-empresarial/lancamentos/${id}`, lancamento, {
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: 10000,
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao atualizar lançamento:', error);
            return null;
        }
    };

    // Excluir lançamento
    const excluirLancamento = async (id: number): Promise<boolean> => {
        try {
            await axios.delete(`/financeiro-empresarial/lancamentos/${id}`, {
                timeout: 10000,
            });
            return true;
        } catch (error) {
            console.error('Erro ao excluir lançamento:', error);
            return false;
        }
    };

    // Clonar lançamento
    const clonarLancamento = async (id: number): Promise<Lancamento | null> => {
        try {
            const response = await axios.post<Lancamento>(`/financeiro-empresarial/lancamentos/${id}/clone`, {}, {
                timeout: 10000,
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao clonar lançamento:', error);
            return null;
        }
    };

    // Métodos para Financeiro de Alunos (mantidos para compatibilidade)
    const cadastrarFinanceiro = async (dto: FinanceiroRequestDTO): Promise<Financeiro | null> => {
        try {
            const response = await axios.post<Financeiro>('/financeiro', dto, {
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: 10000,
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao cadastrar financeiro:', error);
            return null;
        }
    };

    // Método para buscar financeiro por aluno
    const buscarFinanceiroPorAluno = async (alunoId: number): Promise<Financeiro | null> => {
        try {
            const response = await axios.get<Financeiro>(`/financeiro/aluno/${alunoId}`, {
                timeout: 10000,
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar financeiro do aluno:', error);
            return null;
        }
    };

    return {
        listarFinanceirosEmpresariais,
        buscarFinanceiroEmpresarialPorId,
        cadastrarFinanceiroEmpresarial,
        atualizarFinanceiroEmpresarial,
        excluirFinanceiroEmpresarial,
        clonarFinanceiroEmpresarial,
        buscarLancamentosPorFinanceiro,
        cadastrarLancamento,
        atualizarLancamento,
        excluirLancamento,
        clonarLancamento,
        cadastrarFinanceiro,
        buscarFinanceiroPorAluno,
    };
};

export default LancamentoCadastroService; 