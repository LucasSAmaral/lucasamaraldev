'use client';

import Image from 'next/image';
import styled from 'styled-components';
import Photo from '../assets/selfie.jpg';
import config from '../../generated-config.json';
import { useContext } from 'react';
import { LanguageOptionsContext } from './components/language-options/LanguageOptions.context';
import { breakpoints, colors, fonts } from './styles/theme';

const {
  locale: { commonLocale, ...locale },
} = config;

export default function Home() {
  const {
    languageOptionsState: { selectedLanguage },
  } = useContext(LanguageOptionsContext);

  const homeLocale = locale[selectedLanguage].home;

  return (
    <Hero>
      <HeroText>
        <Title data-cy="title">{commonLocale.name}</Title>
        <Subtitle data-cy="subtitle">{homeLocale.profission}</Subtitle>
      </HeroText>
      <HeroPhoto>
        <Selfie
          data-cy="selfie"
          src={Photo}
          alt={homeLocale.alt}
          title={homeLocale.title}
          sizes={`(max-width: ${breakpoints.homeColumns}px) 96px, 360px`}
          priority={true}
        />
      </HeroPhoto>
    </Hero>
  );
}

const Hero = styled.div`
  width: 100%;
  max-width: 1160px;
  margin: 0 auto;
  padding: 64px 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 56px;
  text-align: left;

  @media (max-width: ${breakpoints.homeColumns}px) {
    flex-direction: column;
    align-items: stretch;
    gap: 20px;
    padding: 36px 20px 24px;
  }
`;

const HeroText = styled.div`
  flex: 1 1 480px;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: ${breakpoints.homeColumns}px) {
    flex-basis: auto;
    gap: 20px;
  }
`;

const Title = styled.h1`
  font-family: ${fonts.heading};
  font-size: clamp(44px, 6vw + 8px, 72px);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.02em;
`;

const Subtitle = styled.p`
  font-family: ${fonts.heading};
  font-size: clamp(21px, 1.2vw + 16px, 28px);
  font-weight: 500;
  color: ${colors.textSecondary};
`;

const HeroPhoto = styled.div`
  flex: 0 1 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  @media (max-width: ${breakpoints.homeColumns}px) {
    order: -1;
    flex-basis: auto;
    flex-direction: row;
    gap: 16px;
  }
`;

const Selfie = styled(Image)`
  display: block;
  width: 360px;
  max-width: 100%;
  height: auto;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 50%;

  @media (max-width: ${breakpoints.homeColumns}px) {
    width: 96px;
  }
`;
