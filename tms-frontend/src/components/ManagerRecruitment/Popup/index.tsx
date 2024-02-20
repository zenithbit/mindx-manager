import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import dayjs from 'dayjs';
import { Button, DatePicker, Input, MenuProps, TabsProps, Radio } from 'antd';
import { Form } from 'react-bootstrap';
import * as yup from 'yup';
import { Education, LevelTechnique, ObjectTeach, ROLE_TEACHER, ResourceApply, ResultInterview, StatusProcessing } from '@/global/enum';
import { getStringByLevelTechnique, getStringObjectTeach, getStringResourceApply, getStringResultInterview, getStringStatusProcess, mapRoleToString } from '@/global/init';
import { Obj } from '@/global/interface';
import { useCreateCandidate, useGetDetailCandidate, useGetListCourse } from '@/utils/hooks';
import { useHookMessage } from '@/utils/hooks/message';
import ModalCustomize from '@/components/ModalCustomize';
import Tabs from '@/components/Tabs';
import SelectLevelTechnique from '@/components/SelectLevelTechnique';
import Dropdown from '@/components/Dropdown';
import SelectInputNumber from '@/components/SelectInputNumber';
import styles from '@/styles/Recruitment/ManagerRecruitment.module.scss'

interface Props {
    isCreate?: boolean;
    show: boolean;
    onHide?: () => void;
    title?: string;
}

const listSelectResourse: MenuProps['items'] = [
    {
        key: ResourceApply.FB,
        label: getStringResourceApply[ResourceApply.FB],
    },
    {
        key: ResourceApply.LKD,
        label: getStringResourceApply[ResourceApply.LKD],
    },
    {
        key: ResourceApply.RF,
        label: getStringResourceApply[ResourceApply.RF],
    },
    {
        key: ResourceApply.AN,
        label: getStringResourceApply[ResourceApply.AN]
    }
];
const statusProcessing: MenuProps['items'] = [
    {
        key: StatusProcessing.PROCESSING,
        label: getStringStatusProcess[StatusProcessing.PROCESSING]
    },
    {
        key: StatusProcessing.NOPROCESS,
        label: getStringStatusProcess[StatusProcessing.NOPROCESS]
    },
    {
        key: StatusProcessing.DONE,
        label: getStringStatusProcess[StatusProcessing.DONE]
    }
];
const mailingProcessing: MenuProps['items'] = [
    {
        key: 'UNDONE',
        label: 'Chưa gửi'
    },
    {
        key: 'DONE',
        label: 'Đã gửi'
    }
];
const resultProcessing: MenuProps['items'] = [
    {
        key: 'PASS',
        label: 'Đạt'
    },
    {
        key: 'NOTPASS',
        label: 'Trượt'
    },
];
const roleRegister: MenuProps['items'] = [
    {
        key: ROLE_TEACHER.ST,
        label: mapRoleToString[ROLE_TEACHER.ST]
    },
    {
        key: ROLE_TEACHER.MT,
        label: mapRoleToString[ROLE_TEACHER.MT]
    },
    {
        key: ROLE_TEACHER.SP,
        label: mapRoleToString[ROLE_TEACHER.SP]
    },
]
const listObjectTeach: MenuProps['items'] = [
    {
        key: ObjectTeach.K12,
        label: getStringObjectTeach[ObjectTeach.K12]
    },
    {
        key: ObjectTeach.K18,
        label: getStringObjectTeach[ObjectTeach.K18]
    },
]
const validationSchema = yup.object({
    timeApply: yup.date().required('Thiếu thời gian ứng tuyển!'),
    dob: yup.date().required('Thiếu ngày tháng năm sinh!'),
    linkCv: yup.string().required('Thiếu link CV!'),
    fullName: yup.string().required('Thiếu họ và tên ứng viên!'),
    phoneNumber: yup.string().required('Thiếu số điện thoại!'),
    courseApply: yup.string().required('Thiếu khối ứng tuyển!'),
    email: yup.string().email('Không đúng định dạng email').required('Thiếu email!'),
});

