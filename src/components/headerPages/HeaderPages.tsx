import React from "react";
import { useNavigate } from "react-router-dom";
import "./HeaderPages.css";

interface HeaderPagesProps {
  title?: string;
  showBackButton?: boolean;
}

const HeaderPages: React.FC<HeaderPagesProps> = ({ 
  title, 
  showBackButton = true 
}) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Volta para a página anterior
  };

  return (
    <div className="header-pages-container">
      {/* Barra off-white superior */}
      <div className="header-top">
        <div className="header-top-content">
          {showBackButton && (
            <div className="back-button" onClick={handleBackClick}>
              🔙
            </div>
          )}
        </div>
      </div>
      {/* Barra azul com título */}
      {title && (
        <div className="header-title-bar">
          <h1>{title}</h1>
        </div>
      )}
    </div>
  );
};

export default HeaderPages;
