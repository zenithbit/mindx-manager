import React from 'react';
import Table from '@/components/Table';
import { Columns, RowData } from '@/global/interface';
import styles from '@/styles/teacher/ManagerTeacher.module.scss';
import { uuid } from '@/utils';

const Ranking = () => {
    const columns: Columns = [
        {
            key: "RANK",
            title: "Xếp hạng",
            dataIndex: 'rank',
            width: 80,
            className: 'text-center',
            render(value) {
                return <b>{value}</b>
            }
        },
        {
            key: "COURSE",
            title: "Bộ môn",
            dataIndex: 'course'
        },
        {
            key: "TEACHER",
            title: "Giáo viên",
            dataIndex: 'teacher'
        },
        {
            key: "TEACHER_POINT",
            title: "Điểm",
            dataIndex: 'teacherPoint'
        },
    ];
    const rowData: RowData[] = [
        {
            key: uuid(),
            rank: 1,
            course: 'Data',
            teacher: 'Nguyễn Văn Cường',
            teacherPoint: 4.7
        },
        {
            key: uuid(),
            rank: 2,
            course: 'Data',
            teacher: 'Nguyễn Văn Cường',
            teacherPoint: 4.7
        },
        {
            key: uuid(),
            rank: 3,
            course: 'Data',
            teacher: 'Nguyễn Văn Cường',
            teacherPoint: 4.7
        },
        {
            key: uuid(),
            rank: 4,
            course: 'Data',
            teacher: 'Nguyễn Văn Cường',
            teacherPoint: 4.7
        },
        {
            key: uuid(),
            rank: 5,
            course: 'Data',
            teacher: 'Nguyễn Văn Cường',
            teacherPoint: 4.7
        },
        {
            key: uuid(),
            rank: 6,
            course: 'Data',
            teacher: 'Nguyễn Văn Cường',
            teacherPoint: 4.7
        },
        {
            key: uuid(),
            rank: 7,
            course: 'Data',
            teacher: 'Nguyễn Văn Cường',
            teacherPoint: 4.7
        },
        {
            key: uuid(),
            rank: 8,
            course: 'Data',
            teacher: 'Nguyễn Văn Cường',
            teacherPoint: 4.7
        },
        {
            key: uuid(),
            rank: 9,
            course: 'Data',
            teacher: 'Nguyễn Văn Cường',
            teacherPoint: 4.7
        },
        {
            key: uuid(),
            rank: 10,
            course: 'Data',
            teacher: 'Nguyễn Văn Cường',
            teacherPoint: 4.7
        },
    ];
    return (
        <div className={styles.rankingTeacherPoint}>
            <p><b>Xếp hạng 10 giáo viên</b></p>
            <Table
                bordered
                heightToScroll={300}
                size="small"
                className={styles.tableRanking}
                disableDefaultPagination
                columns={columns}
                rowData={rowData}
            />
        </div>
    )
}

export default Ranking;