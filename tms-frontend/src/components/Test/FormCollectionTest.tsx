import React, { useEffect } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Button, Input } from 'antd';
import { useRouter } from 'next/router';
import { Form } from 'react-bootstrap';
import { useCreateCollectionQuiz, useListCollectionQuiz } from '@/utils/hooks';
import { useHookMessage } from '@/utils/hooks/message';
import styles from '@/styles/Test.module.scss';

interface Props {
    courseLevelId?: string;
    courseId?: string;
    isUpdate?: boolean;
}
const validationSchema = yup.object({
    title: yup.string().required('Chưa có tiêu đề!'),
});
const FormCollectionTest = (props: Props) => {
    const router = useRouter();
    const createCollectionQuiz = useCreateCollectionQuiz();
    const listCollectionQuiz = useListCollectionQuiz();
    const courseId = router.query.courseId as string;
    const courseLevelId = router.query.courseLevelId as string;
    const message = useHookMessage();
    const { values, touched, errors, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            title: '',
        },
        validationSchema,
        onSubmit(values) {
            const mapPaload = {
                courseId,
                levelId: courseLevelId,
                ...values
            };
            createCollectionQuiz.query({
                body: mapPaload
            });
        }
    });
    useEffect(() => {
        if (createCollectionQuiz.data.response) {
            message.open({
                content: createCollectionQuiz.data.response?.message as string,
                type: createCollectionQuiz.data.success ? 'success' : 'error'
            });
            if (createCollectionQuiz.data.success) {
                listCollectionQuiz.query({
                    query: {
                        courseId,
                        courseLevelId,
                    }
                });
            }
            createCollectionQuiz.clear?.();
            message.close();
        }
    }, [createCollectionQuiz.data.response])
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>
                    Tiêu đề <span className="error">*</span>
                </Form.Label>
                <Input size="small" name="title" value={values.title} onChange={handleChange} onBlur={handleBlur} />
                {errors.title && touched.title && <p className="error">{errors.title}</p>}
            </Form.Group>
            <Button htmlType="submit" style={{ float: 'right' }} size="small">{props.isUpdate ? 'Cập nhật' : 'Tạo'}</Button>
        </Form>
    )
}

export default FormCollectionTest;