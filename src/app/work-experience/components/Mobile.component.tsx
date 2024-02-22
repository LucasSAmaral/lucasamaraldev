import styled from 'styled-components';
import { Column, Wrapper } from '@/app/styles/styles';
import MobileCardComponent from './MobileCard.component';

const MobileWorkExperience = () => {
  return (
    <MobileWrapper>
      <MobileColumn>
        <MobileCardComponent />
      </MobileColumn>
    </MobileWrapper>
  );
};

const MobileWrapper = styled(Wrapper)`
  @media (min-width: 865px) {
    display: none;
  }
`;

const MobileColumn = styled(Column)``;

export default MobileWorkExperience;
