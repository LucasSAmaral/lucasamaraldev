import React from 'react';
import { NavigationMenuProvider } from './components/navigation-menu/NavigationMenu.context';
import { ModalProvider } from './components/modal/Modal.context';
import GlobalStyle from './styles/globalStyle';
import { LanguageOptionsProvider } from './components/language-options/LanguageOptions.context';

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <LanguageOptionsProvider>
      <ModalProvider>
        <NavigationMenuProvider>
          <GlobalStyle />
          {children}
        </NavigationMenuProvider>
      </ModalProvider>
    </LanguageOptionsProvider>
  );
};

export default Providers;
