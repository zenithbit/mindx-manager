import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { Button, Input } from 'antd';
import * as yup from 'yup';
import { useHookMessage } from '@/utils/hooks/message';
import { useResetPassword } from '@/utils/hooks';
import AuthLayout from '@/layouts/auth';
import styles from '@/styles/auth/ResetPassword.module.scss';

const validationSchema = yup.object({
    password: yup.string().min(8, 'Tối thiếu 8 ký tự').required('Bạn cần nhập mật khẩu!'),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'Mật khẩu không khớp').required('Bạn cần xác nhận mật khẩu!'),
})
const ResetPassword = () => {
    const router = useRouter();
    const message = useHookMessage();
    const resetPassword = useResetPassword();
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            password: '',
            confirmPassword: ''
        },
        validationSchema,
        onSubmit(values) {
            resetPassword.query({
                body: {
                    type: "FORGOT_PASSWORD",
                    otp: router.query.otp as string,
                    password: values.password
                },
                params: [router.query?.id as string]
            })
        },
    });
    useEffect(() => {
        if (resetPassword.data.response) {
            message.open({
                content: resetPassword.data.response.message as string,
                type: resetPassword.data.success ? 'success' : 'error'
            });
            if (resetPassword.data.success) {
                router.push('/auth/login');
                message.close();
            }
            resetPassword.clear?.();
        }
    }, [resetPassword.data])

    return (
        <div className={styles.container_reset_password}>
            {
                !router.query.otp || !router.query.id ? <h5>Không hợp lệ</h5> :
                    <div>
                        <h5>Đổi mật khẩu</h5>
                        <p>Hãy tạo mật khẩu mới và đừng quên bạn nhé</p>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className={styles.mb_24}>
                                <Form.Label className={styles.fs_12}>
                                    <span>Mật khẩu mới <span className="field_required">*</span></span>
                                </Form.Label>
                                <Input.Password name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} placeholder="Nhập mật khẩu mới" size="large" className={styles.input} />
                                {errors.password && touched.password && <p className="error">{errors.password}</p>}
                            </Form.Group>
                            <Form.Group className={styles.mb_24}>
                                <Form.Label className={styles.fs_12}>
                                    <span>Xác nhận mật khẩu <span className="field_required">*</span></span>
                                </Form.Label>
                                <Input.Password name="confirmPassword" value={values.confirmPassword} onChange={handleChange} onBlur={handleBlur} placeholder="Xác nhận mật khẩu" size="large" className={styles.input} />
                                {errors.confirmPassword && touched.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
                            </Form.Group>
                            <Button
                                loading={resetPassword.data.isLoading}
                                htmlType="submit"
                                className="btn_base"
                            >
                                Xác nhận
                            </Button>
                        </Form>
                    </div>
            }
        </div>
    )
}

export default ResetPassword;
ResetPassword.Layout = AuthLayout;