'use client';
// import type { Metadata } from 'next';
import { useMutation } from '@tanstack/react-query';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import styled from 'styled-components';
import InputComponent from './components/Input.component';

export type FormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

// export const metadata: Metadata = {
//   title: 'Contato',
//   description: 'Entre em contato comigo',
// };

const Contact: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const { mutate: sendEmail } = useMutation({
    mutationFn: async (formValues: FormValues) => {
      await axios.post('https://api.emailjs.com/api/v1.0/email/send-form', formValues);
    },
  });

  const onSubmit = handleSubmit(formValues => {
    // sendEmail(formValues);
    console.log('valores', formValues);
  });
  return (
    <Form onSubmit={onSubmit}>
      <InputComponent name="name" control={control} errors={errors} />
      <InputComponent name="email" control={control} errors={errors} />
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
