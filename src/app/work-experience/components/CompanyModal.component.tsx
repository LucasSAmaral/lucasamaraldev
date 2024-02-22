import styled from 'styled-components';
import { CompanyOption } from '../page';
import config from '../../../../generated-config.json';

const { locale } = config;

const CompanyModalComponent: React.FC<{ companyOption: CompanyOption }> = ({ companyOption }) => {
  const workExperienceLocale = locale['pt-br'].workExperience;

  return (
    <CompanyModalWrapper>
      <h3>
        <strong>{workExperienceLocale.modalCommonTitle.companyName}</strong>
        {workExperienceLocale[companyOption].companyName}
      </h3>

      <p>
        <strong>{workExperienceLocale.modalCommonTitle.periodWorked}</strong>{' '}
        {workExperienceLocale[companyOption].periodWorked}
      </p>

      <p>
        <strong>{workExperienceLocale.modalCommonTitle.function}</strong>{' '}
        {workExperienceLocale[companyOption].function}
      </p>

      <WorkDescriptionWrapper>
        <h4>
          <strong>{workExperienceLocale.modalCommonTitle.workDescription}</strong>{' '}
        </h4>
        <WorkDescriptionTextContainer
          dangerouslySetInnerHTML={{
            __html: workExperienceLocale[companyOption].modal.text.workDescription,
          }}
        />
      </WorkDescriptionWrapper>

      <p>
        <strong>{workExperienceLocale.modalCommonTitle.technicalSkills}</strong>{' '}
        {workExperienceLocale[companyOption].modal.text.technicalSkills}
      </p>
    </CompanyModalWrapper>
  );
};

const CompanyModalWrapper = styled.div`
  padding: 20px;

  h3 {
    font-weight: normal;
    margin-bottom: 20px;
  }

  p {
    margin-bottom: 10px;
  }
`;

const WorkDescriptionWrapper = styled.div`
  margin-bottom: 20px;

  h4 {
    margin-top: 20px;
    margin-bottom: 10px;
  }
`;

const WorkDescriptionTextContainer = styled.div`
  text-align: justify;
`;

export default CompanyModalComponent;
