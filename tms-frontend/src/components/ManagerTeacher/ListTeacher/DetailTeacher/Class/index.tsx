import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Columns, Obj, RowData } from '@/global/interface';
import { getColorFromStatusClass, mapRoleToString, mapStatusToString } from '@/global/init';
import { ComponentPage, KEY_ICON, ROLE_TEACHER, STATUS_CLASS } from '@/global/enum';
import CombineRoute from '@/global/route';
import { MapIconKey } from '@/global/icon';
import { useClassTeacherRegister, useDispatchDataRouter, useGetTimeSchedule } from '@/utils/hooks';
import { formatDatetoString } from '@/utils';
import Table from '@/components/Table';
import { getMatchingTimeSchedule } from './config';
import TitleHeader from '@/components/ManagerClass/TitleHeader';
import { TabDetailClass } from '@/components/ManagerClass/Detail';
import styles from '@/styles/teacher/DetailTeacher.module.scss';

const Class = () => {
    const listClass = useClassTeacherRegister();
    const listTimeSchedule = useGetTimeSchedule();
    const dispatchRouter = useDispatchDataRouter();
    const router = useRouter();

    const colums: Columns = [
        {
            key: 'CLASS',
            title: 'Lớp',
            dataIndex: 'classId',
            className: `${styles.codeClass}`,
            render(value) {
                return <span>{value?.codeClass || ''}</span>
            },
            onCell(record) {
                return {
                    onClick() {
                        router.push(`/te/manager/class/detail/${(record.classId as Obj)?._id as string}`);
                        const headerComponent = <TitleHeader tabDetail={TabDetailClass.OVERVIEW} editTitle title={(record.classId as Obj)?.codeClass as string} dateStart={formatDatetoString(new Date((record.classId as Obj)?.dayRange?.start as Date), 'dd/MM/yyyy')} statusClass={(record.classId as Obj)?.status as STATUS_CLASS} />;
                        dispatchRouter(CombineRoute['TE']['MANAGER']['DETAILCLASS'], (record.classId as Obj)?.codeClass as string, headerComponent, ComponentPage.DETAILCLASS, true);
                    }
                }
            },
        },
        {
            key: 'STATUS',
            title: 'Trạng thái',
            dataIndex: 'classId',
            render(value) {
                return <div className={styles.statusClass} style={{ backgroundColor: getColorFromStatusClass[value?.status as STATUS_CLASS] }}>
                    {mapStatusToString[value?.status as STATUS_CLASS] || ''}
                </div>;
            }
        },
        {
            key: 'GROUP',
            title: 'Nhóm',
            dataIndex: 'groupNumber',
            render(value, record) {
                return `${value} - ${(record.locationId as Obj)?.locationCode as string}`;
            }
        },
        {
            key: 'SCHEDULE',
            title: 'Lịch học',
            dataIndex: 'classId',
            render(value) {
                const getTimeScheduleData = getMatchingTimeSchedule(listTimeSchedule.data.response?.data as Array<Obj>, value?.timeSchedule as Array<Obj>)
                return getTimeScheduleData.map((item) => {
                    return <p key={item.order as number} style={{ margin: 0 }}>
                        - {item.weekday as string}, {item.start}-{item.end}
                    </p>
                });
            },
        },
        {
            key: 'ROLE',
            title: 'Vị trí',
            dataIndex: 'teacherRegister',
            render(value) {
                const getTeacher = (value as Array<Obj>)?.find((item) => {
                    return item.idTeacher === router.query.teacherId as string;
                })
                return mapRoleToString[getTeacher?.roleRegister as ROLE_TEACHER] || ''
            }
        },
        {
            key: 'TIME_OFF',
            title: 'Buổi nghỉ',
        },
        {
            key: 'SALARY',
            title: 'Lương/h',
        },
        {
            key: 'BONUS',
            title: 'Thưởng/buổi',
        },
        {
            key: 'ENROLL',
            title: 'Tham gia',
            dataIndex: 'teacherRegister',
            className: 'text-center',
            render(value) {
                const crrTeacher = (value as Array<Obj>)?.find((item) => {
                    return item.idTeacher === router.query.teacherId as string;
                });
                return <span className={styles.iconEnroll}>
                    {(crrTeacher?.enroll ? MapIconKey[KEY_ICON.TICK] : MapIconKey[KEY_ICON.CL]) || ''}
                </span>
            }
        }
    ];
    const rowData: RowData[] = (listClass.data.response?.data as Array<Obj>)?.map((item) => {
        return {
            ...item,
            key: item._id as string,
        }
    })
    useEffect(() => {
        listClass.query(router.query.teacherId as string, ['_id', 'classId', 'dayRange', 'start', 'end', 'codeClass', 'timeSchedule', 'status', 'locationId', 'locationCode', 'locationDetail', 'groupNumber', 'teacherRegister', 'roleRegister', 'idTeacher', 'enroll']);
        if (!listTimeSchedule.data.response) {
            listTimeSchedule.query();
        }
    }, []);
    return (
        <div className={styles.classRegister}>
            <Table
                bordered
                loading={listClass.data.isLoading}
                disableDefaultPagination
                enablePaginationAjax
                rowData={rowData}
                columns={colums}
            />
        </div>
    )
}

export default Class;