import { useContext } from 'react';
import styled from 'styled-components';
import { useModal } from '@/app/components/modal/Modal.context';
import { LanguageOptionsContext } from '@/app/components/language-options/LanguageOptions.context';
import { breakpoints, colors, fonts, radii, transitions } from '@/app/styles/theme';
import config from '../../../../generated-config.json';
import { CompanyOption } from '../page';
import CompanyModalComponent from './CompanyModal.component';

const { locale } = config;

const ExperienceCardComponent: React.FC<{ companyOption: CompanyOption }> = ({ companyOption }) => {
  const {
    languageOptionsState: { selectedLanguage },
  } = useContext(LanguageOptionsContext);

  const { openModal } = useModal();

  const companyLocale = locale[selectedLanguage].workExperience[companyOption];

  return (
    <Card>
      <CardHeader>
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
    flex-direction: column-reverse;
    align-items: flex-start;
    gap: 12px;
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
    padding: 5px 10px;
    font-size: 12px;
  }
`;

export default ExperienceCardComponent;
