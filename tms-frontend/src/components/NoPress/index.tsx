import React from 'react';
import ThreeDotCircle from '@/icons/ThreeDotCircle';
import styles from '@/styles/NoProcess.module.scss';

interface Props {
    className?: string;
}
const NoProcess = (props: Props) => {
    return (
        <div className={`${styles.noProcess} ${props.className}`}>
            <ThreeDotCircle className={`${props.className}`} />
            <label>Chưa xử lý</label>
        </div>
    )
}

export default NoProcess;