import React, { useEffect } from 'react';
import { Obj, RowData } from '@/global/interface';
import { useGetPreTeacher } from '@/utils/hooks';
import Table from '@/components/Table';
import { getConfigColumns } from './config';
import styles from '@/styles/teacher/DetailTeacher.module.scss';

const WaitingAccept = () => {
    const columns = getConfigColumns();
    const listPreTeacher = useGetPreTeacher();
    const rowData: RowData[] = ((listPreTeacher.data.response as Obj)?.data.list as Array<Obj>)?.map((item) => {
        return {
            ...item,
            key: item._id as string
        }
    });
    useEffect(() => {
        listPreTeacher.query(10, 1);
    }, []);
    return (
        <div className={styles.waitingAccept}>
            <Table
                rowData={rowData}
                loading={listPreTeacher.data.isLoading}
                disableDefaultPagination
                columns={columns}
            />
        </div>
    )
}

export default WaitingAccept;