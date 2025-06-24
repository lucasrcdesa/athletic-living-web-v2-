import React from "react";
import "./styles.css";

interface HeaderProps {}

const HeaderPages: React.FC<HeaderProps> = () => {
  return (
    <div className="header-container">
      <div className="header-container-items">
        <div className="header-item">🔙</div>
      </div>
    </div>
  );
};

export default HeaderPages;
