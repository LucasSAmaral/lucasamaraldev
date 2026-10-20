import { useContext } from 'react';
import styled from 'styled-components';
import { useModal } from '@/app/components/modal/Modal.context';
import { LanguageOptionsContext } from '@/app/components/language-options/LanguageOptions.context';
import { breakpoints, colors, fonts, radii, transitions } from '@/app/styles/theme';
import config from '../../../../generated-config.json';
import { CompanyOption } from '../page';
import CompanyModalComponent from './CompanyModal.component';
import { Chip, ChipList } from '@/app/components/Chip.component';

const {
  locale: { commonLocale, ...locale },
} = config;

const TOP_SKILLS_COUNT = 4;

const ExperienceCardComponent: React.FC<{ companyOption: CompanyOption }> = ({ companyOption }) => {
  const {
    languageOptionsState: { selectedLanguage },
  } = useContext(LanguageOptionsContext);

  const { openModal } = useModal();

  const workExperienceLocale = locale[selectedLanguage].workExperience;
  const companyLocale = workExperienceLocale[companyOption];
  const commonCompanyLocale = commonLocale.workExperience[companyOption];

  const topSkills = commonCompanyLocale.modal.text.technicalSkills
    .split(',')
    .map(skill => skill.trim())
    .slice(0, TOP_SKILLS_COUNT);

  return (
    <Card>
      <CardHeader>
        <Initials aria-hidden="true">{commonCompanyLocale.initials}</Initials>
        <CompanyInfo>
          <CompanyName>
            <OpenDetailsButton
              type="button"
              data-cy="experience-card"
              onClick={() => openModal(<CompanyModalComponent companyOption={companyOption} />)}
            >
              {companyLocale.companyName}
            </OpenDetailsButton>
          </CompanyName>
          <Role>{companyLocale.function}</Role>
        </CompanyInfo>
        <Period>{companyLocale.periodWorked}</Period>
      </CardHeader>
      <Summary>{companyLocale.summary}</Summary>
      <CardFooter>
        <SkillList>
          {topSkills.map(skill => (
            <Skill key={skill}>{skill}</Skill>
          ))}
        </SkillList>
        <SeeDetails aria-hidden="true">
          {workExperienceLocale.seeDetails}
          <svg
            width="16"
            height="16"
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
        </SeeDetails>
      </CardFooter>
    </Card>
  );
};

const Card = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 28px;
  border: 1px solid ${colors.border};
  border-radius: ${radii.lg};
  background-color: ${colors.surface};
  transition:
    transform ${transitions.fast},
    border-color ${transitions.fast},
    background-color ${transitions.fast};

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(255, 255, 255, 0.18);
    background-color: ${colors.surfaceHover};
  }

  @media (max-width: ${breakpoints.columns}px) {
    gap: 12px;
    padding: 20px;
    border-radius: 16px;
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;

  @media (max-width: ${breakpoints.columns}px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`;

const Initials = styled.span`
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${radii.md};
  background-color: ${colors.surfaceRaised};
  color: #d3d8e0;
  font-family: ${fonts.heading};
  font-size: 16px;
  font-weight: 700;

  @media (max-width: ${breakpoints.columns}px) {
    display: none;
  }
`;

const CompanyInfo = styled.div`
  flex: 1 1 240px;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;

  @media (max-width: ${breakpoints.columns}px) {
    flex-basis: auto;
  }
`;

const CompanyName = styled.h2`
  font-family: ${fonts.heading};
  font-size: 22px;
  font-weight: 600;

  @media (max-width: ${breakpoints.columns}px) {
    font-size: 20px;
  }
`;

// O botão cobre o card inteiro (::after), então qualquer clique no card abre os detalhes.
const OpenDetailsButton = styled.button`
  padding: 0;
  border: none;
  background: none;
  font: inherit;
  text-align: left;
  cursor: pointer;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
  }

  &:focus-visible {
    outline: none;
  }

  &:focus-visible::after {
    outline: 2px solid ${colors.accent};
    outline-offset: 2px;
    border-radius: ${radii.lg};
  }
`;

const Role = styled.p`
  color: ${colors.textBody};
  font-size: 15px;

  @media (max-width: ${breakpoints.columns}px) {
    font-size: 14px;
  }
`;

const Period = styled.p`
  padding: 6px 12px;
  border-radius: ${radii.pill};
  background-color: ${colors.accentSoft};
  color: ${colors.accent};
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;

  @media (max-width: ${breakpoints.columns}px) {
    order: -1;
    padding: 5px 10px;
    font-size: 12px;
  }
`;

const Summary = styled.p`
  color: ${colors.textBody};
  font-size: 16px;
  line-height: 1.6;

  @media (max-width: ${breakpoints.columns}px) {
    font-size: 15px;
    line-height: 1.55;
  }
`;

const CardFooter = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;

  @media (max-width: ${breakpoints.columns}px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const SkillList = styled(ChipList)`
  gap: 8px;

  @media (max-width: ${breakpoints.columns}px) {
    gap: 6px;
  }
`;

const Skill = styled(Chip)`
  padding: 5px 10px;
  border-radius: 6px;
  font-size: 13px;

  @media (max-width: ${breakpoints.columns}px) {
    padding: 4px 9px;
    font-size: 12px;
  }
`;

const SeeDetails = styled.span`
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: ${colors.accent};
  font-size: 14px;
  font-weight: 600;

  @media (max-width: ${breakpoints.columns}px) {
    margin-left: 0;
  }
`;

export default ExperienceCardComponent;
