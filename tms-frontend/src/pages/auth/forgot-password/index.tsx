import React from 'react';
import dynamic from 'next/dynamic';
import AuthLayout from '@/layouts/auth';
import Loading from '@/components/loading';

const ComponentForgotPassword = dynamic(() => import('@/components/forgot-password'), {
    ssr: false,
    loading: () => <Loading />
});
const ForgotPassword = () => {
    return (
        <ComponentForgotPassword />
    )
}

export default ForgotPassword;
ForgotPassword.Layout = AuthLayout