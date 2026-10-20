import styled from 'styled-components';
import { CompanyOption } from '../page';
import config from '../../../../generated-config.json';
import { useContext } from 'react';
import { LanguageOptionsContext } from '@/app/components/language-options/LanguageOptions.context';
import { MODAL_TITLE_ID } from '@/app/components/modal/Modal.container';
import { Chip, ChipList } from '@/app/components/Chip.component';
import { breakpoints, colors, fonts, radii } from '@/app/styles/theme';

const {
  locale: {
    commonLocale: { workExperience: commonWorkExperienceLocale },
    ...locale
  },
  appConfig: {
    workExperiencePage: { companiesUrls },
  },
} = config;

const CompanyModalComponent: React.FC<{ companyOption: CompanyOption }> = ({ companyOption }) => {
  const {
    languageOptionsState: { selectedLanguage },
  } = useContext(LanguageOptionsContext);

  const workExperienceLocale = locale[selectedLanguage].workExperience;
  const companyLocale = workExperienceLocale[companyOption];
  const commonCompanyLocale = commonWorkExperienceLocale[companyOption];

  const technicalSkills = commonCompanyLocale.modal.text.technicalSkills
    .split(',')
    .map(skill => skill.trim());

  return (
    <CompanyModalWrapper>
      <ModalHeader>
        <Initials aria-hidden="true">{commonCompanyLocale.initials}</Initials>
        <div>
          <CompanyName id={MODAL_TITLE_ID}>{companyLocale.companyName}</CompanyName>
          <RoleAndPeriod>
            {companyLocale.function} · {companyLocale.periodWorked}
          </RoleAndPeriod>
        </div>
      </ModalHeader>

      <ModalSection>
        <SectionTitle>{workExperienceLocale.modal.workDescription}</SectionTitle>
        <WorkDescription
          dangerouslySetInnerHTML={{
            __html: companyLocale.modal.text.workDescription,
          }}
        />
      </ModalSection>

      <ModalSection>
        <SectionTitle>{workExperienceLocale.modal.technicalSkills}</SectionTitle>
        <ChipList>
          {technicalSkills.map(skill => (
            <Chip key={skill} $variant="outline">
              {skill}
            </Chip>
          ))}
        </ChipList>
      </ModalSection>

      <CompanyLink href={companiesUrls[companyOption]} target="_blank" rel="noopener noreferrer">
        {workExperienceLocale.modal.visitWebsite}
        <VisuallyHidden> ({workExperienceLocale.modal.opensInNewTab})</VisuallyHidden>
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
          <path d="M7 17 17 7" />
          <path d="M7 7h10v10" />
        </svg>
      </CompanyLink>
    </CompanyModalWrapper>
  );
};

const CompanyModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
  text-align: left;
`;

// padding-right deixa espaço para o botão de fechar do container, no canto superior direito.
const ModalHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding-right: 48px;
`;

const Initials = styled.span`
  width: 52px;
  height: 52px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${radii.md};
  background-color: ${colors.surfaceRaised};
  color: #d3d8e0;
  font-family: ${fonts.heading};
  font-weight: 700;

  @media (max-width: ${breakpoints.columns}px) {
    width: 44px;
    height: 44px;
    font-size: 14px;
  }
`;

const CompanyName = styled.h2`
  font-family: ${fonts.heading};
  font-size: 26px;
  font-weight: 600;
  line-height: 1.2;

  @media (max-width: ${breakpoints.columns}px) {
    font-size: 22px;
  }
`;

const RoleAndPeriod = styled.p`
  margin-top: 4px;
  color: ${colors.textBody};
  font-size: 15px;
  line-height: 1.5;

  @media (max-width: ${breakpoints.columns}px) {
    font-size: 14px;
  }
`;

const ModalSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SectionTitle = styled.h3`
  color: ${colors.textSubtle};
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const WorkDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  color: ${colors.textSecondary};
  font-size: 16px;
  line-height: 1.7;

  a {
    color: ${colors.accent};
  }

  @media (max-width: ${breakpoints.columns}px) {
    font-size: 15px;
    line-height: 1.65;
  }
`;

const CompanyLink = styled.a`
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 44px;
  color: ${colors.accent};
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const VisuallyHidden = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
`;

export default CompanyModalComponent;
