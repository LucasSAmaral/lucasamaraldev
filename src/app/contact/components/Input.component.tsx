'use client';

import styled from 'styled-components';
import { Control, Controller, FieldError, FieldErrors, RegisterOptions } from 'react-hook-form';
import { FormValues } from '../page';
import { HTMLInputTypeAttribute, useState } from 'react';

type Labels = { [K in keyof FormValues]: string };

export type Rules = Omit<
  RegisterOptions<FormValues, keyof FormValues>,
  'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
>;

type InputComponentProps = {
  name: keyof FormValues;
  labels: Labels;
  control: Control<FormValues, any>;
  errors: FieldErrors<FormValues>;
  type?: HTMLInputTypeAttribute;
  rules?: Rules;
  useTextArea?: boolean;
};

const InputComponent: React.FC<InputComponentProps> = ({
  name,
  labels,
  control,
  errors,
  type = 'text',
  rules,
  useTextArea = false,
}) => {
  const [isInputFocused, updateInputFocused] = useState(false);
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { name, onChange, onBlur, value } }) => (
        <Wrapper id={`${name}-wrapper`} $fieldError={errors[name]}>
          <Label htmlFor={name} $isInputFocused={isInputFocused}>
            {labels[name]}
          </Label>
          {useTextArea ? (
            <TextArea
              name={name}
              id={name}
              onBlur={e => {
                if (e.target.value === '') {
                  updateInputFocused(false);
                }
                onBlur();
              }}
              onFocus={() => updateInputFocused(true)}
              onChange={onChange}
              value={value}
            />
          ) : (
            <Input
              type={type}
              name={name}
              id={name}
              onBlur={e => {
                if (e.target.value === '') {
                  updateInputFocused(false);
                }
                onBlur();
              }}
              onFocus={() => updateInputFocused(true)}
              onChange={onChange}
              value={value}
            />
          )}
          {errors[name] && <span>{errors[name]?.message}</span>}
        </Wrapper>
      )}
    />
  );
};

const Input = styled.input`
  height: 35px;
`;

const TextArea = styled.textarea`
  height: 70px;
`;

const Wrapper = styled.div.attrs<{ $fieldError?: FieldError }>(props => ({
  $fieldError: props.$fieldError,
}))`
  display: flex;
  flex-direction: column;
  text-align: left;
  position: relative;
  margin-bottom: 30px;

  ${Input}, ${TextArea} {
    ${({ $fieldError }) => (!$fieldError ? 'margin-bottom: 27px;' : 'margin-bottom: 10px;')}
    color: #fffffe;
    border-radius: 4px;
    padding: 8px 15px;
    border: none;
    outline: none;
    background-color: #363b3f;
  }

  span {
    color: #ff6262;
    font-size: 14px;
    margin-left: 15px;
  }
`;

const Label = styled.label.attrs<{ $isInputFocused: boolean }>(props => ({
  $isInputFocused: props.$isInputFocused,
}))`
  position: absolute;
  left: 15px;
  transition: 200ms;
  cursor: text;

  ${({ $isInputFocused }) => ($isInputFocused ? 'top: -27px' : 'top: 7px')}
`;

export default InputComponent;
