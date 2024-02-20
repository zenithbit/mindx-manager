import React, { useEffect, useState } from 'react';
import { Avatar, Button } from 'antd';
import { Form } from 'react-bootstrap';
import TextArea from 'antd/es/input/TextArea';
import { useSelector } from 'react-redux';
import { getLabelPositionTe } from '@/global/init';
import { Obj, State } from '@/global/interface';
import { MapIconKey } from '@/global/icon';
import { KEY_ICON, PositionTe } from '@/global/enum';
import { formatDatetoString, shortenName } from '@/utils';
import { useHookMessage } from '@/utils/hooks/message';
import { useCreateCommentsRoundProcess, useGetDataRoundComments, useGetDataRoundProcess, useGetListCourse } from '@/utils/hooks';
import { RootState } from '@/store';
import NoData from '@/components/table-ant/NoData';
import UnCheck from '@/icons/UnCheck';
import Send from '@/icons/Send';
import styles from '@/styles/Recruitment/ManagerRecruitment.module.scss';

interface Props {
    comment?: Obj;
    isCreate?: boolean;
    className?: string;
    queryComment?: () => void;
    courseName?: string;
}
export const Comment = (props: Props) => {
    const crrUser = useSelector((state: RootState) => (state.crrUserInfo as State).state);
    const [comment, setComment] = useState<string>('');
    const createComment = useCreateCommentsRoundProcess();
    const currentRound = useGetDataRoundProcess();
    const message = useHookMessage();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const getCommentValue = (e.target as any).comment.value;
        const getCurrentRound = (currentRound.data.response?.data as Array<Obj>)?.[0];
        if (getCurrentRound) {
            createComment.query({
                body: {
                    roundId: getCurrentRound._id as string,
                    content: getCommentValue,
                    teId: (crrUser.response?.data as Obj)._id as string
                }
            });
        }
    }
    useEffect(() => {
        if (createComment.data.response) {
            if (!createComment.data.success) {
                message.open({
                    content: createComment.data.response.message as string,
                    type: 'error'
                });
            } else {
                props.queryComment?.();
                setComment('');
            }
            createComment.clear?.();
            message.close();
        }
    }, [createComment.data]);
    return (
        <div className={`${styles.comment} ${props.isCreate && styles.isCreate}`}>
            <div className={styles.author}>
                <Avatar size="large" />
                <span>
                    <span className={styles.user}>
                        {
                            shortenName(props.isCreate ?
                                (crrUser.response?.data as Obj).teName as string
                                :
                                props.comment?.teId.teName)
                        }
                    </span>
                    <br />
                    <span>{getLabelPositionTe[props.isCreate ? ((crrUser.response as Obj)?.data?.positionTe as PositionTe)
                        :
                        (props.comment?.teId.positionTe as PositionTe)]}
                        {props.courseName ? ` ${props.courseName}` : ''}
                    </span>
                </span>
            </div>
            <div className={styles.commentContent}>
                {
                    !props.isCreate && <small className={styles.updatedAt}>
                        {formatDatetoString(props.comment ? new Date(props.comment.updatedAt) : new Date(), 'MMMM dd, yyyy - HH:mm a')}
                    </small>
                }
                {
                    !props.isCreate && <p className={styles.cmtContent}>
                        {(props.comment?.content as string)?.slice(0, 200)}
                    </p>
                }
                {
                    props.isCreate && <Form onSubmit={handleSubmit}>
                        <TextArea name="comment" value={comment} onChange={(e) => {
                            setComment(e.target.value);
                        }} className={styles.inputComment} autoSize styles={{ textarea: { resize: 'none' } }} placeholder="Để lại feedback!" />
                        <div className={styles.btnFnc}>
                            <Button className={styles.buttonFormComment}>
                                <UnCheck />
                            </Button>
                            <Button disabled={!comment} loading={createComment.data.isLoading} className={styles.buttonFormComment} htmlType="submit">
                                <Send className={styles.send} />
                            </Button>
                        </div>
                    </Form>
                }
            </div>
            {!props.isCreate && <div className={styles.action}>
                {MapIconKey[KEY_ICON.DOT3VT]}
            </div>}
        </div>
    )
}

interface ListCommentProps {
    className?: string;
    roundId?: string;
}
const ListComment = (props: ListCommentProps) => {
    const dataComments = useGetDataRoundComments();
    const crrUser = useSelector((state: RootState) => (state.crrUserInfo as State).state);
    const getDataComments = (dataComments.data.response?.data as Array<Obj>) || [];
    const course = useGetListCourse();

    const getCourseTe = (courseId: Obj) => {
        const courseTe = (course.listCourse?.data as Array<Obj>)?.find((item) => {
            return courseId === item._id
        });
        return courseTe
    }
    return <div className={styles.containerComment}>
        <Comment isCreate queryComment={() => {
            dataComments.query(props.roundId as string, ['roundId', 'teId', '_id', 'teName', 'courseId', 'content', 'createdAt', 'updatedAt', 'positionTe']);
        }}
            courseName={getCourseTe((crrUser.response as Obj)?.data?.courseId?._id)?.courseName}
        />
        <div className={props.className}>
            {
                getDataComments.length === 0 ? <NoData className={styles.nodataCenter} /> :
                    getDataComments.map((item) => {
                        return <Comment
                            key={item._id as string}
                            comment={item}
                            courseName={getCourseTe(item.teId?.courseId)?.courseName}
                        />
                    })
            }
        </div>
    </div>

};
export default ListComment;