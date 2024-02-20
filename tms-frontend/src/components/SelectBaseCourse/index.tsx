import React, { useEffect } from 'react';
import { DefaultOptionType } from 'antd/es/select';
import { Select } from 'antd';
import { Obj } from '@/global/interface';
import { useGetListCourse } from '@/utils/hooks';
import styles from '@/styles/SelectBaseCourse.module.scss'

interface Props {
    onChange?: (value: any) => void;
    className?: string;
    value?: string;
    disabledAll?: boolean;
}
const SelectBaseCourse = (props: Props) => {
    const { listCourse, queryListCourse } = useGetListCourse();
    const options: DefaultOptionType[] = (listCourse?.data as Array<Obj>)?.map((item) => {
        return {
            label: item.courseName,
            value: item._id
        }
    })
    useEffect(() => {
        if (!listCourse) {
            queryListCourse();
        }
    }, [listCourse]);
    return (
        <Select
            onChange={props.onChange}
            popupClassName={styles.popupSelect}
            size="small"
            value={props.value ?? options?.[0]?.value}
            className={`${styles.selectBaseCourse} ${props.className}`}
            options={[
                ...options ? [
                    ...!props.disabledAll ? [{
                        label: 'Tất cả',
                        value: ''
                    }] : []
                    , ...options] : [],
            ]}
        />
    )
}

export default SelectBaseCourse;