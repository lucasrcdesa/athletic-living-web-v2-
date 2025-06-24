import React, { useState } from "react";
import "./styles.css";
import "../../constants/colors.css";
import { SideMenu, Header, MainContent } from "../../components";
import { useMenuOptions } from "../../hooks/useMenuOptions";

const Home = () => {
  const [menuEscolhido, setMenuEscolhido] = useState<string | null>(null);
  const { getMenuOptions } = useMenuOptions();

  const handleMenuChange = (menu: string | null) => {
    setMenuEscolhido(menu);
  };

  return (
    <div className="app-container">
      <SideMenu menuOptions={getMenuOptions(menuEscolhido)} />

      <div className="main-container">
        <Header activeMenu={menuEscolhido} onMenuChange={handleMenuChange} />
        <MainContent activeMenu={menuEscolhido} />
      </div>
    </div>
  );
};

export default Home;
