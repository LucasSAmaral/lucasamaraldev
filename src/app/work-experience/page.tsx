'use client';
import styled from 'styled-components';
import InfoCardComponent from '../components/Info-Card.component';
import { useModal } from '../components/modal/Modal.context';
import config from '../../../generated-config.json';

const WorkExperience = () => {
  const workExperienceLocale = config.locale['pt-br'].workExperience;

  const { openModal } = useModal();

  return (
    <Wrapper>
      <LeftColumn>
        <InfoCardComponent
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
        </InfoCardComponent>
        <Placeholder />
        <InfoCardComponent
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
        </InfoCardComponent>
      </LeftColumn>
      <RightColumn>
        <FirstPlaceholder />
        <InfoCardComponent
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
        </InfoCardComponent>
        <Placeholder />
        <InfoCardComponent
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
        </InfoCardComponent>
      </RightColumn>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const RightColumn = styled.div`
  padding: 40px 20px;
  position: relative;
`;

const LeftColumn = styled(RightColumn)`
  border-right: 5px solid #843235;
`;

const FirstPlaceholder = styled.div`
  height: 70px;
  width: 100%;
`;

const Placeholder = styled(FirstPlaceholder)`
  height: 35px;
`;

export default WorkExperience;
