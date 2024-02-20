import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Input from 'antd/es/input/Input';
import { Avatar, Badge, Tooltip } from 'antd';
import { Obj } from '@/global/interface';
import { MapIconKey } from '@/global/icon';
import { Gender, KEY_ICON } from '@/global/enum';
import { getColorTeacherPoint } from '@/global/init';
import { useGetTeacherDetail, useTeacherRegisterCourse } from '@/utils/hooks';
import Tabs from '@/components/Tabs';
import Feedback from './Feedback';
import TeacherInfo from './TeacherInfo';
import Salary from './Salary';
import Course from './Course';
import styles from '@/styles/teacher/DetailTeacher.module.scss';
import Account from './Account';

enum TabOverView {
    INFOR = 'INFOR',
    FEEDBACK = 'FEEDBACK',
    SALARY = 'SALARY',
    COURSE = 'COURSE',
    ACCOUNT = 'ACCOUNT'
}

const Overview = () => {
    const currentTeacher = useGetTeacherDetail();
    const dataTeacherRegisterCourse = useTeacherRegisterCourse();
    const router = useRouter();
    const getTeacher = currentTeacher.data.response?.data as Obj;
    const [tabOverView, setTabOverview] = useState<TabOverView>(TabOverView.INFOR);
    const getCourseTeacherRegister = (dataTeacherRegisterCourse.listData.response?.data as Array<Obj>)?.filter((item) => {
        return item.idTeacher === router.query.teacherId
    });
    const getSalaryTeacher = getTeacher?.salaryPH as Array<Obj>;

    // order by: SuperTeacher, Mentor, Suppoter
    const mapRole = [getTeacher?.roleIsST, getTeacher?.roleIsMT, getTeacher?.roleIsSP];
    let count = 0;
    mapRole.forEach((item) => {
        if (item) {
            count += 1;
        }
    });
    const ComponentTabOverview: Record<TabOverView, React.ReactElement> = {
        FEEDBACK: <Feedback />,
        INFOR: <TeacherInfo countRole={count} />,
        SALARY: <Salary />,
        COURSE: <Course />,
        ACCOUNT: <Account />
    }
    useEffect(() => {
        currentTeacher.query(router.query.teacherId as string, []);
        if (!getCourseTeacherRegister) {
            dataTeacherRegisterCourse.query([router.query.teacherId as string]);
        }
    }, []);
    return (
        <div className={styles.overViewTeacher}>
            <div className={styles.headerOverview}>
                <Avatar size={150} icon={getTeacher?.gender === Gender.M ? MapIconKey[KEY_ICON.TEACHER_MALE] : MapIconKey[KEY_ICON.TEACHER_FEMALE]} />
                <div className={styles.overView}>
                    <div className={styles.fullName}>
                        <Tooltip title={`Điểm GV: ${Number(getTeacher?.teacherPoint || 0).toFixed(2)}`}>
                            <Badge count={Number(getTeacher?.teacherPoint || 0).toFixed(2)} offset={[25, 0]} color={getColorTeacherPoint(Number(getTeacher?.teacherPoint || 0))}>
                                {getTeacher?.fullName}
                            </Badge>
                        </Tooltip>
                    </div>
                    <div className={styles.info}>
                        <div className={styles.column}>
                            <p>
                                <b>MST:</b> {getTeacher?.taxCode || ''}
                            </p>
                            <div className={styles.indexes}>
                                <b>Vị trí:</b>
                                <ul>
                                    {mapRole.map((item, idx) => {
                                        return item && <li key={idx}>
                                            {
                                                item && idx === 0 ? 'Giảng viên'
                                                    :
                                                    (item && idx === 1 ? 'Mentor' :
                                                        'Supporter'
                                                    )

                                            }
                                        </li>
                                    })}
                                </ul>
                            </div>
                            <div className={styles.salaryPH}>
                                <b>Lương/h: </b>
                                <Input
                                    size="small"
                                    style={{ width: 'fit-content' }}
                                    value={(getSalaryTeacher?.[getSalaryTeacher.length - 1]?.rank as number || 0).toLocaleString()}
                                />
                            </div>
                        </div>
                        <div className={`${styles.column} ${styles.flex}`}>
                            <div className={styles.courseRegister}>
                                <b>Bộ môn:</b>
                                <div className={styles.listCourseRegister}>
                                    {
                                        getCourseTeacherRegister?.map((item) => {
                                            return (item.coursesRegister as Array<Obj>)?.map((course) => {
                                                return <ul className={styles.containerCourse} key={course.idCourse._id as string}>
                                                    <span className={styles.course}>{course.idCourse.courseName || ''}</span>
                                                    {(course.levelHandle as Array<Obj>)?.map((level, idxLevel) => {
                                                        return <li key={idxLevel}>
                                                            {level.levelCode || ''}
                                                        </li>
                                                    })}
                                                </ul>
                                            })
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr className={styles.hr} />
            <Tabs
                className={styles.listTabChild}
                onClickTab={(key) => {
                    setTabOverview(key as TabOverView)
                }}
                notAllowContent
                activeKey={tabOverView}
                listItemTab={[
                    {
                        key: TabOverView.INFOR,
                        label: 'Cá nhân'
                    },
                    {
                        key: TabOverView.FEEDBACK,
                        label: 'Phản hồi'
                    },
                    {
                        key: TabOverView.SALARY,
                        label: 'Lương'
                    },
                    {
                        key: TabOverView.COURSE,
                        label: 'Bộ môn'
                    },
                    {
                        key: TabOverView.ACCOUNT,
                        label: 'Tài khoản'
                    },
                ]}
            />
            <div className={styles.contentTabOverview}>
                {ComponentTabOverview[tabOverView]}
            </div>
        </div>
    )
}

export default Overview;