import React from 'react';
import { Form } from 'react-bootstrap';
import { Button, Input, MenuProps } from 'antd';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Obj } from '@/global/interface';
import styles from '@/styles/Location.module.scss';
import { Region } from '@/global/enum';
import Dropdown from '@/components/Dropdown';
import { getLabelRegion } from '@/global/init';

interface Props {
    data?: Obj;
    handleSubmit?: (values: Obj) => void;
    loading?: boolean;
    isCreate?: boolean;
}
const validationSchema = yup.object({
    name: yup.string().required('Bạn cần nhập tên khu vực'),
    code: yup.string().required('Bạn cần nhập mã khu vực'),
    region: yup.string().required('Bạn cần chọn miền'),
})
const ModalArea = (props: Props) => {
    const { values, errors, touched, handleBlur, handleSubmit, handleChange, setFieldValue } = useFormik({
        initialValues: {
            name: props.data?.name as string ?? '',
            code: props.data?.code as string ?? '',
            region: props.data?.region as Region ?? '',
        },
        validationSchema,
        onSubmit(values) {
            props.handleSubmit?.(values);
        }
    });
    const listRegion: MenuProps['items'] = Object.keys(Region).map((item) => {
        return {
            key: item,
            label: getLabelRegion[item as Region]
        }
    });
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Miền <span className="error">*</span></Form.Label>
                <Dropdown
                    onClickItem={(e) => {
                        setFieldValue('region', e.key)
                    }}
                    sizeButton="small"
                    trigger="click"
                    listSelect={listRegion}
                    title={getLabelRegion[values.region as Region] || 'Chọn Miền'}
                />
                {errors.code && touched.code && <p className="error">{errors.code}</p>}
            </Form.Group>
            <Form.Group>
                <Form.Label>Mã khu vực <span className="error">*</span></Form.Label>
                <Input size="small" name='code' value={values.code} onChange={handleChange} onBlur={handleBlur} />
                {errors.code && touched.code && <p className="error">{errors.code}</p>}
            </Form.Group>
            <Form.Group>
                <Form.Label>Tên <span className="error">*</span></Form.Label>
                <Input size="small" name='name' value={values.name} onChange={handleChange} onBlur={handleBlur} />
                {errors.name && touched.name && <p className="error">{errors.name}</p>}
            </Form.Group>
            <Button className={styles.btnSubmit} loading={props.loading} size="small" htmlType="submit">{props.isCreate ? 'Tạo' : 'Cập nhật'}</Button>
        </Form>
    )
}

export default ModalArea;