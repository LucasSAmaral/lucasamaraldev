'use client';
import DeskWorkExperience from './components/Desk.component';
import MobileWorkExperience from './components/Mobile.component';

export type CompanyOption = 'company1' | 'company2' | 'company3' | 'company4';

const WorkExperience = () => {
  return (
    <>
      <DeskWorkExperience />
      <MobileWorkExperience />
    </>
  );
};

export default WorkExperience;
