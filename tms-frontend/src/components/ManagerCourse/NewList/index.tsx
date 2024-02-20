import React, { useEffect } from 'react';
import { Obj } from '@/global/interface';
import { ROLE, ROLE_TEACHER } from '@/global/enum';
import { useGetListCourse, useListTeacher, useTeacherRegisterCourse } from '@/utils/hooks';
import useGetCrrUser from '@/utils/hooks/getUser';
import BlockCourse from '@/components/BlockCourse';
import { getStatisticTeacher } from '@/components/OverView/TeacherStatistic/config';
import styles from '@/styles/course/ManagerCourse.module.scss';

const NewListCourse = () => {
    const crrUser = useGetCrrUser() as Obj;
    const listCourse = useGetListCourse();
    const listValueCourse = (listCourse.listCourse?.data as Array<Obj>);
    const listTeacher = useListTeacher();
    const getListTeacher = (listTeacher.listTeacher?.response?.data as Obj)?.listTeacher as Obj[] || [];
    const courseApply = useTeacherRegisterCourse();
    const getListCourseApplyData = courseApply.listData.response?.data as Obj[] | Obj;
    const listCourseMapName = (crrUser?.data?.roleAccount === ROLE.TE ? getStatisticTeacher(listValueCourse, getListCourseApplyData as Obj[], getListTeacher) : {}) as Obj;
    useEffect(() => {
        if (crrUser?.data?.roleAccount === ROLE.TE) {
            if (!listValueCourse) {
                listCourse.queryListCourse();
            }
            listTeacher.query(undefined, undefined, {
                fields: ['_id', 'roleIsMT', 'roleIsST', 'roleIsSP']
            })
        }
    }, []);
    useEffect(() => {
        if (!courseApply.listData.response && !courseApply.listData.isLoading) {
            courseApply.query(crrUser?.data?.roleAccount === ROLE.TE ? undefined : [crrUser?.data?._id as string]);
        }
    }, []);
    return (
        <div className={styles.listCourse}>
            {crrUser?.data?.roleAccount === ROLE.TE ? listValueCourse?.map((item, index) => {
                const getListRole: Obj[] = [];
                if (crrUser?.data?.roleAccount === ROLE.TE) {
                    for (const key in listCourseMapName.data) {
                        const newRole = {
                            role: key,
                            total: listCourseMapName.data[key as ROLE_TEACHER][index]
                        };
                        getListRole.push(newRole);
                    }
                }
                return <BlockCourse dataStatistic={listCourseMapName} listRole={getListRole} className={styles.itemCourse} data={item} key={item._id as string} />
            }) :
                (((getListCourseApplyData as Obj)?.coursesRegister as Obj[])?.map((item, idx) => {
                    return <BlockCourse dataStatistic={listCourseMapName} className={styles.itemCourse} data={item.idCourse} key={idx} />
                }))
            }
        </div>
    )
}

export default NewListCourse;