'use client';

import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import styled, { css } from 'styled-components';
import InputComponent from './components/Input.component';
import CONFIG from '../../../generated-config.json';
import { useContext } from 'react';
import { LanguageOptionsContext } from '../components/language-options/LanguageOptions.context';
import { sendEmailValues } from './actions';
import Link from 'next/link';
import { useModal } from '../components/modal/Modal.context';

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
    getValues,
    formState: { errors },
  } = useForm<FormValues>();

  const {
    languageOptionsState: { selectedLanguage },
  } = useContext(LanguageOptionsContext);

  const { openModal } = useModal();

  const {
    contact: {
      form: { labels, sendButtonText },
    },
  } = LOCALE[selectedLanguage];

  const { mutate: sendEmail } = useMutation({
    mutationFn: sendEmailValues,
    onSuccess: () => {
      openModal(
        <Wrapper>
          <h2>Mensagem enviada</h2>
          <p>Entraremos em contato em breve.</p>
          <ButtonLink href="/">Ok</ButtonLink>
        </Wrapper>,
        { wrapperClassName: 'sent-message' },
      );
    },
    onError: () => {
      const formValues = getValues();
      openModal(
        <Wrapper>
          <h2>Erro</h2>
          <p>Ocorreu um erro ao enviar a mensagem.</p>
          <Button onClick={() => sendEmail(formValues)}>Tentar novamente</Button>
        </Wrapper>,
        { wrapperClassName: 'error-message' },
      );
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

const Wrapper = styled.div`
  h2 {
    margin-bottom: 10px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 380px;
  margin: 0 auto;
  gap: 10px;

  #message-wrapper {
    margin-bottom: 0;
  }
`;

const ButtonLink = styled(Link)`
  ${() => ButtonStyle()}
  text-decoration: none;
  display: inline-block;
`;

const Button = styled.button`
  ${() => ButtonStyle()}
`;

const ButtonStyle = () => {
  return css`
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
};

export default Contact;
