import React, { useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import { Button, Input } from 'antd';
import * as yup from 'yup';
import { useCreateLocation, useGetArea, useUpdateLocation } from '@/utils/hooks';
import { useHookMessage } from '@/utils/hooks/message';
import { Obj } from '@/global/interface';
import Dropdown from '@/components/Dropdown';
import styles from '@/styles/class/CreateLocation.module.scss';

interface Props {
    isCreate?: boolean;
    onReceive?: (status: boolean) => void;
    handleModal?: () => void;
    data?: Obj;
}

const validationSchema = yup.object({
    locationName: yup.string().required('Bạn cần nhập tên cơ sở!'),
    locationCode: yup.string().required('Bạn cần nhập mã cơ sở!'),
    locationDetail: yup.string().required('Bạn cần nhập địa chỉ chi tiết cơ sở!'),
    area: yup.string().required('Bạn cần chọn khu vực!'),
})
const CreateLocation = (props: Props) => {
    const initValues = {
        locationName: props.data?.locationName ? props.data.locationName as string : '',
        locationCode: props.data?.locationCode ? props.data.locationCode as string : '',
        locationDetail: props.data?.locationDetail ? props.data.locationDetail as string : '',
        area: props.data?.area ? props.data.area._id as string : '',
        active: !!props.data?.active
    }
    const listArea = useGetArea();
    const updateLocation = useUpdateLocation();
    const createLocation = useCreateLocation();
    const message = useHookMessage();
    const { values, touched, errors, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initValues,
        validationSchema,
        onSubmit(values) {
            if (props.isCreate) {
                createLocation.query({
                    body: values
                })
            } else {
                updateLocation.query({
                    body: values,
                    params: [props.data?._id as string]
                });
            }
        }
    });
    const locationList = (listArea.data.response?.data as Obj[])?.map((item => {
        return {
            key: item._id as string,
            label: `${item.code as string}-${item.name as string}`
        }
    }));
    useEffect(() => {
        if (!listArea.data.response) {
            listArea.query();
        }
    }, []);
    useEffect(() => {
        if (updateLocation.data.response || createLocation.data.response) {
            if (updateLocation.data.success || createLocation.data.response) {
                props.handleModal?.();
            }
            message.open({
                content: updateLocation.data.response?.message as string || createLocation.data.response?.messasge as string,
                type: updateLocation.data.success || createLocation.data.success ? 'success' : 'error'
            });
            updateLocation.clear?.();
            createLocation.clear?.();
            message.close();
        }
    }, [updateLocation.data, createLocation.data]);

    return (
        <div className={styles.containerCreateClass}>
            <Form onSubmit={handleSubmit}>
                <Form.Group className={styles.mb_15}>
                    <Form.Label>Tên cơ sở<span className="error">*</span>:</Form.Label>
                    <Input type="text" value={values.locationName} name="locationName" placeholder="Tên cơ sở" size="middle" className={styles.input} onChange={handleChange} onBlur={handleBlur} />
                    {errors.locationName && touched.locationName && <p className='error'>{errors.locationName}</p>}
                </Form.Group>
                <Form.Group className={styles.mb_15}>
                    <Form.Label>Mã cơ sở<span className="error">*</span>:</Form.Label>
                    <Input type="text" value={values.locationCode} name="locationCode" placeholder="Mã cơ sở" size="middle" className={styles.input} onChange={handleChange} onBlur={handleBlur} />
                    {errors.locationCode && touched.locationCode && <p className='error'>{errors.locationCode}</p>}
                </Form.Group>

                <Form.Group className={"w-100"}>
                    <Form.Label>Khu Vực:<span className="error">*</span></Form.Label>
                    <Dropdown
                        loading={listArea.data.isLoading}
                        className={styles.weekday}
                        trigger='click'
                        listSelect={locationList}
                        keyIndex='weekdayTwice'
                        title={values.area && locationList ? `${locationList.find((item) => item.key === values.area)!.label}` : 'Chọn khu vực'}
                        onClickItem={(e) => {
                            const label = locationList.find((item) => item.key === e.key);
                            if (label) {
                                setFieldValue('area', label.key);
                            }
                        }}
                    />
                    {errors.area && touched.area && <p className='error'>{errors.area}</p>}
                </Form.Group>
                <Form.Group className={styles.mb_15}>
                    <Form.Label>Trạng thái hoạt động:</Form.Label>
                    <Dropdown
                        trigger='click'
                        title={<Button>{values.active ? 'Hoạt động' : 'Ngưng hoạt động'}</Button>}
                        listSelect={[
                            {
                                key: 'ACTIVE',
                                label: 'Hoạt động'
                            },
                            {
                                key: 'DEACTIVE',
                                label: 'Ngưng hoạt động'
                            },
                        ]}
                        onClickItem={(e) => {
                            setFieldValue('active', e.key === 'ACTIVE')
                        }}
                    />
                </Form.Group>
                <Button htmlType='submit' className={styles.fl_r}>{props.isCreate ? 'Tạo lớp' : 'Cập nhật'}</Button>
            </Form>
        </div >
    )
}

export default CreateLocation;