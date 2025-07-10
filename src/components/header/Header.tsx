import React from "react";
import "./Header.css";
import "../../constants/colors.css";

interface HeaderProps {
  activeMenu: string | null;
  onMenuChange: (menu: string | null) => void;
}

const Header: React.FC<HeaderProps> = ({ activeMenu, onMenuChange }) => {
  const menuOptions = [
    { key: "financeiro", label: "Financeiro", icon: "💰" },
    { key: "alunos", label: "Alunos", icon: "👥" },
    { key: "colaboradores", label: "Colaboradores", icon: "👨‍💼" },
    { key: "treinos", label: "Treinos", icon: "🏋️" },
  ];

  return (
    <div className="header-container">
      {/* Apenas barra de navegação, sem header-top */}
      <div className="header-navigation">
        <div className="header-nav-content">
          {menuOptions.map((option) => (
            <button
              key={option.key}
              className={`nav-button ${activeMenu === option.key ? "active" : ""}`}
              onClick={() => onMenuChange(option.key)}
            >
              <span className="nav-icon">{option.icon}</span>
              <span className="nav-label">{option.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header; 