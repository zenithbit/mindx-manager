import React from 'react';
import styles from '@/styles/class/DetailClass.module.scss'
interface Props {
    title: string;
    dateUpdate: string;
    content: React.ReactNode | string;
    className?: string;
}

const BlockNotifi = (props: Props) => {
    return (
        <div className={`${styles.blockNotifi} ${props.className}`}>
            <div className={styles.titleBlock}>
                <span className={styles.title}>{props.title}</span>
                <span className={styles.dateUpdate}>{props.dateUpdate}</span>
            </div>
            <div className={styles.content}>{props.content}</div>
        </div>
    )
}

export default BlockNotifi