import { useModal } from '@/app/components/modal/Modal.context';
import config from '../../../../generated-config.json';
import { Option } from '../page';
import styled from 'styled-components';
import InfoCardComponent from '@/app/components/Info-Card.component';

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

        return (
          <InfoCardMobile
            onClick={() =>
              openModal(
                <>
                  <h1>Americanas S.A.</h1>
                </>,
              )
            }
          >
            <p>{workExperienceLocale[`${option as Option}`].periodWorked}</p>
            <h3>{workExperienceLocale[`${option as Option}`].companyName}</h3>
            <p>{workExperienceLocale[`${option as Option}`].function}</p>
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
