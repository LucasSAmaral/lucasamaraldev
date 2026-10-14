import InfoCardComponent from '@/app/components/InfoCard.component';
import styled from 'styled-components';
import { Column, Wrapper } from '@/app/styles/styles';
import DeskCardComponent from './DeskCard.component';
import { colors } from '@/app/styles/theme';

const DeskWorkExperience = () => {
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
    border-right: 5px solid ${colors.accentLine};
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
