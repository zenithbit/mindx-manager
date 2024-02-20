import React, { useEffect, useRef } from 'react';
import { Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import dayjs from 'dayjs';
import * as yup from 'yup';
import { Button, Checkbox, DatePicker, Input, MenuProps, Radio } from 'antd';
import { Gender, ROLE_TEACHER } from '@/global/enum';
import { Obj } from '@/global/interface';
import { useGetArea, useGetTeacherDetail, useUpdateDetailTeacher } from '@/utils/hooks';
import Dropdown from '@/components/Dropdown';
import styles from '@/styles/teacher/DetailTeacher.module.scss';
import { useHookMessage } from '@/utils/hooks/message';

interface Props {
    countRole: number;
}
const validationSchema = yup.object({
    fullName: yup.string().required('Bạn cần điền họ tên giáo viên!'),
    gender: yup.string().required('Bạn cần chọn giới tính!'),
    area: yup.string().required('Bạn cần chọn khu vực!'),
    email: yup.string().required('Bạn cần điền email giáo viên!'),
    dob: yup.string().required('Bạn cần chọn ngày sinh của giáo viên!'),
    phoneNumber: yup.string().required('Bạn cần điền SĐT của giáo viên!'),
    facebookLink: yup.string().required('Bạn cần điền link facebook của giáo viên!'),
    CVfile: yup.string().required('Bạn cần điền link CV của giáo viên!'),
    bankName: yup.string().required('Bạn cần điền tên ngân hàng!'),
    bankNumber: yup.string().required('Bạn cần điền số tài khoản ngân hàng!'),
    bankHolderName: yup.string().required('Bạn cần điền tên chủ tài khoản!'),
})
const TeacherInfo = (props: Props) => {
    const currentTeacher = useGetTeacherDetail();
    const firstInitvalues = useRef(true);
    const updateTeacher = useUpdateDetailTeacher();
    const message = useHookMessage();
    const getDataTeacher = (currentTeacher.data.response?.data as Obj);
    const { values, errors, touched, setValues, handleBlur, handleChange, handleReset, handleSubmit, setFieldValue } = useFormik({
        initialValues: getDataTeacher,
        validationSchema,
        onSubmit(values) {
            const getValues: Obj = {
                ...values
            };
            delete getValues._id;
            updateTeacher.query({
                body: getValues,
                params: [getDataTeacher._id as string]
            });
        }
    });
    const area = useGetArea();
    const mapListArea: MenuProps['items'] = (area.data.response?.data as Obj[])?.map((item) => {
        return {
            key: item._id as string,
            label: item.name as string
        }
    });
    const getTitleArea = () => {
        const crrArea = (area.data.response?.data as Obj[])?.find((item) => {
            return item?._id === values?.area
        });
        return crrArea?.name as string ?? 'Chọn'
    }
    useEffect(() => {
        area.query();
    }, []);
    useEffect(() => {
        if (currentTeacher.data.response && currentTeacher.data.success && firstInitvalues.current) {
            setValues((currentTeacher.data.response.data as Obj));
        }
    }, [currentTeacher.data]);
    useEffect(() => {
        if (updateTeacher.data.response) {
            message.open({
                content: updateTeacher.data.response.message as string,
                type: updateTeacher.data.success ? 'success' : 'error'
            });
            updateTeacher.clear?.();
            message.close();
        }
    }, [updateTeacher.data]);
    return (
        <div className={styles.overViewTeacherInfo}>
            <Form className={styles.formInfo} onSubmit={handleSubmit}>
                <div className={styles.left}>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Họ tên<span className="error">*</span>:</Form.Label>
                        <Input value={values?.fullName} name="fullName" placeholder="Họ tên" size="small" className={styles.input} onChange={handleChange} onBlur={handleBlur} />
                        {errors?.fullName && touched?.fullName && <p className="error">{errors.fullName as string}</p>}
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className={styles.fs_12}>
                            <span>Giới tính<span className="error">*</span>:</span>
                        </Form.Label>
                        <br />
                        <Radio.Group onChange={handleChange} name="gender" onBlur={handleBlur} value={values?.gender}>
                            <Radio value={Gender.M}>Nam</Radio>
                            <Radio value={Gender.FM}>Nữ</Radio>
                            <Radio value={Gender.NA}>Khác</Radio>
                        </Radio.Group>
                        {errors?.gender && touched?.gender && <p className="error">{errors.gender as string}</p>}
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Khu vực<span className="error">*</span>:</Form.Label>
                        <Dropdown
                            sizeButton="small"
                            onClickItem={(e) => {
                                setFieldValue('area', e.key);
                            }}
                            trigger="click"
                            listSelect={mapListArea}
                            title={getTitleArea()}
                        />
                        {errors?.area && touched?.area && <p className="error">{errors.area as string}</p>}
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Email<span className="error">*</span>:</Form.Label>
                        <Input value={values?.email} type="email" name="email" placeholder="Email" size="small" className={styles.input} onChange={handleChange} onBlur={handleBlur} />
                        {errors?.email && touched?.email && <p className="error">{errors.email as string}</p>}
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Ngày sinh<span className="error">*</span>:</Form.Label>
                        <br />
                        <DatePicker size="small" name="dob" value={dayjs(values?.dob as Date || new Date())} format={'DD/MM/YYYY'} onChange={(value) => {
                            if (value) {
                                setFieldValue('dob', (value as Obj)?.$d as Date);
                            }
                        }} onBlur={handleBlur} />
                        {errors?.dob && touched?.dob && <p className="error">{errors.dob as string}</p>}
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Số ĐT<span className="error">*</span>:</Form.Label>
                        <Input value={values?.phoneNumber} type="text" name="phoneNumber" size="small" className={styles.input} onChange={handleChange} onBlur={handleBlur} />
                        {errors?.phoneNumber && touched?.phoneNumber && <p className="error">{errors.phoneNumber as string}</p>}
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Link Facebook<span className="error">*</span>:</Form.Label>
                        <Input value={values?.facebookLink} type="text" name="facebookLink" size="small" className={styles.input} onChange={handleChange} onBlur={handleBlur} />
                        {errors?.facebookLink && touched?.facebookLink && <p className="error">{errors.facebookLink as string}</p>}
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Link CV<span className="error">*</span>:</Form.Label>
                        <Input value={values?.CVfile} type="text" name="CVfile" size="small" className={styles.input} onChange={handleChange} onBlur={handleBlur} />
                        {errors?.CVfile && touched?.CVfile && <p className="error">{errors.CVfile as string}</p>}
                    </Form.Group>
                    <br />
                </div>
                <div className={styles.right}>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Mã số thuế:</Form.Label>
                        <Input value={values?.taxCode} type="text" name="taxCode" placeholder="VD:000000" size="small" className={styles.input} onChange={handleChange} onBlur={handleBlur} />
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Tên ngân hàng<span className="error">*</span>:</Form.Label>
                        <Input value={values?.bankName} type="text" name="bankName" placeholder="VD: VP Bank" size="small" className={styles.input} onChange={handleChange} onBlur={handleBlur} />
                        {errors?.bankName && touched?.bankName && <p className="error">{errors.bankName as string}</p>}
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Số tài khoản<span className="error">*</span>:</Form.Label>
                        <Input value={values?.bankNumber} type="text" name="bankNumber" placeholder="VD: 08765213" size="small" className={styles.input} onChange={handleChange} onBlur={handleBlur} />
                        {errors?.bankNumber && touched?.bankNumber && <p className="error">{errors.bankNumber as string}</p>}
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Chủ tài khoản<span className="error">*</span>:</Form.Label>
                        <Input value={values?.bankHolderName} type="text" name="bankHolderName" placeholder="VD: Mindx Technology" size="small" className={styles.input} onChange={handleChange} onBlur={handleBlur} />
                        {errors?.bankHolderName && touched?.bankHolderName && <p className="error">{errors.bankHolderName as string}</p>}
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <div className={styles.titleRole}>
                            <Form.Label>Vị trí<span className="error">*</span>:</Form.Label>
                        </div>
                        <Checkbox.Group className={styles.roleRegister} value={[values?.roleIsST ? ROLE_TEACHER.ST : '', values?.roleIsMT ? ROLE_TEACHER.MT : '', values?.roleIsSP ? ROLE_TEACHER.SP : '']} onChange={(checkedValue) => {
                            if (checkedValue.includes(ROLE_TEACHER.ST)) {
                                setFieldValue('roleIsST', true);
                            } else {
                                setFieldValue('roleIsST', false);
                            }
                            if (checkedValue.includes(ROLE_TEACHER.MT)) {
                                setFieldValue('roleIsMT', true);
                            } else {
                                setFieldValue('roleIsMT', false);
                            }
                            if (checkedValue.includes(ROLE_TEACHER.SP)) {
                                setFieldValue('roleIsSP', true);
                            } else {
                                setFieldValue('roleIsSP', false);
                            }
                        }}>
                            <Checkbox value={ROLE_TEACHER.ST}>Super Teacher</Checkbox>
                            <Checkbox value={ROLE_TEACHER.MT}>Mentor</Checkbox>
                            <Checkbox value={ROLE_TEACHER.SP}>Supporter</Checkbox>
                        </Checkbox.Group>
                    </Form.Group>
                    <div className={`${styles.btnAction} ${styles.fromFormInfo}`}>
                        <Button onClick={handleReset}>Reset</Button>
                        <Button htmlType="submit" disabled={JSON.stringify(getDataTeacher) === JSON.stringify(values)}>Lưu</Button>
                    </div>
                </div>
            </Form>
        </div>
    )
}

export default TeacherInfo;