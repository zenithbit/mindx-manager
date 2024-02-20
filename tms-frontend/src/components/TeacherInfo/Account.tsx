import { Button, Input } from 'antd';
import React, { useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Obj } from '@/global/interface';
import useGetCrrUser from '@/utils/hooks/getUser';
import { useHookMessage } from '@/utils/hooks/message';
import { useResetPassword } from '@/utils/hooks';
import styles from '@/styles/teacher/TeacherInfo.module.scss';


const validationSchema = yup.object({
    password: yup.string().min(8, 'Tối thiếu 8 ký tự').required('Bạn cần nhập mật khẩu!'),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'Mật khẩu không khớp').required('Bạn cần xác nhận mật khẩu!'),
})
const Account = () => {
    const currentUser = useGetCrrUser()?.data as Obj;
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
                    password: values.password
                },
                params: [currentUser.idAccount._id as string]
            })
        },
    });
    useEffect(() => {
        if (resetPassword.data.response) {
            message.open({
                content: resetPassword.data.response.message as string,
                type: resetPassword.data.success ? 'success' : 'error'
            });
            message.close();
            resetPassword.clear?.();
        }
    }, [resetPassword.data])
    return (
        <Form className={styles.FormAccount} onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Email: {currentUser?.idAccount?.email as string}</Form.Label>
            </Form.Group>
            <Form.Group>
                <Form.Label>Mật khẩu <span className="field_required">*</span></Form.Label>
                <Input.Password name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} placeholder="Nhập mật khẩu mới" size="large" className={styles.input} />
                {errors.password && touched.password && <p className="error">{errors.password}</p>}
            </Form.Group>
            <Form.Group>
                <Form.Label>Xác nhận mật khẩu <span className="field_required">*</span></Form.Label>
                <Input.Password name="confirmPassword" value={values.confirmPassword} onChange={handleChange} onBlur={handleBlur} placeholder="Xác nhận mật khẩu" size="large" className={styles.input} />
                {errors.confirmPassword && touched.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
            </Form.Group>
            <div className={styles.btnAccount}>
                <Button htmlType="submit" loading={resetPassword.data.isLoading}>Cập nhật</Button>
            </div>
        </Form>
    )
}

export default Account;