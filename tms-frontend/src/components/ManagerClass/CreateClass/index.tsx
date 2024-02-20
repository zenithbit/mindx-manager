import React, { useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { Button, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { DatePicker } from 'antd';
import viVN from 'antd/es/date-picker/locale/vi_VN';
const { RangePicker } = DatePicker;
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useHookMessage } from '@/utils/hooks/message';
import { AppDispatch, RootState } from '@/store';
import { clearCreateClass, queryCreateClass } from '@/store/reducers/class/createClass.reducer';
import { Action, Obj, State } from '@/global/interface';
import { useGetTimeSchedule } from '@/utils/hooks';
import SelectCourse from '@/components/SelectCourse';
import PickTimeSchedule from '@/components/PickTimeSchedule';
import styles from '@/styles/class/CreateClass.module.scss';

interface Props {
    onReceive?: (status: boolean) => void;
}
const validationSchema = yup.object({
    codeClass: yup.string().required('Bạn chưa nhập mã lớp!'),
    courseId: yup.string().required('Bạn chưa chọn khoá học!'),
    courseLevelId: yup.string().required('Bạn chưa có cấp độ của khoá học!'),
    dayStart: yup.string().required('Bạn chưa chọn ngày khai giảng!'),
    dayEnd: yup.string().required('Bạn chưa chọn ngày kết thúc!'),
    timeOnce: yup.object().required('Bạn chưa chọn ngày học!'),
    timeTwice: yup.object().required('Bạn chưa chọn ngày học!'),
});
const CreateClass = (props: Props) => {
    const listTimeSchedule = useGetTimeSchedule();
    const dispatch = useDispatch<AppDispatch>();
    const message = useHookMessage();
    const createClass = useSelector((state: RootState) => (state.createClass as State).state);
    const { values, errors, touched, setFieldValue, handleSubmit, handleChange, handleBlur, setTouched, setErrors } = useFormik({
        initialValues: {
            codeClass: '',
            courseId: '',
            courseLevelId: '',
            dayStart: '',
            dayEnd: '',
            timeOnce: '',
            timeTwice: '',
        },
        validationSchema,
        onSubmit(values) {
            const mapDataforRequest: Action = {
                payload: {
                    query: {
                        body: {
                            courseId: values.courseId,
                            courseLevelId: values.courseLevelId,
                            codeClass: values.codeClass,
                            dayRange: {
                                start: values.dayStart,
                                end: values.dayEnd
                            },
                            timeSchedule: [
                                values.timeOnce,
                                values.timeTwice
                            ]
                        }
                    }
                }
            };
            // console.log(mapDataforRequest);
            dispatch(queryCreateClass(mapDataforRequest));
        }
    });
    useEffect(() => {
        if (createClass && !createClass.isLoading && createClass.response) {
            if (createClass.success) {
                message.open({
                    content: 'Tạo lớp thành công!',
                    type: 'success'
                }, 2000);
            }
            else {
                message.open({
                    content: createClass.response.message as string,
                    type: 'error'
                }, 2000);
            }
            dispatch(clearCreateClass());
            setTimeout(() => {
                message.close()
            }, 2000);
        }
    }, [createClass, dispatch]);
    return (
        <div className={styles.containerCreateClass}>
            <Form onSubmit={handleSubmit}>
                <Form.Group className={styles.mb_24}>
                    <Form.Label>Mã lớp:</Form.Label>
                    <Input type="text" name="codeClass" value={values.codeClass} onBlur={handleBlur} onChange={handleChange} placeholder="Mã lớp" size="middle" className={styles.input} />
                    {errors.codeClass && touched.codeClass && <p className="error">{errors.codeClass}</p>}
                </Form.Group>
                <Form.Group className={styles.mb_24}>
                    <Form.Label>Khoá học:</Form.Label>
                    <SelectCourse onChange={(dataSelect) => {
                        setFieldValue('courseId', dataSelect.courseId);
                        setFieldValue('courseLevelId', dataSelect.levelId);
                    }}
                        onBlur={(value) => {
                            setTouched({
                                ...touched,
                                courseId: true,
                                courseLevelId: true,
                            });
                            if (value.courseId && value.levelId) {
                                delete errors.courseId;
                                delete errors.courseLevelId;
                                setErrors({
                                    ...errors
                                });
                            }
                        }}
                    />
                    {errors.courseId && errors.courseId && touched.courseId && <p className="error">{errors.courseId}</p>}
                    {errors.courseLevelId && errors.courseLevelId && touched.courseLevelId && <p className="error">{errors.courseLevelId}</p>}
                </Form.Group>
                <Form.Group className={styles.mb_24}>
                    <Form.Label>Thời gian học:</Form.Label>
                    <div className="hihi">
                        <RangePicker
                            locale={viVN}
                            className={styles.rangePickerDropdown}
                            placeholder={['Ngày KG', 'Ngày KT']}
                            onChange={(value) => {
                                const dataDate = value as Array<Obj>;
                                setFieldValue('dayStart', dataDate?.[0]?.$d as Date);
                                setFieldValue('dayEnd', dataDate?.[1]?.$d as Date);
                            }}
                            onBlur={(e) => {
                                setTouched({
                                    ...touched,
                                    dayStart: true,
                                    dayEnd: true
                                })
                                if (values.dayStart && values.dayEnd) {
                                    delete errors.dayStart;
                                    delete errors.dayEnd;
                                }
                            }}
                        />
                        {errors.dayStart && errors.dayStart && touched.dayStart && <p className="error">{errors.dayStart}</p>}
                        {errors.dayEnd && errors.dayEnd && touched.dayEnd && < p className="error">{errors.dayEnd}</p>}
                    </div>
                </Form.Group>
                <Form.Group className={styles.mb_24}>
                    <Form.Label>Lịch học:</Form.Label>
                    {(!(values.timeOnce as unknown as Obj)?._id || !(values.timeTwice as unknown as Obj)?._id) && < p className="error">Đừng quên chọn lịch học trong tuần nhé!</p>}
                    <div className={styles.day}>
                        <div className="day1">
                            <label>Ngày 1: <span className={styles.dayTime}>{(values.timeOnce as unknown as Obj)?.label}</span></label>
                            <PickTimeSchedule
                                className={styles.weekday}
                                onClickItem={(e) => {
                                    const findItem = (listTimeSchedule.data.response?.data as Array<Obj>)?.find((item) => item._id === e.key);
                                    setFieldValue('timeOnce', {
                                        _id: e.key,
                                        label: `${findItem!.weekday}: ${findItem!.start}-${findItem!.end}`
                                    });
                                    delete errors.timeOnce;
                                    setErrors({
                                        ...errors,
                                    });
                                }}
                            />
                        </div>
                        <div className="day2">
                            <label>Ngày 2: <span className={styles.dayTime}>{(values.timeTwice as unknown as Obj)?.label}</span></label>
                            <PickTimeSchedule
                                className={styles.weekday}
                                onClickItem={(e) => {
                                    const findItem = (listTimeSchedule.data.response?.data as Array<Obj>)?.find((item) => item._id === e.key);
                                    setFieldValue('timeTwice', {
                                        _id: e.key,
                                        label: `${findItem!.weekday}: ${findItem!.start}-${findItem!.end}`
                                    });
                                    delete errors.timeTwice;
                                    setErrors({
                                        ...errors,
                                    });
                                }}
                            />
                        </div>
                    </div>
                    <Button loading={createClass.isLoading} htmlType='submit' className={styles.btnCreateClass}>Tạo lớp</Button>
                </Form.Group>
            </Form>
        </div >
    )
}

export default CreateClass;