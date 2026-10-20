import config from '../../generated-config.json';

const {
  appConfig: {
    aboutMePage: { careerStartYear },
  },
} = config;

// Anos trabalhando com front-end, contados a partir do ano de início em app-config.json.
export const getYearsOfCareer = () => new Date().getFullYear() - careerStartYear;
