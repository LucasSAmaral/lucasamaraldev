import axios from 'axios';
import CONFIG from '../../../../generated-config.json';
import { NextResponse } from 'next/server';

const {
  appConfig: {
    contactPage: { emailJsUrl },
  },
} = CONFIG;

export async function POST(request: Request) {
  const formValues = await request.json();
  const emailValues = {
    service_id: process.env.SERVICE_ID ?? '',
    template_id: process.env.TEMPLATE_ID ?? '',
    user_id: process.env.USER_ID ?? '',
    template_params: {
      ...formValues,
    },
  };
  await axios.post(emailJsUrl, emailValues);

  return NextResponse.json({});
}
