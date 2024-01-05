import React from "react";
import { ModalProvider } from "./components/Modal.context";
import GlobalStyle from "./styles/globalStyle";

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ModalProvider>
      <GlobalStyle />
      {children}
    </ModalProvider>
  );
};

export default Providers;
