import React from 'react';
import { uuid } from '@/utils';
import { Columns, RowData } from '@/global/interface';
import Table from '@/components/Table';
import styles from '@/styles/class/DetailClass.module.scss';

const Student = () => {
    const columns: Columns = [
        {
            key: 'ORDER',
            title: 'STT',
            dataIndex: 'order',
            fixed: 'left',
            width: 50,
            render(_, __, index) {
                return index + 1
            }
        },
        {
            key: 'CUSTOMERNAME',
            title: 'Họ và tên',
            dataIndex: 'customerName',
            fixed: 'left',
            width: 180
        },
        {
            key: 'STATUS',
            title: 'Trạng thái',
            dataIndex: 'status',
            fixed: 'left',
            width: 100,
            className: 'text-center',
        },
        {
            key: 'EMAIL',
            title: 'Email',
            dataIndex: 'email',
            width: 200
        },
        {
            key: 'FACEBOOK',
            title: 'Facebook',
            dataIndex: 'facebook',
            className: 'text-center',
            render(value) {
                return <span>Link</span>
            },
            width: 100
        },
        {
            key: 'DATEOFBIRTH',
            title: 'Năm sinh',
            dataIndex: 'dob',
            width: 100
        },
        {
            key: 'BACKGROUND',
            title: 'Background',
            dataIndex: 'background',
            width: 200,
        },
        {
            key: 'AREA',
            title: 'Khu vực',
            dataIndex: 'area',
            width: 100,
            className: 'text-center',
        },
        {
            key: 'LOCATION',
            title: 'Cơ sở',
            dataIndex: 'location',
            width: 150
        },
        {
            key: 'GROUPNUMBER',
            title: 'Nhóm-MT',
            dataIndex: 'group',
            width: 270
        },
        {
            key: 'CHECKED',
            title: 'Điểm danh/Khoá',
            dataIndex: 'checked',
            fixed: 'right',
            width: 150
        }
    ];
    const rowData: RowData[] = [
        {
            key: uuid(),
            order: 1,
            customerName: 'Trần Đăng Khoa Đẹp',
            status: 'Active',
            email: 'khoatranpc603@gmail.com',
            facebook: 'https://facebook.com/khoatranpc.nb',
            dob: '12/12/2012',
            background: 'Người đi làm',
            area: 'HN',
            location: 'Thành Công',
            group: 'Nhóm 1-MT Trần Đăng Khoa',
            checked: ''
        },
        {
            key: uuid(),
            order: 1,
            customerName: 'Trần Đăng Khoa Đẹp',
            status: 'Active',
            email: 'khoatranpc603@gmail.com',
            facebook: 'https://facebook.com/khoatranpc.nb',
            dob: '12/12/2012',
            background: 'Người đi làm',
            area: 'HN',
            location: 'Thành Công',
            group: 'Nhóm 1-MT Trần Đăng Khoa',
            checked: ''
        },
        {
            key: uuid(),
            order: 1,
            customerName: 'Trần Đăng Khoa Đẹp',
            status: 'Active',
            email: 'khoatranpc603@gmail.com',
            facebook: 'https://facebook.com/khoatranpc.nb',
            dob: '12/12/2012',
            background: 'Người đi làm',
            area: 'HN',
            location: 'Thành Công',
            group: 'Nhóm 1-MT Trần Đăng Khoa',
            checked: ''
        },
        {
            key: uuid(),
            order: 1,
            customerName: 'Trần Đăng Khoa Đẹp',
            status: 'Active',
            email: 'khoatranpc603@gmail.com',
            facebook: 'https://facebook.com/khoatranpc.nb',
            dob: '12/12/2012',
            background: 'Người đi làm',
            area: 'HN',
            location: 'Thành Công',
            group: 'Nhóm 1-MT Trần Đăng Khoa',
            checked: ''
        },
        {
            key: uuid(),
            order: 1,
            customerName: 'Trần Đăng Khoa Đẹp',
            status: 'Active',
            email: 'khoatranpc603@gmail.com',
            facebook: 'https://facebook.com/khoatranpc.nb',
            dob: '12/12/2012',
            background: 'Người đi làm',
            area: 'HN',
            location: 'Thành Công',
            group: 'Nhóm 1-MT Trần Đăng Khoa',
            checked: ''
        },
        {
            key: uuid(),
            order: 1,
            customerName: 'Trần Đăng Khoa Đẹp',
            status: 'Active',
            email: 'khoatranpc603@gmail.com',
            facebook: 'https://facebook.com/khoatranpc.nb',
            dob: '12/12/2012',
            background: 'Người đi làm',
            area: 'HN',
            location: 'Thành Công',
            group: 'Nhóm 1-MT Trần Đăng Khoa',
            checked: ''
        },
        {
            key: uuid(),
            order: 1,
            customerName: 'Trần Đăng Khoa Đẹp',
            status: 'Active',
            email: 'khoatranpc603@gmail.com',
            facebook: 'https://facebook.com/khoatranpc.nb',
            dob: '12/12/2012',
            background: 'Người đi làm',
            area: 'HN',
            location: 'Thành Công',
            group: 'Nhóm 1-MT Trần Đăng Khoa',
            checked: ''
        },
        {
            key: uuid(),
            order: 1,
            customerName: 'Trần Đăng Khoa Đẹp',
            status: 'Active',
            email: 'khoatranpc603@gmail.com',
            facebook: 'https://facebook.com/khoatranpc.nb',
            dob: '12/12/2012',
            background: 'Người đi làm',
            area: 'HN',
            location: 'Thành Công',
            group: 'Nhóm 1-MT Trần Đăng Khoa',
            checked: ''
        },
        {
            key: uuid(),
            order: 1,
            customerName: 'Trần Đăng Khoa Đẹp',
            status: 'Active',
            email: 'khoatranpc603@gmail.com',
            facebook: 'https://facebook.com/khoatranpc.nb',
            dob: '12/12/2012',
            background: 'Người đi làm',
            area: 'HN',
            location: 'Thành Công',
            group: 'Nhóm 1-MT Trần Đăng Khoa',
            checked: ''
        },
        {
            key: uuid(),
            order: 1,
            customerName: 'Trần Đăng Khoa Đẹp',
            status: 'Active',
            email: 'khoatranpc603@gmail.com',
            facebook: 'https://facebook.com/khoatranpc.nb',
            dob: '12/12/2012',
            background: 'Người đi làm',
            area: 'HN',
            location: 'Thành Công',
            group: 'Nhóm 1-MT Trần Đăng Khoa',
            checked: ''
        },
        {
            key: uuid(),
            order: 1,
            customerName: 'Trần Đăng Khoa Đẹp',
            status: 'Active',
            email: 'khoatranpc603@gmail.com',
            facebook: 'https://facebook.com/khoatranpc.nb',
            dob: '12/12/2012',
            background: 'Người đi làm',
            area: 'HN',
            location: 'Thành Công',
            group: 'Nhóm 1-MT Trần Đăng Khoa',
            checked: ''
        },

    ]
    return (
        <div className={styles.studentDetailClass}>
            <Table
                hasFixedColumn
                columns={columns}
                rowData={rowData}
                disableDefaultPagination
            />
        </div>
    )
}

export default Student;