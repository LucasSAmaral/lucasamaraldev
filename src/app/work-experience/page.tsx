'use client';
import styled from 'styled-components';
import InfoCardComponent from '../components/Info-Card.component';
import { useModal } from '../components/modal/Modal.context';

const WorkExperience = () => {
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
          <p>Abril de 2019 - Agora</p>
          <h3>Americanas S.A.</h3>
          <p>Desenvolvedor Front-End</p>
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
          <p>Novembro de 2016 - Novembro de 2018</p>
          <h3>GRITO.cc</h3>
          <p>Desenvolvedor Front-End</p>
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
          <p>Dezembro de 2018 - Abril de 2019</p>
          <h3>MJV Technology & Innovation</h3>
          <p>Desenvolvedor Front-End</p>
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
          <p>Janeiro de 2015 - Outubro de 2016</p>
          <h3>Agência Amo</h3>
          <p>Desenvolvedor Front-End</p>
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
