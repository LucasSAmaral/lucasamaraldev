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

const Timeline = styled.ol`
  display: flex;
  flex-direction: column;
  gap: 28px;
  padding-left: 36px;
  border-left: 2px solid ${colors.accentLine};
  list-style: none;

  @media (max-width: ${breakpoints.columns}px) {
    gap: 18px;
    padding-left: 22px;
  }
`;

const TimelineItem = styled.li`
  position: relative;
`;

const TimelineDot = styled.span`
  position: absolute;
  top: 30px;
  left: -46px;
  width: 14px;
  height: 14px;
  border: 3px solid ${colors.accent};
  border-radius: 50%;
  background-color: ${colors.background};

  @media (max-width: ${breakpoints.columns}px) {
    top: 24px;
    left: -31px;
    width: 12px;
    height: 12px;
  }
`;

export default ExperienceTimelineComponent;
