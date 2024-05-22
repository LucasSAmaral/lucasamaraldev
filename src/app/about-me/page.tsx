'use client';
import styled from 'styled-components';
import config from '../../../generated-config.json';
import { useContext } from 'react';
import { LanguageOptionsContext } from '../components/language-options/LanguageOptions.context';

const { locale } = config;

const AboutMe: React.FC = () => {
  const {
    languageOptionsState: { selectedLanguage },
  } = useContext(LanguageOptionsContext);

  const aboutMeLocale = locale[selectedLanguage].aboutMe;

  return (
    <AboutMeWrapper>
      <p>{aboutMeLocale.paragraph1}</p>
      <p>{aboutMeLocale.paragraph2}</p>
      <p>{aboutMeLocale.paragraph3}</p>
    </AboutMeWrapper>
  );
};

const AboutMeWrapper = styled.div`
  text-align: center;
  p {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    text-align: justify;
    margin-top: 10px;

    @media (max-width: 672px) {
      padding: 0 15px;
    }
  }
`;

export default AboutMe;
