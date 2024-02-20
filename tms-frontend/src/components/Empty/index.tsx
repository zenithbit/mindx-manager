import React from 'react';
import { Empty as EmptyComponent } from 'antd';
import Image from 'next/image';
import logo from '@/assets/imgs/logo.png';
import styles from '@/styles/Empty.module.scss';

const Empty = () => {
    return (
        <div className={styles.emptyContainer}>
            <EmptyComponent description='' image={<Image alt='' src={logo} className={styles.imgEmpty} />}>
                Oops...! Không có gì hết!
            </EmptyComponent>
        </div>
    )
}

export default Empty;