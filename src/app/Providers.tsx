'use client';
import React from 'react';
import { NavigationMenuProvider } from './components/navigation-menu/NavigationMenu.context';
import { ModalProvider } from './components/modal/Modal.context';
import GlobalStyle from './styles/globalStyle';
import { LanguageOptionsProvider } from './components/language-options/LanguageOptions.context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageOptionsProvider>
        <ModalProvider>
          <NavigationMenuProvider>
            <GlobalStyle />
            {children}
          </NavigationMenuProvider>
        </ModalProvider>
      </LanguageOptionsProvider>
    </QueryClientProvider>
  );
};

export default Providers;
