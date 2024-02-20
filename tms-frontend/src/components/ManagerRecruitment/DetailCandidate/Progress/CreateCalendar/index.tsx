import React, { useEffect, useMemo, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Form } from 'react-bootstrap';
import { Button, DatePicker, Input, TimePicker } from 'antd';
import dayjs from 'dayjs';
import { Obj } from '@/global/interface';
import { useDebounce, useFindGetAllTe, useGetDataRoundProcess } from '@/utils/hooks';
import Dropdown from '@/components/Dropdown';
import Loading from '@/components/loading';
import styles from '@/styles/Recruitment/ManagerRecruitment.module.scss';


interface Props {
    handleSubmit?: (values: Obj) => void;
    handleModal?: () => void;
    hasDoc?: boolean;
}
const CreateCalendar = (props: Props) => {
    const validationSchema = yup.object({
        linkMeet: yup.string().required('Chưa có thông tin link meet!'),
        te: yup.string().required('Chưa có thông tin TE!'),
        time: yup.string().required('Chưa có thông tin thời gian!'),
        ...props.hasDoc ? {
            doc: yup.string().required('Chưa có tài liệu cung cấp!'),
        } : {}
    });
    const listTe = useFindGetAllTe();
    const [valueFindTe, setValueFindTe] = useState<string>('');
    const dataRoundProcess = useGetDataRoundProcess();
    const getDataRoundProcess = (dataRoundProcess.data.response?.data as Array<Obj>)?.[0];

    const getListTe = listTe.data.response?.data as Array<Obj> || [];
    const debounce = useDebounce(valueFindTe, 500);

    useEffect(() => {
        if (debounce) {
            listTe.query({
                query: {
                    fields: '_id,teName,positionTe,courseId,courseName,email',
                    findBy: 'email',
                    value: valueFindTe
                }
            });
        }
    }, [debounce]);
    const { values, errors, touched, setFieldValue, handleChange, handleBlur, handleSubmit, setValues, handleReset } = useFormik({
        initialValues: {
            linkMeet: getDataRoundProcess?.linkMeet as string || '',
            time: getDataRoundProcess?.time as string || '',
            te: getDataRoundProcess?.te?._id as string || '',
            doc: getDataRoundProcess?.doc as string || '',
        },
        validationSchema,
        onSubmit(values) {
            props.handleSubmit?.(values);
        }
    });
    const getLabelChosenTe = useMemo(() => {
        const findTe = getListTe.find((item) => {
            return item._id === values.te;
        });
        if (!findTe) {
            if (getDataRoundProcess.te) {
                return `${getDataRoundProcess.te.teName}-${getDataRoundProcess.te.positionTe}${getDataRoundProcess.te.courseId ? ` ${getDataRoundProcess.te.courseId.courseName}` : ''}`;
            }
            return 'Không có Te nào được chọn!'
        };
        return `${findTe.teName}-${findTe.positionTe}${findTe.courseId ? ` ${findTe.courseId.courseName}` : ''}`;
    }, [values.te, getDataRoundProcess]);

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>
                    Link meet <span className="error">*</span>
                </Form.Label>
                <Input size='small' name="linkMeet" value={values.linkMeet} onChange={handleChange} onBlur={handleBlur} />
                {errors.linkMeet && touched.linkMeet && <p className="error">{errors.linkMeet}</p>}
            </Form.Group>
            {
                props.hasDoc && <Form.Group>
                    <Form.Label>
                        Tài liệu <span className="error">*</span>
                    </Form.Label>
                    <Input size='small' name="doc" value={values.doc} onChange={handleChange} onBlur={handleBlur} />
                    {errors.doc && touched.doc && <p className="error">{errors.doc}</p>}
                </Form.Group>
            }

            <Form.Group>
                <Form.Label>
                    Thời gian <span className="error">*</span>
                </Form.Label>
                <br />
                <DatePicker
                    onBlur={handleBlur}
                    name="time"
                    onChange={(value: Obj | any) => {
                        setFieldValue('time', value?.$d || '')
                    }}
                    placeholder="Ngày PV"
                    popupClassName={styles.pickDate}
                    size='small'
                    value={values.time ? dayjs(new Date(values.time)) : null}
                    format={'DD-MM-YYYY'}
                />
                <br />
                {values.time && <TimePicker
                    onChange={(value: Obj | any) => {
                        if (value) {
                            const hours = value?.$H;
                            const minute = value?.$m;
                            const currentInterviewDay = new Date(values.time);
                            currentInterviewDay.setHours(hours);
                            currentInterviewDay.setMinutes(minute);
                            currentInterviewDay.setSeconds(0, 0);
                            setFieldValue('time', new Date(currentInterviewDay));
                        }
                    }}
                    value={values.time ? dayjs(new Date(values.time)) : null}
                    popupClassName={styles.pickDate}
                    format={"HH:mm"}
                    size="small"
                    placeholder="Giờ"
                />}
                {errors.time && touched.time && !values.time && <p className="error">{errors.time}</p>}
            </Form.Group>
            <Form.Group>
                <Form.Label>
                    TE <span className="error">*</span>: {getLabelChosenTe}
                    {errors.te && touched.te && !values.te && <p className="error">{errors.te}</p>}
                </Form.Label>
                <Dropdown
                    listSelect={getListTe?.map((item) => {
                        return {
                            key: item._id as string,
                            label: `${item.teName}-${item.positionTe}${item.courseId ? ` ${item.courseId.courseName}` : ''}`
                        }
                    })}
                    trigger='click'
                    title={<div className={styles.inputLoading}>
                        <Input
                            onBlur={handleBlur}
                            name='te'
                            prefixCls={''}
                            size="small"
                            placeholder="Gõ email để tìm kiếm"
                            onChange={(e) => {
                                setValueFindTe(e.target.value);
                            }}
                        />
                        {listTe.data.isLoading && <Loading className={styles.iconLoading} />}
                    </div>
                    }
                    sizeButton="small"
                    onClickItem={(e) => {
                        setFieldValue('te', e.key);
                    }}
                />
            </Form.Group>
            <div className={styles.btnCreateScheduleInterview}>
                <Button
                    disabled={dataRoundProcess.data.isLoading}
                    size="small"
                    onClick={(e) => {
                        if (getDataRoundProcess && getDataRoundProcess.time) {
                            handleReset(e);
                        } else {
                            props.handleModal?.();
                        }
                    }}
                >{getDataRoundProcess && getDataRoundProcess.time ? 'Đặt lại' : 'Huỷ'}</Button>
                <Button size="small" htmlType="submit" loading={dataRoundProcess.data.isLoading}>{getDataRoundProcess?.time ? ('Cập nhật') : ('Tạo lịch')}</Button>
            </div>
        </Form>
    )
}

export default CreateCalendar;