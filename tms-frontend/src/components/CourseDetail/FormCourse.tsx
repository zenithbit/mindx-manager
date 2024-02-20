import React, { useEffect } from 'react';
import { Button, Checkbox, Input } from 'antd';
import { Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Obj } from '@/global/interface';
import { useCreateCourse, useUpdateCourse } from '@/utils/hooks';
import { useHookMessage } from '@/utils/hooks/message';
import CropImage from '../CropImage';
import styles from '@/styles/course/ManagerCourse.module.scss';

const validationSchema = yup.object({
    courseTitle: yup.string().required('Bạn cần cung cấp tiêu đề khoá học!'),
    courseDescription: yup.string().required('Bạn cần mô tả khoá học!'),
    courseName: yup.string().required('Bạn cần cung cấp tên khoá học!'),
    color: yup.string().required('Bạn cần tạo màu chủ đạo cho khoá học!')
});
interface Props {
    currentCourse?: Obj;
    isCreate?: boolean;
}
const UpdateCourse = (props: Props) => {
    const updateCourse = useUpdateCourse();
    const createCourse = useCreateCourse();
    const currentCourse = props.currentCourse;
    const message = useHookMessage();
    const { values, touched, errors, setValues, handleBlur, handleChange, handleReset, handleSubmit, setFieldValue } = useFormik({
        initialValues: currentCourse ?? {},
        validationSchema,
        onSubmit(values) {
            const mapValues = {
                ...values
            }
            delete mapValues._id;
            const formData = new FormData();
            for (const key in mapValues) {
                if (key === "courseLevel") {
                    mapValues[key] = JSON.stringify(mapValues[key]);
                }
                formData.append(`${key}`, mapValues[key]);
            }
            if (!props.isCreate) {
                updateCourse.query(formData, currentCourse?._id as string);
            } else {
                createCourse.query({
                    body: formData,
                    headers:{
                        "Content-Type":"mutilpart/form-data"
                    }
                });
            }
        }
    });

    useEffect(() => {
        if (Object.keys(values).length === 0) {
            if (currentCourse) {
                setValues(currentCourse);
            }
        }
    }, []);
    useEffect(() => {
        if (updateCourse.data.response || createCourse.data.response) {
            message.open({
                content: updateCourse.data.response?.message as string ?? createCourse.data.response?.message as string,
                type: (updateCourse.data.success || createCourse.data.success) ? 'success' : 'error'
            });
            if (updateCourse.data.response) {
                updateCourse.clear?.();
            }
            if (createCourse.data.response) {
                createCourse.clear?.();
            }
            message.close();
        }
    }, [updateCourse.data, createCourse.data]);
    return (
        <div className={styles.contentUdpateCourse}>
            <Form className={styles.form} onSubmit={handleSubmit}>
                <Form.Group className={styles.itemForm}>
                    <Form.Label>Link ảnh:</Form.Label>
                    {/* <Input size="small" maxLength={100} name="courseImage" value={values.courseImage} onChange={handleChange} onBlur={handleBlur} /> */}
                    <CropImage src={values.courseImage as string} onCropped={(blobFile) => {
                        setFieldValue("fileImage", blobFile);
                    }} />
                </Form.Group>
                <Form.Group className={styles.itemForm}>
                    <Form.Label>Trạng thái:</Form.Label>
                    <Checkbox.Group value={values.active ? ['ACTIVE'] : []} onChange={(checkedValue) => {
                        setFieldValue('active', checkedValue.includes('ACTIVE'));
                    }}>
                        <Checkbox style={{ marginLeft: '0.4rem' }} value={'ACTIVE'}>Active</Checkbox>
                    </Checkbox.Group>
                </Form.Group>
                <Form.Group className={styles.itemForm}>
                    <Form.Label>Tiêu đề khoá học<span className='error'>*</span> (Tối đa 100 ký tự):</Form.Label>
                    <Input size="small" maxLength={100} name="courseTitle" value={values.courseTitle} onChange={handleChange} onBlur={handleBlur} />
                    {touched.courseTitle && errors.courseTitle && <p className="error">{errors.courseTitle as string}</p>}
                </Form.Group>
                <Form.Group className={styles.itemForm}>
                    <Form.Label>Mô tả<span className='error'>*</span> (Tối đa 100 ký tự):</Form.Label>
                    <Input size="small" maxLength={100} name="courseDescription" value={values.courseDescription} onChange={handleChange} onBlur={handleBlur} />
                    {touched.courseDescription && errors.courseDescription && <p className="error">{errors.courseDescription as string}</p>}
                </Form.Group>
                <Form.Group className={styles.itemForm}>
                    <Form.Label>Tên khoá học<span className='error'>*</span>:</Form.Label>
                    <Input size="small" name="courseName" value={values.courseName} onChange={handleChange} onBlur={handleBlur} />
                    {touched.courseName && errors.courseName && <p className="error">{errors.courseName as string}</p>}
                </Form.Group>
                <Form.Group className={styles.itemForm}>
                    <Form.Label>Màu chủ đạo<span className='error'>*</span>:</Form.Label>
                    <br />
                    <Input size="small" type="color" style={{ width: '5rem' }} name="color" value={values.color} onChange={handleChange} onBlur={handleBlur} />
                    {touched.color && errors.color && <p className="error">{errors.color as string}</p>}
                </Form.Group>
                <Form.Group className={styles.itemForm}>
                    <Form.Label>Syllabus:</Form.Label>
                    <Input size="small" name="syllabus" value={values.syllabus} onChange={handleChange} onBlur={handleBlur} />
                </Form.Group>
                <div className={styles.btnAction}>
                    <Button onClick={handleReset} disabled={updateCourse.data.isLoading || createCourse.data.isLoading}>Reset</Button>
                    <Button htmlType="submit" loading={updateCourse.data.isLoading || createCourse.data.isLoading}>{!props.isCreate ? 'Cập nhật' : 'Tạo'}</Button>
                </div>
            </Form>
        </div>
    )
}

export default UpdateCourse;