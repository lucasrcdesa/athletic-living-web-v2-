import React from "react";
import Login from "../screens/login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../screens/home";
import CadastrarAluno from "../screens/alunos/cadastroAlunos";
import CadastrarColaborador from "../screens/colaboradores/cadastroColaborador/CadastrarColaborador";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/alunos/cadastro" element={<CadastrarAluno />} />
        <Route
          path="/colaboradores/cadastro"
          element={<CadastrarColaborador />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
