'use client';
import styled from 'styled-components';
import config from '../../../generated-config.json';

const AboutMe: React.FC = () => {
  const aboutMeLocale = config.locale['pt-br'].aboutMe;

  return (
    <AboutMeWrapper>
      <p>{aboutMeLocale.paragraph1}</p>
      <p>{aboutMeLocale.paragraph2}</p>
      <p>{aboutMeLocale.paragraph3}</p>
    </AboutMeWrapper>
  );
};

const AboutMeWrapper = styled.div`
  text-align: center;
  p {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    text-align: justify;
    margin-top: 10px;
  }
`;

export default AboutMe;