const Popup = (props: Props) => {
    const candidate = useGetDetailCandidate();
    const firstMounted = useRef(true);
    const listCourse = useGetListCourse();
    const message = useHookMessage();
    const createCandidate = useCreateCandidate();
    const { values, errors, touched, handleChange, handleSubmit, handleBlur, setValues, setFieldValue, setTouched } = useFormik({
        initialValues: {
            fullName: '',
            timeApply: '',
            courseApply: '',
            graduatedUniversity: false,
            education: Education.BACHELOR,
            specializedIt: true,
            teacherCertification: false,
            phoneNumber: '',
            levelTechnique: LevelTechnique.FRESHER,
            linkFacebook: '',
            email: '',
            roleApply: ROLE_TEACHER.MT,
            dob: '',
            note: '',
            resourceApply: ResourceApply.FB,
            objectExpTeach: ObjectTeach.K18,
            linkCv: '',
            expTimeTech: 0,
            scoreSoftsSkill: 0,
            technique: '',
            expTimeTeach: 0,
            statusProcess: StatusProcessing.NOPROCESS,
            sendMail: false,
            dateInterview: '',
            linkMeet: '',
            result: ResultInterview.PENDING,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        validationSchema,
        onSubmit(value) {
            createCandidate.query(value);
        }
    });
    const getListCourseSelect = (listCourse.listCourse.data as Array<Obj>)?.map((item) => {
        return {
            key: item._id,
            label: item.courseName
        }
    })
    const getCrrCourse = (value: string) => {
        const findCourse = (listCourse.listCourse.data as Array<Obj>).find((item) => {
            return item._id === value
        });
        return findCourse
    };
    const handleBlurDropdown = (open: boolean, field: keyof typeof values) => {
        if (!open && !touched[field]) {
            setTouched({
                ...touched,
                [field]: true
            });
        }
    }
    const tabsForm: TabsProps['items'] = [
        {
            key: 'RECRUIMENT',
            label: 'Thông tin tuyển dụng',
            children: <div className={styles.infoResourse}>
                <div className={styles.left}>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Họ và tên: <span className="field_required">*</span></Form.Label>
                        <Input type="text" size="small" name="fullName" value={values.fullName} onChange={handleChange} onBlur={handleBlur} />
                        {errors.fullName && touched.fullName && <p className="error">{errors.fullName}</p>}
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Thời gian ứng tuyển <span className="field_required">*</span></Form.Label>
                        <br />
                        <DatePicker
                            onBlur={handleBlur}
                            size="small"
                            name='timeApply'
                            value={values.timeApply ? dayjs(new Date(values.timeApply)) : null}
                            onChange={(value: any) => {
                                const getDate = value?.$d || null;
                                setFieldValue('timeApply', getDate);
                            }}
                            format={'DD/MM/YYYY'}
                            rootClassName={styles.popUpDatePicker} />
                        {errors.timeApply && touched.timeApply && <p className="error">{errors.timeApply}</p>}
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Vị trí <span className="field_required">*</span></Form.Label>
                        {/* pending handle change */}
                        <Dropdown
                            className={styles.selectResourse}
                            trigger="click"
                            listSelect={roleRegister}
                            sizeButton="small"
                            title={mapRoleToString[values.roleApply as ROLE_TEACHER]}
                            icon
                            onClickItem={(e) => {
                                setFieldValue('roleApply', e.key as string);
                            }}
                        />
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Nguồn ứng tuyển <span className="field_required">*</span></Form.Label>
                        {/* pending handle change */}
                        <Dropdown
                            className={styles.selectResourse}
                            trigger="click"
                            listSelect={listSelectResourse}
                            onClickItem={(e) => {
                                setFieldValue('resourceApply', e.key as string);
                            }}
                            sizeButton="small"
                            title={getStringResourceApply[values.resourceApply as ResourceApply]}
                            icon
                        />
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Link CV: <span className="field_required">*</span></Form.Label>
                        <Input type="text" size="small" name="linkCv" value={values.linkCv} onChange={handleChange} onBlur={handleBlur} />
                        {errors.linkCv && touched.linkCv && <p className="error">{errors.linkCv}</p>}
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Ghi chú</Form.Label>
                        <Input.TextArea value={values.note} name="note" onChange={handleChange} />
                    </Form.Group>
                </div>
                <div className={styles.right}>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Năm sinh <span className="field_required">*</span></Form.Label>
                        <br />
                        <DatePicker
                            onBlur={handleBlur}
                            size="small"
                            name='dob'
                            value={values.dob ? dayjs(new Date(values.dob)) : null}
                            onChange={(value: any) => {
                                const getDate = value?.$d || new Date();
                                setFieldValue('dob', getDate);
                            }}
                            format={'DD/MM/YYYY'}
                            rootClassName={styles.popUpDatePicker}
                        />
                        {errors.dob && touched.dob && <p className="error">{errors.dob}</p>}
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Số điện thoại <span className="field_required">*</span></Form.Label>
                        <Input type="text" size="small" name="phoneNumber" value={values.phoneNumber} onChange={handleChange} onBlur={handleBlur} />
                        {errors.phoneNumber && touched.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Email <span className="field_required">*</span></Form.Label>
                        <Input type="text" size="small" onChange={handleChange} name="email" value={values.email} onBlur={handleBlur} />
                        {errors.email && touched.email && <p className="error">{errors.email}</p>}
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Link facebook</Form.Label>
                        <Input type="text" size="small" name="linkFacebook" value={values.linkFacebook} onChange={handleChange} />
                    </Form.Group>
                </div>
            </div>
        },
        {
            key: 'SKILL',
            label: 'Kỹ năng',
            children: <div className={styles.skill}>
                <div className={styles.left}>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Khối ứng tuyển <span className="field_required">*</span></Form.Label>
                        <Dropdown
                            onOpenChange={(e) => {
                                handleBlurDropdown(e, 'courseApply');
                            }}
                            className={`${styles.courseRegister}`}
                            trigger="click"
                            listSelect={getListCourseSelect}
                            sizeButton="small"
                            title={getCrrCourse(values.courseApply as string)?.courseName as string || ''}
                            icon
                            onClickItem={(e) => {
                                setFieldValue('courseApply', e.key as string);
                            }}
                        />
                        {errors.courseApply && touched.courseApply && !values.courseApply && <p className="error">{errors.courseApply}</p>}
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Số năm kinh nghiệm <span className="field_required">*</span></Form.Label>
                        <SelectInputNumber
                            value={Number(values.expTimeTech || 0)}
                            min={0}
                            step={0.5}
                            className={styles.selectExp}
                            onSelect={(e) => {
                                setFieldValue('expTimeTech', Number(e.key));
                            }}
                            onChange={(number) => {
                                setFieldValue('expTimeTech', number);
                            }}
                        />
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Trình độ <span className="field_required">*</span></Form.Label>
                        <SelectLevelTechnique
                            size="small"
                            title={getStringByLevelTechnique[values.levelTechnique as LevelTechnique]}
                            className={styles.levelTechnique}
                            onSelect={(e) => {
                                setFieldValue('levelTechnique', e.key);
                            }}
                        />
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Kỹ năng mềm <span className="field_required">*</span></Form.Label>
                        <SelectInputNumber
                            max={5}
                            min={0}
                            value={Number(values.scoreSoftsSkill)}
                            onSelect={(e) => {
                                setFieldValue('scoreSoftsSkill', Number(e.key));
                            }}
                            onChange={(number) => {
                                setFieldValue('scoreSoftsSkill', number);
                            }}
                            className={styles.selectExp}
                        />
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Kinh nghiệm giảng dạy <span className="field_required">*</span></Form.Label>
                        <SelectInputNumber
                            min={0}
                            className={styles.selectExp}
                            value={Number(values.expTimeTeach)}
                            onSelect={(e) => {
                                setFieldValue('expTimeTeach', Number(e.key));
                            }}
                            onChange={(number) => {
                                setFieldValue('expTimeTeach', number);
                            }}
                        />
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Đối tượng giảng dạy</Form.Label>
                        <Dropdown
                            className={`${styles.courseRegister}`}
                            trigger="click"
                            listSelect={listObjectTeach}
                            sizeButton="small"
                            title={getStringObjectTeach[values.objectExpTeach as ObjectTeach]}
                            onClickItem={e => {
                                setFieldValue('objectExpTeach', e.key as string);
                            }}
                            icon
                        />
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Chứng chỉ NVSP</Form.Label>
                        <Radio.Group defaultValue={values.teacherCertification} onChange={handleChange} name="teacherCertification">
                            <Radio value={true}>Đã có</Radio>
                            <Radio value={false}>Chưa có</Radio>
                        </Radio.Group>
                    </Form.Group>
                </div>
                <div className={styles.right}>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Tốt nghiệp đại học</Form.Label>
                        <Radio.Group defaultValue={values.graduatedUniversity} onChange={handleChange} name="graduatedUniversity">
                            <Radio value={true}>Đã tốt nghệp</Radio>
                            <Radio value={false}>Chưa tốt nghệp</Radio>
                        </Radio.Group>
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Tốt nghiệp chuyên ngành</Form.Label>
                        <Radio.Group defaultValue={values.specializedIt} onChange={handleChange} name="specializedIt">
                            <Radio value={true}>IT</Radio>
                            <Radio value={false}>Khác</Radio>
                        </Radio.Group>
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Học vấn</Form.Label>
                        <Radio.Group defaultValue={values.education} onChange={handleChange} name="education">
                            <Radio value={Education.BACHELOR}>Cử nhân</Radio>
                            <Radio value={Education.ENGINEER}>Kỹ sư</Radio>
                            <Radio value={Education.MASTER}>Thạc sĩ</Radio>
                            <Radio value={Education.DOCTOR}>Tiến sĩ</Radio>
                        </Radio.Group>
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Công nghệ sử dụng <span className="field_required">*</span></Form.Label>
                        <Input value={values.technique} name="technique" onChange={handleChange} />
                    </Form.Group>
                    {
                        !props.isCreate && <Button className={styles.mrAuto}>Đánh giá</Button>
                    }
                </div>
            </div>
        },
        {
            key: 'PROCESSING',
            label: 'Tiến độ xử lý',
            children: <div className={styles.processing}>
                <div className={styles.left}>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Trạng thái</Form.Label>
                        <Dropdown
                            className={`${styles.statusProcessing}`}
                            trigger="click"
                            listSelect={statusProcessing}
                            sizeButton="small"
                            title={getStringStatusProcess[values.statusProcess as StatusProcessing]}
                            icon
                            onClickItem={(e) => {
                                setFieldValue('statusProcess', e.key as string);
                            }}
                        />
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Gửi mail</Form.Label>
                        <Dropdown
                            className={`${styles.statusProcessing}`}
                            trigger="click"
                            listSelect={mailingProcessing}
                            sizeButton="small"
                            title={values.sendMail ? 'Đã gửi' : 'Chưa gửi'}
                            icon
                            onClickItem={(e) => {
                                if (e.key === 'UNDONE') {
                                    setFieldValue('sendMail', false);
                                } else {
                                    setFieldValue('sendMail', true);
                                }
                            }}
                        />
                    </Form.Group>
                </div>
                <div className={styles.right}>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Lịch PV</Form.Label>
                        <br />
                        <DatePicker
                            className=''
                            size="small"
                            value={values.dateInterview ? dayjs(new Date(values.dateInterview)) : null}
                            onChange={(value: any) => {
                                const getDate = value?.$d || null;
                                setFieldValue('dateInterview', getDate);
                            }}
                            format={'DD/MM/YYYY'}
                            rootClassName={styles.popUpDatePicker}
                        />
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Link meet</Form.Label>
                        <Input type="text" size="small" value={values.linkMeet} name="linkMeet" onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Kết quả</Form.Label>
                        <Dropdown
                            className={`${styles.statusProcessing}`}
                            trigger="click"
                            listSelect={resultProcessing}
                            sizeButton="small"
                            title={getStringResultInterview[values.result as ResultInterview]}
                            icon
                            onClickItem={(e) => {
                                setFieldValue('result', e.key);
                            }}
                        />
                    </Form.Group>
                    {props.isCreate && <Button htmlType="submit">Tạo</Button>}
                </div>
            </div>
        }
    ];
    useEffect(() => {
        if (candidate.data.response && candidate.data.response.data && firstMounted.current && !props.isCreate) {
            firstMounted.current = false;
            setValues({
                ...candidate.data.response.data as any
            });
        }
    }, [candidate]);
    useEffect(() => {
        if (!listCourse.listCourse && !listCourse.success) {
            listCourse.queryListCourse();
        }
    }, [listCourse]);
    useEffect(() => {
        if (createCandidate.data.response) {
            message.open({
                type: createCandidate.data.success ? 'success' : 'error',
                content: createCandidate.data.success ? 'Thêm ứng viên thành công!' : 'Tạo ứng viên thất bại!'
            });
            message.close(undefined, () => {
                createCandidate.clear();
            });
        }
    }, [createCandidate]);
    return (
        <div className={styles.popup}>
            <ModalCustomize
                onHide={props.onHide}
                show={props.show}
                centered
                modalHeader={<h2>{props.title}</h2>}
            >
                <div className={styles.contentPopup}>
                    <Form className={styles.form} onSubmit={handleSubmit}>
                        <Tabs
                            className={styles.tabList}
                            listItemTab={tabsForm}
                        />
                    </Form>
                </div>
            </ModalCustomize>
        </div>
    )
}

export default Popup;