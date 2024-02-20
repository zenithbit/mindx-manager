import React, { useEffect, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Checkbox, DatePicker, Input } from 'antd';
import { Columns, Obj, RowData } from '@/global/interface';
import { MapIconKey } from '@/global/icon';
import { KEY_ICON } from '@/global/enum';
import { formatDatetoString, uuid } from '@/utils';
import { useGetListCourse, useGetListFeedback } from '@/utils/hooks';
import Table from '@/components/Table';
import ExportCSV from '@/components/ExportCSV';
import styles from '@/styles/feedback/CollectionResponse.module.scss';
import { getColorTeacherPoint } from '@/global/init';


const initFilter = {
    month: '',
    year: '',

    studentName: '',
    phoneNumber: '',
    course: [],
    codeClass: '',
    groupNumber: [],
    time: '',
    pointCxo: '',
    pointST: '',
    pointMT: '',
    pointOb: '',
    pointSyl: ''
}
const CollectionAnswer = () => {
    const [filter, setFilter] = useState<{
        isFilter: boolean;
        query: typeof initFilter
    }>({
        isFilter: false,
        query: initFilter
    });
    const listCourse = useGetListCourse();
    const listResponseFeedback = useGetListFeedback();
    const listValueCourse = (listCourse.listCourse?.data as Array<Obj>)?.map((item) => item._id as string) || [];

    const handleFilter = (isFilter: boolean, query: Obj) => {
        setFilter({
            ...filter,
            isFilter,
            query: {
                ...filter.query,
                ...query
            }
        })
    }
    useEffect(() => {
        if (!listResponseFeedback.data.response) {
            listResponseFeedback.query(10, 1);
        }
    }, []);
    useEffect(() => {
        listResponseFeedback.query(10, 1, filter)
    }, [filter]);
    useEffect(() => {
        if (!listCourse.listCourse) {
            listCourse.queryListCourse();
        }
    }, []);
    const rowData: RowData[] = ((listResponseFeedback.data.response?.data as Obj)?.list as Array<Obj>)?.map((item) => {
        return {
            key: uuid(),
            ...item
        }
    });
    const columns: Columns = [
        {
            key: 'TIME',
            dataIndex: 'createdAt',
            title: 'Thời gian',
            render(value, record, index) {
                return formatDatetoString(value as Date);
            },
            width: 150,
            fixed: 'left',
            filterDropdown: (props) => {
                return <DatePicker size={'middle'} picker="month" placeholder="Tháng" onChange={((day) => {
                    handleFilter(true, {
                        ...filter.query,
                        month: String((day as Obj)?.$M) || null,
                        year: String((day as Obj)?.$y) || null
                    });
                })} />
            },
            filterIcon: MapIconKey[KEY_ICON.TIMESCHEDULE],
        },
        {
            key: 'STUDENT_NAME',
            dataIndex: 'studentName',
            title: 'Học viên',
            width: 170,
            fixed: 'left',
            filterDropdown(props) {
                return <Input className="inputAntd" placeholder="Tìm học viên" onChange={(e) => {
                    handleFilter(true, {
                        ...filter.query,
                        studentName: e.target.value
                    })
                }} />
            },
            filterIcon: <SearchOutlined />
        },
        {
            key: 'NUMBER_PHONE',
            dataIndex: 'phoneNumber',
            title: 'SĐT',
            width: 100,
            filterDropdown(props) {
                return <Input className="inputAntd" placeholder="Tìm sđt" onChange={(e) => {
                    handleFilter(true, {
                        phoneNumber: e.target.value
                    });
                }} />
            },
            filterIcon: <SearchOutlined />
        },
        {
            key: 'COURSE',
            dataIndex: 'course',
            title: 'Học phần',
            width: 100,
            filterDropdown(props) {
                return <Checkbox.Group className={styles.checkboxGroup} defaultValue={listValueCourse} onChange={(checkedValue) => {
                    handleFilter(true, {
                        course: checkedValue
                    })
                }}>
                    {(listCourse.listCourse?.data as Array<Obj>)?.map((item) => {
                        return <Checkbox key={item._id} value={item._id as string}>
                            {item.courseName as string}
                        </Checkbox>
                    }) || <span>Ôi chưa có gì để chọn hết!</span>}
                </Checkbox.Group>
            },
            render(value) {
                return value.courseName
            }
        },
        {
            key: 'CODE_CLASS',
            dataIndex: 'codeClass',
            title: 'Mã lớp',
            width: 100,
            filterDropdown(props) {
                return <Input className="inputAntd" placeholder="Mã lớp" onChange={(e) => {
                    handleFilter(true, {
                        codeClass: e.target.value
                    })
                }} />
            },
            filterIcon: <SearchOutlined />,
            render(value) {
                return value.codeClass
            }
        },
        {
            key: 'GROUP_NUMBER',
            dataIndex: 'groupNumber',
            className: 'text-center',
            title: 'Nhóm',
            width: 90,
            filterDropdown(props) {
                return <Checkbox.Group className={styles.checkboxGroup} defaultValue={[1]} onChange={(checkedValue) => {
                }}>
                    <Checkbox value={1}>
                        Data
                    </Checkbox>
                    <Checkbox value={2}>
                        Coding
                    </Checkbox>
                </Checkbox.Group>
            },
            render(value) {
                return value.groupNumber;
            },
        },
        {
            key: 'TIMECOLLECT',
            dataIndex: 'feedbackId',
            title: 'Buổi học',
            className: 'text-center',
            width: 100,
            filterDropdown(props) {
                return <Checkbox.Group className={styles.checkboxGroup} defaultValue={[1]} onChange={(checkedValue) => {
                }}>
                    <Checkbox value={1}>
                        Data
                    </Checkbox>
                    <Checkbox value={2}>
                        Coding
                    </Checkbox>
                </Checkbox.Group>
            },
            render(value) {
                return value.time === 1 ? 'Buổi 4' : 'Buổi 9'
            }
        },
        {
            key: 'CXO',
            dataIndex: 'pointCxo',
            title: `CXO`,
            className: `text-center hasSort ${styles.flexReverse}`,
            width: 70,
            sorter: (a, b) => {
                return Number(a.pointCxo) - Number(b.pointCxo);
            },
            onCell(data: Obj) {
                return {
                    style: {
                        color: getColorTeacherPoint(data.pointCxo),
                        fontWeight: 'bold'
                    }
                }
            },
        },
        {
            key: 'ST',
            dataIndex: 'pointST',
            title: 'Giảng viên',
            className: `text-center hasSort ${styles.flexReverse}`,
            width: 120,
            sorter: (a, b) => {
                return Number(a.pointST) - Number(b.pointST);
            },
            onCell(data: Obj) {
                return {
                    style: {
                        color: getColorTeacherPoint(data.pointST),
                        fontWeight: 'bold'
                    }
                }
            },
        },
        {
            key: 'MT',
            dataIndex: 'pointMT',
            title: 'Mentor',
            className: `text-center hasSort ${styles.flexReverse}`,
            width: 90,
            sorter: (a, b) => {
                return Number(a.pointMT) - Number(b.pointMT);
            },
            onCell(data: Obj) {
                return {
                    style: {
                        color: getColorTeacherPoint(data.pointMT),
                        fontWeight: 'bold'
                    }
                }
            },
        },
        {
            key: 'OB',
            dataIndex: 'pointOb',
            className: `text-center hasSort ${styles.flexReverse}`,
            title: 'CSVC',
            width: 90,
            sorter: (a, b) => {
                return Number(a.pointOb) - Number(b.pointOb);
            },
            onCell(data: Obj) {
                return {
                    style: {
                        color: getColorTeacherPoint(data.pointOb),
                        fontWeight: 'bold'
                    }
                }
            },
        },
        {
            key: 'SYL',
            dataIndex: 'pointSyl',
            title: 'Giáo trình',
            className: `text-center hasSort ${styles.flexReverse}`,
            width: 90,
            sorter: (a, b) => {
                return Number(a.pointSyl) - Number(b.pointSyl);
            },
            onCell(data: Obj) {
                return {
                    style: {
                        color: getColorTeacherPoint(data.pointSyl),
                        fontWeight: 'bold'
                    }
                }
            },
        },
        {
            key: 'DOCDETAIL',
            dataIndex: 'docDetail',
            title: 'Chia sẻ thêm',
            fixed: 'right',
            width: 400
        },
    ];


    return (
        <div className={styles.collectionAnswer}>
            <div className={styles.toolBar}>
                <Button
                    className={`${styles.btn}`}
                    onClick={() => {
                        setFilter({
                            isFilter: false,
                            query: initFilter
                        });
                    }}
                >
                    <span>{MapIconKey[KEY_ICON.RELOAD]} Reset</span>
                </Button>
                <ExportCSV
                    data={rowData}
                    fileName='textTwo'
                >
                    <Button
                        className={`${styles.btn}`}
                    >
                        <span>{MapIconKey[KEY_ICON.EP]} Xuất file</span>
                    </Button>
                </ExportCSV>
            </div>
            <Table
                loading={listResponseFeedback.data.isLoading}
                onChangeDataPagination={(data) => {
                    listResponseFeedback.query(data.currentTotalRowOnPage, data.currentPage);
                }}
                maxPage={(listResponseFeedback.data.response?.data as Obj)?.totalPage || 1}
                enablePaginationAjax={!filter.isFilter}
                disableDefaultPagination
                className={styles.tableAnswerFeedback}
                bordered
                hasFixedColumn
                columns={columns}
                rowData={rowData}
            />
        </div>
    )
}

export default CollectionAnswer;