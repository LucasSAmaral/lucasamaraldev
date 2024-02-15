import InfoCardComponent from '@/app/components/Info-Card.component';
import styled from 'styled-components';
import { WorkExperienceLocaleType } from '../page';
import { ModalComponent } from '@/app/components/modal/Modal.context';
import { Column, Wrapper } from '@/app/styles/styles';

const MobileWorkExperience: React.FC<{
  openModal: (component: ModalComponent) => void;
  workExperienceLocale: WorkExperienceLocaleType;
}> = ({ openModal, workExperienceLocale }) => {
  return (
    <MobileWrapper>
      <MobileColumn>
        <InfoCard
          onClick={() =>
            openModal(
              <>
                <h1>Americanas S.A.</h1>
              </>,
            )
          }
        >
          <p>{workExperienceLocale.company1.periodWorked}</p>
          <h3>{workExperienceLocale.company1.companyName}</h3>
          <p>{workExperienceLocale.company1.function}</p>
        </InfoCard>
        <InfoCard
          onClick={() =>
            openModal(
              <>
                <h1>MJV Technology & Innovation</h1>
              </>,
            )
          }
        >
          <p>{workExperienceLocale.company2.periodWorked}</p>
          <h3>{workExperienceLocale.company2.companyName}</h3>
          <p>{workExperienceLocale.company2.function}</p>
        </InfoCard>
        <InfoCard
          onClick={() =>
            openModal(
              <>
                <h1>GRITO.cc</h1>
              </>,
            )
          }
        >
          <p>{workExperienceLocale.company3.periodWorked}</p>
          <h3>{workExperienceLocale.company3.companyName}</h3>
          <p>{workExperienceLocale.company3.function}</p>
        </InfoCard>
        <InfoCard
          onClick={() =>
            openModal(
              <>
                <h1>Agência Amo</h1>
              </>,
            )
          }
        >
          <p>{workExperienceLocale.company4.periodWorked}</p>
          <h3>{workExperienceLocale.company4.companyName}</h3>
          <p>{workExperienceLocale.company4.function}</p>
        </InfoCard>
      </MobileColumn>
    </MobileWrapper>
  );
};

const MobileWrapper = styled(Wrapper)`
  @media (min-width: 865px) {
    display: none;
  }
`;

const InfoCard = styled(InfoCardComponent)`
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const MobileColumn = styled(Column)``;

export default MobileWorkExperience;
