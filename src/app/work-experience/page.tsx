'use client';
import { useModal } from '../components/modal/Modal.context';
import config from '../../../generated-config.json';
import DeskWorkExperience from './components/Desk.component';
import MobileWorkExperience from './components/Mobile.component';

const { locale } = config;

export type WorkExperienceLocaleType = (typeof locale)['pt-br']['workExperience'];

const WorkExperience = () => {
  const workExperienceLocale = locale['pt-br'].workExperience;

  const { openModal } = useModal();

  return (
    <>
      <DeskWorkExperience openModal={openModal} workExperienceLocale={workExperienceLocale} />
      <MobileWorkExperience openModal={openModal} workExperienceLocale={workExperienceLocale} />
    </>
  );
};

export default WorkExperience;
