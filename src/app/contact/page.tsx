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
import { MODAL_TITLE_ID } from '../components/modal/Modal.container';
import { buildContactFormRules } from './helpers';
import Image from 'next/image';
import LoadingIcon from '../../assets/loading-icon.gif';
import { breakpoints, colors, fonts, radii } from '@/app/styles/theme';
import { Eyebrow } from '../styles/styles';
import ContactShortcutsComponent from './components/ContactShortcuts.component';

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

  const contactLocale = LOCALE[selectedLanguage].contact;

  const {
    contact: {
      form: {
        labels,
        placeholders,
        sendButtonText,
        error: { message: errorMessage },
        modal: {
          success: { title: successTitle, text: successText },
          error: { title: errorTitle, text: errorText, buttonText: errorButtonText },
          loading: { title: loadingTitle, loadingImgAlt },
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
          <Image src={LoadingIcon} width={30} alt={loadingImgAlt} unoptimized />
          <h2 id={MODAL_TITLE_ID}>{loadingTitle}</h2>
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
          <h2 id={MODAL_TITLE_ID}>{successTitle}</h2>
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
          <h2 id={MODAL_TITLE_ID}>{errorTitle}</h2>
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
    <ContactLayout>
      <Intro>
        <Eyebrow>{contactLocale.eyebrow}</Eyebrow>
        <Title>{contactLocale.title}</Title>
        <IntroText>{contactLocale.intro}</IntroText>
        <ContactShortcutsComponent />
      </Intro>
      <Form onSubmit={onSubmit}>
        {fieldList.map((Field, index) => (
          <InputComponent
            key={`${Field}-${index}`}
            name={Field as keyof FormValues}
            type={Field === 'replyTo' ? 'email' : undefined}
            labels={labels}
            placeholders={placeholders}
            control={control}
            errors={errors}
            rules={buildContactFormRules(labels[Field as keyof FormValues], errorMessage)}
            useTextArea={Field === 'message'}
            fullWidth={Field === 'subject' || Field === 'message'}
          />
        ))}
        <Button data-cy="send-button" type="submit">
          {sendButtonText}
        </Button>
      </Form>
    </ContactLayout>
  );
};

const Wrapper = styled.div`
  img {
    margin-bottom: 10px;
  }

  h2 {
    margin-bottom: 10px;
  }
`;

const ContactLayout = styled.div`
  width: 100%;
  max-width: 1160px;
  margin: 0 auto;
  padding: 80px 48px;
  display: flex;
  flex-wrap: wrap;
  gap: 64px;
  text-align: left;

  @media (max-width: ${breakpoints.columns}px) {
    gap: 40px;
    padding: 36px 20px 48px;
  }
`;

const Intro = styled.section`
  flex: 1 1 380px;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 22px;

  @media (max-width: ${breakpoints.columns}px) {
    flex-basis: auto;
    gap: 18px;
  }
`;

const Title = styled.h1`
  font-family: ${fonts.heading};
  font-size: clamp(32px, 2.4vw + 14px, 48px);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
`;

const IntroText = styled.p`
  color: ${colors.textBody};
  font-size: 18px;
  line-height: 1.7;

  @media (max-width: ${breakpoints.columns}px) {
    font-size: 16px;
    line-height: 1.65;
  }
`;

const Form = styled.form`
  flex: 1 1 460px;
  min-width: 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-content: start;
  gap: 20px;
  padding: 36px;
  border: 1px solid ${colors.border};
  border-radius: ${radii.xl};
  background-color: ${colors.surface};

  @media (max-width: ${breakpoints.columns}px) {
    flex-basis: auto;
    grid-template-columns: minmax(0, 1fr);
    gap: 18px;
    padding: 24px 20px;
    border-radius: ${radii.lg};
  }

  > button[type='submit'] {
    grid-column: 1 / -1;
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
    border: 1px solid ${colors.borderStrong};
    padding: 8px 12px;
    cursor: pointer;
    background-color: ${colors.surface};
    color: ${colors.text};
  `;
};

export default Contact;
