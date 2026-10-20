'use client';
import React, { createContext, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export type SelectedLanguage = 'pt' | 'en';

export type LanguageOptionsState = {
  selectedLanguage: SelectedLanguage;
};

type LanguageOptionsContext = {
  languageOptionsState: LanguageOptionsState;
  updateLanguageOptionsState: React.Dispatch<React.SetStateAction<LanguageOptionsState>>;
};

const initialState: LanguageOptionsState = {
  selectedLanguage: 'pt',
};

export const LanguageOptionsContext = createContext<LanguageOptionsContext>({
  languageOptionsState: initialState,
  updateLanguageOptionsState: () => {},
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

  useEffect(() => {
    document.documentElement.lang = languageOptionsState.selectedLanguage === 'en' ? 'en' : 'pt-BR';
  }, [languageOptionsState.selectedLanguage]);

  return (
    <LanguageOptionsContext.Provider
      value={{
        languageOptionsState,
        updateLanguageOptionsState,
      }}
    >
      {children}
    </LanguageOptionsContext.Provider>
  );
};
