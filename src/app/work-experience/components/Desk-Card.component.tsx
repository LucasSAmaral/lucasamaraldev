import { useModal } from '@/app/components/modal/Modal.context';
import config from '../../../../generated-config.json';
import { InfoCardDesk } from './Desk.component';
import { CompanyOption } from '../page';
import CompanyModalComponent from './CompanyModal.component';

const {
  locale,
  appConfig: {
    workExperiencePage: { desktop },
  },
} = config;

const DeskCardComponent: React.FC<{ cardPosition: 'left' | 'right' }> = ({ cardPosition }) => {
  const workExperienceLocale = locale['pt-br'].workExperience;

  const { openModal } = useModal();
  return (
    <>
      {desktop[cardPosition].map(company => {
        const { option, ...cardPositionObj } = company;

        const companyOption = option as CompanyOption;

        return (
          <InfoCardDesk
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
