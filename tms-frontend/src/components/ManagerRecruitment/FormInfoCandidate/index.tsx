import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Form } from 'react-bootstrap';
import * as yup from 'yup';
import { Button, DatePicker, Input, MenuProps, Radio } from 'antd';
import { getStringByLevelTechnique, getStringObjectTeach, getStringResourceApply, mapRoleToString } from '@/global/init';
import dayjs from 'dayjs';
import { Obj } from '@/global/interface';
import { Education, Gender, LevelTechnique, ObjectTeach, ROLE_TEACHER, ResourceApply, ResultInterview, StatusProcessing } from '@/global/enum';
import { useCreateCandidate, useGetArea, useGetDetailCandidate, useGetListCourse, useUpdateCandidate } from '@/utils/hooks';
import { useHookMessage } from '@/utils/hooks/message';
import Dropdown from '@/components/Dropdown';
import SelectInputNumber from '@/components/SelectInputNumber';
import SelectLevelTechnique from '@/components/SelectLevelTechnique';
import styles from '@/styles/Recruitment/ManagerRecruitment.module.scss';

const listObjectTeach: MenuProps['items'] = [
    {
        key: ObjectTeach.K12,
        label: getStringObjectTeach[ObjectTeach.K12]
    },
    {
        key: ObjectTeach.K18,
        label: getStringObjectTeach[ObjectTeach.K18]
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
];
const validationSchema = yup.object({
    timeApply: yup.date().required('Thiếu thời gian ứng tuyển!'),
    dob: yup.date().required('Thiếu ngày tháng năm sinh!'),
    linkCv: yup.string().required('Thiếu link CV!'),
    fullName: yup.string().required('Thiếu họ và tên ứng viên!'),
    phoneNumber: yup.string().required('Thiếu số điện thoại!'),
    jobPosition: yup.string().required('Thiếu vị trí công việc!'),
    resourceApply: yup.string().required('Chưa có nguồn ứng tuyển'),
    courseApply: yup.string().required('Thiếu khối ứng tuyển!'),
    area: yup.string().required('Thiếu khu vực!'),
    technique: yup.string().required('Thiếu công nghệ sử dụng!'),
    scoreTechnique: yup.string().required('Chưa chấm điểm độ thành thạo công nghệ!'),
    scoreJobPosition: yup.string().required('Chưa chấm điểm vị trí việc làm!'),
    email: yup.string().email('Không đúng định dạng email').required('Thiếu email!'),
});

interface Props {
    isViewInfo?: boolean;
    className?: string;
}
const FormInfoCandidate = (props: Props) => {
    const createCandidate = useCreateCandidate();
    const candidate = useGetDetailCandidate();
    const detailCandidate = candidate.data.response?.data as Obj;
    const updateCandidate = useUpdateCandidate();
    const area = useGetArea();
    const mapListArea: MenuProps['items'] = (area.data.response?.data as Obj[])?.map((item) => {
        return {
            key: item._id as string,
            label: item.name as string
        }
    });
    const message = useHookMessage();
    const initValues = {
        fullName: props.isViewInfo ? detailCandidate?.fullName as string : '',
        timeApply: props.isViewInfo ? detailCandidate?.timeApply as string : '',
        courseApply: props.isViewInfo ? detailCandidate?.courseApply?._id as string : '',
        area: props.isViewInfo ? detailCandidate?.area as string : '',
        graduatedUniversity: props.isViewInfo ? detailCandidate?.graduatedUniversity as boolean : false,
        education: props.isViewInfo ? detailCandidate?.education as Education : Education.BACHELOR,
        specializedIt: props.isViewInfo ? detailCandidate?.specializedIt as Boolean : false,
        teacherCertification: props.isViewInfo ? detailCandidate?.teacherCertification as Boolean : false,
        phoneNumber: props.isViewInfo ? detailCandidate?.phoneNumber as string : '',
        levelTechnique: props.isViewInfo ? detailCandidate?.levelTechnique as LevelTechnique : LevelTechnique.FRESHER,
        linkFacebook: props.isViewInfo ? detailCandidate?.linkFacebook as string : '',
        email: props.isViewInfo ? detailCandidate?.email as string : '',
        roleApply: props.isViewInfo ? detailCandidate?.roleApply as ROLE_TEACHER : ROLE_TEACHER.MT,
        dob: props.isViewInfo ? detailCandidate?.dob as string : '',
        note: props.isViewInfo ? detailCandidate?.note as string : '',
        objectExpTeach: props.isViewInfo ? detailCandidate?.objectExpTeach as ObjectTeach : ObjectTeach.K18,
        linkCv: props.isViewInfo ? detailCandidate?.linkCv as string : '',
        expTimeTech: props.isViewInfo ? detailCandidate?.expTimeTech as number : 0,
        scoreSoftsSkill: props.isViewInfo ? detailCandidate?.scoreSoftsSkill as number : 0,
        technique: props.isViewInfo ? detailCandidate?.technique as number : '',
        jobPosition: props.isViewInfo ? detailCandidate?.jobPosition as string : '',
        expTimeTeach: props.isViewInfo ? detailCandidate?.expTimeTeach as number : 0,
        statusProcess: props.isViewInfo ? detailCandidate?.statusProcess as StatusProcessing : StatusProcessing.NOPROCESS,
        result: props.isViewInfo ? detailCandidate?.result as ResultInterview : ResultInterview.PENDING,
        createdAt: props.isViewInfo ? detailCandidate?.createdAt as Date : new Date(),
        updatedAt: props.isViewInfo ? detailCandidate?.updatedAt as Date : new Date(),
        resourceApply: props.isViewInfo ? (detailCandidate?.resourceApply ? detailCandidate?.resourceApply as ResourceApply : ResourceApply.AN) : ResourceApply.AN,
        scoreTechnique: props.isViewInfo ? detailCandidate?.scoreTechnique as number : 0,
        scoreJobPosition: props.isViewInfo ? detailCandidate?.scoreJobPosition as number : 0,
        gender: props.isViewInfo ? detailCandidate?.gender as Gender : Gender.NA,
    }
    const { values, errors, touched, setValues, setFieldValue, setTouched, handleBlur, handleChange, handleSubmit, handleReset } = useFormik({
        initialValues: initValues,
        validationSchema,
        onSubmit(values) {
            if (!props.isViewInfo) {
                createCandidate.query(values);
            } else {
                updateCandidate.query({
                    body: values,
                    params: [detailCandidate?._id as string]
                });
            }
        }
    });
    const refData = useRef(values);
    const getTitleArea = () => {
        const crrArea = (area.data.response?.data as Obj[])?.find((item) => {
            return item?._id === values.area
        });
        return crrArea?.name as string ?? 'Chọn'
    }
    const listCourse = useGetListCourse();
    const getListCourseSelect = (listCourse.listCourse?.data as Array<Obj>)?.map((item) => {
        return {
            key: item._id,
            label: item.courseName
        }
    });
    const listResourceApply: () => MenuProps['items'] = () => {
        const list = Object.keys(ResourceApply);
        return list.map((item) => {
            return {
                key: item,
                label: getStringResourceApply[item as ResourceApply]
            }
        })
    }
    const handleBlurDropdown = (open: boolean, field: keyof typeof values) => {
        if (!open && !touched[field]) {
            setTouched({
                ...touched,
                [field]: true
            });
        }
    };
    const getCrrCourse = (value: string) => {
        const findCourse = (listCourse.listCourse?.data as Array<Obj>)?.find((item) => {
            return item._id === value
        });
        return findCourse
    };
    useEffect(() => {
        area.query();
        listCourse.queryListCourse();
    }, []);
    useEffect(() => {
        if (createCandidate.data.response || updateCandidate.data.response) {

            message.open({
                type: (createCandidate.data.success || updateCandidate.data.response) ? 'success' : 'error',
                content: (createCandidate.data.success || updateCandidate.data.success) ? 'Thành công!' : (createCandidate.data.response?.message as string || updateCandidate.data.response?.message as string)
            });
            message.close(undefined);
            if (updateCandidate.data.response) {
                candidate.query([String(detailCandidate?._id as string)]);
                updateCandidate.clear?.();
            }
            createCandidate.clear();
            if (createCandidate.data.success && !props.isViewInfo) {
                handleReset(null);
            }
        }
    }, [createCandidate.data.response, updateCandidate.data.response]);
    return (
        <div className={`${styles.createCandidate} ${props.className}`}>
            <Form onSubmit={handleSubmit} className={styles.flex}>
                <div className={styles.itemColumn}>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label className="bold">Họ tên <span className="error">*</span></Form.Label>
                        <Input type="text" name="fullName" placeholder="Họ tên" value={values.fullName} size={props.isViewInfo ? 'small' : 'middle'} className={styles.input} onChange={handleChange} onBlur={handleBlur} />
                        {errors.fullName && touched.fullName && <p className="error">{errors.fullName}</p>}
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label className="bold">Thời gian ứng tuyển <span className="field_required">*</span></Form.Label>
                        <br />
                        <DatePicker
                            onBlur={handleBlur}
                            size={props.isViewInfo ? 'small' : 'middle'}
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
                        <Form.Label className="bold">Số ĐT <span className="error">*</span></Form.Label>
                        <Input type="text" name="phoneNumber" placeholder="Số điện thoại" value={values.phoneNumber} size={props.isViewInfo ? 'small' : 'middle'} className={styles.input} onChange={handleChange} onBlur={handleBlur} />
                        {errors.phoneNumber && touched.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label className="bold">Email <span className="error">*</span></Form.Label>
                        <Input type="email" name="email" placeholder="example@gmail.com" value={values.email} size={props.isViewInfo ? 'small' : 'middle'} className={styles.input} onChange={handleChange} onBlur={handleBlur} />
                        {errors.email && touched.email && <p className="error">{errors.email}</p>}
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
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label className="bold">Năm sinh <span className="field_required">*</span></Form.Label>
                        <br />
                        <DatePicker
                            placeholder="Ngày tháng năm sinh"
                            onBlur={handleBlur}
                            size={props.isViewInfo ? 'small' : 'middle'}
                            name='dob'
                            value={values.dob ? dayjs(new Date(values.dob)) : null}
                            onChange={(value: any) => {
                                const getDate = value?.$d || null;
                                setFieldValue('dob', getDate);
                            }}
                            format={'DD/MM/YYYY'}
                            rootClassName={styles.popUpDatePicker}
                        />
                        {errors.dob && touched.dob && <p className="error">{errors.dob}</p>}
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label className="bold">Khu vực <span className="error">*</span></Form.Label>
                        <Dropdown
                            onClickItem={(e) => {
                                setFieldValue('area', e.key);
                            }}
                            trigger="click"
                            listSelect={mapListArea}
                            title={getTitleArea()}
                        />
                        {errors.area && touched.area && <p className="error">{errors.area}</p>}
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label className="bold">Link facebook</Form.Label>
                        <Input type="text" size={props.isViewInfo ? 'small' : 'middle'} name="linkFacebook" value={values.linkFacebook} onChange={handleChange} onBlur={handleBlur} />
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label className="bold">Link CV <span className="error">*</span></Form.Label>
                        <Input type="text" size={props.isViewInfo ? 'small' : 'middle'} name="linkCv" value={values.linkCv} onChange={handleChange} onBlur={handleBlur} />
                        {errors.linkCv && touched.linkCv && <p className="error">{errors.linkCv}</p>}
                    </Form.Group>
                </div>
                <div className={styles.itemColumn}>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label className="bold">Tốt nghiệp đại học <span className="error">*</span></Form.Label>
                        <br />
                        <Radio.Group defaultValue={values.graduatedUniversity} onChange={handleChange} name="graduatedUniversity">
                            <Radio value={true}>Đã tốt nghệp</Radio>
                            <Radio value={false}>Chưa tốt nghệp</Radio>
                        </Radio.Group>
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label className="bold">Chuyên ngành <span className="error">*</span></Form.Label>
                        <br />
                        <Radio.Group defaultValue={values.specializedIt} onChange={handleChange} name="specializedIt">
                            <Radio value={true}>IT</Radio>
                            <Radio value={false}>Khác</Radio>
                        </Radio.Group>
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label className="bold">Học vấn <span className="error">*</span></Form.Label>
                        <br />
                        <Radio.Group defaultValue={values.education} onChange={handleChange} name="education">
                            <Radio value={Education.BACHELOR}>Cử nhân</Radio>
                            <Radio value={Education.ENGINEER}>Kỹ sư</Radio>
                            <Radio value={Education.MASTER}>Thạc sĩ</Radio>
                            <Radio value={Education.DOCTOR}>Tiến sĩ</Radio>
                        </Radio.Group>
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label className="bold">Kinh nghiệm giảng dạy <span className="field_required">*</span></Form.Label>
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
                        <Form.Label className="bold">Đối tượng giảng dạy</Form.Label>
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
                        <Form.Label className="bold">Chứng chỉ NVSP</Form.Label>
                        <br />
                        <Radio.Group defaultValue={values.teacherCertification} onChange={handleChange} name="teacherCertification">
                            <Radio value={true}>Đã có</Radio>
                            <Radio value={false}>Chưa có</Radio>
                        </Radio.Group>
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label className="bold">Nguồn tuyển dụng<span className="field_required">*</span></Form.Label>
                        <Dropdown
                            className={styles.selectResourse}
                            trigger="click"
                            listSelect={listResourceApply()}
                            sizeButton="small"
                            title={getStringResourceApply[values.resourceApply as ResourceApply]}
                            icon
                            onClickItem={(e) => {
                                setFieldValue('resourceApply', e.key as string);
                            }}
                        />
                    </Form.Group>
                </div>
                <div className={styles.itemColumn}>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label className="bold">Vị trí ứng tuyển<span className="field_required">*</span></Form.Label>
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
                        <Form.Label className="bold">Khối ứng tuyển <span className="field_required">*</span></Form.Label>
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
                        <Form.Label className="bold">Công nghệ sử dụng <span className="field_required">*</span></Form.Label>
                        <Input value={values.technique} size={props.isViewInfo ? 'small' : 'middle'} name="technique" onChange={handleChange} onBlur={handleBlur} />
                        {errors.technique && touched.technique && <p className="error">{errors.technique}</p>}
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label className="bold">Thành thạo công nghệ <span className="field_required">*</span></Form.Label>
                        <SelectInputNumber
                            min={0}
                            className={styles.selectExp}
                            value={Number(values.scoreTechnique)}
                            onSelect={(e) => {
                                setFieldValue('scoreTechnique', Number(e.key));
                            }}
                            onChange={(number) => {
                                setFieldValue('scoreTechnique', number);
                            }}
                        />
                        {errors.scoreTechnique && touched.scoreTechnique && <p className="error">{errors.scoreTechnique}</p>}
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label className="bold">Vị trí công việc <span className="field_required">*</span></Form.Label>
                        <Input value={values.jobPosition} size={props.isViewInfo ? 'small' : 'middle'} name="jobPosition" onChange={handleChange} onBlur={handleBlur} />
                        {errors.jobPosition && touched.jobPosition && <p className="error">{errors.jobPosition}</p>}
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label className="bold">Chấm điểm vị trí việc làm <span className="field_required">*</span></Form.Label>
                        <SelectInputNumber
                            min={0}
                            className={styles.selectExp}
                            value={Number(values.scoreJobPosition)}
                            onSelect={(e) => {
                                setFieldValue('scoreJobPosition', Number(e.key));
                            }}
                            onChange={(number) => {
                                setFieldValue('scoreJobPosition', number);
                            }}
                        />
                        {errors.scoreJobPosition && touched.scoreJobPosition && <p className="error">{errors.scoreJobPosition}</p>}
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label className="bold">Trình độ <span className="field_required">*</span></Form.Label>
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
                        <Form.Label className="bold">Số năm kinh nghiệm <span className="field_required">*</span></Form.Label>
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
                        <Form.Label className="bold">Kỹ năng mềm <span className="field_required">*</span></Form.Label>
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
                        <Form.Label className="bold">Ghi chú</Form.Label>
                        <Input.TextArea style={{ resize: 'none' }} rows={2} value={values.note} size={props.isViewInfo ? 'small' : 'middle'} name="note" onChange={handleChange} onBlur={handleBlur} />
                    </Form.Group>
                    <div className={styles.btn}>
                        <Button
                            size="small"
                            htmlType="submit"
                            loading={createCandidate.data.isLoading || updateCandidate.data.isLoading}
                            disabled={JSON.stringify(refData.current) === JSON.stringify(values)}
                        >
                            {props.isViewInfo ? 'Cập nhật' : 'Tạo'}
                        </Button>
                        <Button size="small" disabled={createCandidate.data.isLoading} onClick={handleReset}>Reset</Button>
                    </div>
                </div>
            </Form>
        </div>
    )
}

export default FormInfoCandidate;