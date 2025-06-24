import HeaderPages from "../../../components/headerPages";
import DynamicForm from "../../../components/DynamicForm";
import { sections } from "../../../data/sections/colaboradores/cadastrarColaboradorMock";

const CadastrarColaborador = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Lógica de envio do formulário
  };

  return (
    <div className="app-container">
      <HeaderPages />
      <div className="title-container">
        <p>Cadastrar Colaborador</p>
      </div>
      <DynamicForm sections={sections} onSubmit={handleSubmit} />
    </div>
  );
};

export default CadastrarColaborador;
