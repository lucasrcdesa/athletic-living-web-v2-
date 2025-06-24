import React from "react";
import "./styles.css";

interface HeaderProps {
  activeMenu: string | null;
  onMenuChange: (menu: string | null) => void;
}

const Header: React.FC<HeaderProps> = ({ activeMenu, onMenuChange }) => {
  const menuItems = [
    { key: "financeiro", label: "Financeiro" },
    { key: "alunos", label: "Alunos" },
    { key: "colaboradores", label: "Colaboradores" },
    { key: "treinos", label: "Treinos" },
  ];

  const handleMenuClick = (menuKey: string) => {
    onMenuChange(activeMenu === menuKey ? null : menuKey);
  };

  return (
    <div className="header-container">
      <div className="header-container-items">
        {menuItems.map((item) => (
          <div
            key={item.key}
            className={`header-item ${activeMenu === item.key ? "active" : ""}`}
            onClick={() => handleMenuClick(item.key)}
          >
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Header;
