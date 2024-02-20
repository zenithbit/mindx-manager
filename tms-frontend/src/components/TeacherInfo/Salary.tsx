import React from 'react';
import { Tooltip } from 'antd';
import { Columns, Obj, RowData } from '@/global/interface';
import useGetCrrUser from '@/utils/hooks/getUser';
import { formatDatetoString } from '@/utils';
import Table from '../Table';
import styles from '@/styles/teacher/TeacherInfo.module.scss';

const Salary = () => {
    const currentUser = useGetCrrUser()?.data as Obj;
    const rowData: RowData[] = (currentUser?.salaryPH as Obj[])?.map((item) => {
        return {
            key: item.index as string,
            ...item
        }
    })
    const columns: Columns = [
        {
            title: 'Ngày cập nhật',
            dataIndex: 'updateAt',
            render(value) {
                return value ? formatDatetoString(value as string, 'dd/MM/yyyy') : ''
            }
        },
        {
            title: 'Mức lương',
            children: [
                {
                    title: <span> Super Teacher <Tooltip title="Lương/75%"><sup>i</sup></Tooltip></span>,
                    dataIndex: 'rank',
                    render(value) {
                        return Math.round((Number(value) / 0.75)).toLocaleString()
                    }
                },
                {
                    title: 'Mentor',
                    dataIndex: 'rank',
                    render(value) {
                        return Number(value).toLocaleString()
                    }
                },
                {
                    title: 'Supporter',
                    dataIndex: 'rank',
                    render(value) {
                        return Number(value).toLocaleString()
                    }
                }
            ]
        },
    ];
    return (
        <div className={styles.salary}>
            <Table
                columns={columns}
                disableDefaultPagination
                rowData={rowData}
            />
        </div>
    )
}

export default Salary;