import React, { useEffect } from 'react';
import { Button, Input } from 'antd';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Form } from 'react-bootstrap';
import { Obj } from '@/global/interface';
import { formatDatetoString } from '@/utils';
import { useCreateFeedbackClautid, useGetCandidateOnboard, useGetClautidForCandidateOnboard, useGetFeedbackClautid } from '@/utils/hooks';
import { useHookMessage } from '@/utils/hooks/message';
import styles from '@/styles/Recruitment/Candidate.module.scss';

const initValues = {
    contentSession: '',
    fbST: '',
    fbMT: '',
    fbDoc: ''
}
const validationSchema = yup.object({
    contentSession: yup.string().required('Bạn cần điền nội dung buổi học!'),
    fbST: yup.string().required('Bạn cần điền nhận xét giảng viên!'),
    fbMT: yup.string().required('Bạn cần điền nhận xét mentor!'),
});
interface Props {
    dataClass: Obj;
    countTime: number;
    closeModel: () => void;
    isCreate?: boolean;
}
const Feedback = (props: Props) => {
    const candidateInfo = useGetCandidateOnboard();
    const createFeedback = useCreateFeedbackClautid();
    const message = useHookMessage();
    const candidateClautid = useGetClautidForCandidateOnboard();
    const feedbackClautid = useGetFeedbackClautid();
    const getFeedbackClautid = feedbackClautid.data.response?.data as Array<Obj>;
    const getCandidateInfo = (candidateInfo.data.response?.data as Array<Obj>)?.[0];

    const { values, errors, touched, handleBlur, handleChange, handleReset, handleSubmit, setValues } = useFormik({
        initialValues: initValues,
        validationSchema,
        onSubmit(values) {
            if (props.isCreate) {
                const mapPayload = {
                    ...values,
                    countTime: props.countTime,
                    class: props.dataClass.classId._id,
                    candidateId: getCandidateInfo._id
                };
                createFeedback.query({
                    body: mapPayload
                });
            }
        },
    });
    useEffect(() => {
        if (createFeedback.data.response) {
            if (createFeedback.data.success) {
                props.closeModel();
            }
            message.open({
                content: createFeedback.data.response.message as string,
                type: createFeedback.data.success ? 'success' : 'error'
            });
            createFeedback.clear?.();
            candidateClautid.query({
                query: {
                    candidateId: getCandidateInfo._id
                }
            });
            message.close();
        }
    }, [createFeedback.data]);
    useEffect(() => {
        if (feedbackClautid.data.response && !props.isCreate) {
            const findCurrentClassFeedback = getFeedbackClautid.find(item => {
                return item.class === props.dataClass.classId._id as string
            });
            if (findCurrentClassFeedback) {
                setValues({
                    contentSession: findCurrentClassFeedback.contentSession,
                    fbDoc: findCurrentClassFeedback.fbDoc,
                    fbMT: findCurrentClassFeedback.fbMT,
                    fbST: findCurrentClassFeedback.fbST
                });
            }
        }
    }, [feedbackClautid.data.response, props.dataClass, props.isCreate]);
    return (
        <div className={styles.fillFeedbackClautid}>
            <p>
                Lớp: <b>{props.dataClass.classId.codeClass}</b>
            </p>
            <p>
                Ngày dự thính: {formatDatetoString(props.dataClass.time, 'iiiiii, dd/MM/yyyy')}
            </p>
            <p>
                Lần: {props.countTime + 1}
            </p>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>
                        Nội dung buổi học <span className="error">*</span>
                    </Form.Label>
                    <Input.TextArea value={values.contentSession} style={{ resize: 'none' }} name="contentSession" onChange={handleChange} onBlur={handleBlur} />
                    {errors.contentSession && touched.contentSession && <p className="error">{errors.contentSession}</p>}
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        Nhận xét về giáo viên <span className="error">*</span>
                    </Form.Label>
                    <Input.TextArea value={values.fbST} style={{ resize: 'none' }} name="fbST" onChange={handleChange} onBlur={handleBlur} />
                    {errors.fbST && touched.fbST && <p className="error">{errors.fbST}</p>}
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        Nhận xét về mentor <span className="error">*</span>
                    </Form.Label>
                    <Input.TextArea value={values.fbMT} style={{ resize: 'none' }} name="fbMT" onChange={handleChange} onBlur={handleBlur} />
                    {errors.fbMT && touched.fbMT && <p className="error">{errors.fbMT}</p>}
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        Góp ý thêm về giáo trình, bài tập
                    </Form.Label>
                    <Input.TextArea value={values.fbDoc} style={{ resize: 'none' }} name="fbDoc" onChange={handleChange} onBlur={handleBlur} />
                </Form.Group>
                {
                    props.isCreate && <div className={styles.btnGroup}>
                        <Button size="small" onClick={handleReset}>Reset</Button>
                        <Button size="small" htmlType="submit" loading={createFeedback.data.isLoading}>Gửi</Button>
                    </div>
                }
            </Form>
        </div>
    )
}

export default Feedback;