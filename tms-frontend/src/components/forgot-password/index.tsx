import React, { useEffect } from 'react';
import Link from 'next/link';
import { Button, Input } from 'antd';
import { Form } from 'react-bootstrap';
import { Obj } from '@/global/interface';
import { useRequestOtpRP } from '@/utils/hooks';
import { useHookMessage } from '@/utils/hooks/message';
import AuthLayout from '@/layouts/auth';
import styles from '@/styles/auth/ForgotPassword.module.scss';

const ForgotPassword = () => {
    const requestOtp = useRequestOtpRP();
    const message = useHookMessage();
    const handleSubmit: React.FormEventHandler<HTMLFormElement> | undefined = (e) => {
        e.preventDefault();
        const email = (e.target as Obj)['email']!.value as string;
        if (email) {
            requestOtp.query({
                query: {
                    email
                }
            });
        }
    }
    useEffect(() => {
        if (requestOtp.data.response) {
            message.open({
                content: requestOtp.data.response.message as string,
                type: requestOtp.data.success ? 'success' : 'error'
            });
            requestOtp.clear?.();
            message.close();
        }
    }, [requestOtp.data]);
    return (
        <div className={styles.container_forgot_password}>
            <div className={styles.main}>
                <h5>Lấy lại mật khẩu</h5>
                <p>Hãy để hệ thống giúp đỡ bạn nhé</p>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label className={styles.fs_12}>
                            <span>Email <span className="field_required">*</span></span>
                        </Form.Label>
                        <Input type="email" name="email" placeholder="Nhập email của bạn" size="large" className={styles.input} />
                    </Form.Group>
                    <Button
                        className={styles.btn_login}
                        htmlType="submit"
                        loading={requestOtp.data.isLoading}
                    >
                        Kiểm tra
                    </Button>
                    <div className={styles.form}>
                        <span className={styles.txt}>Đã có tài khoản?</span>
                        <Link href={'/auth/login'} className={styles.clr_base}>
                            <span className={styles.fw_600}>Đăng nhập</span>
                        </Link>
                    </div>
                </Form>
            </div>
        </div >
    )
}

export default ForgotPassword;
ForgotPassword.Layout = AuthLayout;