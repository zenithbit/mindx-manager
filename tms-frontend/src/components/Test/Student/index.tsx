import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Obj } from '@/global/interface';
import { useHookMessage } from '@/utils/hooks/message';
import { Button, Input } from 'antd';
import { useQuizzTestSocket, useStudentJoinRoomQuizz } from '@/utils/hooks';
import Waiting from './Waiting';
import styles from "@/styles/Test.module.scss";

const validationSchema = yup.object({
    studentName: yup.string().required('Bạn cần nhập họ tên!'),
    email: yup.string().required('Bạn cần nhập email!'),
    room: yup.string().required('Bạn cần nhập mã phòng!')
});
const Student = () => {
    const studentJoinRoom = useStudentJoinRoomQuizz();
    const quizzTest = useQuizzTestSocket();
    const [joined, setJoined] = useState<boolean>(false);
    const message = useHookMessage();
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            studentName: '',
            email: '',
            room: ''
        },
        validationSchema,
        onSubmit(values) {
            // if (!joined) {
            studentJoinRoom.query({
                body: values
            });
            // }
        }
    });
    const handleJoinRoom = () => {
        quizzTest.queryRoom(values.room, {
            codeClass: values.room,
            finish: false,
            join: true,
            start: false,
            duringInTheTest: false,
            student: {
                studentName: values.studentName,
                email: values.email
            }
        });
    }
    useEffect(() => {
        if (studentJoinRoom.data.response && !joined) {
            message.open({
                content: studentJoinRoom.data.response?.message as string,
                type: studentJoinRoom.data.success ? 'success' : 'error'
            });
            if (studentJoinRoom.data.success) {
                setJoined(true);
                handleJoinRoom();
            } else {
                studentJoinRoom.clear?.();
            }
            message.close();
        }
    }, [studentJoinRoom.data, joined]);
    return (
        <div className={styles.containerForm}>
            {
                !joined ? <Form className={styles.studentQuizz} onSubmit={handleSubmit}>
                    <div className={styles.header}>
                        <p>Thực hiện kiểm tra</p>
                    </div>
                    <div className={styles.contentForm}>
                        <Form.Group>
                            <Form.Label>
                                Tên <span className="error">*</span>
                            </Form.Label>
                            <Input name="studentName" value={values.studentName} onChange={handleChange} onBlur={handleBlur} placeholder="VD: N1_Nguyễn Văn A" />
                            {errors.studentName && touched.studentName && <p className="error">{errors.studentName}</p>}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Email <span className="error">*</span>
                            </Form.Label>
                            <Input name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} />
                            {errors.email && touched.email && <p className="error">{errors.email}</p>}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Mã phòng <span className="error">*</span>
                            </Form.Label>
                            <Input name="room" value={values.room} onChange={handleChange} onBlur={handleBlur} />
                            {errors.room && touched.room && <p className="error">{errors.room}</p>}
                        </Form.Group>
                        <Button className={styles.btnSubmit} htmlType="submit" loading={studentJoinRoom.data.isLoading} disabled={studentJoinRoom.data.isLoading}>Tham gia</Button>
                    </div>
                </Form> : <Waiting currentStudent={values} />
            }
        </div>
    )
}

export default Student;