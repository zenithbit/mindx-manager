import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Loading from '@/components/loading';
import mindx from '@/assets/imgs/mindx.png';
import dotArea from '@/assets/svgs/dot-area.svg';
import waveLineArea from '@/assets/svgs/wave-line-area.svg';
import styles from '@/styles/auth/AuthLayout.module.scss';

interface Props {
    children?: React.ReactElement;
}

const AuthLayout = (props: Props) => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        if (localStorage.getItem('access_token')) {
            router.push('/');
        } else {
            setLoading(false);
        }
    }, [])
    return (
        <div className={styles.auth_layout}>
            {loading ? <Loading isCenterScreen /> : <>
                <div className={styles.bar_icon}>
                    <Image src={dotArea} alt='' className={`${styles.absolute} ${styles.top_0} ${styles.zIndex}`} />
                    <Image src={mindx} alt='' className={styles.icon} />
                    <Image src={waveLineArea} alt='' className={`${styles.absolute} ${styles.bt_0} ${styles.zIndex}`} />
                </div>
                <div className={styles.content_auth}>
                    {props.children}
                </div>
            </>
            }
        </div>
    )
}

export default AuthLayout;
AuthLayout.isAuth = true;