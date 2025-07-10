import React from "react";
import { useParams } from "react-router-dom";
import HeaderPages from "../../../components/headerPages/HeaderPages";

const EditarAtendimento = () => {
  const { id } = useParams();
  return (
    <div className="app-container">
      <HeaderPages title={`Editar Atendimento - Aluno #${id}`} />
      <div style={{ padding: 32 }}>
        <p>Formulário de edição de atendimento para o aluno <b>#{id}</b> (mock).</p>
      </div>
    </div>
  );
};

export default EditarAtendimento; 