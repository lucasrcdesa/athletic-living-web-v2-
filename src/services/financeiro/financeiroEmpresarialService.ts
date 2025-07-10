import axios from "../axiosConfig";

export interface FinanceiroEmpresarial {
    id: number;
    tipo: "RECEITA" | "DESPESA";
    valor: number;
    descricao: string;
    data: string;
    observacoes: string | null;
    lancamentos: Lancamento[];
}

export interface FinanceiroEmpresarialFormData {
    nome: string;
    descricao: string;
    valor: number;
    tipo: "RECEITA" | "DESPESA";
    categoria: string;
    data: string;
    status: "PAGO" | "PENDENTE" | "VENCIDO";
}

export interface Lancamento {
    id: number;
    operacao: string;
    tipo: string;
    valor: number;
    texto: string;
    observacoes: string | null;
    financeiroEmpresarialId: number;
}

export interface LancamentoFormData {
    descricao: string;
    valor: number;
    tipo: "RECEITA" | "DESPESA";
    categoria: string;
    data: string;
    status: "PAGO" | "PENDENTE" | "VENCIDO";
}

const FinanceiroEmpresarialService = () => {
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

    const listarFinanceiroEmpresarial = async (): Promise<FinanceiroEmpresarial[]> => {
        try {
            const response = await axios.get<FinanceiroEmpresarial[]>('/financeiro-empresarial', {
                timeout: 10000,
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao listar financeiro empresarial:', error);
            return [];
        }
    };

    const buscarFinanceiroEmpresarialPorId = async (id: number): Promise<FinanceiroEmpresarial | null> => {
        try {
            const response = await axios.get<FinanceiroEmpresarial>(`/financeiro-empresarial/${id}`, {
                timeout: 10000,
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar financeiro empresarial por ID:', error);
            return null;
        }
    };

    const atualizarFinanceiroEmpresarial = async (id: number, financeiro: Partial<FinanceiroEmpresarialFormData>): Promise<FinanceiroEmpresarial | null> => {
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

    // Métodos para lançamentos
    const cadastrarLancamento = async (financeiroId: number, lancamento: LancamentoFormData): Promise<Lancamento | null> => {
        try {
            const response = await axios.post<Lancamento>(`/financeiro-empresarial/lancamentos/financeiro/${financeiroId}`, lancamento, {
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

    const listarLancamentosPorFinanceiro = async (financeiroId: number): Promise<Lancamento[]> => {
        try {
            const response = await axios.get<Lancamento[]>(`/financeiro-empresarial/lancamentos/financeiro/${financeiroId}`, {
                timeout: 10000,
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao listar lançamentos:', error);
            return [];
        }
    };

    const buscarLancamentoPorId = async (id: number): Promise<Lancamento | null> => {
        try {
            const response = await axios.get<Lancamento>(`/financeiro-empresarial/lancamentos/${id}`, {
                timeout: 10000,
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar lançamento por ID:', error);
            return null;
        }
    };

    const atualizarLancamento = async (id: number, lancamento: Partial<LancamentoFormData>): Promise<Lancamento | null> => {
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

    // Métodos para dados dos gráficos
    const obterDadosGraficoBarras = async (): Promise<any[]> => {
        try {
            const financeiros = await listarFinanceiroEmpresarial();
            
            // Agrupa por mês
            const dadosPorMes: { [key: string]: { receita: number; despesa: number } } = {};
            
            financeiros.forEach(financeiro => {
                const data = new Date(financeiro.data);
                const mes = data.toLocaleDateString('pt-BR', { month: 'short' });
                
                if (!dadosPorMes[mes]) {
                    dadosPorMes[mes] = { receita: 0, despesa: 0 };
                }
                
                if (financeiro.tipo === 'RECEITA') {
                    dadosPorMes[mes].receita += financeiro.valor;
                } else {
                    dadosPorMes[mes].despesa += financeiro.valor;
                }
            });
            
            return Object.entries(dadosPorMes).map(([mes, dados]) => ({
                mes,
                receita: dados.receita,
                despesa: dados.despesa,
                lucro: dados.receita - dados.despesa
            }));
        } catch (error) {
            console.error('Erro ao obter dados do gráfico de barras:', error);
            return [];
        }
    };

    const obterDadosGraficoPizza = async (): Promise<any[]> => {
        try {
            const financeiros = await listarFinanceiroEmpresarial();
            
            // Agrupa por tipo (RECEITA/DESPESA) já que não temos categoria
            const dadosPorTipo: { [key: string]: { receita: number; despesa: number } } = {};
            
            financeiros.forEach(financeiro => {
                const categoria = financeiro.descricao.split(' ')[0]; // Pega a primeira palavra da descrição
                
                if (!dadosPorTipo[categoria]) {
                    dadosPorTipo[categoria] = { receita: 0, despesa: 0 };
                }
                
                if (financeiro.tipo === 'RECEITA') {
                    dadosPorTipo[categoria].receita += financeiro.valor;
                } else {
                    dadosPorTipo[categoria].despesa += financeiro.valor;
                }
            });
            
            return Object.entries(dadosPorTipo).map(([categoria, dados]) => [
                { name: `${categoria} - Receita`, value: dados.receita, tipo: 'receita' },
                { name: `${categoria} - Despesa`, value: dados.despesa, tipo: 'despesa' }
            ]).flat().filter(item => item.value > 0);
        } catch (error) {
            console.error('Erro ao obter dados do gráfico de pizza:', error);
            return [];
        }
    };

    return {
        cadastrarFinanceiroEmpresarial,
        listarFinanceiroEmpresarial,
        buscarFinanceiroEmpresarialPorId,
        atualizarFinanceiroEmpresarial,
        excluirFinanceiroEmpresarial,
        cadastrarLancamento,
        listarLancamentosPorFinanceiro,
        buscarLancamentoPorId,
        atualizarLancamento,
        excluirLancamento,
        obterDadosGraficoBarras,
        obterDadosGraficoPizza,
    };
};

export default FinanceiroEmpresarialService; 