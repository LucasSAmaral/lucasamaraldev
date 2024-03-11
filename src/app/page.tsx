'use client';

import Image from 'next/image';
import Photo from '../assets/selfie.jpg';
import { Subtitle, Title } from './styles/styles';
import config from '../../generated-config.json';
import { useContext } from 'react';
import { LanguageOptionsContext } from './components/language-options/LanguageOptions.context';

const { locale } = config;

export default function Home() {
  const { languageOptionsState } = useContext(LanguageOptionsContext);

  const { selectedLanguage } = languageOptionsState;

  const homeLocale = locale[selectedLanguage].home;

  return (
    <>
      <Image src={Photo} alt={homeLocale.alt} priority={true} />
      <Title>{homeLocale.name}</Title>
      <Subtitle>{homeLocale.profission}</Subtitle>
    </>
  );
}
