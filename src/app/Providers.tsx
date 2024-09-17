'use client';
import React, { Suspense } from 'react';
import { NavigationMenuProvider } from './components/navigation-menu/NavigationMenu.context';
import { ModalProvider } from './components/modal/Modal.context';
import GlobalStyle from './styles/globalStyle';
import { LanguageOptionsProvider } from './components/language-options/LanguageOptions.context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense>
        <LanguageOptionsProvider>
          <ModalProvider>
            <NavigationMenuProvider>
              <GlobalStyle />
              {children}
            </NavigationMenuProvider>
          </ModalProvider>
        </LanguageOptionsProvider>
      </Suspense>
    </QueryClientProvider>
  );
};

export default Providers;
