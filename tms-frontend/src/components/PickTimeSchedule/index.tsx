import React, { useEffect, useRef } from 'react';
import { MenuProps } from 'antd';
import { Obj } from '@/global/interface';
import { useGetTimeSchedule } from '@/utils/hooks';
import Dropdown, { ClickItem } from '../Dropdown';
import styles from '@/styles/PickTimeSchedule.module.scss'

interface Props {
    size?: 'small' | 'middle' | 'large';
    className?: string;
    title?: string;
    keyIndex?: string;
    value?: string;
    hasFilterByValue?: boolean;
    onClickItem?: (e: ClickItem, keyIndex?: string | undefined) => void;
}
const PickTimeSchedule = (props: Props) => {
    const listTimeSchedule = useGetTimeSchedule();
    const listSelect: MenuProps['items'] =
        ((props.hasFilterByValue && props.value) ?
            ((listTimeSchedule.data.response?.data as Array<Obj>)?.filter((item) => {
                return item.weekday as string === props.value
            })!.map((item) => {
                return {
                    key: item._id as string,
                    label: <span>{item.weekday as string}: {item.start as string}-{item.end as string}</span>,
                }
            }))
            :
            (listTimeSchedule.data.response?.data as Array<Obj>)?.map((item) => {
                return {
                    key: item._id as string,
                    label: <span>{item.weekday as string}: {item.start as string}-{item.end as string}</span>,
                }
            })) || [];

    useEffect(() => {
        if (!listTimeSchedule.data.response && !listTimeSchedule.data.isLoading) {
            listTimeSchedule.query();
        }
    }, []);
    return (
        <Dropdown
            sizeButton={props.size}
            className={`${props.className}  ${styles.pickTimeSchedule}`}
            trigger='click'
            listSelect={listSelect}
            keyIndex={props.keyIndex}
            title={props.title || 'Chọn lịch'}
            onClickItem={props.onClickItem}
        />
    )
}

export default PickTimeSchedule;