import HeaderPages from "../../../components/headerPages";
import DynamicForm from "../../../components/DynamicForm";
import "./styles.css";
import { sections } from "../../../data/sections/alunos/cadastrarAlunosMock";

const CadastrarAluno = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Lógica de envio do formulário
  };

  return (
    <div className="app-container">
      <HeaderPages />

      <div className="title-container">
        <p>Cadastrar Aluno</p>
      </div>

      <DynamicForm sections={sections} onSubmit={handleSubmit} />
    </div>
  );
};

export default CadastrarAluno;
