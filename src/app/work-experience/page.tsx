'use client';
import { useContext } from 'react';
import styled from 'styled-components';
import { LanguageOptionsContext } from '../components/language-options/LanguageOptions.context';
import { breakpoints, colors, fonts } from '../styles/theme';
import { Eyebrow } from '../styles/styles';
import { getYearsOfCareer } from '../helpers';
import config from '../../../generated-config.json';
import ExperienceTimelineComponent from './components/ExperienceTimeline.component';

export type CompanyOption = 'company1' | 'company2' | 'company3' | 'company4';

const { locale } = config;

const WorkExperience = () => {
  const {
    languageOptionsState: { selectedLanguage },
  } = useContext(LanguageOptionsContext);

  const workExperienceLocale = locale[selectedLanguage].workExperience;

  return (
    <WorkExperienceLayout>
      <PageHeader>
        <Eyebrow>{workExperienceLocale.eyebrow}</Eyebrow>
        <Title>{workExperienceLocale.title.replace('{years}', `${getYearsOfCareer()}`)}</Title>
        <Subtitle>{workExperienceLocale.subtitle}</Subtitle>
      </PageHeader>
      <ExperienceTimelineComponent />
    </WorkExperienceLayout>
  );
};

const WorkExperienceLayout = styled.div`
  width: 100%;
  max-width: 920px;
  margin: 0 auto;
  padding: 72px 48px;
  display: flex;
  flex-direction: column;
  gap: 48px;
  text-align: left;

  @media (max-width: ${breakpoints.columns}px) {
    gap: 28px;
    padding: 36px 20px 40px;
  }
`;

const PageHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;

  @media (max-width: ${breakpoints.columns}px) {
    gap: 10px;
  }
`;

const Title = styled.h1`
  font-family: ${fonts.heading};
  font-size: clamp(32px, 2.4vw + 14px, 48px);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
`;

const Subtitle = styled.p`
  color: ${colors.textMuted};
  font-size: 17px;

  @media (max-width: ${breakpoints.columns}px) {
    font-size: 15px;
  }
`;

export default WorkExperience;
