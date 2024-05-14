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

const { locale: LOCALE } = CONFIG;

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
    mutationFn: async (formValues: FormValues) => {
      await axios.post('/contact/api', formValues);
    },
    onSuccess: () => {
      alert('E-mail enviado.');
    },
    onError: () => {
      alert('Ocorreu algum imprevisto. Tente novamente');
    },
  });

  const onSubmit = handleSubmit((formValues: FormValues) => {
    sendEmail(formValues);
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
