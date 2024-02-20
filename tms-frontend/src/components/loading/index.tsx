import React from 'react';
import logo from '@/assets/imgs/logo.png';
import Image from 'next/image';
import styles from '@/styles/Loading.module.scss';

interface Props {
    className?: string;
    isCenterScreen?: boolean;
    onFirstLoad?: boolean;
}
const Loading = (props: Props) => {
    return (
        <div className={`${styles.loading} ${props.className || ''} ${props.isCenterScreen ? styles.center_screen : ''} ${props.onFirstLoad ? styles.onFirstLoad : ''}`}>
            <Image src={logo} alt='MindX' className={styles.logo} />
            <div className={styles.animation}></div>
        </div>
    )
}

export default Loading;