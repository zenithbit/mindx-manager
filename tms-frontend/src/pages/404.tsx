import React from 'react';
import Image from 'next/image';
import logo from '@/assets/imgs/logo.png';
import styles from '@/styles/NotFound.module.scss';
import Link from 'next/link';

const ErrorPage = () => {
    return (
        <div className={styles.page_not_found}>
            <div className={styles.text}>
                <h3>404</h3>
                <p>Không tìm thấy đường dẫn</p>
                <p><Link href={'/'}>Quay lại trang chủ</Link></p>
            </div>
            <div className={styles.logo}>
                <Image src={logo} alt="MindX" />
            </div>
        </div>
    )
}

export default ErrorPage;