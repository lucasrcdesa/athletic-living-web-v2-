import React, { useEffect, useState } from "react";
import "./styles.css";
import FadeTransition from "../transitions/FadeTransition";
import FinanceiroSection from "../sections/FinanceiroSection";
import AlunosSection from "../sections/AlunosSection";
import ColaboradoresSection from "../sections/ColaboradoresSection";
import TreinosSection from "../sections/TreinosSection";

interface MainContentProps {
  activeMenu: string | null;
}

const MainContent: React.FC<MainContentProps> = ({ activeMenu }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentContent, setCurrentContent] = useState<string | null>(null);

  useEffect(() => {
    // Anima a saída do conteúdo atual
    setIsVisible(false);

    // Aguarda a animação de saída e então muda o conteúdo
    const timer = setTimeout(() => {
      setCurrentContent(activeMenu);
      setIsVisible(true);
    }, 150);

    return () => clearTimeout(timer);
  }, [activeMenu]);

  const renderContent = () => {
    switch (currentContent) {
      case "financeiro":
        return <FinanceiroSection />;

      case "alunos":
        return <AlunosSection />;

      case "colaboradores":
        return <ColaboradoresSection />;

      case "treinos":
        return <TreinosSection />;

      default:
        return <FinanceiroSection />;
    }
  };

  const getTitle = () => {
    switch (currentContent) {
      case "financeiro":
        return "Financeiro";
      case "alunos":
        return "Alunos";
      case "colaboradores":
        return "Colaboradores";
      case "treinos":
        return "Treinos";
      default:
        return "Dashboard";
    }
  };

  return (
    <div className="home-container">
      <div className="title-container">
        <span className="title-text">{getTitle()}</span>
      </div>
      <FadeTransition isVisible={isVisible}>{renderContent()}</FadeTransition>
    </div>
  );
};

export default MainContent;
