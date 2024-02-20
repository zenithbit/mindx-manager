import React from 'react';
import { Form } from 'react-bootstrap';
import { Button, Input } from 'antd';
import { Obj } from '@/global/interface';
import useGetCrrUser from '@/utils/hooks/getUser';
import { Tab } from '.';
import styles from '@/styles/teacher/TeacherInfo.module.scss';

interface Props {
    isEdit: boolean,
    tabEdit: Tab,
    onConfirm: () => void;
}

const About = (props: Props) => {
    const currentUser = useGetCrrUser()?.data as Obj;
    const initValues = {
        fullName: currentUser?.fullName ?? '',
        email: currentUser?.email ?? '',
        facebookLink: currentUser?.facebookLink ?? '',
        phoneNumber: currentUser?.phoneNumber ?? '',
        address: currentUser?.address ?? '',
        taxCode: currentUser?.taxCode ?? '',
        dob: currentUser?.dob ?? '',
        area: currentUser?.area ?? '',
        educationInfo: currentUser?.educationInfo ?? '',
        background: currentUser?.background ?? '',
        companyInfo: currentUser?.companyInfo ?? '',
        bankName: currentUser?.bankName ?? '',
        bankNumber: currentUser?.bankNumber ?? '',
        bankHolderName: currentUser?.bankHolderName ?? ''
    }
    return (
        <div className={styles.aboutTeacher}>
            <Form className={styles.formInfo}>
                <div className={styles.formData}>
                    <div className={styles.row}>
                        <Form.Group>
                            <Form.Label className={styles.label}>Họ và tên: </Form.Label>
                            {
                                props.isEdit ?
                                    <Input size="small" value={currentUser?.fullName as string} />
                                    :
                                    currentUser?.fullName as string
                            }
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className={styles.label}>Email: </Form.Label>
                            {
                                props.isEdit ? <Input size="small" value={currentUser?.email as string} />
                                    :
                                    currentUser?.email as string
                            }
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className={styles.label}>Facebook:</Form.Label>
                            {
                                props.isEdit ? <Input size="small" value={currentUser?.facebookLink as string} />
                                    :
                                    currentUser?.facebookLink as string
                            }
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className={styles.label}>Link CV:</Form.Label>
                            {
                                props.isEdit ? <Input size="small" value={currentUser?.CVfile as string} />
                                    :
                                    <a href={currentUser?.CVfile as string}>Link</a>
                            }
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className={styles.label}>SĐT:</Form.Label>
                            {
                                props.isEdit ? <Input size="small" value={currentUser?.phoneNumber as string} />
                                    :
                                    currentUser?.phoneNumber as string
                            }
                        </Form.Group>
                    </div>
                    <div className={styles.row}>
                        <Form.Group>
                            <Form.Label className={styles.label}>Địa chỉ:</Form.Label>
                            {
                                props.isEdit ?
                                    <Input size="small" value={currentUser?.address as string} />
                                    :
                                    currentUser?.address as string
                            }
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className={styles.label}>Mã số thuế:</Form.Label>
                            {
                                props.isEdit ? <Input size="small" value={currentUser?.taxCode as string} />
                                    :
                                    currentUser?.taxCode as string
                            }
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className={styles.label}>Ngày sinh:</Form.Label>
                            {
                                props.isEdit ?
                                    <Input size="small" value={currentUser?.dob as string} />
                                    :
                                    currentUser?.dob as string
                            }
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className={styles.label}>Khu vực:</Form.Label>
                            {
                                props.isEdit ? <Input size="small" value={currentUser?.area as string} />
                                    :
                                    currentUser?.area as string
                            }
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className={styles.label}>Trường học/Ngành học:</Form.Label>
                            {
                                props.isEdit ? <Input size="small" value={currentUser?.educationInfo as string} />
                                    :
                                    currentUser?.educationInfo as string
                            }
                        </Form.Group>
                    </div>
                    <div className={styles.row}>
                        <Form.Group>
                            <Form.Label className={styles.label}>Background:</Form.Label>
                            {
                                props.isEdit ? <Input size="small" value={currentUser?.background as string} />
                                    :
                                    currentUser?.background as string
                            }
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className={styles.label}>Công ty:</Form.Label>
                            {
                                props.isEdit ? <Input size="small" value={currentUser?.companyInfo as string} />
                                    :
                                    currentUser?.companyInfo as string
                            }
                        </Form.Group>
                    </div>
                    <div className={styles.bankInfo}>
                        <Form.Group>
                            <Form.Label className={styles.label}>Tên ngân hàng:</Form.Label>
                            {
                                props.isEdit ? <Input size="small" value={currentUser?.bankName as string} />
                                    :
                                    currentUser?.bankName as string
                            }
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className={styles.label}>STK:</Form.Label>
                            {
                                props.isEdit ? <Input size="small" value={currentUser?.bankNumber as string} />
                                    :
                                    currentUser?.bankNumber as string
                            }
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className={styles.label}>Chủ TK:</Form.Label>
                            {
                                props.isEdit ? <Input size="small" value={currentUser?.bankHolderName as string} />
                                    :
                                    currentUser?.bankHolderName as string
                            }
                        </Form.Group>
                    </div>
                </div>
                {
                    props.isEdit && <div className={styles.btnHandle}>
                        <Button>Reset</Button>
                        <Button>Cập nhật</Button>
                    </div>
                }
            </Form>
        </div>
    )
}

export default About;