import styled from 'styled-components';
import { Control, Controller, FieldError, FieldErrors } from 'react-hook-form';
import { FormValues } from '../page';

type InputComponentProps = {
  name: keyof FormValues;
  control: Control<FormValues, any>;
  errors: FieldErrors<FormValues>;
  useTextArea?: boolean;
};

const InputComponent: React.FC<InputComponentProps> = ({
  name,
  control,
  errors,
  useTextArea = false,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: 'Campo obrigatório' }}
      render={({ field: { name, onChange, onBlur, value } }) => (
        <Wrapper $fieldError={errors[name]}>
          <Label htmlFor={name}>{name}</Label>
          {useTextArea ? (
            <TextArea name={name} onBlur={onBlur} onChange={onChange} value={value} />
          ) : (
            <Input
              type={name === 'email' ? 'email' : 'text'}
              name={name}
              onBlur={onBlur}
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
  border-radius: 4px;
  padding: 8px 12px;
  border: none;
`;

const TextArea = styled.textarea`
  border-radius: 4px;
  padding: 8px 12px;
  border: none;
`;

const Wrapper = styled.div.attrs<{ $fieldError?: FieldError }>(props => ({
  $fieldError: props.$fieldError,
}))`
  display: flex;
  flex-direction: column;
  text-align: left;

  ${Input}, ${TextArea} {
    ${({ $fieldError }) => (!$fieldError ? 'margin-bottom: 27px;' : 'margin-bottom: 10px;')}
  }

  span {
    color: red;
    font-size: 14px;
  }
`;

const Label = styled.label`
  margin-bottom: 10px;
`;

export default InputComponent;