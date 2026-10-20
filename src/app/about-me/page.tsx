'use client';
import styled from 'styled-components';
import config from '../../../generated-config.json';
import { useContext } from 'react';
import { LanguageOptionsContext } from '../components/language-options/LanguageOptions.context';
import { breakpoints, colors, fonts, radii } from '../styles/theme';
import { Eyebrow } from '../styles/styles';

const {
  locale,
  appConfig: {
    aboutMePage: { careerStartYear, graduationYear },
    workExperiencePage: {
      mobile: { companies },
    },
  },
} = config;

const AboutMe: React.FC = () => {
  const {
    languageOptionsState: { selectedLanguage },
  } = useContext(LanguageOptionsContext);

  const aboutMeLocale = locale[selectedLanguage].aboutMe;

  const statList = [
    { value: new Date().getFullYear() - careerStartYear, label: aboutMeLocale.stats.years },
    { value: companies.length, label: aboutMeLocale.stats.companies },
    { value: graduationYear, label: aboutMeLocale.stats.graduation },
  ];

  return (
    <AboutMeLayout>
      <MainColumn>
        <Eyebrow>{aboutMeLocale.eyebrow}</Eyebrow>
        <Title>{aboutMeLocale.title}</Title>
        <Paragraph>{aboutMeLocale.paragraph1}</Paragraph>
        <Paragraph>{aboutMeLocale.paragraph2}</Paragraph>
        <Paragraph>{aboutMeLocale.paragraph3}</Paragraph>
        <StatList>
          {statList.map(({ value, label }) => (
            <Stat key={label}>
              <StatValue>{value}</StatValue>
              <StatLabel>{label}</StatLabel>
            </Stat>
          ))}
        </StatList>
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

const StatList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  margin-top: 16px;
  list-style: none;

  @media (max-width: ${breakpoints.columns}px) {
    gap: 10px;
    margin-top: 8px;
  }
`;

const Stat = styled.li`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 20px;
  border: 1px solid ${colors.border};
  border-radius: 16px;
  background-color: ${colors.surface};

  @media (max-width: ${breakpoints.columns}px) {
    padding: 16px 14px;
    border-radius: ${radii.md};
  }
`;

const StatValue = styled.span`
  color: ${colors.accent};
  font-family: ${fonts.heading};
  font-size: 36px;
  font-weight: 700;
  line-height: 1.2;

  @media (max-width: ${breakpoints.columns}px) {
    font-size: 26px;
  }
`;

const StatLabel = styled.span`
  color: ${colors.textMuted};
  font-size: 14px;
  line-height: 1.4;

  @media (max-width: ${breakpoints.columns}px) {
    font-size: 13px;
  }
`;

export default AboutMe;
