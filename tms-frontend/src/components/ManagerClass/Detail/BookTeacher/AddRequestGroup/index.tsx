import React, { useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { Button } from 'antd';
import * as yup from 'yup';
import { useQueryBookTeacher } from '@/utils/hooks';
import { useHookMessage } from '@/utils/hooks/message';
import SelectLocation from '@/components/SelectLocation';
import styles from '@/styles/class/AddRequestGroup.module.scss';

interface Props {
    classId: string;
    closeModal: () => void;
    groupNumber: number;
}
const validationSchema = yup.object({
    groupNumber: yup.number().typeError('Thứ tự phải là số!').required('Bạn cần nhập thứ tự nhóm!'),
    locationId: yup.string().required('Bạn cần lựa chọn cơ sở!')
});
const AddRequestGroup = (props: Props) => {
    const { data, query, clear } = useQueryBookTeacher('ADD');
    const bookteacher = useQueryBookTeacher('GET');
    const message = useHookMessage();
    const { values, touched, errors, handleSubmit, handleChange, handleBlur, setFieldValue } = useFormik({
        initialValues: {
            groupNumber: props.groupNumber,
            locationId: '',
            textLocation: ''
        },
        validationSchema,
        onSubmit(values) {
            const listRequest = [
                {
                    classId: props.classId,
                    locationId: values.locationId,
                    groupNumber: Number(values.groupNumber)
                }
            ];
            query!(listRequest);
        }
    });
    useEffect(() => {
        if (data && data.response) {
            message.open({
                content: data?.response.message as string,
                type: data.success ? 'success' : 'error'
            }, 2000);
            if (data.success) {
                bookteacher.query?.(props.classId as string);
                props.closeModal();
            }
            message.close(2000, () => {
                clear?.();
            });
        }
    }, [data]);
    return (
        <div className={styles.containerAddRequestGroup}>
            <Form onSubmit={handleSubmit}>
                <Form.Group className={styles.mb_24}>
                    <Form.Label>Nhóm số: {props.groupNumber}</Form.Label>
                    {errors.groupNumber && touched.groupNumber && <p className='error'>{errors.groupNumber}</p>}
                </Form.Group>
                <Form.Group className={styles.mb_24}>
                    <Form.Label>Cơ sở: {values.textLocation}</Form.Label>
                    {errors.locationId && touched.locationId && <p className='error'>{errors.locationId}</p>}
                    <SelectLocation
                        title='Chọn'
                        onSelectLocation={(id, text) => {
                            setFieldValue('locationId', id);
                            setFieldValue('textLocation', text);
                        }}
                    />
                </Form.Group>
                <Button htmlType='submit' className={styles.btnAdd}>
                    Thêm
                </Button>
            </Form>
        </div>
    )
}

export default AddRequestGroup;