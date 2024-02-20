import React, { useEffect } from 'react';
import { Button, Collapse, Input, Radio } from 'antd';
import { useFormik } from 'formik';
import { CaretRightOutlined, DeleteOutlined } from '@ant-design/icons';
import { Obj } from '@/global/interface';
import { uuid } from '@/utils';
import { useHookMessage } from '@/utils/hooks/message';
import { useCreateQuestionQuiz, useGetListQuestion } from '@/utils/hooks';
const { Panel } = Collapse;
import PickTypeQuestion, { TypeQuestion } from '../PickTypeQuestion';
import { mappingListQuestionWithOption } from './config';
import styles from '@/styles/Test.module.scss';

interface Options {
    content: string;
    isCorrect: Boolean;
    key: string;
    order: number
}
interface Question extends Obj {
    title: string;
    type: keyof typeof TypeQuestion;
    options: Options[];
    collectionQuizId: string;
    key: string;
    _id?: string;
    order: number;
}
interface Props {
    courseLevelId: string;
    courseId: string;
    collectionQuizId: string;
}
const QuestionComponent = ((props: Props) => {
    const listQuestion = useGetListQuestion();
    const message = useHookMessage();
    const saveQuestionQuiz = useCreateQuestionQuiz();
    const getListQuestion = listQuestion.data.response?.data as Obj;
    const compareData = (listQuestion.data.payload?.query?.query?.collectionQuizId as string) === props.collectionQuizId;
    const { values, setFieldValue } = useFormik({
        initialValues: {
            question: []
        },
        onSubmit(values) {
        }
    });

    const handleAddNewQuestion = () => {
        const newQuestion: Question = {
            title: `Câu số ${values.question.length + 1}`,
            type: 'QUIZ',
            collectionQuizId: props.collectionQuizId,
            key: uuid(),
            options: [1, 2, 3, 4].map((_, index) => {
                return {
                    content: '',
                    isCorrect: false,
                    key: uuid(),
                    order: index + 1
                }
            }),
            order: values.question.length + 1
        };
        setFieldValue('question', [...values.question, newQuestion])
    };
    const handleRemove = (index: number) => {
        const question = (values.question[index] as Obj);
        if (question._id) {
            question.isDelete = true;
        } else {
            values.question.splice(index, 1);
        }
        setFieldValue('question', [...values.question]);
    };
    const handleChangeQuestion = (title: string, type: keyof typeof TypeQuestion, idx: number, changeType: boolean) => {
        const findQuestion = values.question[idx] as Question;
        findQuestion.title = title;
        findQuestion.type = type;
        if (changeType) {
            const getListFromdb = ((getListQuestion?.listOption as Obj[]).filter(item => {
                return item.questionId === findQuestion._id && item.type === type
            }) as Options[]).sort((a, b) => a.order - b.order);
            if (type === 'BOOLEAN') {
                findQuestion.options = getListFromdb.length !== 0 ? getListFromdb : [
                    {
                        content: 'True',
                        isCorrect: false,
                        key: uuid(),
                        order: 1
                    },
                    {
                        content: 'False',
                        isCorrect: false,
                        key: uuid(),
                        order: 2
                    }
                ];
            } else {
                console.log(getListFromdb);
                findQuestion.options = getListFromdb.length !== 0 ? getListFromdb : ([1, 2, 3, 4].map((_, index) => {
                    return {
                        content: '',
                        isCorrect: false,
                        key: uuid(),
                        order: index + 1
                    }
                }));
            }
        }
        setFieldValue('question', [...values.question]);
    };
    const handleChangeOtionsBoolean = (indexCorrect: number, indexQuestion: number) => {
        const updatedQuestions = [...values.question] as Obj[];
        const findQuestion = { ...updatedQuestions[indexQuestion] }; // Tạo bản sao của đối tượng question
        const updatedOptions = [...findQuestion.options]; // Tạo bản sao của mảng options

        updatedOptions[indexCorrect] = { ...updatedOptions[indexCorrect], isCorrect: true };
        updatedOptions[updatedOptions.length - indexCorrect - 1] = {
            ...updatedOptions[updatedOptions.length - indexCorrect - 1],
            isCorrect: false
        };

        findQuestion.options = updatedOptions;
        updatedQuestions[indexQuestion] = findQuestion;

        setFieldValue('question', updatedQuestions);
    };
    const handleChangeContentAnswer = (value: string, indexQuestion: number, indexAnswer: number, indexCorrect: number) => {
        const findQuestion = values.question[indexQuestion] as Question;
        findQuestion.options[indexAnswer].content = value;
        setFieldValue('question', [...values.question]);
    }
    const handleChangeRadioQuiz = (index: number, indexQuestion: number) => {
        const updatedQuestions = [...values.question] as Obj[];
        const findQuestion: Obj = { ...updatedQuestions[indexQuestion] as Obj };
        const updatedOptions = findQuestion.options.map((item: Obj, idx: number) => ({
            ...item,
            isCorrect: idx === index,
        })) as Obj[];
        findQuestion.options = updatedOptions;
        updatedQuestions[indexQuestion] = findQuestion as Obj;
        setFieldValue('question', updatedQuestions);
    };
    const handleSubmit = () => {
        saveQuestionQuiz.query({
            body: {
                listQuestion: values.question
            }
        });
    }
    useEffect(() => {
        if (((!listQuestion.data.response || !compareData) && !listQuestion.data.isLoading)) {
            listQuestion.query({
                query: {
                    collectionQuizId: props.collectionQuizId
                }
            });
        }
        if (listQuestion.data.success && compareData) {
            const getQuestions = mappingListQuestionWithOption(getListQuestion.listQuestion, getListQuestion.listOption)
            setFieldValue('question', getQuestions);
        }
    }, [listQuestion.data]);
    useEffect(() => {
        if (saveQuestionQuiz.data.response) {
            if (saveQuestionQuiz.data.success) {
                listQuestion.query({
                    query: {
                        collectionQuizId: props.collectionQuizId
                    }
                });
            } else {
                message.open({
                    content: saveQuestionQuiz.data.response?.message as string,
                    type: 'error'
                });
                message.close();
            }
            saveQuestionQuiz.clear?.();
        }
    }, [saveQuestionQuiz.data.response]);
    return (
        <div className={styles.question}>
            <Collapse
                bordered={false}
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                className="site-collapse-custom-collapse"
            >
                {
                    (values.question as Question[]).map((item, idx) => {
                        return !item.isDelete && <Panel
                            header={<div className={styles.header}
                                onClick={e => {
                                    e.stopPropagation();
                                }}>
                                <Input
                                    size="small"
                                    onChange={(e) => {
                                        handleChangeQuestion(e.target.value as string, item.type, idx, false);
                                    }}
                                    placeholder="Nhập câu hỏi"
                                    value={item.title}
                                    style={{ width: '90%' }}
                                />
                                <span onClick={e => {
                                    e.stopPropagation();
                                }}>
                                    <PickTypeQuestion
                                        type={item.type}
                                        onChange={(key) => {
                                            handleChangeQuestion(item.title, key as TypeQuestion, idx, true);
                                        }}
                                        className={styles.pickQuestion}
                                    />
                                </span>
                                <DeleteOutlined onClick={e => {
                                    e.stopPropagation();
                                    handleRemove(idx);
                                }} />
                            </div>}
                            key={item.key}
                            className="site-collapse-custom-panel"
                        >
                            {
                                item.type === 'QUIZ' ? <Radio.Group
                                    className={styles.parent}
                                    onChange={(e) => {
                                        handleChangeRadioQuiz(e.target.value, idx);
                                    }}
                                    value={item.options.findIndex((option) => option.isCorrect)}
                                >
                                    {item.options.map((item: Obj, radioIndex) => {
                                        return <div key={item._id} className={`${styles[`div${radioIndex + 1}`]} ${styles.answer}`}>
                                            <Input
                                                value={item.content}
                                                onChange={(e) => {
                                                    handleChangeContentAnswer(e.target.value, idx, radioIndex, radioIndex);
                                                }}
                                            />
                                            <Radio className={styles.radio} value={radioIndex} />
                                        </div>
                                    })}
                                </Radio.Group> :
                                    <Radio.Group
                                        className={styles.typeBoolean}
                                        onChange={(e) => {
                                            handleChangeOtionsBoolean(e.target.value, idx);
                                        }}
                                        value={item.options.findIndex((option) => option.isCorrect)}
                                    >
                                        {item.options.map((_, radioIndex) => {
                                            return <Radio key={radioIndex} className={`${styles.radio} ${styles.itemRadio}`} value={radioIndex}>{_.content}</Radio>
                                        })}
                                    </Radio.Group>
                            }
                        </Panel>
                    })
                }
            </Collapse>
            <div className={styles.listQuestion}>
                <div className={styles.addQuestion}>
                    <Button onClick={handleAddNewQuestion}>Thêm câu hỏi</Button>
                    <Button onClick={handleSubmit}>Lưu</Button>
                </div>
            </div>
        </div>
    )
});

export default QuestionComponent;