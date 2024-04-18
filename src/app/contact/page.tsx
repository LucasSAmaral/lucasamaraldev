'use client';
// import type { Metadata } from 'next';
import { useMutation } from '@tanstack/react-query';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import axios from 'axios';

type FormValues = {
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

  console.log('errors', errors);

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
    <form onSubmit={onSubmit}>
      <Controller
        name="name"
        control={control}
        rules={{ required: 'Obrigatorio' }}
        render={({ field: { name, onChange, onBlur, value } }) => (
          <>
            <input type="text" name={name} onBlur={onBlur} onChange={onChange} value={value} />
            {errors[name] && <span>{errors[name]?.message}</span>}
          </>
        )}
      />
      <Controller
        name="email"
        control={control}
        rules={{ required: true }}
        render={({ field: { name, onChange, onBlur, value } }) => (
          <input type="text" name={name} onBlur={onBlur} onChange={onChange} value={value} />
        )}
      />
      <Controller
        name="subject"
        control={control}
        rules={{ required: true }}
        render={({ field: { name, onChange, onBlur, value } }) => (
          <input type="text" name={name} onBlur={onBlur} onChange={onChange} value={value} />
        )}
      />
      <Controller
        name="message"
        control={control}
        rules={{ required: true }}
        render={({ field: { name, onChange, onBlur, value } }) => (
          <input type="text" name={name} onBlur={onBlur} onChange={onChange} value={value} />
        )}
      />
      <button type="submit">CRICA</button>
    </form>
  );
};

export default Contact;
