import React from 'react';
import Image from 'next/image';
import logo from '@/assets/imgs/logo.png';
import styles from '@/styles/NoData.module.scss';

interface Props {
    description?: string;
    className?: string;
}
const NoData = (props: Props) => {
    return (
        <div className={`${styles.no_data} ${props.className}`}>
            <Image src={logo} alt='MindX' className={styles.logo} />
            <p>{props.description || 'Không có dữ liệu'}</p>
        </div>
    )
}

export default NoData;