'use client';
import React from 'react';
import { MenuProvider } from './components/menu/Menu.context';
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
          <MenuProvider>
            <GlobalStyle />
            {children}
          </MenuProvider>
        </ModalProvider>
      </LanguageOptionsProvider>
    </QueryClientProvider>
  );
};

export default Providers;
