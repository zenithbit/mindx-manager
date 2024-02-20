import React, { useEffect, useRef } from 'react';
import { Form } from 'react-bootstrap';
import { Button, Checkbox, DatePicker, Input, MenuProps } from 'antd';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as yup from 'yup';
import dayjs from 'dayjs';
import SelectBaseCourse from '@/components/SelectBaseCourse';
import { Obj } from '@/global/interface';
import { PositionTe } from '@/global/enum';
import { getLabelPositionTe } from '@/global/init';
import { compareRefData } from '@/utils';
import useGetCrrUser from '@/utils/hooks/getUser';
import { useGetTeById, useUpdateTeById } from '@/utils/hooks';
import { useHookMessage } from '@/utils/hooks/message';
import CropImage from '@/components/CropImage';
import Dropdown from '@/components/Dropdown';
import styles from '@/styles/employee/TE.module.scss';

const validationSchema = yup.object({
    teName: yup.string().required('Tên là thông tin bắt buộc!'),
    email: yup.string().required('Email là thông tin bắt buộc!'),
    phoneNumber: yup.string().required('Số điện thoại là thông tin bắt buộc!'),
});
const PersonalInfo = () => {
    const router = useRouter();
    const currentTe = useGetTeById();
    const updateTe = useUpdateTeById();
    const message = useHookMessage();
    const crrUser = useGetCrrUser()?.data as Obj;
    const getCurrentTe = (currentTe.data.response as Obj)?.data as Obj;
    const { values, errors, touched, handleBlur, setFieldValue, handleChange, handleReset, handleSubmit } = useFormik({
        initialValues: {
            ...router.query.teId ? getCurrentTe : crrUser,
            ...getCurrentTe?.courseId ? { courseId: getCurrentTe.courseId?._id } : {}
        },
        validationSchema,
        onSubmit(values) {
            const newValue: Obj = {
                ...values
            }
            delete newValue._id;
            const formData = new FormData();
            for (const key in newValue) {
                formData.append(key, newValue[key]);
            }
            updateTe.query({
                body: formData,
                params: [router.query.teId as string ?? crrUser._id]
            });
        },
    });
    const refValues = useRef(values);
    const getValues: Obj = {
        ...values,
        ...values.courseId ? { courseId: values.courseId?._id } : {}
    };
    const listPosition: MenuProps['items'] = [
        {
            key: PositionTe.QC,
            label: getLabelPositionTe[PositionTe.QC]
        },
        {
            key: PositionTe.ASSISTANT,
            label: getLabelPositionTe[PositionTe.ASSISTANT]
        },
        {
            key: PositionTe.HR,
            label: getLabelPositionTe[PositionTe.HR]
        },
        {
            key: PositionTe.LEADER,
            label: getLabelPositionTe[PositionTe.LEADER]
        }
    ];

    useEffect(() => {
        if (updateTe.data.response) {
            message.open({
                content: updateTe.data.response.message as string,
                type: updateTe.data.success ? 'success' : 'error'
            });
            if (updateTe.data.success) {
                currentTe.query({
                    params: [router.query.teId as string]
                })
            }
            updateTe.clear?.();
            message.close();
        }
    }, [updateTe.data]);
    useEffect(() => {
        if ((!getCurrentTe || (getCurrentTe._id !== router.query.teId) || !router.query.teId)) {
            currentTe.query({
                params: [router.query.teId ?? crrUser._id],
                query: {
                    fields: '_id,teName,email,phoneNumber,positionTe,img,courseName,courseId,dob,activate,facebook'
                }
            });
        }
    }, []);
    return (
        <div className={`${styles.personalInfo} ${!router.query.teId && styles.myInfo}`}>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>
                        Ảnh
                    </Form.Label>
                    <CropImage className={styles.cropImage} classNameImgPreview={styles.imageStaff} src={getValues.img ?? `https://res.cloudinary.com/dxo374ch8/image/upload/v1703584277/vsjqknadtdxqk4q05b7p.png`} onCropped={(file) => {
                        setFieldValue("fileImage", file);
                    }} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        Trạng thái
                    </Form.Label>
                    <Checkbox.Group value={getValues.activate ? ['ACTIVE'] : []} onChange={(checkedValue) => {
                        setFieldValue('activate', checkedValue.includes('ACTIVE'));
                    }}>
                        <Checkbox style={{ marginLeft: '0.4rem' }} value={'ACTIVE'}>Active</Checkbox>
                    </Checkbox.Group>
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        Họ và tên <span className="error">*</span>
                    </Form.Label>
                    <Input size="small" name="teName" onChange={handleChange} onBlur={handleBlur} value={getValues.teName} />
                    {(errors as Obj).teName && (touched as Obj).teName && <p className="error">{(errors as Obj).teName as string}</p>}
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        Ngày sinh <span className="error">*</span>
                    </Form.Label>
                    <br />
                    <DatePicker size="small" value={getValues.dob ? dayjs(getValues.dob as Date) : null} format={"DD/MM/YYYY"} onChange={(value) => {
                        const getDay = (value as Obj)?.$d as Date;
                        if (getDay) {
                            setFieldValue('dob', getDay);
                        }
                    }} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        Email <span className="error">*</span>
                    </Form.Label>
                    <Input size="small" name="email" onChange={handleChange} onBlur={handleBlur} value={getValues.email} />
                    {(errors as Obj).email && (touched as Obj).email && <p className="error">{(errors as Obj).email as string}</p>}
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        SĐT <span className="error">*</span>
                    </Form.Label>
                    <Input size="small" name="phoneNumber" onChange={handleChange} onBlur={handleBlur} value={getValues.phoneNumber} />
                    {(errors as Obj).phoneNumber && (touched as Obj).phoneNumber && <p className="error">{(errors as Obj).phoneNumber as string}</p>}
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        Vị trí <span className="error">*</span>
                    </Form.Label>
                    <Dropdown
                        disabled={getValues.positionTe === PositionTe.LEADER}
                        listSelect={listPosition}
                        trigger="click"
                        title={getLabelPositionTe[getValues.positionTe as PositionTe]}
                        sizeButton="small"
                        onClickItem={(e) => {
                            const getPosition = e.key;
                            if (getValues.positionTe && getPosition !== getValues.positionTe) {
                                setFieldValue('positionTe', getPosition);
                            }
                        }}
                    />
                </Form.Group>
                {getValues.positionTe === PositionTe.QC && <Form.Group>
                    <Form.Label>
                        Bộ môn <span className="error">*</span>
                    </Form.Label>
                    <br />
                    <SelectBaseCourse value={getValues.courseId as string} disabledAll onChange={(value) => {
                        setFieldValue('courseId', value);
                    }} />
                </Form.Group>}
                <div className={styles.btnAction}>
                    <Button size="small" onClick={handleReset} loading={updateTe.data.isLoading}>Reset</Button>
                    <Button size="small" htmlType="submit" loading={updateTe.data.isLoading} disabled={compareRefData(refValues.current, values)}>Cập nhật</Button>
                </div>
            </Form>
        </div>
    )
}

export default PersonalInfo;