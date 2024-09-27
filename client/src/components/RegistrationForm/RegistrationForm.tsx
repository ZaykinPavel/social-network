import { FC, FormEventHandler, useState } from 'react';

import { FormField } from '../FormField';
import { Button } from '../Button';
import './RegistrationForm.css';
import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../../api/User';
import { queryClient } from '../../api/QueryClient';

export const RegistrationForm: FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const registerMutation = useMutation({
    mutationFn: () => registerUser(username, password)
  }, queryClient);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    // вызовем регитрации при отправке формы
    registerMutation.mutate();
  };

  return (
    <form className="registration-form" onSubmit={handleSubmit}>
      <FormField label="Имя пользователя">
        <input
          type="text"
          name="username"
          onChange={(event) => setUsername(event.target.value)}
          value={username}
        />
      </FormField>

      <FormField label="Пароль">
        <input
          type="password"
          name="password"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
        />
      </FormField>

      {registerMutation.error && <span>{registerMutation.error.message}</span>}

      <Button type="submit" title="Зарегистрироваться" isLoading={registerMutation.isPending}/>
    </form>
  );
};
