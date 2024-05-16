import { Rules } from './components/Input.component';

export const buildContactFormRules = (fieldName: string, errorMessage: string): Rules => {
  const required = errorMessage.replace('{fieldName}', fieldName);
  return { required };
};
