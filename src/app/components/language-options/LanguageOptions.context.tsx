'use client';
import React, { createContext, useState } from 'react';

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
  const [languageOptionsState, updateLanguageOptionsState] =
    useState<LanguageOptionsState>(initialState);

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
