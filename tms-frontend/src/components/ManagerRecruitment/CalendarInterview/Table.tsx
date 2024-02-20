import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Table from '@/components/Table';
import { Columns, Obj, RowData } from '@/global/interface';
import { useGetDataRoundProcess } from '@/utils/hooks';
import { RoundProcess } from '@/global/enum';
import { formatDatetoString, getColorByCourseName } from '@/utils';
import styles from '@/styles/Recruitment/CalendarInterview.module.scss';


const TableTab = () => {
    const dataRoundProcess = useGetDataRoundProcess();
    const getDataRoundProcess = (dataRoundProcess.data.response?.data as Array<Obj>);
    const router = useRouter();
    const columns: Columns = [
        {
            title: 'Thời gian',
            dataIndex: 'time',
            render(value) {
                return value ? formatDatetoString(value as string, 'iii, dd/MM/yyyy, H:m aaa') : 'Chưa có lịch'
            }
        },
        {
            title: 'Ứng viên',
            dataIndex: 'candidateId',
            render(value: Obj) {
                return value?.fullName
            },
            onCell(record: Obj) {
                return {
                    onClick() {
                        router.push(`/te/manager/recruitment/${record?.candidateId?._id as string}`)
                    }
                }
            }
        },
        {
            title: 'Email',
            dataIndex: 'candidateId',
            render(value: Obj) {
                return value?.email
            }
        },
        {
            title: 'CV',
            dataIndex: 'candidateId',
            render(value: Obj) {
                return <a href={value?.linkCv} target="_blank" className={`${styles.link}`}>Link</a>
            }
        },
        {
            title: 'TE',
            dataIndex: 'te',
            render(value: Obj) {
                return value ? `${value?.teName} - ${value?.positionTe} ${value?.courseId?.courseName ?? ''}` : 'Chưa có thông tin'
            }
        },
        {
            title: 'Bộ môn',
            dataIndex: 'candidateId',
            render(value: Obj) {
                return <div className={`${styles.courseName}`} style={{ backgroundColor: value?.courseApply?.color }} > {value?.courseApply?.courseName}</ div>
            }
        },
        {
            title: 'Link meet',
            className: 'text-center',
            dataIndex: 'linkMeet',
            render(value) {
                return value ? <a href={value} target="_blank" className={`${styles.link}`}>Link</a> : 'Chưa có'
            }
        },
        {
            title: 'Trạng thái',
            render(_, record: Obj) {
                return record?.processed ? (
                    <div className={`${styles.status} ${record?.result ? 'passStep' : 'failStep'}`}>
                        {record?.result ? 'Pass' : 'Fail'}
                    </div>
                ) : 'Chưa PV'
            }
        }
    ];
    const rowData: RowData[] = getDataRoundProcess?.map((item) => {
        return {
            key: item._id as string,
            ...item
        }
    });
    useEffect(() => {
        dataRoundProcess.query(RoundProcess.INTERVIEW, [], true, 'candidateId,linkMeet,processed,result,teName,positionTe,time,_id,courseId,courseName,fullName,linkCv,email,linkCv,color');
    }, []);
    return (
        <Table
            columns={columns}
            rowData={rowData}
            disableDefaultPagination
            enablePaginationAjax
        />
    )
}

export default TableTab;