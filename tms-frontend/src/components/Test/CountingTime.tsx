import React from 'react';
import Loading from '../loading';
import styles from '@/styles/Test.module.scss';

interface Props {
    time: number;
    className?: string;
}
const CountingTime = (props: Props) => {
    return (
        <div className={`${styles.countingTime} ${props.className}`}>
            <Loading
                className={styles.loadingTime}
            />
            <span className={styles.time}>{props.time ?? 0}</span>
        </div>
    )
}

export default CountingTime