import React, { useEffect } from 'react';
import Table from '../Table';
import { Columns, Obj, RowData } from '@/global/interface';
import { useListRequestOnLeave } from '@/utils/hooks';
import styles from '@/styles/RequestOnLeave.module.scss'

const RequestOnleave = () => {
    const listRequest = useListRequestOnLeave();
    const getListRequest = (listRequest.data.response?.data as Obj)?.data as Obj[];
    console.log(getListRequest);
    const columns: Columns = [
        {
            title: 'Ngày yêu cầu',
            dataIndex: 'createdAt'
        },
        {
            title: 'Giáo viên'
        },
        {
            title: 'Lớp'
        },
        {
            title: 'Cơ sở'
        },
        {
            title: 'Buổi'
        },
        {
            title: 'Role'
        },
        {
            title: 'Giáo viên thay'
        },
        {
            title: 'Trạng thái'
        }
    ];
    const rowData: RowData[] = getListRequest?.map((item) => {
        return {
            ...item,
            key: item._id
        }
    })
    useEffect(() => {
        listRequest.query({
            query: {
                currentPage: 1,
                recordOnPage: 10
            }
        });
    }, []);

    return (
        <div className={styles.containerRequestOnLeave}>
            <Table
                columns={columns}
                rowData={rowData}
                disableDefaultPagination
                enablePaginationAjax
            />
        </div>
    )
}

export default RequestOnleave;