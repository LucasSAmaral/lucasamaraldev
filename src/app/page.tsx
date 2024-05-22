'use client';

import Image from 'next/image';
import Photo from '../assets/selfie.jpg';
import { Subtitle, Title } from './styles/styles';
import config from '../../generated-config.json';
import { useContext } from 'react';
import { LanguageOptionsContext } from './components/language-options/LanguageOptions.context';

const {
  locale: { commonLocale, ...locale },
} = config;

export default function Home() {
  const {
    languageOptionsState: { selectedLanguage },
  } = useContext(LanguageOptionsContext);

  const homeLocale = locale[selectedLanguage].home;

  return (
    <>
      <Image data-cy="selfie" src={Photo} alt={homeLocale.alt} priority={true} />
      <Title data-cy="title">{commonLocale.name}</Title>
      <Subtitle data-cy="subtitle">{homeLocale.profission}</Subtitle>
    </>
  );
}
