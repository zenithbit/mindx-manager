import React, { useEffect, useRef } from 'react';
import { ClockCircleOutlined, InfoCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { Button, Image } from 'antd';
import { Obj } from '@/global/interface';
import { ROLE } from '@/global/enum';
import { useGetListCourse, useHandleDrawer, useListTeacher, usePropsPassRoute, useTeacherRegisterCourse } from '@/utils/hooks';
import { formatDatetoString } from '@/utils';
import useGetCrrUser from '@/utils/hooks/getUser';
import AttachDocument from '@/icons/AttachDocument';
import Bookmark from '@/icons/Bookmark';
import IconEdit2 from '@/icons/IconEdit2';
import ChartColumn from './ChartColumn';
import BlockCourse from '../BlockCourse';
import Loading from '../loading';
import { filterTeacherWithCourse, getStatisticTeacher } from '../OverView/TeacherStatistic/config';
import Empty from '../Empty';
import styles from '@/styles/course/ManagerCourse.module.scss';

const CourseDetail = () => {
    const crrUser = useGetCrrUser() as Obj;
    const listCourse = useGetListCourse();
    const courseApply = useTeacherRegisterCourse();
    const getListCourseApplyData = courseApply.listData.response?.data as Obj[] | Obj;
    const drawer = useHandleDrawer();
    const router = useRouter();
    const passDataRoute = usePropsPassRoute();
    const fistMounted = useRef(true);
    const listValueCourse = (listCourse.listCourse?.data as Array<Obj>);
    const currentCourse = crrUser?.data?.roleAccount === ROLE.TE ? listValueCourse?.find((item) => {
        return item._id === router.query.courseId as string;
    }) : ((getListCourseApplyData as Obj)?.coursesRegister as Obj[])?.find(item => item.idCourse._id === router.query.courseId as string);
    const getCurrentCourse = (currentCourse?.courseLevel ?? currentCourse?.levelHandle) as Obj[];
    const listTeacher = useListTeacher();
    const getListTeacher = (listTeacher.listTeacher?.response?.data as Obj)?.listTeacher as Obj[] || [];
    const listCourseMapName = (passDataRoute.data.response as Obj)?.dataStatistic ?? (crrUser?.data?.roleAccount === ROLE.TE ? getStatisticTeacher(listValueCourse, getListCourseApplyData as Obj[], getListTeacher) : {});

    const getDataStatistic = ((listCourseMapName.categories as Obj[])?.map((item) => {
        const listTeacherByCourse = filterTeacherWithCourse(getListCourseApplyData as Obj[], getListTeacher, item?.id);
        return {
            key: item.id as string,
            course: item.name,
            total: listTeacherByCourse?.length || 0,
            st: listTeacherByCourse?.filter(tc => tc?.roleIsST).length || 0,
            mt: listTeacherByCourse?.filter(tc => tc?.roleIsMT).length || 0,
            sp: listTeacherByCourse?.filter(tc => tc?.roleIsSP).length || 0,
            ...item.getTotalTeacherByCourse[item.id]
        }
    }) ?? []).find((item) => {
        return item.course === currentCourse?.courseName
    });
    const handleOpenDrawerCourseDetail = () => {
        drawer.open({
            open: true,
            componentDirection: 'CourseDetail/FormCourse',
            size: "default",
            title: <div className={styles.titleCourseDetailDrawer}>{currentCourse?.courseTitle ?? currentCourse?.idCourse?.courseTitle}</div>,
            props: {
                currentCourse
            }
        });
    }

    useEffect(() => {
        if (!listTeacher.listTeacher.response && crrUser?.data?.roleAccount === ROLE.TE) {
            listTeacher.query(undefined, undefined, {
                fields: ['_id', 'roleIsMT', 'roleIsST', 'roleIsSP']
            })
        }
    }, []);
    useEffect(() => {
        if (!listValueCourse && crrUser?.data?.roleAccount === ROLE.TE) {
            listCourse.queryListCourse();
        }
        if (listValueCourse) {
            fistMounted.current = false;
        }
    }, [listCourse.listCourse]);
    useEffect(() => {
        if (!courseApply.listData.response && !courseApply.listData.isLoading) {
            courseApply.query(crrUser?.data?.roleAccount === ROLE.TE ? undefined : [crrUser?.data?._id as string]);
        }
    }, []);
    return (
        <div className={styles.courseDetail}>
            {((listCourse.loading || courseApply.listData.isLoading) && fistMounted.current) ? <Loading isCenterScreen /> :
                (currentCourse ? <>
                    <div className={styles.header}>
                        <div className={styles.leftHeader}>
                            <div className={styles.courseImage}>
                                <Image alt="" height={200} src={currentCourse?.courseImage ?? currentCourse?.idCourse?.courseImage ?? '/static/ci.jpeg'} className={styles.image} />
                            </div>
                        </div>
                        <div className={styles.rightHeader}>
                            <div style={{ float: "right", display: "flex", gap: "0.8rem" }}>
                                {listCourse.loading && <Loading />}
                                <Button onClick={() => {
                                    listCourse.queryListCourse();
                                }}>
                                    <ReloadOutlined />
                                </Button>
                            </div>
                            <div className={styles.combineTop}>
                                <p className={`${styles.title}`}>{currentCourse.courseTitle ?? currentCourse?.idCourse?.courseTitle} {crrUser?.data?.roleAccount === ROLE.TE && <IconEdit2 className={styles.iconEdit} onClick={handleOpenDrawerCourseDetail} />}</p>
                                <div className={styles.groupInfo}>
                                    <div className={styles.infoOverview}>
                                        <div className={styles.left}>
                                            <span className={styles.attachLink}>
                                                <AttachDocument className={styles.icon} />
                                                <span><b>Tên khoá</b>: {currentCourse.courseName ?? currentCourse?.idCourse?.courseName}</span>
                                            </span>
                                            <span className={styles.attachLink}>
                                                <AttachDocument className={styles.icon} />
                                                <span><b>Syllabus</b>: {(currentCourse.syllabus || currentCourse?.idCourse?.syllabus) ? <a href={`${currentCourse.syllabus ?? currentCourse?.idCourse?.syllabus}`} target="_blank">Link</a> : 'Chưa có'}</span>
                                            </span>
                                            <span className={styles.attachLink}>
                                                <Bookmark className={styles.iconBookmark} /><span><b>Số khoá học</b>: {((currentCourse.courseLevel ?? currentCourse?.idCourse?.courseLevel) as Obj[])?.length}</span>
                                            </span>
                                        </div>
                                        <div className={styles.right}>
                                            <span className={styles.attachLink}>
                                                <InfoCircleOutlined className={styles.icon} /><span><b>Trạng thái</b>: {(currentCourse.active || currentCourse?.idCourse?.active) ? 'Hoạt động' : 'Ngừng hoạt động'}</span>
                                            </span>
                                            {/* <span className={styles.attachLink}>
                                                <Employee className={styles.icon} /><span><b>TE QC</b>: Trần Đăng khoa</span>
                                            </span> */}
                                            <span className={styles.attachLink}>
                                                <ClockCircleOutlined className={styles.icon} /><span><b>Cập nhật lúc</b>: {formatDatetoString((currentCourse.updatedAt ?? currentCourse?.idCourse?.updatedAt) as string ?? new Date(), 'HH:mm, dd/MM/yyyy')}</span>
                                            </span>
                                            <span className={`${styles.attachLink} ${styles.des}`}>
                                                {currentCourse.courseDescription ?? currentCourse?.idCourse?.courseDescription}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {crrUser?.data?.roleAccount === ROLE.TE && <div className={styles.chartOverviewLevel}>
                                <ChartColumn />
                            </div>}
                        </div>
                    </div>
                    <hr />
                    <div className={styles.listCourse}>
                        {crrUser?.data?.roleAccount === ROLE.TE && <Button className={styles.btnCreateCourseLevel} onClick={() => {
                            drawer.open({
                                open: true,
                                componentDirection: 'CourseLevelDetail',
                                props: {
                                    isCreate: true
                                }
                            })
                        }}>Tạo cấp độ</Button>
                        }
                        {
                            getCurrentCourse ?
                                (getCurrentCourse.length !== 0 ? getCurrentCourse?.map((item, idx) => {
                                    return <BlockCourse key={item._id ?? idx} dataStatistic={getDataStatistic} data={item} level={item.levelNumber} isLevel className={styles.itemCourse} />
                                }) : <Empty />) :
                                (<Empty />)
                        }
                    </div>
                </> : <div>Không tồn tại khoá học</div>)
            }
        </div>
    )
}

export default CourseDetail;