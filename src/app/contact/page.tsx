'use client';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import styled from 'styled-components';
import InputComponent from './components/Input.component';
import CONFIG from '../../../generated-config.json';
import { useContext } from 'react';
import { LanguageOptionsContext } from '../components/language-options/LanguageOptions.context';

export type FormValues = {
  fromName: string;
  replyTo: string;
  subject: string;
  message: string;
};

type EmailValues = {
  service_id: string;
  template_id: string;
  user_id: string;
  template_params: FormValues;
};

const {
  appConfig: {
    contactPage: { emailJsUrl },
  },
  locale: LOCALE,
} = CONFIG;

const Contact: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const {
    languageOptionsState: { selectedLanguage },
  } = useContext(LanguageOptionsContext);

  const {
    contact: {
      form: { labels, sendButtonText },
    },
  } = LOCALE[selectedLanguage];

  const { mutate: sendEmail, status: sendEmailStatus } = useMutation({
    mutationFn: async (emailValues: EmailValues) => {
      await axios.post(emailJsUrl, emailValues);
    },
    onSuccess: () => {
      alert('E-mail enviado.');
    },
    onError: () => {
      alert('Ocorreu algum imprevisto. Tente novamente');
    },
  });

  const onSubmit = handleSubmit((formValues: FormValues) => {
    const { fromName, replyTo, subject, message } = formValues;

    const emailValues = {
      service_id: process.env.NEXT_PUBLIC_SERVICE_ID ?? '',
      template_id: process.env.NEXT_PUBLIC_TEMPLATE_ID ?? '',
      user_id: process.env.NEXT_PUBLIC_USER_ID ?? '',
      template_params: {
        fromName,
        replyTo,
        subject,
        message,
      },
    };

    sendEmail(emailValues);
  });

  return (
    <Form onSubmit={onSubmit}>
      <InputComponent name="fromName" labels={labels} control={control} errors={errors} />
      <InputComponent name="replyTo" labels={labels} control={control} errors={errors} />
      <InputComponent name="subject" labels={labels} control={control} errors={errors} />
      <InputComponent
        name="message"
        labels={labels}
        control={control}
        errors={errors}
        useTextArea
      />
      <Button type="submit">{sendButtonText}</Button>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 380px;
  margin: 0 auto;
  gap: 10px;
`;

const Button = styled.button`
  width: 100%;
  max-width: 280px;
  margin: 0 auto;
  margin-top: 30px;
  border-radius: 4px;
  border: 1px solid #fffffe;
  padding: 8px 12px;
  cursor: pointer;
  background-color: #363b3f;
  color: #fffffe;
`;

export default Contact;
