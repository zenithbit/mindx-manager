import React from 'react';
import styles from '@/styles/feedback/Feedback.module.scss';
import { Radio } from 'antd';

interface Props {
    value: string | number;
    onChange?: (value: string | number) => void;
}
const value = [
    {
        value: 1,
        label: 1
    },
    {
        value: 2,
        label: 2
    },
    {
        value: 3,
        label: 3
    },
    {
        value: 4,
        label: 4
    },
    {
        value: 5,
        label: 5
    },
]
const Point = (props: Props) => {
    return (
        <div className={styles.point}>
            <span>Rất không hài lòng</span>
            <Radio.Group className={styles.parentPoint} value={props.value} onChange={(e) => {
                props.onChange?.(e.target.value as string);
            }}>
                {value.map((item, idx) => {
                    return <Radio className={styles.itemPoint} key={idx} value={item.value}>{item.label}</Radio>
                })}
            </Radio.Group>
            <span>Rất hài lòng</span>
        </div>
    )
}

export default Point;