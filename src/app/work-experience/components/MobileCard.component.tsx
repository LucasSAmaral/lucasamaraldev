import { useModal } from '@/app/components/modal/Modal.context';
import config from '../../../../generated-config.json';
import { CompanyOption } from '../page';
import styled from 'styled-components';
import InfoCardComponent from '@/app/components/InfoCard.component';
import CompanyModalComponent from './CompanyModal.component';

const {
  locale,
  appConfig: {
    workExperiencePage: { mobile },
  },
} = config;

const MobileCardComponent = () => {
  const workExperienceLocale = locale['pt-br'].workExperience;

  const { openModal } = useModal();
  return (
    <>
      {mobile.companies.map(company => {
        const { option } = company;

        const companyOption = option as CompanyOption;

        return (
          <InfoCardMobile
            key={`mobile-${companyOption}`}
            onClick={() => openModal(<CompanyModalComponent companyOption={companyOption} />)}
          >
            <p>{workExperienceLocale[companyOption].periodWorked}</p>
            <h3>{workExperienceLocale[companyOption].companyName}</h3>
            <p>{workExperienceLocale[companyOption].function}</p>
          </InfoCardMobile>
        );
      })}
    </>
  );
};

const InfoCardMobile = styled(InfoCardComponent)`
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export default MobileCardComponent;
