import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Radio } from 'antd';
import { Columns, Obj, RowData } from '@/global/interface';
import { generateRowDataForMergeRowSingleField } from '@/utils';
import { useHookMessage } from '@/utils/hooks/message';
import { useGetListCourse, useTeacherRegisterCourse, useUpdateTeacherRegisterCourse } from '@/utils/hooks';
import Table from '@/components/Table';
import styles from '@/styles/teacher/DetailTeacher.module.scss';

enum CheckCourseLevel {
    UNCHECKED = 'UNCHECKED',
    CHECKED = 'CHECKED'
}
const Course = () => {
    const router = useRouter();
    const dataTeacherRegisterCourse = useTeacherRegisterCourse();
    const updateRegisterCourse = useUpdateTeacherRegisterCourse();
    const message = useHookMessage();
    const getCourseTeacherRegister = (dataTeacherRegisterCourse.listData.response?.data as Array<Obj>)?.filter((item) => {
        return item.idTeacher === router.query.teacherId
    });
    const getCurrentRecordTeacherRegister = getCourseTeacherRegister?.[0]?.coursesRegister as Obj[];
    const listCourse = useGetListCourse();
    const getListCourse = listCourse.listCourse?.data as Obj[] || [];
    const columns: Columns = [
        {
            title: 'Khoá',
            dataIndex: 'courseName',
            onCell(data) {
                return {
                    rowSpan: data.rowSpan as number,
                }
            }
        },
        {
            title: 'Cấp độ',
            dataIndex: 'courseLevel',
            render(value: Obj) {
                return value?.levelCode as string
            }
        },
        {
            title: 'Hành động',
            className: 'text-center',
            dataIndex: 'courseLevel',
            render(value, record) {
                const getLevelId = value._id as string;
                let valueEnroll = CheckCourseLevel.UNCHECKED
                const findRecordByCourseId = getCurrentRecordTeacherRegister?.find((item) => {
                    return item.idCourse._id === record._id as string
                });
                if (findRecordByCourseId) {
                    const findEnrollLevel = (findRecordByCourseId.levelHandle as Obj[]).find((item) => item._id === getLevelId);
                    if (findEnrollLevel) {
                        valueEnroll = CheckCourseLevel.CHECKED;
                    }
                }
                return <Radio.Group className={styles.actionForCourseLevel} value={valueEnroll} onChange={(e) => {
                    handleClickRadio(getCourseTeacherRegister?.[0]?._id, record, getLevelId, e.target.value as CheckCourseLevel);
                }}>
                    <Radio value={CheckCourseLevel.CHECKED}>Tham gia</Radio>
                    <Radio value={CheckCourseLevel.UNCHECKED}>Không tham gia</Radio>
                </Radio.Group>
            }
        }
    ];
    const rowData: RowData[] = generateRowDataForMergeRowSingleField(getListCourse, 'courseLevel');
    const handleClickRadio = (recordId: string, currentRecord: Obj, levelId: string, type: CheckCourseLevel) => {
        const getIdRecordTeacherRegister = currentRecord._id as string;
        const getBaseDataCourseRegsiter = getCurrentRecordTeacherRegister.map((item) => {
            const idCourse = item.idCourse._id;
            const levelHandle = (item.levelHandle as Obj[]).map((level) => level._id);
            return {
                idCourse,
                levelHandle
            }
        });
        const findCurrentCourse = getBaseDataCourseRegsiter.findIndex((item) => {
            return item.idCourse === getIdRecordTeacherRegister
        });
        if (findCurrentCourse >= 0) {
            const listLevelHandle = getBaseDataCourseRegsiter[findCurrentCourse].levelHandle as string[];
            const findIndexLevelHandle = listLevelHandle.findIndex((item) => {
                return item === levelId;
            });
            switch (type) {
                case CheckCourseLevel.CHECKED:
                    if (findIndexLevelHandle < 0) {
                        listLevelHandle.push(levelId);
                    }
                    break;
                case CheckCourseLevel.UNCHECKED:
                    if (findIndexLevelHandle >= 0) {
                        listLevelHandle.splice(findIndexLevelHandle, 1);
                    }
                    if (listLevelHandle.length === 0) {
                        getBaseDataCourseRegsiter.splice(findCurrentCourse, 1);
                    }
                    break;
            }
        } else {
            const idCourse = currentRecord.courseLevel.courseId;
            const newCourse = {
                idCourse,
                levelHandle: [levelId]
            };
            getBaseDataCourseRegsiter.push(newCourse)
        }
        updateRegisterCourse.query({
            body: {
                coursesRegister: getBaseDataCourseRegsiter
            },
            params: [recordId]
        })
    }
    useEffect(() => {
        if (!listCourse.listCourse) {
            listCourse.queryListCourse();
        }
        if (!getCourseTeacherRegister) {
            dataTeacherRegisterCourse.query([router.query.teacherId as string]);
        }
    }, []);
    useEffect(() => {
        if (updateRegisterCourse.data.response) {
            if (updateRegisterCourse.data.success) {
                dataTeacherRegisterCourse.query([router.query.teacherId as string]);
            } else {
                message.open({
                    content: updateRegisterCourse.data.response.message as string,
                    type: 'error'
                });
                message.close();
            }
            updateRegisterCourse.clear?.();
        }
    }, [updateRegisterCourse.data]);
    return (
        <div className={styles.managerCourseTeacherApply}>
            <Table
                loading={dataTeacherRegisterCourse.listData.isLoading || updateRegisterCourse.data.isLoading}
                columns={columns}
                rowData={rowData}
                bordered
                disableDefaultPagination
            />
        </div>
    )
}

export default Course;