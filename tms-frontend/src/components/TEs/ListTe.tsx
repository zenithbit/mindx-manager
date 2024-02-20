import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Columns, Obj, RowData } from '@/global/interface';
import { useFindGetAllTe } from '@/utils/hooks';
import useGetCrrUser from '@/utils/hooks/getUser';
import Table from '../Table';
import styles from '@/styles/employee/TE.module.scss';

const ListTE = () => {
    const listTe = useFindGetAllTe();
    const router = useRouter();
    const getListTe = listTe.data.response?.data as Obj[];
    const crrUser = useGetCrrUser();
    const columns: Columns = [
        {
            title: 'Họ tên',
            dataIndex: 'teName'
        },
        {
            title: 'Liên hệ',
            children: [
                {
                    title: 'Email',
                    dataIndex: 'email'
                },
                {
                    title: 'SĐT',
                    dataIndex: 'phoneNumber'
                }
            ]
        },
        {
            title: 'Vị trí',
            dataIndex: 'positionTe',
            render(value, record) {
                return `${value}${record.courseId ? `-${(record.courseId as Obj)?.courseName}` : ''}`
            }
        },
        {
            title: 'Trạng thái',
            dataIndex: 'activate',
            render(value) {
                return <div className={`${value ? 'bgRunning' : 'bgStop'} ${styles.statusActive}`}>
                    {value ? 'Hoạt động' : 'Ngưng hoạt động'}
                </div>
            }
        }
    ];
    const rowData: RowData[] = getListTe?.filter((item) => {
        return item._id !== crrUser?.data?._id
    }).map((item) => {
        return {
            key: item._id,
            ...item
        }
    });
    useEffect(() => {
        listTe.query({
            query: {
                fields: '_id,teName,positionTe,courseId,courseName,email,phoneNumber,activate,img',
                getAll: true
            }
        })
    }, []);
    return (
        <div className={styles.listTE}>
            <Table
                columns={columns}
                rowData={rowData}
                disableDefaultPagination
                hanldeClickRow={(record) => {
                    router.push(`/te/manager/staff/${record._id}`)
                }}
            />
        </div>
    )
}

export default ListTE;