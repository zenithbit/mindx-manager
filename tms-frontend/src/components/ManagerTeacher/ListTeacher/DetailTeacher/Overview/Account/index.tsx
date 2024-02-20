import React from 'react';
import * as yup from 'yup';
import styles from '@/styles/teacher/DetailTeacher.module.scss';
import { useFormik } from 'formik';
import { Form } from 'react-bootstrap';
import { Button, Input } from 'antd';
import { useGetTeacherDetail } from '@/utils/hooks';
import { Obj } from '@/global/interface';

const validationSchema = yup.object({
    password: yup.string().min(8, 'Tối thiếu 8 ký tự').required('Bạn cần nhập mật khẩu!'),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'Mật khẩu không khớp').required('Bạn cần xác nhận mật khẩu!'),
})
const Account = () => {
    const crrTeacher = useGetTeacherDetail();
    const getCrrTeacher = crrTeacher.data.response as Obj;
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            password: '',
            confirmPassword: ''
        },
        validationSchema,
        onSubmit(values) {
        },
    });
    return (
        <Form className={styles.FormAccount} onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Email: {getCrrTeacher?.idAccount?.email as string}</Form.Label>
            </Form.Group>
            <Form.Group>
                <Form.Label>Mật khẩu <span className="field_required">*</span></Form.Label>
                <Input.Password name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} placeholder="Nhập mật khẩu mới" size="small" className={styles.input} />
                {errors.password && touched.password && <p className="error">{errors.password}</p>}
            </Form.Group>
            <Form.Group>
                <Form.Label>Xác nhận mật khẩu <span className="field_required">*</span></Form.Label>
                <Input.Password name="confirmPassword" value={values.confirmPassword} onChange={handleChange} onBlur={handleBlur} placeholder="Xác nhận mật khẩu" size="small" className={styles.input} />
                {errors.confirmPassword && touched.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
            </Form.Group>
            <div className={styles.btnAccount}>
                <Button htmlType="submit" size="small">Cập nhật</Button>
            </div>
        </Form>
    )
}

export default Account;