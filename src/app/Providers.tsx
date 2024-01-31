import React from "react";
import { MenuProvider } from "./components/menu/Menu.context";
import { ModalProvider } from "./components/modal/Modal.context";
import GlobalStyle from "./styles/globalStyle";

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ModalProvider>
      <MenuProvider>
        <GlobalStyle />
        {children}
      </MenuProvider>
    </ModalProvider>
  );
};

export default Providers;
