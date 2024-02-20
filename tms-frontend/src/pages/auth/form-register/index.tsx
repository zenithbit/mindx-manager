import React from 'react';
import dynamic from 'next/dynamic';
import AuthLayout from '@/layouts/auth';
import Loading from '@/components/loading';


const Register = dynamic(() => import('@/components/form-register'), {
    ssr: false,
    loading: () => <Loading />
})
const FormRegister = () => {
    return (
        <Register />
    )
}

export default FormRegister;
FormRegister.Layout = AuthLayout;