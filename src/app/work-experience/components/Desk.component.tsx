import InfoCardComponent from '@/app/components/Info-Card.component';
import styled from 'styled-components';
import { WorkExperienceLocaleType } from '../page';
import { ModalComponent } from '@/app/components/modal/Modal.context';
import { Column, Wrapper } from '@/app/styles/styles';

const DeskWorkExperience: React.FC<{
  openModal: (component: ModalComponent) => void;
  workExperienceLocale: WorkExperienceLocaleType;
}> = ({ openModal, workExperienceLocale }) => {
  return (
    <DeskWrapper>
      <DeskColumn>
        <InfoCard
          left
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
          left
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
      </DeskColumn>
      <DeskColumn>
        <InfoCard
          right
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
          right
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
      </DeskColumn>
    </DeskWrapper>
  );
};

const DeskWrapper = styled(Wrapper)`
  @media (max-width: 864px) {
    display: none;
  }
`;

const InfoCard = styled(InfoCardComponent)``;

const DeskColumn = styled(Column)`
  &:first-child {
    border-right: 5px solid #843235;
  }

  ${InfoCard}:last-child {
    margin-top: 35px;
  }

  &:last-child {
    ${InfoCard}:first-child {
      margin-top: 70px;
    }
  }
`;

export default DeskWorkExperience;
