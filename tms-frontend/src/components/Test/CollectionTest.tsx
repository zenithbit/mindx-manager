import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Image, Input } from 'antd';
import { Form } from 'react-bootstrap';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { EyeTwoTone } from '@ant-design/icons';
import { Obj } from '@/global/interface';
import { LOGO } from '@/global/init-data';
import { useHandleDrawer, useSaveRoomQuizzTest } from '@/utils/hooks';
import ModalCustomize from '../ModalCustomize';
import styles from '@/styles/Test.module.scss';

interface Props {
    data?: Obj;
}
const validationSchema = yup.object({
    codeClass: yup.string().required('Bạn cần nhập mã lớp!')
});
const CollectionTest = (props: Props) => {
    const drawer = useHandleDrawer();
    const router = useRouter();
    const [modal, setModal] = useState(false);
    const saveRoomQuizzTest = useSaveRoomQuizzTest();
    const { values, handleChange, handleSubmit, handleBlur, errors, touched } = useFormik({
        initialValues: {
            codeClass: ''
        },
        validationSchema,
        onSubmit(values) {
            saveRoomQuizzTest.query({
                body: {
                    ...values,
                    questionId: props.data?._id as string
                }
            });
        }
    })
    const handleOpenForm = () => {
        drawer.open({
            open: true,
            componentDirection: 'Test/CollectionQuestion',
            props: {
                courseLevelId: router.query.couyrseLevelId as string,
                courseId: router.query.courseId as string,
                collectionQuizId: props.data?._id as string,
            },
            title: <div className={styles.titleCollectioTest}>
                <span className={styles.title}>Câu hỏi kiểm tra</span>
                <div className={styles.button}>
                    <Button>Xoá</Button>
                </div>
            </div>,
            className: 'drawerCreateQuestion',
            rootClassName: 'drawerCreateQuestion',
            size: "large"
        });
    };
    const handleCreateExamination = () => {
        setModal(true);
    }
    return (
        <div className={styles.collectionTest}>
            <div className={styles.mainBlock}>
                <Image alt='' src={LOGO} />
                <div className={styles.content}>
                    <span className={styles.eye} onClick={() => {
                        handleOpenForm();
                    }}><EyeTwoTone /></span>
                    <p><b>{props.data?.title}</b></p>
                    <p>10 câu hỏi</p>
                    <Button size="small" onClick={handleCreateExamination}>Bắt đầu</Button>
                </div>
            </div>
            {
                modal && <ModalCustomize
                    show={modal}
                    modalHeader={<div>Bắt đầu kiểm tra</div>}
                    onHide={() => {
                        setModal(false);
                    }}
                    centered
                    size="sm"
                >
                    <Form
                        onSubmit={handleSubmit}
                        className={styles.acceptExamination}
                    >
                        <Input name="codeClass" onChange={handleChange} onBlur={handleBlur} size="small" placeholder="Nhập mã lớp" />
                        {errors.codeClass && touched.codeClass && <p className="error">{errors.codeClass}</p>}
                        {saveRoomQuizzTest.data.success && <a href={`/quizz/${values.codeClass}`} target="_blank">Link</a>}
                        <Button size="small" htmlType="submit" loading={saveRoomQuizzTest.data.isLoading}>Xác nhận</Button>
                    </Form>
                </ModalCustomize>
            }
        </div >
    )
}

export default CollectionTest;