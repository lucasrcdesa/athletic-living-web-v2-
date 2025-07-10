import axios from "axios";

export interface AlunoResponse {
  id: number;
  nome: string;
  nascimento: string; // ISO string
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

export interface AlunoCadastroDTO {
  nome: string;
  nascimento: string; // formato ISO: "1991-03-22"
  telefone: string;
  email: string;
  endereco: string;
  cep: string;
  cpf: string;
}

export interface AtualizarAlunoDTO {
  nome?: string;
  telefone?: string;
  endereco?: string;
  cep?: string;
}

const BASE_URL = "/CadastrarAlunos";

const listarAlunos = async (): Promise<AlunoResponse[]> => {
  const { data } = await axios.get<AlunoResponse[]>(BASE_URL);
  return data;
};

const buscarAlunoPorId = async (id: number): Promise<AlunoResponse> => {
  const { data } = await axios.get<AlunoResponse>(`${BASE_URL}/${id}`);
  return data;
};

const cadastrarAluno = async (aluno: AlunoCadastroDTO): Promise<AlunoResponse> => {
  const { data } = await axios.post<AlunoResponse>(BASE_URL, aluno, {
    headers: { 'Content-Type': 'application/json' },
    timeout: 10000,
  });
  return data;
};

const atualizarAluno = async (id: number, aluno: AtualizarAlunoDTO): Promise<AlunoResponse> => {
  const { data } = await axios.patch<AlunoResponse>(`${BASE_URL}/${id}`, aluno, {
    headers: { 'Content-Type': 'application/json' },
    timeout: 10000,
  });
  return data;
};

const excluirAluno = async (id: number): Promise<void> => {
  await axios.delete(`${BASE_URL}/${id}`);
};

const AlunoService = {
  listarAlunos,
  buscarAlunoPorId,
  cadastrarAluno,
  atualizarAluno,
  excluirAluno,
};

export default AlunoService; 