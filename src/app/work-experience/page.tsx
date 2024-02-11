'use client';
import styled from 'styled-components';
import InfoCardComponent from '../components/Info-Card.component';
import { useModal } from '../components/modal/Modal.context';
import config from '../../../generated-config.json';

const { locale } = config;

const WorkExperience = () => {
  const workExperienceLocale = locale['pt-br'].workExperience;

  const { openModal } = useModal();

  return (
    <Wrapper>
      <Column>
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
      </Column>
      <Column>
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
      </Column>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const InfoCard = styled(InfoCardComponent)``;

const Column = styled.div`
  padding: 40px 20px;
  position: relative;
  border-right: 5px solid #843235;

  ${InfoCard}:last-child {
    margin-top: 35px;
  }

  &:last-child {
    border: none;

    ${InfoCard}:first-child {
      margin-top: 70px;
    }
  }
`;

export default WorkExperience;
