/**В этом модуле содержатся функции и методы работы с данными постов */
import { z } from 'zod';
import { useState, useEffect } from 'react';
import { validateResponse } from './ValidateResponse';

// создаем схему проверки данных
export const PostSchema = z.object({
    id: z.string(),
    text: z.string(),
    authorId: z.string(),
    createdAt: z.number(),
});

export type Post = z.infer<typeof PostSchema>;

export const PostList = z.array(PostSchema);

export type PostList = z.infer<typeof PostList>;

export const FetchPostListSchema = z.object({
    list: PostList,
});

type FetchPostListResponse = z.infer<typeof FetchPostListSchema>;

export function fetchPostList(): Promise<FetchPostListResponse> {
    return fetch('/api/posts')
        .then((response) => response.json())
        .then((data) => FetchPostListSchema.parse(data));
}

interface IdleRequestState {
    status: 'idle';
}

interface LoadingRequestState {
    status: 'pending';
}

interface SuccessRequestState {
    status: 'success';
    data: PostList;
}

interface ErrorRequestState {
    status: 'error';
    error: unknown;
}

type RequestState =
    | IdleRequestState
    | LoadingRequestState
    | SuccessRequestState
    | ErrorRequestState;

// напишем кастомный хук, который будет работать с состояниями
export function usePostList() {
    const [state, setState] = useState<RequestState>({ status: 'idle' });

    useEffect(() => {
        if (state.status === 'pending') {
            fetchPostList()
                .then((data) => {
                    setState({ status: 'success', data: data.list });
                })
                .catch((error) => {
                    setState({ status: 'error', error });
                });
        }
    }, [state]);

    useEffect(() => {
        // переводим хук в состояние загрузки
        setState({ status: 'pending' });
    }, []);

    // функция, которая будет повторять запрос в случае устаревания данных или в случае ошибки
    const refetch = () => {
        // переводим хук в состояние загрузки
        setState({ status: 'pending' });
    };

    // здесь мы возвращаем из хука текущее состояние и функцию для перезапроса данных
    return {
        state,
        refetch,
    };
}

// функция создания поста
// конструкция .then(() => undefined); используется т.к. нам не нужен результат запроса
export function createPost(text: string): Promise<void> {
    return fetch('api/posts', {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            text,
        }),
    }).then(validateResponse).then(() => undefined);
}