import React from 'react';
import dynamic from 'next/dynamic';
import AuthLayout from '@/layouts/auth';
import Loading from '@/components/loading';

const DynamicComponent = dynamic(() => import('@/components/login'), {
    ssr: false,
    loading: () => <Loading />
})
const LoginPage = () => {
    return (
        <DynamicComponent />
    )
}

export default LoginPage;
LoginPage.Layout = AuthLayout;