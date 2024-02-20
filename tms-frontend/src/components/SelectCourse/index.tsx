import React, { useEffect, useState } from 'react';
import { TreeSelect } from 'antd';
import { Obj } from '@/global/interface';
import { useGetListCourse } from '@/utils/hooks';

interface Props {
    courseId?: string;
    courseLevelId?: string;
    label?: string;
    shortLabelItem?: boolean;
    defaultValue?: string;
    onChange?: (dataSelect: {
        levelId: string,
        courseId: string;
    }) => void;
    onBlur?: (value: {
        levelId: string,
        courseId: string;
    }) => void;
}
const SelectCourse = (props: Props) => {
    const [value, setValue] = useState<{
        _idSelect: string,
        _courseId: string,
        label: string
    }>({
        _idSelect: props.courseLevelId || '',
        _courseId: props.courseId || '',
        label: props.label || 'Tên khoá - Level'
    });
    const { listCourse, queryListCourse } = useGetListCourse();
    const mapTreeData = (listCourse?.data as Array<Obj>)?.map((item) => {
        return {
            value: item._id as string,
            title: item.courseName as string,
            children: (item.courseLevel as Array<Obj>)?.map((level) => {
                return {
                    value: level._id as string,
                    title: <span>{!props.shortLabelItem ? `${level.levelCode as string} - ${level.levelName as string}` : level.levelCode as string}</span>
                }
            })
        }
    }) || [];
    const onChange = (id: string) => {
        let label: string = '';
        let courseId: string = '';
        (listCourse?.data as Array<Obj>)?.find((item) => {
            const el = (item.courseLevel as Array<Obj>)?.find((child) => {
                return child._id as string === id;
            });
            if (el) {
                label = `${item.courseName as string} - ${el.levelCode as string}`;
                courseId = item._id as string;
            }
            return undefined;
        });
        setValue({
            _idSelect: id,
            _courseId: courseId,
            label
        });
        props.onChange?.({
            courseId,
            levelId: id
        });
    };
    useEffect(() => {
        if (!listCourse) {
            queryListCourse();
        }
    }, [listCourse]);
    return (
        <TreeSelect
            showSearch
            style={{ width: '100%' }}
            defaultValue={props.defaultValue}
            value={value.label}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            placeholder="Khoá học"
            allowClear
            onChange={onChange}
            treeData={mapTreeData}
            onBlur={() => {
                props.onBlur?.({
                    courseId: value._courseId,
                    levelId: value._idSelect
                });
            }}
        />
    );
};

export default SelectCourse;