import InfoCardComponent from '@/app/components/Info-Card.component';
import styled from 'styled-components';
import { Column, Wrapper } from '@/app/styles/styles';
import DeskCardComponent from './Desk-Card.component';

const DeskWorkExperience: React.FC<{}> = () => {
  return (
    <DeskWrapper>
      <DeskColumn>
        <DeskCardComponent cardPosition="left" />
      </DeskColumn>
      <DeskColumn>
        <DeskCardComponent cardPosition="right" />
      </DeskColumn>
    </DeskWrapper>
  );
};

const DeskWrapper = styled(Wrapper)`
  @media (max-width: 864px) {
    display: none;
  }
`;

export const InfoCardDesk = styled(InfoCardComponent)``;

const DeskColumn = styled(Column)`
  &:first-child {
    border-right: 5px solid #843235;
  }

  ${InfoCardDesk}:last-child {
    margin-top: 35px;
  }

  &:last-child {
    ${InfoCardDesk}:first-child {
      margin-top: 70px;
    }
  }
`;

export default DeskWorkExperience;
