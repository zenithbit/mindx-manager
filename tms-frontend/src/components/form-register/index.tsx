import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import Link from 'next/link';
import * as yup from 'yup';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { CheckboxOptionType, CheckboxValueType } from 'antd/es/checkbox/Group';
import { Input, DatePicker, Radio, Button, Checkbox, MenuProps } from 'antd';
import { Obj, State } from '@/global/interface';
import { Gender, ROLE_TEACHER } from '@/global/enum';
import { useHookMessage } from '@/utils/hooks/message';
import { useGetArea } from '@/utils/hooks';
import { getCourses } from '@/store/reducers/course.reducer';
import { AppDispatch, RootState } from '@/store';
import { clean, queryRegisterPreTeacher } from '@/store/reducers/registerPreTeacher.reducer';
import AuthLayout from '@/layouts/auth';
import Loading from '../loading';
import iconArrowLeft from '@/assets/svgs/icon-arrow-left.svg';
import Dropdown from '../Dropdown';
import styles from '@/styles/auth/FormRegister.module.scss';

const crrCourseRegister: {
    idCourse: string,
    levelHandle: CheckboxValueType[]
}[] = [];

let crrRoleRegister: CheckboxValueType[] = [];
const onChange = (checkedValues: CheckboxValueType[], idCourse: string, handleFieldValue: (fieldName: string, value: {
    idCourse: string,
    levelHandle: CheckboxValueType[]
}[]) => void) => {
    const findIdx = crrCourseRegister.findIndex((item: Obj) => item.idCourse === idCourse);
    if (findIdx < 0) {
        crrCourseRegister.push({
            idCourse: idCourse,
            levelHandle: checkedValues
        });
    } else {
        if (checkedValues.length === 0) {
            crrCourseRegister.splice(findIdx, 1);
        } else {
            crrCourseRegister[findIdx].levelHandle = checkedValues;
        }
    }
    handleFieldValue('coursesRegister', crrCourseRegister);
};
const handleRegisterRole = (checkedValues: CheckboxValueType[], handleFieldValue: (fieldName: string, value: CheckboxValueType[]) => void) => {
    crrRoleRegister = checkedValues;
    handleFieldValue('role', crrRoleRegister)
}
const validationSchema = yup.object({
    email: yup.string().email('Không đúng định dạng!').required('Bạn cần nhập email!'),
    fullName: yup.string().required('Bạn cần điền tên đầy đủ!'),
    gender: yup.string().required('Bạn chưa chọn giới tính!'),
    phoneNumber: yup.string().required('Bạn chưa nhập SĐT!'),
    dob: yup.object().required('Bạn cần chọn ngày tháng năm sinh!'),
    dateStartWork: yup.object().required('Bạn cần chọn ngày bắt đầu làm việc!'),
    identify: yup.string().required('Bạn chưa nhập số CCCD!'),
    licenseDate: yup.date().required('Bạn chưa chọn ngày cấp!'),
    licensePlace: yup.string().required('Bạn chưa nhập nơi cấp!'),
    facebookLink: yup.string().required('Bạn chưa điền link facebook!'),
    area: yup.string().required('Bạn chưa chọn khu vực sống!'),
    educationInfo: yup.string().required('Bạn chưa điền thông tin học vấn!'),
    companyInfo: yup.string().required('Bạn chưa điền Công việc/Nơi làm việc'),
    background: yup.string().required('Bạn chưa điền lý lịch xuất phát công việc!'),
    address: yup.string().required('Bạn chưa điền địa chỉ hiện tại!'),
    CVfile: yup.string().required('Bạn chưa điền thông tin CV'),
    bankName: yup.string().required('Bạn chưa điền tên ngân hàng!'),
    bankNumber: yup.string().required('Bạn chưa điền số tài khoản!'),
    bankHolderName: yup.string().required('Bạn chưa điền tên chủ sở hữu!'),
    role: yup.array().min(1, 'Bạn cần chọn ít nhất một vị trí!').required('Bạn cần chọn vị trí!'),
    coursesRegister: yup.array().min(1, 'Bạn cần chọn ít nhất một cấp độ của một khóa học!').required('Bạn cần chọn khóa học!'),
});
const FormRegister = () => {
    const [step, setStep] = useState<number>(1);
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
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const listCourse = useSelector((state: RootState) => (state.courses as State).state);
    const registerPreTeacher = useSelector((state: RootState) => (state.registerPreTeacher as State).state);
    const handleMessage = useHookMessage();
    const handleStep = (type: 'INCRE' | 'DECRE') => {
        if (type === 'INCRE') {
            setStep((prev: number) => {
                return prev < 5 ? prev + 1 : prev;
            });
        } else {
            setStep((prev: number) => {
                return prev > 1 ? prev - 1 : prev;
            });
        }
    };
    const { values, errors, touched, isValid, handleSubmit, handleChange, handleBlur, setFieldValue } = useFormik({
        initialValues: {
            email: '',
            fullName: '',
            gender: '',
            phoneNumber: '',
            dob: '',
            identify: '',
            licenseDate: '',
            licensePlace: '',
            taxCode: '',
            facebookLink: '',
            area: '',
            educationInfo: '',
            companyInfo: '',
            background: '',
            address: '',
            CVfile: '',
            bankName: '',
            bankNumber: '',
            bankHolderName: '',
            dateStartWork: '',
            role: [],
            coursesRegister: []
        },
        validationSchema,
        onSubmit(values) {
            if (isValid) {
                dispatch(queryRegisterPreTeacher({
                    payload: {
                        query: {
                            body: {
                                ...values,
                                dateStartWork: (values.dateStartWork as unknown as Obj).$d,
                                licenseDate: (values.licenseDate as unknown as Obj).$d,
                                dob: (values.dob as unknown as Obj).$d,
                            }
                        }
                    }
                }));
            }
        },
    });
    useEffect(() => {
        area.query();
    }, []);
    useEffect(() => {
        if (step === 5 && !listCourse.response && !listCourse.isLoading) {
            dispatch(getCourses());
        }
    }, [step, listCourse, dispatch]);
    useEffect(() => {
        if (registerPreTeacher.response && !registerPreTeacher.isLoading) {
            handleMessage.open({
                content: (registerPreTeacher.response as Obj)?.message as string,
                type: ((registerPreTeacher.response as Obj)?.status as boolean) ? "success" : "error"
            }, 2500);
            handleMessage.close(2500);
            if ((registerPreTeacher.response as Obj)?.status) {
                router.push('/auth/login');
            }
            dispatch(clean());

        }
        return () => {
            handleMessage.close();
        }
    }, [registerPreTeacher]);
    return (
        <div className={`${styles.form_collection_personal_infor} form_collection`}>
            <div className={styles.zone_arrow}>
                {step !== 1 && <Image
                    alt=''
                    src={iconArrowLeft}
                    className={styles.arrow}
                    onClick={() => {
                        handleStep('DECRE');
                    }}
                />}
            </div>
            <h5>{step === 1 ? 'Thông tin chung' :
                step === 2 || step == 3 ? 'Định danh cá nhân' :
                    step === 4 ? 'Ngân hàng, MST' :
                        'Bước cuối cùng nào'
            }</h5>
            <p>
                Điền form bên dưới để tạo tài khoản. Đã có tài khoản
                <Link href={'/auth/login'}><span className={styles.fw_600}>Đăng nhập</span></Link>
            </p>
            <div className={styles.step}>
                <ul>
                    <li className={step <= 5 ? styles.active : ''} onClick={() => {
                        setStep(1)
                    }}></li>
                    <li className={step > 1 && step <= 5 ? styles.active : ''} onClick={() => {
                        setStep(2)
                    }}></li>
                    <li className={step > 2 && step <= 5 ? styles.active : ''} onClick={() => {
                        setStep(3)
                    }}></li>
                    <li className={step > 3 && step <= 5 ? styles.active : ''} onClick={() => {
                        setStep(4)
                    }}></li>
                    <li className={step === 5 ? styles.active : ''} onClick={() => {
                        setStep(5)
                    }}></li>
                </ul>
            </div>
            <Form className={styles.form} onSubmit={handleSubmit}>
                <div className={`${styles.collection_input} ${step === 5 || step == 3 && 'mh-46'}`}>
                    {
                        step === 1 ? <>
                            <Form.Group className={styles.mb_24}>
                                <Form.Label className={styles.fs_12}>
                                    <span>Địa chỉ mail <span className="field_required">*</span></span>
                                </Form.Label>
                                <Input type="email" name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} placeholder="abc@gmail.com" size="large" className={styles.input} />
                                {errors.email && touched.email && <p className="error">{errors.email}</p>}
                            </Form.Group>
                            <Form.Group className={styles.mb_24}>
                                <Form.Label className={styles.fs_12}>
                                    <span>Họ và tên <span className="field_required">*</span></span>
                                </Form.Label>
                                <Input type="text" name="fullName" value={values.fullName} onChange={handleChange} onBlur={handleBlur} placeholder="Nguyễn Văn A" size="large" className={styles.input} />
                                {errors.fullName && touched.fullName && <p className="error">{errors.fullName}</p>}
                            </Form.Group>
                            <Form.Group className={styles.mb_24}>
                                <Form.Label className={styles.fs_12}>
                                    <span>Số điện thoại <span className="field_required">*</span></span>
                                </Form.Label>
                                <Input type="text" name="phoneNumber" value={values.phoneNumber} onChange={handleChange} onBlur={handleBlur} placeholder="01234..." size="large" className={styles.input} />
                                {errors.phoneNumber && touched.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
                            </Form.Group>
                            <Form.Group className={styles.mb_24}>
                                <Form.Label className={styles.fs_12}>
                                    <span>Ngày tháng năm sinh <span className="field_required">*</span></span>
                                </Form.Label>
                                <DatePicker className={styles.input} value={values.dob as any} name="dob" onChange={(e) => {
                                    setFieldValue('dob', e);
                                }} onBlur={handleBlur} placeholder='yy-mm-dd' />
                                {errors.dob && touched.dob && <p className="error">{errors.dob}</p>}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label className={styles.fs_12}>
                                    <span>Giới tính <span className="field_required">*</span></span>
                                </Form.Label>
                                <Radio.Group onChange={handleChange} name="gender" onBlur={handleBlur} value={values.gender}>
                                    <Radio value={Gender.M}>Nam</Radio>
                                    <Radio value={Gender.FM}>Nữ</Radio>
                                    <Radio value={Gender.NA}>Khác</Radio>
                                </Radio.Group>
                                {errors.gender && touched.gender && <p className="error">{errors.gender}</p>}
                            </Form.Group>
                        </> : (
                            step === 2 ? <>
                                <Form.Group className={styles.mb_24}>
                                    <Form.Label className={styles.fs_12}>
                                        <span>Số CCCD <span className="field_required">*</span></span>
                                    </Form.Label>
                                    <Input type="text" onChange={handleChange} name="identify" value={values.identify} onBlur={handleBlur} placeholder="Nhập số CCCD 12 số" size="large" className={styles.input} />
                                    {errors.identify && touched.identify && <p className="error">{errors.identify}</p>}
                                </Form.Group>
                                <Form.Group className={styles.mb_24}>
                                    <Form.Label className={styles.fs_12}>
                                        <span>Ngày cấp <span className="field_required">*</span></span>
                                    </Form.Label>
                                    <DatePicker className={styles.input} value={values.licenseDate as any} name="licenseDate" onChange={(e) => {
                                        setFieldValue('licenseDate', e);
                                    }} onBlur={handleBlur} placeholder='yy-mm-dd' />
                                    {errors.licenseDate && touched.licenseDate && <p className="error">{errors.licenseDate}</p>}
                                </Form.Group>
                                <Form.Group className={styles.mb_24}>
                                    <Form.Label className={styles.fs_12}>
                                        <span>Nơi cấp <span className="field_required">*</span></span>
                                    </Form.Label>
                                    <Input type="text" onChange={handleChange} name="licensePlace" value={values.licensePlace} onBlur={handleBlur} placeholder="Cục cảnh sát..." size="large" className={styles.input} />
                                    {errors.licensePlace && touched.licensePlace && <p className="error">{errors.licensePlace}</p>}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label className={styles.fs_12}>
                                        <span>Khu vực sống <span className="field_required">*</span></span>
                                    </Form.Label>
                                    <Dropdown
                                        sizeButton="small"
                                        onClickItem={(e) => {
                                            setFieldValue('area', e.key);
                                        }}
                                        trigger="click"
                                        listSelect={mapListArea}
                                        title={getTitleArea()}
                                    />
                                    {errors.area && touched.area && <p className="error">{errors.area}</p>}
                                </Form.Group>
                            </> : (
                                step === 3 ? <>
                                    <Form.Group className={styles.mb_24}>
                                        <Form.Label className={styles.fs_12}>
                                            <span>Trường Đại Học,Cao Đẳng / Ngành học <span className="field_required">*</span></span>
                                        </Form.Label>
                                        <Input type="text" name="educationInfo" value={values.educationInfo} onChange={handleChange} onBlur={handleBlur} placeholder="Đại Fọc FPT / Thiết kế đồ họa" size="large" className={styles.input} />
                                        {errors.educationInfo && touched.educationInfo && <p className="error">{errors.educationInfo}</p>}
                                    </Form.Group>
                                    <Form.Group className={styles.mb_24}>
                                        <Form.Label className={styles.fs_12}>
                                            <span>Công việc / Nơi làm việc <span className="field_required">*</span></span>
                                        </Form.Label>
                                        <Input type="text" name="companyInfo" value={values.companyInfo} onChange={handleChange} onBlur={handleBlur} placeholder="Product Designer / MindX School" size="large" className={styles.input} />
                                        {errors.companyInfo && touched.companyInfo && <p className="error">{errors.companyInfo}</p>}
                                    </Form.Group>
                                    <Form.Group className={styles.mb_24}>
                                        <Form.Label className={styles.fs_12}>
                                            <span>Địa chỉ hiện tại <span className="field_required">*</span></span>
                                        </Form.Label>
                                        <Input type="text" name="address" value={values.address} onChange={handleChange} onBlur={handleBlur} placeholder="71 Nguyễn Chí Thanh" size="large" className={styles.input} />
                                        {errors.address && touched.address && <p className="error">{errors.address}</p>}
                                    </Form.Group>
                                    <Form.Group className={styles.mb_24}>
                                        <Form.Label className={styles.fs_12}>
                                            <span>Bắt đầu làm việc <span className="field_required">*</span></span>
                                        </Form.Label>
                                        <DatePicker className={styles.input} name="dateStartWork" placeholder='yy-mm-dd' value={values.dateStartWork as any} onChange={(e) => {
                                            setFieldValue('dateStartWork', e);
                                        }} onBlur={handleBlur} />
                                        {errors.dateStartWork && touched.dateStartWork && <p className="error">{errors.dateStartWork}</p>}
                                    </Form.Group>
                                    <Form.Group className={styles.mb_24}>
                                        <Form.Label className={styles.fs_12}>
                                            <span>Link CV (Portfolio) <span className="field_required">*</span></span>
                                        </Form.Label>
                                        <Input type="text" value={values.CVfile} name="CVfile" onChange={handleChange} onBlur={handleBlur} placeholder="https://..." size="large" className={styles.input} />
                                        {errors.CVfile && touched.CVfile && <p className="error">{errors.CVfile}</p>}
                                    </Form.Group>
                                    <Form.Group className={styles.mb_24}>
                                        <Form.Label className={styles.fs_12}>
                                            <span>Link facebook<span className="field_required">*</span></span>
                                        </Form.Label>
                                        <Input type="text" value={values.facebookLink} name="facebookLink" onChange={handleChange} onBlur={handleBlur} placeholder="https://..." size="large" className={styles.input} />
                                        {errors.facebookLink && touched.facebookLink && <p className="error">{errors.facebookLink}</p>}
                                    </Form.Group>
                                </> : (
                                    step === 4 ? <>
                                        <Form.Group className={styles.mb_24}>
                                            <Form.Label className={styles.fs_12}>
                                                <span>Tên ngân hàng <span className="field_required">*</span></span>
                                            </Form.Label>
                                            <Input type="text" value={values.bankName} name="bankName" onChange={handleChange} onBlur={handleBlur} placeholder="VD: Techcombank" size="large" className={styles.input} />
                                            {errors.bankName && touched.bankName && <p className="error">{errors.bankName}</p>}
                                        </Form.Group>
                                        <Form.Group className={styles.mb_24}>
                                            <Form.Label className={styles.fs_12}>
                                                <span>Số tài khoản <span className="field_required">*</span></span>
                                            </Form.Label>
                                            <Input type="text" value={values.bankNumber} name="bankNumber" onChange={handleChange} onBlur={handleBlur} placeholder="VD: 1903..." size="large" className={styles.input} />
                                            {errors.bankNumber && touched.bankNumber && <p className="error">{errors.bankNumber}</p>}
                                        </Form.Group>
                                        <Form.Group className={styles.mb_24}>
                                            <Form.Label className={styles.fs_12}>
                                                <span>Chủ tài khoản <span className="field_required">*</span></span>
                                            </Form.Label>
                                            <Input type="text" value={values.bankHolderName} name="bankHolderName" onChange={handleChange} onBlur={handleBlur} placeholder="VD: Nguyễn Văn Cường" size="large" className={styles.input} />
                                            {errors.bankHolderName && touched.bankHolderName && <p className="error">{errors.bankHolderName}</p>}
                                        </Form.Group>
                                        <Form.Group className={styles.mb_24}>
                                            <Form.Label className={styles.fs_12}>
                                                <span>Mã số thuế <small>(Nếu có)</small></span>
                                            </Form.Label>
                                            <Input type="text" name="taxCode" value={values.taxCode} onChange={handleChange} onBlur={handleBlur} placeholder="12345678" size="large" className={styles.input} />
                                        </Form.Group>
                                    </> : (
                                        listCourse.isLoading ? <Loading />
                                            :
                                            <>
                                                <Form.Group className={styles.mb_24}>
                                                    <Form.Label className={styles.fs_12}>
                                                        <span>Background <span className="field_required">*</span></span>
                                                    </Form.Label>
                                                    <Input type="text" value={values.background} name="background" onChange={handleChange} onBlur={handleBlur} placeholder="VD: Lập trình viên Web fullstack" size="large" className={styles.input} />
                                                    {errors.background && touched.background && <p className="error">{errors.background}</p>}
                                                </Form.Group>
                                                <Form.Group className={`${styles.mb_24} mw_440`}>
                                                    <Form.Label className={styles.fs_12}>
                                                        <span>Vị trí <span className="field_required">*</span></span>
                                                    </Form.Label>
                                                    <Checkbox.Group options={[
                                                        { label: 'Giảng viên', value: ROLE_TEACHER.ST },
                                                        { label: 'Mentor', value: ROLE_TEACHER.MT },
                                                        { label: 'Supporter', value: ROLE_TEACHER.SP },
                                                    ]}
                                                        onChange={(e) => {
                                                            handleRegisterRole(e, setFieldValue);
                                                        }}
                                                        defaultValue={values.role || []}
                                                    />
                                                    {errors.role && <p className="error">{errors.role}</p>}
                                                </Form.Group>
                                                {
                                                    listCourse.response && Array.isArray(listCourse.response.data) && (listCourse.response.data as Array<Obj>).length !== 0 ?
                                                        (listCourse.response.data as Array<Obj>).map((item: Obj, index: number) => {
                                                            const options: CheckboxOptionType[] = [];
                                                            (item.courseLevel as Array<Obj>).forEach((element: Obj) => {
                                                                options.push({
                                                                    label: `${element.levelName as string}(${element.levelCode as string})`,
                                                                    value: element._id as string
                                                                });
                                                            });
                                                            return <Form.Group className={`${styles.mb_24} mw_440`} key={item._id as string}>
                                                                <Form.Label className={styles.fs_12}>
                                                                    <span>{item.courseName as string}</span>
                                                                </Form.Label>
                                                                <Checkbox.Group options={options} defaultValue={(values.coursesRegister[index] as unknown as Obj)?.levelHandle as Array<string> || []} onChange={(e) => {
                                                                    onChange(e, item._id as string, setFieldValue);
                                                                }} />
                                                            </Form.Group>
                                                        }) :
                                                        <>Oops! Chưa có dữ liệu!</>
                                                }
                                                {errors.coursesRegister && listCourse.response && <p className="error">{errors.coursesRegister}</p>}
                                            </>
                                    )
                                )
                            )
                        )
                    }
                </div>
                <Button
                    loading={registerPreTeacher.isLoading}
                    htmlType={`${(step === 5 && isValid) ? 'submit' : 'button'}`}
                    className={`${styles.btn_next} ${step === 2 ? styles.btn_step2 : ''}`}
                    onClick={() => {
                        handleStep('INCRE')
                    }}>
                    <span>
                        {step !== 5 ? 'Tiếp theo' : 'Đăng ký'}
                    </span>
                </Button>
            </Form >
        </div >
    )
}

export default FormRegister;
FormRegister.Layout = AuthLayout;