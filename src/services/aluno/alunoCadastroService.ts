import axios from "../axiosConfig";

// src/types/Aluno.ts
export interface Aluno {
    id: number;
    nome: string;
    nascimento: string;
    telefone: string;
    email: string;
    endereco: string;
    cep: string;
    cpf: string;
    adimplente: boolean;
    diasTreinados: number;
    contratoVencido: boolean;
    diasExpiracao: number;
    diasDeTrancamento: number;
    loginUsuario: string;
  }
  

export interface AlunoFormData {
    nome: string;
    nascimento: string; // formato ISO: "1991-03-22"
    telefone: string;
    email: string;
    endereco: string;
    cep: string;
    cpf: string;
  }

// Interface específica para atualização (apenas campos que o backend aceita)
export interface AtualizarAlunoDTO {
    nome?: string;
    telefone?: string;
    endereco?: string;
    cep?: string;
}

const AlunoCadastroService = () => {
    const cadastrarAluno = async (aluno: AlunoFormData): Promise<Aluno | null> => {
        try {
            const response = await axios.post<Aluno>('/alunos', aluno, {
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: 10000,
            });
            
            return response.data;
        } catch (error) {
            console.error('Erro ao cadastrar aluno:', error);
            return null;
        }
    };

    // Novo método para listar alunos
    const listarAlunos = async (): Promise<Aluno[]> => {
        try {
            const response = await axios.get<Aluno[]>('/CadastrarAlunos', {
                timeout: 10000,
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao listar alunos:', error);
            return [];
        }
    };

    // Método para buscar aluno por ID
    const buscarAlunoPorId = async (id: number): Promise<Aluno | null> => {
        try {
            const response = await axios.get<Aluno>(`/CadastrarAlunos/${id}`, {
                timeout: 10000,
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar aluno por ID:', error);
            return null;
        }
    };

    // Método para deletar aluno
    const deletarAluno = async (id: number): Promise<boolean> => {
        try {
            await axios.delete(`/CadastrarAlunos/${id}`, {
                timeout: 10000,
            });
            return true;
        } catch (error) {
            console.error('Erro ao deletar aluno:', error);
            return false;
        }
    };

    // Método para alterar aluno (apenas campos permitidos)
    const alterarAluno = async (id: number, dadosAtualizacao: AtualizarAlunoDTO): Promise<Aluno | null> => {
        try {
            const response = await axios.patch<Aluno>(`/CadastrarAlunos/${id}`, dadosAtualizacao, {
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: 10000,
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao alterar aluno:', error);
            return null;
        }
    };

    return {
        cadastrarAluno,
        listarAlunos,
        buscarAlunoPorId,
        deletarAluno,
        alterarAluno,
    };
};

export default AlunoCadastroService;
