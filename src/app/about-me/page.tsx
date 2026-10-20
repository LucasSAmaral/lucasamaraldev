'use client';
import styled from 'styled-components';
import config from '../../../generated-config.json';
import { useContext } from 'react';
import { LanguageOptionsContext } from '../components/language-options/LanguageOptions.context';
import { breakpoints, colors, fonts } from '../styles/theme';
import { Eyebrow } from '../styles/styles';

const { locale } = config;

const AboutMe: React.FC = () => {
  const {
    languageOptionsState: { selectedLanguage },
  } = useContext(LanguageOptionsContext);

  const aboutMeLocale = locale[selectedLanguage].aboutMe;

  return (
    <AboutMeLayout>
      <MainColumn>
        <Eyebrow>{aboutMeLocale.eyebrow}</Eyebrow>
        <Title>{aboutMeLocale.title}</Title>
        <Paragraph>{aboutMeLocale.paragraph1}</Paragraph>
        <Paragraph>{aboutMeLocale.paragraph2}</Paragraph>
        <Paragraph>{aboutMeLocale.paragraph3}</Paragraph>
      </MainColumn>
    </AboutMeLayout>
  );
};

const AboutMeLayout = styled.div`
  width: 100%;
  max-width: 1160px;
  margin: 0 auto;
  padding: 80px 48px;
  display: flex;
  flex-wrap: wrap;
  gap: 64px;
  text-align: left;

  @media (max-width: ${breakpoints.columns}px) {
    gap: 40px;
    padding: 36px 20px 48px;
  }
`;

const MainColumn = styled.section`
  flex: 1 1 520px;
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
  font-size: clamp(32px, 2.4vw + 14px, 48px);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
`;

const Paragraph = styled.p`
  color: ${colors.textBody};
  font-size: 18px;
  line-height: 1.7;

  @media (max-width: ${breakpoints.columns}px) {
    font-size: 16px;
    line-height: 1.65;
  }
`;

export default AboutMe;
