'use client';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import styled from 'styled-components';
import InputComponent from './components/Input.component';

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

const Contact: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const { mutate: sendEmail, status } = useMutation({
    mutationFn: async (emailValues: EmailValues) => {
      await axios.post('https://api.emailjs.com/api/v1.0/email/send', emailValues);
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
      <InputComponent name="fromName" control={control} errors={errors} />
      <InputComponent name="replyTo" control={control} errors={errors} />
      <InputComponent name="subject" control={control} errors={errors} />
      <InputComponent name="message" control={control} errors={errors} useTextArea />
      <Button type="submit">Enviar</Button>
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
