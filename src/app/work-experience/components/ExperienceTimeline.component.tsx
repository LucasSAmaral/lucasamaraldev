import styled from 'styled-components';
import { breakpoints, colors } from '@/app/styles/theme';
import config from '../../../../generated-config.json';
import { CompanyOption } from '../page';
import ExperienceCardComponent from './ExperienceCard.component';

const {
  appConfig: {
    workExperiencePage: { companies },
  },
} = config;

const ExperienceTimelineComponent: React.FC = () => {
  return (
    <Timeline>
      {(companies as CompanyOption[]).map(companyOption => (
        <TimelineItem key={companyOption}>
          <TimelineDot aria-hidden="true" />
          <ExperienceCardComponent companyOption={companyOption} />
        </TimelineItem>
      ))}
    </Timeline>
  );
};

// Medidas da linha e das bolinhas. A bolinha é posicionada a partir delas para ficar centralizada
// na linha: recua o padding do <ol> e metade da linha, depois metade da própria bolinha.
const LINE_WIDTH = 2;
const desktop = { indent: 36, dotSize: 14 };
const mobile = { indent: 22, dotSize: 12 };

const dotLeft = ({ indent, dotSize }: { indent: number; dotSize: number }) =>
  -(indent + LINE_WIDTH / 2 + dotSize / 2);

const Timeline = styled.ol`
  display: flex;
  flex-direction: column;
  gap: 28px;
  padding-left: ${desktop.indent}px;
  border-left: ${LINE_WIDTH}px solid ${colors.accentLine};
  list-style: none;

  @media (max-width: ${breakpoints.columns}px) {
    gap: 18px;
    padding-left: ${mobile.indent}px;
  }
`;

const TimelineItem = styled.li`
  position: relative;
`;

const TimelineDot = styled.span`
  position: absolute;
  top: 30px;
  left: ${dotLeft(desktop)}px;
  width: ${desktop.dotSize}px;
  height: ${desktop.dotSize}px;
  border: 3px solid ${colors.accent};
  border-radius: 50%;
  background-color: ${colors.background};

  @media (max-width: ${breakpoints.columns}px) {
    top: 24px;
    left: ${dotLeft(mobile)}px;
    width: ${mobile.dotSize}px;
    height: ${mobile.dotSize}px;
  }
`;

export default ExperienceTimelineComponent;
