import { fetchPostList } from '../../api/Post';
import { PostListView } from './PostListView';
import { Loader } from '../Loader';
import { useQuery } from '@tanstack/react-query';
import { queryClient } from '../../api/QueryClient';

export const FetchPostListView = () => {

    // хук возвращает результат запроса
    const postListQuery = useQuery({
        queryFn: () => fetchPostList(),
        queryKey:["posts"]
    }, queryClient);

    switch (postListQuery.status) {
        case 'pending':
            return <Loader />;
        case 'success':
            return <PostListView postList={postListQuery.data.list} />;
        case 'error':
            return (
                <div>
                    <span>Произошла ошибка:(</span>

                    <button onClick={ () => postListQuery.refetch() }>Повторить запрос</button>
                </div>
            );
    }
};
