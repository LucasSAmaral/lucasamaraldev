import { useModal } from '@/app/components/modal/Modal.context';
import config from '../../../../generated-config.json';
import { InfoCardDesk } from './Desk.component';
import { CompanyOption } from '../page';
import CompanyModalComponent from './CompanyModal.component';
import { useContext } from 'react';
import { LanguageOptionsContext } from '@/app/components/language-options/LanguageOptions.context';

const {
  locale,
  appConfig: {
    workExperiencePage: { desktop },
  },
} = config;

const DeskCardComponent: React.FC<{ cardPosition: 'left' | 'right' }> = ({ cardPosition }) => {
  const {
    languageOptionsState: { selectedLanguage },
  } = useContext(LanguageOptionsContext);

  const workExperienceLocale = locale[selectedLanguage].workExperience;

  const { openModal } = useModal();
  return (
    <>
      {desktop[cardPosition].map(company => {
        const { option, ...cardPositionObj } = company;

        const companyOption = option as CompanyOption;

        return (
          <InfoCardDesk
            dataCy="desk-card-component"
            key={`desk-${companyOption}`}
            {...cardPositionObj}
            onClick={() => openModal(<CompanyModalComponent companyOption={companyOption} />)}
          >
            <p>{workExperienceLocale[companyOption].periodWorked}</p>
            <h3>{workExperienceLocale[companyOption].companyName}</h3>
            <p>{workExperienceLocale[companyOption].function}</p>
          </InfoCardDesk>
        );
      })}
    </>
  );
};

export default DeskCardComponent;
