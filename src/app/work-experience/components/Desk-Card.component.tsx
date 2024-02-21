import { useModal } from '@/app/components/modal/Modal.context';
import config from '../../../../generated-config.json';
import { InfoCardDesk } from './Desk.component';
import { Option } from '../page';

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

        return (
          <InfoCardDesk
            {...cardPositionObj}
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
          </InfoCardDesk>
        );
      })}
    </>
  );
};

export default DeskCardComponent;
