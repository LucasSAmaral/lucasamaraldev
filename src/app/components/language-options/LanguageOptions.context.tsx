'use client';
import React, { createContext, useState } from 'react';
import { MenuStatus, UpdateMenuStatus } from '../navigation-menu/NavigationMenu.component';
import { useSearchParams } from 'next/navigation';

export type SelectedLanguage = 'pt' | 'en';

export type LanguageOptionsState = {
  selectedLanguage: SelectedLanguage;
};

type LanguageOptionsContext = {
  languageOptionsState: LanguageOptionsState;
  languageMenuStatus: MenuStatus;
  updateLanguageOptionsState: React.Dispatch<React.SetStateAction<LanguageOptionsState>>;
  updateLanguageMenuStatus: UpdateMenuStatus;
};

const initialState: LanguageOptionsState = {
  selectedLanguage: 'pt',
};

export const LanguageOptionsContext = createContext<LanguageOptionsContext>({
  languageOptionsState: initialState,
  languageMenuStatus: 'CLOSED',
  updateLanguageOptionsState: () => {},
  updateLanguageMenuStatus: () => {},
});

LanguageOptionsContext.displayName = 'LanguageOptionsContext';

export const LanguageOptionsProvider = ({ children }: { children: React.ReactNode }) => {
  const params = useSearchParams();

  const languageParam = params.get('lang') as SelectedLanguage | null;

  const languageOptionInitialState: LanguageOptionsState = languageParam
    ? { selectedLanguage: languageParam }
    : initialState;

  const [languageOptionsState, updateLanguageOptionsState] = useState<LanguageOptionsState>(
    languageOptionInitialState,
  );

  const [languageMenuStatus, updateLanguageMenuStatus] = useState<MenuStatus>('CLOSED');

  return (
    <LanguageOptionsContext.Provider
      value={{
        languageOptionsState,
        languageMenuStatus,
        updateLanguageOptionsState,
        updateLanguageMenuStatus,
      }}
    >
      {children}
    </LanguageOptionsContext.Provider>
  );
};
