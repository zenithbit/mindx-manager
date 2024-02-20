import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Obj, State } from '@/global/interface';
import store, { RootState } from '@/store';
import { clearToken } from '@/store/reducers/auth-get-token.reducer';
import { clear, queryGetCrrUserInfo } from '@/store/reducers/user-info.reducer';
import { useHookMessage } from '../hooks/message';
import Loading from '@/components/loading';

interface Props {
    children: React.ReactElement;
}
// const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
const Auth = (props: Props) => {
    const [router, setRouter] = useState<Obj>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const message = useHookMessage();
    const { dispatch } = store;
    const crrUser = useSelector((state: RootState) => (state.crrUserInfo as State).state);

    useEffect(() => {
        setRouter(require('next/router'));
    }, [setRouter]);
    useEffect(() => {
        const access_token = localStorage.getItem('access_token');
        if (router) {
            if (access_token) {
                dispatch(queryGetCrrUserInfo());
            } else {
                localStorage.removeItem('access_token');
                router?.push('/auth/login');
            }
        }
    }, [router]);
    useEffect(() => {
        if (router) {
            if (crrUser.response && crrUser.response.message === 'token expired!') {
                localStorage.removeItem('access_token');
                message.open({
                    content: 'Hết hạn đăng nhập, vui lòng đăng nhập lại!',
                    type: 'error'
                });
                message.close();
                dispatch(clear());
                dispatch(clearToken());
                router.push('/auth/login');
            } else if (crrUser.response && crrUser.success) {
                setIsLoading(false);
            }
        }
    }, [router, crrUser]);
    if (isLoading) return <Loading isCenterScreen onFirstLoad />;
    return props.children;
};

export default Auth;
