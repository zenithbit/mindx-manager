import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import React, { useEffect, useRef } from 'react';
import ManagerTeacherContext from '../context';
import { Obj } from '@/global/interface';
import { useGetArea, useListTeacher, useTeacherRegisterCourse } from '@/utils/hooks';
import { ComponentPage } from '@/global/enum';
import CombineRoute from '@/global/route';
import { PayloadRoute, initDataRoute } from '@/store/reducers/global-reducer/route';
import { AppDispatch } from '@/store';
import Table from '@/components/Table';
import ToolBar from '@/components/Tabs/ToolBar';
import { getColums, mapRowData } from './config';
import styles from '@/styles/teacher/ManagerTeacher.module.scss';

const ListTeacher = () => {
    const { listTeacher, query } = useListTeacher();
    const dataTeacherRegisterCourse = useTeacherRegisterCourse();
    const router = useRouter();
    const area = useGetArea();
    const getAreas = area.data.response?.data as Obj[];
    const dispatch = useDispatch<AppDispatch>();
    const firstQuery = useRef(true);
    const columns = getColums(undefined, getAreas);
    const rowData = mapRowData((listTeacher.response?.data as Obj)?.listTeacher || [], (dataTeacherRegisterCourse.listData.response?.data as Array<Obj>) || []);
    const handleQueryListTeacher = (rowOnPage: number, currentPage: number) => {
        query(rowOnPage, currentPage);
    }
    const handleClickRow = (record: Obj) => {
        const payload: PayloadRoute = {
            payload: {
                component: ComponentPage.TEACHER_DETAIL,
                route: CombineRoute['TE']['MANAGER']['DETAILTEACHER'],
                title: `Giáo viên: ${record.fullName as string}`,
                hasBackPage: true,
                replaceTitle: `Giáo viên: ${record.fullName as string}`,
                moreData: {
                    teacherId: record._id
                }
            }
        }
        dispatch(initDataRoute(payload));
        router.push(`/te/manager/teacher/detail/${record._id as string}`);
    }
    useEffect(() => {
        handleQueryListTeacher(10, 1);
        if (!area.data.success) {
            area.query();
        }
    }, []);
    useEffect(() => {
        if (firstQuery.current && listTeacher.success) {
            firstQuery.current = false;
            const getListId = ((listTeacher.response?.data as Obj)?.listTeacher as Array<Obj>)?.map((item) => item._id) || [];
            dataTeacherRegisterCourse.query(getListId);
        }
    }, [listTeacher]);
    return (
        <div className={styles.listTeacher}>
            <ToolBar
                context={ManagerTeacherContext}
                onClickReload={() => {
                    //pending get current data pagination
                    handleQueryListTeacher(10, 1);
                }}
                listFilter={[]}
                exportCSVButton
                createButton
                iconReload
            />
            <Table
                loading={listTeacher.isLoading}
                className={styles.tableManagerTeacher}
                disableDefaultPagination
                onChangeDataPagination={(data) => {
                    handleQueryListTeacher(data.currentTotalRowOnPage, data.currentPage);
                }}
                enablePaginationAjax
                bordered
                hasFixedColumn
                columns={columns}
                rowData={rowData}
                hanldeClickRow={handleClickRow}
            />
        </div>
    )
}

export default ListTeacher;