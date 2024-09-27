/**В этом модуле содержатся функции и методы работы с данными пользователей */
import { z } from 'zod';
import { validateResponse } from './ValidateResponse';

export const UserSchema = z.object({
    id: z.string(),
    username: z.string(),
});

export type User = z.infer<typeof UserSchema>;

export function fetchUser(id: string): Promise<User> {
    return fetch(`/api/users/${id}`)
        .then((response) => response.json())
        .then((data) => UserSchema.parse(data));
}

// функция, которая будет регистрировать нового пользователя
// функция fetch в качестве второго аргумента принимает параметры запроса
// POST запросы могут содержать некоторые данные в своем теле, в отличии от GET запросов
// В конце пишем конструкцию .then(() => undefined);, т.к. нам не надо получать от сервера никаких данных
export function registerUser(username: string, password: string): Promise<void> {
    return fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    }).then(() => undefined);
}

// функция для входа уже зарегистрированного пользователя
export function login(username: string, password: string): Promise<void> {
    // 1. Сначала отправляем запрос по необходимому адресу
    // 2. Проверяем, что в результате ответа сервер не вернул ошибок
    // 3. И возвращаем пустые данные, т.к. при логине нам и не надо получать от сервера никакие данные
    return fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
        .then(validateResponse)
        .then(() => undefined);
}

// функция, которая позволяет пользователю получить самого себя с ответом от сервера
export function fetchMe(): Promise<User> {
    return fetch('/api/users/me')
        .then(validateResponse)
        .then(response => response.json())
        .then(data => UserSchema.parse(data));
}
