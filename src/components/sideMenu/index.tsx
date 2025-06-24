import React from "react";
import "./styles.css";

interface MenuOption {
  label: string;
  onClick: () => void;
}

interface SideMenuProps {
  menuOptions: MenuOption[];
}

const SideMenu: React.FC<SideMenuProps> = ({ menuOptions }) => {
  return (
    <div className="menu-container">
      <div className="menu-container-items">
        <div className="menu-item-logo">
          <span>Logo</span>
        </div>
        {menuOptions.map((opcao, index) => (
          <div key={index} className="menu-item" onClick={opcao.onClick}>
            {opcao.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideMenu;
