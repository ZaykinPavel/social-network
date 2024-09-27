import { useQuery } from "@tanstack/react-query"
import { fetchMe } from "../../api/User"
import { Loader } from "../Loader";
import { AuthForm } from "../AuthForm";
import { PostForm } from "../PostForm";
import { queryClient } from "../../api/QueryClient";

// создаем компонент. который с помощью хука useQuery будет вызывать метод fetchMe,
// получающий текущего пользователя, если он авторизован
export const Account = () => {
    const meQuery = useQuery({
        queryFn: () => fetchMe(),
        queryKey: ['users', 'me'],
    }, queryClient);

    switch(meQuery.status) {
        case 'pending':
            return <Loader />;

        case 'error':
            return <AuthForm />;

        case 'success':
            return <PostForm />;
    }
}