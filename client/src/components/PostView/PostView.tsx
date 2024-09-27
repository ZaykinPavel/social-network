// компонент представляет собой отображение поста
import './PostView.css';
import { Post } from '../../api/Post';
// FC-представляет собой описание функционального компонента и принимает на вход в качестве
// своего аргумента тип props. С помощью него можно сократить описание типов для компонента
import { FC } from 'react';
import { FetchUserView } from '../UserView';

// функция получает число в миллисекундах и приводит его к формату даты
function formatDate(timestamp: number): string {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString(undefined, {
        timeStyle: 'medium',
    })}`;
}

interface PostViewProps {
    post: Post;
}

export const PostView: FC<PostViewProps> = ({ post }) => {
    return (
        <div className="post-view">
            <FetchUserView userId={post.authorId}/>

            <p className="post-view__text">{post.text}</p>

            <time className="post-view__time">{formatDate(post.createdAt)}</time>
        </div>
    );
};
