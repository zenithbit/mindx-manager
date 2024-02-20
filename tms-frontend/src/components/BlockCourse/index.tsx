import React from 'react';
import { useRouter } from 'next/router';
import { Checkbox, Image, Tooltip } from 'antd';
import { Obj } from '@/global/interface';
import { ROLE } from '@/global/enum';
import logo from '@/assets/imgs/logo.png';
import { useHandleDrawer, usePropsPassRoute, useTeacherRegisterCourse } from '@/utils/hooks';
import { mapLevelToColor, mapLevelToColor2 } from '@/global/init';
import useGetCrrUser from '@/utils/hooks/getUser';
import Bookmark from '@/icons/Bookmark';
import Cell from '@/icons/Cell';
import { getTotalTeacher } from './config';
import styles from '@/styles/course/ManagerCourse.module.scss';

interface Props {
    className?: string;
    data?: Obj;
    level?: number;
    isLevel?: boolean;
    dataStatistic?: Obj;
    listRole?: Obj[];
}
const BlockCourse = (props: Props) => {
    const router = useRouter();
    const drawer = useHandleDrawer();
    const crrUser = useGetCrrUser() as Obj;
    const passDataRoute = usePropsPassRoute();
    const listTeacherRegisterCourse = useTeacherRegisterCourse();
    const getCourseId = props.data?._id as string;
    const getListRecordRegisterCourse = listTeacherRegisterCourse.listData.response?.data as Obj[];
    const getCalcTeacher = (crrUser?.data?.roleAccount === ROLE.TE ? getTotalTeacher(getCourseId, getListRecordRegisterCourse) : {}) as Obj;

    const handleClickToDetail = (id?: string) => {
        if (crrUser?.data?.roleAccount === ROLE.TE) {
            if (!props.isLevel) {
                router.push(`/te/manager/storage/course/${id}`);
            } else {
                drawer.open({
                    open: true,
                    title: props.data?.levelName,
                    componentDirection: 'CourseLevelDetail',
                    size: 'default',
                    props: {
                        data: props.data
                    }
                });
            }
        } else {
            if (!props.isLevel) {
                router.push(`/teacher/course/${id}`);
            }
        }
    };
    return (
        <div className={`${styles.blockCourse} ${props.className}`}>
            <div className={`${styles.content} ${props.isLevel ? styles.levelCourse : ''}`}>
                <div className={styles.imageCourse}>
                    <Image height={"100%"} alt="" src={!props.isLevel ? (props.data?.courseImage) : ((props.data?.levelImage) ?? logo)} className={styles.image} />
                </div>
                <div className={styles.course}>
                    <div className={styles.title}>
                        <span
                            className={`${styles.courseName}`}
                            style={{
                                ...props.isLevel ? { background: mapLevelToColor2[props.level as number], color: mapLevelToColor[props.level as number] } : {}
                            }}
                            onClick={() => {
                                handleClickToDetail(props.data?._id as string);
                                if (!props.isLevel) {
                                    passDataRoute.query({
                                        getCalcTeacher,
                                        dataStatistic: props.dataStatistic,
                                    });
                                }
                            }}
                        >
                            {props.isLevel ? props.data?.levelCode : props.data?.courseTitle as string}
                        </span>
                        <span className={styles.action}>
                            <Checkbox checked={props.data?.active}>Active</Checkbox>
                        </span>
                    </div>
                    <div className={styles.combineDescription}>
                        <p className={`${!props.level ? styles.description : ''}`}>
                            {props.data ? (!props.isLevel ? props.data.courseDescription : (`${props.data.levelName}`)) : ''}
                            {props.isLevel && <span><br />{props.data?.levelDescription}</span>}
                        </p>
                        <div className={styles.info}>
                            {props.data && (!props.isLevel ?
                                <div className={styles.infoCourseOverview}>
                                    <p>Khoá học: {props.data.courseName}</p>
                                    <p> Syllabus: {props.data.syllabus ? <a target="_blank" href={props.data.syllabus}>Link</a> : 'Đang cập nhật'}</p>
                                </div> :
                                <div className={styles.infoCourseOverview}>
                                    <p>Mã: {props.data.levelCode}</p>
                                    <p>Tài liệu: {props.data.textbook ? <a target="_blank" href={props.data.textbook}>Link</a> : 'Đang cập nhật'}</p>
                                    <p>Record tham khảo: {props.data.record ? <a target="_blank" href={props.data.record}>Link</a> : 'Đang cập nhật'}</p>
                                    <p>Bộ trắc nghiệm:  <a target="_blank" style={{ cursor: 'pointer' }} onClick={(e) => {
                                        e.preventDefault();
                                        router.push(`/te/manager/storage/course/${router.query.courseId}/${props.data?._id}/test`)
                                    }}>Link</a></p>
                                </div>
                            )}
                        </div>
                    </div>
                    <hr />
                    <div className={styles.info}>
                        <span><Bookmark />{!props.level ? `${(props.data?.courseLevel as Obj[])?.length} Khoá học` : '16/16 Lesson'}</span>
                        <span className={styles.totalTeacher}>
                            {!props.level ? <Tooltip
                                color="white"
                                title={<ul className={styles.listDetail}>
                                    {props.listRole?.map((item) => {
                                        return <li key={item.role}>{item.role}: {item.total}</li>
                                    })}
                                </ul>}>
                                {crrUser?.data?.roleAccount === ROLE.TE && <><Cell />{getCalcTeacher.data.total} GV</>}
                            </Tooltip> :
                                (crrUser?.data?.roleAccount === ROLE.TE && <><Cell />{props.dataStatistic?.[`lv${props.level}`]} GV</>)
                            }
                        </span>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default BlockCourse;