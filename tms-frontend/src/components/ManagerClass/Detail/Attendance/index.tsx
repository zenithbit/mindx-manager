import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Columns, Obj, RowData } from '@/global/interface';
import { mapRoleToString } from '@/global/init';
import { ROLE_TEACHER } from '@/global/enum';
import { useGenerateAttendanceTeacher, useGetAttendanceTeacher, useListTeacher } from '@/utils/hooks';
import useGetDataRoute from '@/utils/hooks/getDataRoute';
import { formatDatetoString } from '@/utils';
import { useHookMessage } from '@/utils/hooks/message';
import { PayloadRoute, initDataRoute } from '@/store/reducers/global-reducer/route';
import { AppDispatch } from '@/store';
import Table from '@/components/Table';
import SelectInputNumber from '@/components/SelectInputNumber';
import SelectRole from '@/components/SelectRole';
import { destructureBookTeacher } from './config';
import styles from '@/styles/class/DetailClass.module.scss'

interface Props {
    onChangeSession?: (currentSession: number) => void;
}
const Attendace = (props: Props) => {
    const [sessionNumber, setSessionNumber] = useState<number>(1);
    const listTeacher = useListTeacher();
    const getCrrDataRoute = useGetDataRoute();
    const attendance = useGetAttendanceTeacher();
    const message = useHookMessage();
    const router = useRouter();
    const generateAttendance = useGenerateAttendanceTeacher();
    const handleUpdateChecked = (classSessionId: string, teacherId: string) => {

    }
    const getListTeacher = (listTeacher.listTeacher.response?.data as Obj)?.listTeacher as Array<Obj>;
    const columns: Columns = [
        {
            title: 'Nhóm',
            dataIndex: 'classSessionId',
            onCell(data) {
                return {
                    rowSpan: data.rowSpan as number,
                }
            },
            render(value) {
                return value.bookTeacher.groupNumber || ''
            }
        },
        {
            title: 'Cơ sở',
            dataIndex: 'classSessionId',
            onCell(data) {
                return {
                    rowSpan: data.rowSpan as number,
                }
            },
            render(value) {
                return value.locationId.locationCode || ''
            }
        },
        {
            title: 'Giáo viên',
            dataIndex: 'teacherId',
            render(value, record) {
                const findCurrentTeacher = getListTeacher?.find((item) => item._id === value);
                return findCurrentTeacher?.fullName || ''
            },
        },
        {
            title: 'Vị trí',
            dataIndex: 'teacherId',
            render(value, record) {
                const findCrrBookTeacher = (record.teacherRegister as Obj[]).find((item) => item.idTeacher === value) as Obj;
                return findCrrBookTeacher ? <SelectRole size='small' title={mapRoleToString[findCrrBookTeacher.roleRegister as ROLE_TEACHER]} /> : ''
            },
        },
        {
            title: 'Số giờ',
            dataIndex: 'hours',
            className: 'text-center',
            render(value, record, index) {
                return value ? <SelectInputNumber className={styles.selectHours} inputClassName={styles.inputSelectHours} step={0.5} size='small' open={false} value={value} max={3} /> : ''
            },
        },
        {
            title: 'Lương',
            dataIndex: 'teacherId',
            render(value, record) {
                const findCurrentTeacher = getListTeacher?.find((item) => item._id === value);
                const getListSalary = findCurrentTeacher?.salaryPH as Obj[];
                const getSalary = getListSalary?.[getListSalary?.length - 1];
                return getSalary && getSalary.rank ? `${Number(getSalary.rank).toLocaleString()}/h` : 'Chưa có mức lương'
            },
        },
        {
            title: 'Điểm danh',
            dataIndex: 'checked',
            className: 'text-center',
            render(value, record, index) {
                return <div className={styles.actionChecked}>
                    <CheckCircleOutlined className={`${value ? styles.active : styles.deactive} ${styles.iconCheck}`} />
                    <CloseCircleOutlined className={`${!value ? styles.active : styles.deactive} ${styles.iconCheck}`} />
                </div>
            },
        }
    ];
    const getData = destructureBookTeacher((attendance.data.response?.data as Array<Obj>));
    const rowData: RowData[] = getData?.map((item, idx) => {
        return {
            key: idx.toString(),
            ...item
        }
    });
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        const payloadRoute: PayloadRoute = {
            payload: {
                ...getCrrDataRoute,
                moreData: {
                    isAttendance: true,
                    currentSession: sessionNumber
                }
            }
        };
        dispatch(initDataRoute(payloadRoute));
        attendance.queryGetData(router.query.classId as string, sessionNumber)
    }, [sessionNumber]);
    useEffect(() => {
        if (generateAttendance.data.response) {
            message.open({
                content: generateAttendance.data.response.message as string,
                type: generateAttendance.data.success ? 'success' : 'error'
            });
            generateAttendance.clear?.();
            message.close();
            if (generateAttendance.data.success) {
                attendance.queryGetData(router.query.classId as string, sessionNumber)
            }
        }
    }, [generateAttendance.data]);
    useEffect(() => {
        if (attendance.data.response) {
            const listId: Obj = {};
            rowData.forEach((item) => {
                (item.teacherRegister as Obj[]).forEach((record) => {
                    listId[record.idTeacher] = record.idTeacher;
                });
            });
            const getListId = Object.keys(listId);
            listTeacher.query(undefined, undefined, {
                listTeacherId: getListId,
                fields: ['_id', 'fullName', 'salaryPH']
            });
        }
    }, [attendance.data.response]);
    return (
        <div className={styles.attendaceDetailClass}>
            <div className={`listFilterBySession ${styles.topLevel}`}>
                <span className={styles.pickSession}>
                    Buổi <SelectInputNumber
                        onHandlerNumber={(type) => {
                            switch (type) {
                                case 'DECRE':
                                    if (sessionNumber > 1) setSessionNumber(sessionNumber - 1)
                                    break;
                                case 'INCRE':
                                    if (sessionNumber <= 15) setSessionNumber(sessionNumber + 1)
                                    break;
                            }
                        }}
                        value={sessionNumber}
                        onSelect={(e) => {
                            setSessionNumber(Number(e.key));
                            props.onChangeSession?.(Number(e.key));
                        }}
                        max={16}
                        formatLabel={(number) => {
                            return `Buổi ${number}`
                        }}
                    />
                    Ngày: {rowData[rowData.length - 1] ? formatDatetoString(new Date(rowData[rowData.length - 1].classSessionId.date as string), 'dd/MM/yyyy') : ''}
                </span>
                <Button
                    loading={generateAttendance.data.isLoading}
                    onClick={(() => {
                        generateAttendance.query({
                            body: {
                                classId: router.query.classId as string
                            }
                        })
                    })}>Tạo bản ghi chấm công</Button>
            </div>
            <Table
                loading={attendance.data.isLoading}
                bordered
                disableDefaultPagination
                columns={columns}
                rowData={rowData}
            />
        </div>
    )
}

export default Attendace;