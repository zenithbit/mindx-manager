import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import { Input, Button } from 'antd';
import { Obj, State } from '@/global/interface';
import { useHookMessage } from '@/utils/hooks/message';
import { AppDispatch, RootState } from '@/store';
import { clearToken, queryToken } from '@/store/reducers/auth-get-token.reducer';
import iconUserPrefix from '@/assets/svgs/icon-user-prefix.svg';
import iconPasswordPrefix from '@/assets/svgs/icon-password-prefix.svg';
import styles from '@/styles/auth/Login.module.scss';
import Image from 'next/image';

const validationSchema = yup.object({
    email: yup.string().email('Sai định dạng email!').required('Bạn chưa nhập email!'),
    password: yup.string().required('Bạn chưa nhập mật khẩu!'),
});
const Login = () => {
    const message = useHookMessage();
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const crrToken = useSelector((state: RootState) => (state.token as State).state);
    const { values, errors, touched, handleChange, handleSubmit, handleBlur } = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema,
        onSubmit() {
            dispatch(queryToken({
                payload: {
                    query: {
                        body: values
                    }
                }
            }))
        }
    });
    useEffect(() => {
        if (!crrToken.isLoading) {
            if (crrToken.response) {
                if (crrToken.response.status) {
                    localStorage.setItem('access_token', (`Bearer ${(crrToken.response as Obj)!.data.token as string} `));
                    router.push('/');
                } else {
                    message.open({
                        content: crrToken.response.message as string,
                        type: 'error'
                    });
                    dispatch(clearToken());
                }
            }
        }
    }, [crrToken, dispatch, message, router])

    return (
        <div className={styles.container_login}>
            <div className={styles.main}>
                <h5>Đăng nhập</h5>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className={styles.mb_24}>
                        <Input type="email" prefix={<Image src={iconUserPrefix} alt='' className={styles.iconPrefix} />} name="email" placeholder="Email" size="large" className={styles.input} onChange={handleChange} onBlur={handleBlur} />
                        {errors.email && touched.email && <p className="error">{errors.email}</p>}
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Input.Password name="password" prefix={<Image src={iconPasswordPrefix} alt='' className={styles.iconPrefix} />} placeholder="Password" size="large" className={styles.input} onChange={handleChange} onBlur={handleBlur} />
                        {errors.password && touched.password && <p className="error">{errors.password}</p>}
                        <Link href={'/auth/forgot-password'} className={styles.clr_base}>
                            <span className={styles.fw_600}>Quên mật khẩu?</span>
                        </Link>
                    </Form.Group>
                    <Button
                        className={styles.btn_login}
                        htmlType="submit"
                        loading={crrToken.isLoading}
                    >
                        Đăng nhập
                    </Button>
                </Form>
            </div>
        </div >
    )
}

export default Login;