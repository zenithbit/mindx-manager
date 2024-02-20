import React from 'react';
import { Columns, Obj, RowData } from '@/global/interface';
import { useGetListCourse, useListTeacher, useTeacherRegisterCourse } from '@/utils/hooks';
import Table from '@/components/Table';
import { filterTeacherWithCourse, getStatisticTeacher } from './config';
import styles from '@/styles/Overview.module.scss';

const TableOverViewTotalTeacher = () => {
    const listTeacher = useListTeacher() as Obj;
    const getListTeacher = listTeacher.listTeacher?.response?.data?.listTeacher as Obj[] || [];
    const { listCourse } = useGetListCourse();
    const getListCourse = listCourse?.data as Obj[];
    const courseApply = useTeacherRegisterCourse();
    const getListCourseApplyData = courseApply.listData.response?.data as Obj[];
    const listCourseMapData = getStatisticTeacher(getListCourse, getListCourseApplyData, getListTeacher);
    const columns: Columns = [
        {
            title: 'Bộ môn',
            dataIndex: 'course'
        },
        {
            title: 'Tổng giáo viên',
            dataIndex: 'total'
        },
        {
            title: 'Giảng viên',
            dataIndex: 'st'
        },
        {
            title: 'Mentor',
            dataIndex: 'mt'
        },
        {
            title: 'Supporter',
            dataIndex: 'sp'
        },
        {
            title: 'Lv1',
            dataIndex: 'lv1'
        },
        {
            title: 'Lv2',
            dataIndex: 'lv2'
        },
        {
            title: 'Lv3',
            dataIndex: 'lv3'
        },
        {
            title: 'Lv4',
            dataIndex: 'lv4'
        },
    ]
    const rowData: RowData[] = listCourseMapData.categories?.map((item) => {
        const listTeacherByCourse = filterTeacherWithCourse(getListCourseApplyData, getListTeacher, item?.id);
        return {
            key: item.id as string,
            course: item.name,
            total: listTeacherByCourse?.length || 0,
            st: listTeacherByCourse?.filter(tc => tc?.roleIsST).length || 0,
            mt: listTeacherByCourse?.filter(tc => tc?.roleIsMT).length || 0,
            sp: listTeacherByCourse?.filter(tc => tc?.roleIsSP).length || 0,
            ...item.getTotalTeacherByCourse[item.id]
        }
    }) || [];
    return (
        <div className={styles.tableOverViewTotalTeacher}>
            <Table
                bordered
                disableDefaultPagination
                columns={columns}
                rowData={rowData}
            />
        </div>
    )
}

export default TableOverViewTotalTeacher;