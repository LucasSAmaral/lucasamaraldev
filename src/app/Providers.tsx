import React from 'react';
import { MenuProvider } from './components/menu/Menu.context';
import { ModalProvider } from './components/modal/Modal.context';
import GlobalStyle from './styles/globalStyle';
import { LanguageOptionsProvider } from './components/language-options/LanguageOptions.context';

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <LanguageOptionsProvider>
      <ModalProvider>
        <MenuProvider>
          <GlobalStyle />
          {children}
        </MenuProvider>
      </ModalProvider>
    </LanguageOptionsProvider>
  );
};

export default Providers;
