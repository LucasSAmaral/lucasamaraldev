'use client';

import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import styled, { css } from 'styled-components';
import InputComponent from './components/Input.component';
import CONFIG from '../../../generated-config.json';
import { useContext, useEffect } from 'react';
import { LanguageOptionsContext } from '../components/language-options/LanguageOptions.context';
import { sendEmailValues } from './actions';
import Link from 'next/link';
import { useModal } from '../components/modal/Modal.context';
import { buildContactFormRules } from './helpers';
import Image from 'next/image';
import LoadingIcon from '../../assets/loading-icon.gif';

export type FormValues = {
  fromName: string;
  replyTo: string;
  subject: string;
  message: string;
};

type Field = keyof FormValues | 'root.${string}' | 'root';

type FieldList = Field[];

const fieldList: FieldList = ['fromName', 'replyTo', 'subject', 'message'];

const {
  locale: {
    commonLocale: {
      contact: {
        form: {
          success: { buttonText: successButtonText },
        },
      },
    },
    ...LOCALE
  },
} = CONFIG;

const Contact: React.FC = () => {
  const {
    control,
    handleSubmit,
    getValues,
    setError,
    getFieldState,
    formState: { errors },
  } = useForm<FormValues>();

  const {
    languageOptionsState: { selectedLanguage },
  } = useContext(LanguageOptionsContext);

  const {
    openModal,
    closeModal,
    modalState: { modalStatus },
  } = useModal();

  const {
    contact: {
      form: {
        labels,
        sendButtonText,
        sendingButtonText,
        error: { message: errorMessage },
        modal: {
          success: { title: successTitle, text: successText },
          error: { title: errorTitle, text: errorText, buttonText: errorButtonText },
        },
      },
    },
  } = LOCALE[selectedLanguage];

  useEffect(() => {
    fieldList.map(field => {
      const { error } = getFieldState(field as keyof FormValues);

      if (error && Object.keys(error).length > 0) {
        setError(field, {
          message: buildContactFormRules(labels[field as keyof FormValues], errorMessage)
            .required as string,
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLanguage]);

  const { mutate: sendEmail } = useMutation({
    mutationFn: sendEmailValues,
    onMutate: () => {
      openModal(
        <Wrapper>
          <Image src={LoadingIcon} width={30} alt="ícone de loading" loading='lazy'/>
          <h2>{sendingButtonText}</h2>
        </Wrapper>,
        { wrapperClassName: 'sending-message' },
      );
    },
    onSuccess: () => {
      if (modalStatus === 'OPENED') {
        closeModal();
      }
      openModal(
        <Wrapper>
          <h2>{successTitle}</h2>
          <p>{successText}</p>
          <ButtonLink href="/">{successButtonText}</ButtonLink>
        </Wrapper>,
        { wrapperClassName: 'sent-message' },
      );
    },
    onError: () => {
      if (modalStatus === 'OPENED') {
        closeModal();
      }
      const formValues = getValues();
      openModal(
        <Wrapper>
          <h2>{errorTitle}</h2>
          <p>{errorText}</p>
          <Button onClick={() => sendEmail(formValues)}>{errorButtonText}</Button>
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
      {fieldList.map((Field, index) => (
        <InputComponent
          key={`${Field}-${index}`}
          name={Field as keyof FormValues}
          type={Field === 'replyTo' ? 'email' : undefined}
          labels={labels}
          control={control}
          errors={errors}
          rules={buildContactFormRules(labels[Field as keyof FormValues], errorMessage)}
          useTextArea={Field === 'message'}
        />
      ))}
      <Button data-cy="send-button" type="submit">
        {sendButtonText}
      </Button>
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

const LoadingWrapper = styled.div`
  img {
    width: 10px;
    margin-bottom: 0;
    margin-left: 5px;
  }
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
