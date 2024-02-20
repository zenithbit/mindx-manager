import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'antd';
import { Columns, Obj, RowData } from '@/global/interface';
import { MapIconKey } from '@/global/icon';
import { KEY_ICON, STATUS_CLASS } from '@/global/enum';
import { getColorTeacherPoint } from '@/global/init';
import CombineRoute from '@/global/route';
import { formatDatetoString } from '@/utils';
import { useDispatchDataRouter, useGetListFeedbackResponseForTeacher, useGetLocations, useGetTeacherDetail } from '@/utils/hooks';
import Table from '@/components/Table';
import ExportCSV from '@/components/ExportCSV';
import TitleHeader from '@/components/ManagerClass/TitleHeader';
import { TabDetailClass } from '@/components/ManagerClass/Detail';
import styles from '@/styles/teacher/DetailTeacher.module.scss';

const Feedback = () => {
    const listResponseFeedback = useGetListFeedbackResponseForTeacher();
    const listLocation = useGetLocations();
    const teacher = useGetTeacherDetail();
    const router = useRouter();
    const dispatchRouter = useDispatchDataRouter();

    const columns: Columns = [
        {
            key: 'STUDENTNAME',
            dataIndex: 'feedbackResponseId',
            title: 'Học viên',
            render(value) {
                return value.studentName as string || ''
            }
        },
        {
            key: 'STUDENT_PHONE',
            dataIndex: 'feedbackResponseId',
            title: 'SĐT',
            render(value) {
                return value.phoneNumber as string || ''
            }
        },
        {
            key: 'CLASS',
            dataIndex: 'classId',
            className: `${styles.classCell}`,
            title: 'Lớp',
            render(value) {
                return value.codeClass as string || ''
            },
            onCell(record: Obj) {
                return {
                    onClick() {
                        dispatchRouter(CombineRoute['TE']['MANAGER']['DETAILCLASS'], 'Chi tiết lớp học', <TitleHeader tabDetail={TabDetailClass.OVERVIEW} editTitle title={record.classId.codeClass as string} dateStart={formatDatetoString(new Date(record.classId.dayRange.start as Date), 'dd/MM/yyyy')} statusClass={record.classId.ƒstatus as STATUS_CLASS} />)
                        router.push(`/te/manager/class/detail/${record.classId._id}`);
                    }
                }
            }
        },
        {
            key: 'GROUP_NUMBER',
            dataIndex: 'groupNumber',
            title: 'Nhóm',
            render(value) {
                const mapLocation = (listLocation.locations?.data as Array<Obj>)?.find((item) => item._id === value.locationId as string);
                return `Nhóm ${value.groupNumber}-${mapLocation?.locationCode}` || ''
            }
        },
        {
            key: 'POINT',
            title: 'Điểm',
            children: [
                {
                    key: 'ST',
                    title: 'Giảng viên',
                    dataIndex: 'feedbackResponseId',
                    className: `${styles.point} text-center`,
                    render(value) {
                        return value.pointST || ''
                    },
                    onCell(record: Obj) {
                        return {
                            style: {
                                color: getColorTeacherPoint(record.feedbackResponseId.pointST)
                            }
                        }
                    }
                },
                {
                    key: 'MT',
                    title: 'Mentor',
                    dataIndex: 'feedbackResponseId',
                    className: `${styles.point} text-center`,
                    render(value) {
                        return value.pointMT || ''
                    },
                    onCell(record: Obj) {
                        return {
                            style: {
                                color: getColorTeacherPoint(record.feedbackResponseId.pointMT)
                            }
                        }
                    }
                },
            ]
        },
        {
            key: 'DOC_DETAIl',
            title: 'Nhận xét',
            dataIndex: 'feedbackResponseId',
            render(value) {
                return value.docDetail || ''
            }
        }
    ];
    const rowData: RowData[] = (listResponseFeedback.data.response?.data as Array<Obj>)?.map((item) => {
        return {
            ...item,
            key: item._id
        }
    });
    const getDataExport = rowData?.map((item: Obj) => {
        const mapLocation = (listLocation.locations?.data as Array<Obj>)?.find((location) => {
            return location._id === item.groupNumber?.locationId;
        });
        return {
            Student: item.feedbackResponseId.studentName,
            Phone: item.feedbackResponseId.phoneNumber,
            Class: item.classId.codeClass,
            Group: item.groupNumber.groupNumber,
            Location: mapLocation?.locationDetail,
            Teacher: (teacher.data.response?.data as Obj).fullName as string,
            PointST: item.feedbackResponseId.pointST,
            PointMT: item.feedbackResponseId.pointMT,
            Feedback: item.feedbackResponseId.docDetail
        }
    });
    useEffect(() => {
        //pending call api with pagination
        listResponseFeedback.query(router.query.teacherId as string, ['classId', 'codeClass', 'status', 'feedbackResponseId', 'pointST', 'pointMT', 'docDetail', 'phoneNumber', 'studentName', 'groupNumber', 'createdAt', 'updatedAt', 'locationId', 'dayRange']);
        if (!listLocation.locations) {
            listLocation.queryLocations();
        }
    }, []);
    console.log(listResponseFeedback.data.response);
    return (
        <div className={styles.feedbackTeacher}>
            <div className={styles.toolBar}>
                <ExportCSV data={getDataExport} fileName='feedback'>
                    <Button size="small" className={styles.btnExport}>{MapIconKey[KEY_ICON.EP]} Xuất file</Button>
                </ExportCSV>
            </div>
            <Table
                className={styles.table}
                classNamePagination={styles.paginationAjax}
                disableDefaultPagination
                enablePaginationAjax
                columns={columns}
                rowData={rowData}
            />
        </div>
    )
}

export default Feedback;