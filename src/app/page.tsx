'use client';

import Image from 'next/image';
import styled from 'styled-components';
import Photo from '../assets/selfie.jpg';
import config from '../../generated-config.json';
import { useContext } from 'react';
import { LanguageOptionsContext } from './components/language-options/LanguageOptions.context';
import SocialLinksComponent from './components/SocialLinks.component';
import ActionLink from './components/ActionLink.component';
import { breakpoints, colors, fonts, radii } from './styles/theme';
import { Eyebrow } from './styles/styles';

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
        <Eyebrow>{homeLocale.greeting}</Eyebrow>
        <Title data-cy="title">{commonLocale.name}</Title>
        <Subtitle data-cy="subtitle">{homeLocale.profission}</Subtitle>
        <Intro>{homeLocale.intro}</Intro>
        <Actions>
          <ActionLink href="/work-experience" $variant="primary" data-cy="see-experience-button">
            {homeLocale.actions.seeExperience}
            <svg
              aria-hidden="true"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </ActionLink>
          <ActionLink href="/contact" $variant="secondary" data-cy="contact-button">
            {homeLocale.actions.contact}
          </ActionLink>
          {/* Botão de CV desativado até definirmos o arquivo. Para ativar: colocar o PDF em
              public/ (ex.: public/cv.pdf), ajustar o href e descomentar.
          <ActionLink href="/cv.pdf" download $variant="tertiary" data-cy="download-cv-button">
            <svg
              aria-hidden="true"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" x2="12" y1="15" y2="3" />
            </svg>
            {homeLocale.actions.downloadCv}
          </ActionLink>
          */}
        </Actions>
        <SocialLinks>
          <SocialLinksComponent />
        </SocialLinks>
      </HeroText>
      <HeroPhoto>
        <PhotoRing>
          <Selfie
            data-cy="selfie"
            src={Photo}
            alt={homeLocale.alt}
            title={homeLocale.title}
            sizes={`(max-width: ${breakpoints.columns}px) 96px, 360px`}
            priority={true}
          />
        </PhotoRing>
        <LocationBadge>
          <svg
            aria-hidden="true"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {homeLocale.location}
        </LocationBadge>
      </HeroPhoto>
    </Hero>
  );
}

const Hero = styled.div`
  width: 100%;
  max-width: 1160px;
  margin: 0 auto;
  padding: 80px 48px 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 56px;
  text-align: left;

  @media (max-width: ${breakpoints.columns}px) {
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

  @media (max-width: ${breakpoints.columns}px) {
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

const Intro = styled.p`
  max-width: 520px;
  color: ${colors.textMuted};
  font-size: 17px;
  line-height: 1.65;

  @media (max-width: ${breakpoints.columns}px) {
    font-size: 16px;
    line-height: 1.6;
  }
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 8px;

  @media (max-width: ${breakpoints.columns}px) {
    flex-direction: column;
    gap: 10px;
    margin-top: 4px;
  }
`;

const SocialLinks = styled.div`
  margin-top: 8px;
`;

const HeroPhoto = styled.div`
  flex: 0 1 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  @media (max-width: ${breakpoints.columns}px) {
    order: -1;
    flex-basis: auto;
    flex-direction: row;
    gap: 16px;
  }
`;

const PhotoRing = styled.div`
  padding: 10px;
  border: 2px solid ${colors.accentLine};
  border-radius: 50%;

  @media (max-width: ${breakpoints.columns}px) {
    flex-shrink: 0;
    padding: 5px;
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

  @media (max-width: ${breakpoints.columns}px) {
    width: 96px;
  }
`;

const LocationBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: ${radii.pill};
  background-color: ${colors.surface};
  color: ${colors.textSecondary};
  font-size: 14px;

  svg {
    flex-shrink: 0;
    color: ${colors.accent};
  }

  @media (max-width: ${breakpoints.columns}px) {
    gap: 6px;
    padding: 7px 12px;
    font-size: 13px;
  }
`;
