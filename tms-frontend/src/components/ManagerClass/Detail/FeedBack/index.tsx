import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { Checkbox, Input } from 'antd';
import { Columns, Obj } from '@/global/interface';
import { SearchOutlined } from '@ant-design/icons';
import CombineRoute from '@/global/route';
import { ComponentPage } from '@/global/enum';
import { formatDatetoString, getColor3Point } from '@/utils';
import { useDispatchDataRouter, useGetClassTeacherPonit, useGetListFeedback, useListTeacher } from '@/utils/hooks';
import SelectInputNumber from '@/components/SelectInputNumber';
import Table from '@/components/Table';
import styles from '@/styles/class/DetailClass.module.scss';
import { getColorTeacherPoint } from '@/global/init';


interface Props {
    codeClassId?: string;
}
const MAX_TIME = 2;
const listGroup: Array<number> = [];
const listTeacherCheck: Array<string> = [];

const initConditionalFilter: Obj = {
    studentName: '',
    groupNumber: [],
    mentor: []
}
const FeedBack = (props: Props) => {
    const listResponseFeedback = useGetListFeedback();
    const dispatchRouter = useDispatchDataRouter();
    const timeCollect = useRef(1);
    const router = useRouter();
    const classId = router.query.classId as string;
    const listTeacher = useListTeacher();

    const listClassTeacherPoint = useGetClassTeacherPonit();

    const getClassTeacherPoint = () => {
        if (listClassTeacherPoint.data.response && listClassTeacherPoint.data.success) {
            const listClassTeacherPointOfClass: Array<Obj> = (listClassTeacherPoint.data.response?.data as Array<Obj>)?.filter((item) => {
                return item.classId === classId
            });
            return listClassTeacherPointOfClass[listClassTeacherPointOfClass.length - 1]?.teacherPoint as number || 0;
        }
        return 0;
    }
    const [conditionalFiter, setConditionalFilter] = useState<Obj>(initConditionalFilter);
    const rowData = useMemo(() => {
        const dataResource = ((listResponseFeedback.data.response?.data as Obj)?.list as Array<Obj>) || [];
        const listData = (dataResource && dataResource.length !== 0) ? dataResource.map((item) => {
            const getMentor = ((listTeacher.listTeacher.response?.data as Obj)?.listTeacher as Array<Obj>)?.find((tc) => {
                return tc._id === item.groupNumber.teacherRegister[0].idTeacher
            })?.fullName;
            if (!listGroup.includes(item.groupNumber.groupNumber)) {
                listGroup.push(item.groupNumber.groupNumber);
            }
            if (getMentor && !listTeacherCheck.includes(getMentor)) {
                listTeacherCheck.push(getMentor);
            }
            return {
                ...item,
                key: item?._id,
                mentor: getMentor || ''
            }
        }) : [];
        const mapDataWithConditional = listData.filter(rowData => {
            return Object.keys(conditionalFiter).every(key => {
                if (!(conditionalFiter[key] as any).length) {
                    return true;
                }
                if (key === 'groupNumber') {
                    return ((conditionalFiter)[key])?.includes((rowData as Obj)[key][key]);
                }
                return (conditionalFiter)[key].includes((rowData as Obj)[key])
                    ||
                    (typeof (conditionalFiter)[key] === 'string'
                        && String((rowData as Obj)[key]).toLowerCase().includes(String((conditionalFiter)[key]).toLowerCase())
                    );
            });
        });
        return mapDataWithConditional;
    }, [listResponseFeedback, listTeacher, conditionalFiter]);
    const columns: Columns = [
        {
            title: 'Ngày',
            dataIndex: 'createdAt',
            key: 'date',
            render(value, record, index) {
                return formatDatetoString(value as Date, 'dd/MM/yyyy');
            },
        },
        {
            title: 'Học viên',
            dataIndex: 'studentName',
            key: 'studentName',
            filterIcon: <SearchOutlined />,
            filterDropdown(props) {
                return <Input className="inputAntd" size="small" placeholder="Tìm học viên" onChange={(e) => {
                    setConditionalFilter({
                        ...conditionalFiter,
                        studentName: e.target.value
                    })
                }} />
            },
        },
        {
            title: 'Nhóm',
            dataIndex: 'groupNumber',
            key: 'groupNumber',
            render(value, record, index) {
                return value.groupNumber
            },
            className: 'text-center',
            filterDropdown(props) {
                return <Checkbox.Group className={styles.selectGroup} defaultValue={listGroup} onChange={(checkedList) => {
                    setConditionalFilter({
                        ...conditionalFiter,
                        groupNumber: checkedList
                    })
                }}>
                    {listGroup.sort((a, b) => a - b).map((item) => {
                        return <Checkbox key={item} value={item}>
                            Nhóm {item}
                        </Checkbox>
                    })}
                </Checkbox.Group>
            },
        },
        {
            title: 'Mentor',
            dataIndex: 'mentor',
            key: 'mentor',
            className: `${styles.mentor}`,
            filterDropdown(props) {
                return <Checkbox.Group className={styles.selectGroup} defaultValue={listTeacherCheck} onChange={(checkList) => {
                    setConditionalFilter({
                        ...conditionalFiter,
                        mentor: checkList
                    })
                }}>
                    {listTeacherCheck.map((item, idx) => {
                        return <Checkbox key={item} value={item}>
                            {item}
                        </Checkbox>
                    })}
                </Checkbox.Group>
            },
            render(value) {
                return value;
            },
            onCell(data: Obj) {
                return {
                    onClick() {
                        const teacherId = (data.groupNumber.teacherRegister as Array<Obj>)[0].idTeacher as string;
                        router.push(`/te/manager/teacher/detail/${teacherId}`);
                        dispatchRouter(CombineRoute['TE']['MANAGER']['DETAILTEACHER'], `Giáo viên: ${data.mentor as string}`, `Giáo viên: ${data.mentor as string}`, ComponentPage.TEACHER_DETAIL, true, {
                            teacherId
                        })
                    }
                }
            }
        },
        {
            title: 'Chấm điểm',
            children: [
                {
                    title: 'Giảng viên',
                    dataIndex: 'pointST',
                    key: 'pointST',
                    className: 'text-center hasSort',
                    width: 100,
                    render(value) {
                        return <span className={styles.point} style={{ backgroundColor: getColor3Point(Number(value)) }}>{value}</span>
                    },
                    sorter(a, b) {
                        return Number(a.pointST) - Number(b.pointST)
                    }
                },
                {
                    title: 'Mentor',
                    dataIndex: 'pointMT',
                    className: 'text-center hasSort',
                    key: 'pointMT',
                    width: 100,
                    render(value) {
                        return <span className={styles.point} style={{ backgroundColor: getColor3Point(Number(value)) }}>{value}</span>
                    },
                    sorter(a, b) {
                        return Number(a.pointMT) - Number(b.pointMT)
                    }
                }
            ]
        },
        {
            title: 'Nhận xét',
            dataIndex: 'docDetail',
            key: 'docDetail'
        }
    ];
    useEffect(() => {
        listResponseFeedback.query(undefined, undefined, {
            codeClass: props.codeClassId as string,
            timeCollect: timeCollect.current
        });
    }, [props.codeClassId]);
    useEffect(() => {
        if (listResponseFeedback.data.response && !listTeacher.listTeacher.response && !listTeacher.listTeacher.isLoading) {
            const listTeacherId: Array<string> = [];
            ((listResponseFeedback.data.response?.data as Obj)?.list as Array<Obj> || []).forEach((item) => {
                (item.groupNumber.teacherRegister as Array<Obj>)?.forEach((tc) => {
                    listTeacherId.push(tc.idTeacher as string);
                })
            });
            if (listTeacherId.length !== 0) {
                listTeacher.query(undefined, undefined, {
                    listTeacherId,
                    fields: ['fullName']
                });
            }
        }
    }, [listResponseFeedback.data.response, listTeacher]);
    useEffect(() => {
        if (listClassTeacherPoint.data.response) {
            const findExistdClTeacherPoint = (listClassTeacherPoint.data.response.data as Array<Obj>)?.find((item) => {
                return item.classId === classId
            });
            if (!findExistdClTeacherPoint) {
                listClassTeacherPoint.query([router.query.classId as string]);
            }
        } else if (!listClassTeacherPoint.data.response && !listClassTeacherPoint.data.isLoading) {
            listClassTeacherPoint.query([router.query.classId as string]);
        }
    }, []);
    return (
        <div className={styles.feedbackDetailClass}>
            <div className={styles.filter}>
                <div className={styles.timeCollect}>
                    <span>Lần:</span>
                    <SelectInputNumber
                        max={MAX_TIME}
                        onSelect={(e) => {
                            timeCollect.current = Number(e.key);
                            listResponseFeedback.query(undefined, undefined, {
                                codeClass: props.codeClassId as string,
                                timeCollect: Number(e.key)
                            });
                        }}
                        onHandlerNumber={(type) => {
                            if (type === 'INCRE' && timeCollect.current < MAX_TIME) {
                                timeCollect.current += 1;
                                listResponseFeedback.query(undefined, undefined, {
                                    codeClass: props.codeClassId as string,
                                    timeCollect: timeCollect.current
                                });
                            } else if (type === 'DECRE' && timeCollect.current > 1) {
                                timeCollect.current -= 1;
                                listResponseFeedback.query(undefined, undefined, {
                                    codeClass: props.codeClassId as string,
                                    timeCollect: timeCollect.current
                                });
                            }
                        }}
                    />
                </div>
                <span>
                    Điểm giáo viên lớp: <span style={{ fontWeight: 'bold', color: getColorTeacherPoint(Number(getClassTeacherPoint())) }}>{Number(getClassTeacherPoint()).toFixed(2)}</span>
                </span>
            </div>
            <Table
                loading={listResponseFeedback.data.isLoading}
                bordered
                columns={columns}
                rowData={rowData}
                disableDefaultPagination
            />
        </div>
    )
}

export default FeedBack;