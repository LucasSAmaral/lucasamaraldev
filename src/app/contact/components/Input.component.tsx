'use client';

import styled, { css } from 'styled-components';
import { breakpoints, colors, radii, transitions } from '@/app/styles/theme';
import { Control, Controller, FieldErrors, RegisterOptions } from 'react-hook-form';
import { FormValues } from '../page';
import { HTMLInputTypeAttribute } from 'react';

type Labels = { [K in keyof FormValues]: string };

export type Rules = Omit<
  RegisterOptions<FormValues, keyof FormValues>,
  'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
>;

type InputComponentProps = {
  name: keyof FormValues;
  labels: Labels;
  placeholders: Labels;
  control: Control<FormValues, any>;
  errors: FieldErrors<FormValues>;
  type?: HTMLInputTypeAttribute;
  rules?: Rules;
  useTextArea?: boolean;
  fullWidth?: boolean;
};

const InputComponent: React.FC<InputComponentProps> = ({
  name,
  labels,
  placeholders,
  control,
  errors,
  type = 'text',
  rules,
  useTextArea = false,
  fullWidth = false,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { name, onChange, onBlur, value } }) => {
        const error = errors[name];
        const errorId = `${name}-error`;

        const fieldProps = {
          name,
          'aria-invalid': error ? true : undefined,
          'aria-describedby': error ? errorId : undefined,
          id: name,
          placeholder: placeholders[name],
          onBlur,
          onChange,
          value: value ?? '',
        };

        return (
          <Wrapper id={`${name}-wrapper`} $fullWidth={fullWidth} $hasError={!!error}>
            <Label htmlFor={name}>{labels[name]}</Label>
            {useTextArea ? (
              <TextArea {...fieldProps} rows={6} />
            ) : (
              <Input {...fieldProps} type={type} />
            )}
            {error && <ErrorMessage id={errorId}>{error.message}</ErrorMessage>}
          </Wrapper>
        );
      }}
    />
  );
};

const fieldStyle = css`
  width: 100%;
  padding: 0 14px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: ${radii.sm};
  background-color: ${colors.background};
  color: ${colors.text};
  font: inherit;
  font-size: 15px;
  transition:
    border-color ${transitions.fast},
    outline-color ${transitions.fast};

  &::placeholder {
    color: #6f7888;
  }

  &:hover {
    border-color: rgba(255, 255, 255, 0.24);
  }

  &:focus,
  &:focus-visible {
    border-color: ${colors.accent};
    outline: 3px solid ${colors.accentSoft};
    outline-offset: 0;
  }
`;

const Input = styled.input`
  ${fieldStyle}
  height: 48px;
`;

const TextArea = styled.textarea`
  ${fieldStyle}
  padding: 12px 14px;
  resize: vertical;
`;

const Wrapper = styled.div<{ $fullWidth: boolean; $hasError: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
  text-align: left;

  ${({ $hasError }) =>
    $hasError &&
    css`
      ${Input}, ${TextArea} {
        border-color: ${colors.error};
      }

      ${Input}:focus, ${TextArea}:focus {
        outline-color: rgba(224, 121, 107, 0.2);
      }
    `}

  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      grid-column: 1 / -1;
    `}

  @media (max-width: ${breakpoints.columns}px) {
    grid-column: 1 / -1;
  }
`;

const Label = styled.label`
  color: #c3c9d4;
  font-size: 14px;
  font-weight: 500;
`;

const ErrorMessage = styled.span`
  color: ${colors.errorText};
  font-size: 13px;
`;

export default InputComponent;
