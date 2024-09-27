import { FC, FormEventHandler, useState } from 'react';
import { useMutation } from '@tanstack/react-query'; // этот хук используется для отправки данных на сервер
import { FormField } from '../FormField';
import { Button } from '../Button';
import { login } from '../../api/User';
import './LoginForm.css';
import { queryClient } from '../../api/QueryClient';

export const LoginForm: FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // хук useMutation принимает на вход объект с конфигурацией и возвращает объект, с помощью которого можно узнать какие-то данные об отправке запроса, а также управлять этой отправкой
    // вторым аргументом в хук передаем queryClient
    // username и password хранятся внутри состояния (2 строчки кода выше)
    const loginMutation = useMutation(
        {
            mutationFn: () => login(username, password),
            onSuccess() {
                queryClient.invalidateQueries({queryKey: ['users', 'me']});
            }
        },
        queryClient
    );

    const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
    };

    return (
        <form className="login-form" onSubmit={handleSubmit}>
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

            {/* Если запрос завершен с ошибкой. то можно показывать ее в пользовательском интерфейсе */}
            {loginMutation.error && <span>{loginMutation.error.message}</span>}

            {/* С помощью метода .isPending можно узнать, что на текущий момент запрос отправляется и на 
            основании этого не давать пользователю отправлять другой запрос, пока текущий запрос не завершён*/}
            <Button type="submit" title="Войти" isLoading={loginMutation.isPending} />
        </form>
    );
};
