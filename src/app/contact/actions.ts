'use server';

import axios from 'axios';
import CONFIG from '../../../generated-config.json';
import { FormValues } from './page';

const {
  appConfig: {
    contactPage: { emailJsUrl },
  },
} = CONFIG;

export async function sendEmailValues(formValues: FormValues) {
  try {
    const emailValues = {
      service_id: process.env.SERVICE_ID ?? '',
      template_id: process.env.TEMPLATE_ID ?? '',
      user_id: process.env.USER_ID ?? '',
      template_params: {
        ...formValues,
      },
    };

    if (process.env.NODE_ENV === 'development') {
      return;
    }

    await axios.post(emailJsUrl, emailValues);
  } catch (error) {
    console.error(error);
  }
}
