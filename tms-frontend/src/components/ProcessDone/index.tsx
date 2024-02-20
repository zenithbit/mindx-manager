import React from 'react';
import TickDone from '@/icons/TickDone';
import styles from '@/styles/ProcessDone.module.scss'

interface Props {
    className?: string;
}
const ProcessDone = (props: Props) => {
    return (
        <div className={`${styles.processDone} ${props.className}`}>
            <TickDone className={`${props.className}`} />
            <label>Hoàn thành</label>
        </div>
    )
}

export default ProcessDone;