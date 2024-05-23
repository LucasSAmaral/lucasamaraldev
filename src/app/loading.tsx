'use client';

import { useContext } from 'react';
import CONFIG from '../../generated-config.json';
import { LanguageOptionsContext } from './components/language-options/LanguageOptions.context';

const { locale } = CONFIG;

export default function Loading() {
  const {
    languageOptionsState: { selectedLanguage },
  } = useContext(LanguageOptionsContext);

  const { loading } = locale[selectedLanguage];

  return (
    <div>
      <h2>{loading}</h2>
    </div>
  );
}
