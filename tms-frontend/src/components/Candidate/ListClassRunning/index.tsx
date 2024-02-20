import React, { useEffect, useMemo, useState } from 'react';
import { Button, Tooltip } from 'antd';
import { useDispatch } from 'react-redux';
import { FilterOutlined } from '@ant-design/icons';
import { Columns, Obj, RowData } from '@/global/interface';
import { getClassForm, getColorFromStatusClass, mapStatusToString } from '@/global/init';
import { ClassForm, STATUS_CLASS } from '@/global/enum';
import { useGetListClass } from '@/utils/hooks';
import { formatDatetoString, getColorByCourseName } from '@/utils';
import { queryGetListClass } from '@/store/reducers/class/listClass.reducer';
import Table from '@/components/Table';
import SelectBaseCourse from '@/components/SelectBaseCourse';
import ModalRegisterClass from './ModalRegisterClass';
import styles from '@/styles/Recruitment/Candidate.module.scss';

const ListClassRunning = () => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [classRegister, setClassRegister] = useState<Obj>({});
    const columns: Columns = [
        {
            key: 'SUBJECT',
            title: 'Khối',
            dataIndex: 'courseId',
            render(value, record, index) {
                return <div className={styles.courseName} style={{ backgroundColor: getColorByCourseName[value.courseName] }}>
                    {value.courseName}
                </div>
            },
        },
        {
            key: 'CODE_CLASS',
            title: 'Mã lớp',
            dataIndex: 'codeClass',
        },
        {
            key: 'LEVEL_NUMBER',
            title: 'Mã/Cấp độ',
            className: 'text-center',
            dataIndex: 'courseLevelId',
            render(value, record, index) {
                return `${value.levelCode}/${value.levelNumber}`
            },
        },
        {
            key: 'TIME',
            title: 'Lịch học',
            dataIndex: 'timeSchedule',
            render(value, record, index) {
                return (value as Array<Obj>)?.map((item, idx) => {
                    return <p key={idx}>{item.weekday}, {item.start}-{item.end}</p>
                })
            },
        },
        {
            key: 'FORM_CLASS',
            title: 'Mô hình học',
            dataIndex: 'classForm',
            render(value, record, index) {
                return getClassForm[value as ClassForm]
            },
        },
        {
            key: 'LOCATIONS',
            title: 'Cơ sở',
            dataIndex: 'recordBookTeacher',
            render(value: Array<Obj>, record: Obj) {
                return <div>
                    {record.linkZoom && <a href={record.linkZoom}>Link</a>}
                    {value.map((item) => {
                        return <p key={item._id}>{item.locationId.locationCode} <Tooltip title={item.locationId.locationDetail}><sup className={styles.sup}>i</sup></Tooltip></p>
                    })}
                </div>
            },
        },
        {
            key: 'STATUS',
            title: 'Trạng thái',
            dataIndex: 'status',
            render(value, record, index) {
                return <div className={styles.statusClass} style={{ backgroundColor: getColorFromStatusClass[value as STATUS_CLASS] }}>
                    {mapStatusToString[value as STATUS_CLASS]}
                </div>
            },
        },
        {
            key: 'RANGE_TIME',
            title: 'Hạn đăng ký',
            dataIndex: 'dayRange',
            render(value, record, index) {
                const startDay = new Date(value.start);
                const endDay = new Date(startDay);
                endDay.setDate(endDay.getDate() + 49);
                return <div className={`${endDay.getTime() < new Date().getTime() ? styles.expired : ''} ${styles.timeRange}`}>
                    {formatDatetoString(startDay, 'dd/MM/yyyy')} - {formatDatetoString(endDay, 'dd/MM/yyyy')}
                </div>
            },
        },
        {
            key: 'ACTION',
            title: 'Hành động',
            dataIndex: 'dayRange',
            render(value, record) {
                const startDay = new Date(value.start);
                const endDay = new Date(startDay);
                endDay.setDate(endDay.getDate() + 49);

                return <Button disabled={endDay.getTime() < new Date().getTime()} onClick={() => {
                    setShowModal(true);
                    setClassRegister(record);
                }}>Đăng ký</Button>
            }
        }
    ];

    const listClass = useGetListClass();
    const dispatch = useDispatch();

    const [filterCousre, setFilterCourse] = useState<string>('');

    const getRowData: RowData[] = useMemo(() => {
        return ((listClass.response?.data as Obj)?.classes as Array<Obj>)?.map((item) => {
            return {
                ...item,
                key: item._id as string
            };
        })
    }, [listClass.response]);

    useEffect(() => {
        //pending logic pagination
        dispatch(queryGetListClass({
            payload: {
                query: {
                    query: {
                        currentPage: 1,
                        recordOnPage: 10,
                        status: STATUS_CLASS.RUNNING,
                        forRecruitment: true,
                        course: filterCousre
                    }
                }
            }
        }));
    }, [filterCousre]);
    return (
        <div className={styles.classRunningPage}>
            <div className={styles.filter}>
                <FilterOutlined />
                <div>
                    <label>Khối</label>
                    <SelectBaseCourse
                        className={styles.filterCourse}
                        onChange={(value) => {
                            setFilterCourse(value as string);
                        }}
                    />
                </div>
            </div>
            <Table
                enablePaginationAjax
                disableDefaultPagination
                loading={listClass.isLoading}
                columns={columns}
                rowData={getRowData}
            />
            {showModal && <ModalRegisterClass
                class={classRegister}
                showModal={showModal}
                handleShowModal={setShowModal}
            />}
        </div>
    )
}

export default ListClassRunning;