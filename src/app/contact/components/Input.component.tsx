'use client';

import styled, { css } from 'styled-components';
import { breakpoints, colors, radii } from '@/app/styles/theme';
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
        const fieldProps = {
          name,
          id: name,
          placeholder: placeholders[name],
          onBlur,
          onChange,
          value: value ?? '',
        };

        return (
          <Wrapper id={`${name}-wrapper`} $fullWidth={fullWidth}>
            <Label htmlFor={name}>{labels[name]}</Label>
            {useTextArea ? (
              <TextArea {...fieldProps} rows={6} />
            ) : (
              <Input {...fieldProps} type={type} />
            )}
            {errors[name] && <ErrorMessage>{errors[name]?.message}</ErrorMessage>}
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

  &::placeholder {
    color: #6f7888;
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

const Wrapper = styled.div<{ $fullWidth: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
  text-align: left;

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
