import React from 'react';
import ChartReport from './ChartReport';
import styles from '@/styles/employee/TE.module.scss';

const OverView = () => {
    return (
        <div className={styles.overViewTe}>
            <div className={styles.baseInfo}>
                <div className={styles.item}>
                    <span>
                        <p>Bắt đầu làm việc</p>
                        <p>12/2021</p>
                    </span>
                </div>
                <div className={`${styles.item} ${styles.itemMiddle}`}>
                    <span>
                        <p>Số lớp QC</p>
                        <p>40 lớp</p>
                    </span>
                </div>
                <div className={styles.item}>
                    <span>
                        <p>Tổng Report</p>
                        <p>30 Report</p>
                    </span>
                </div>
            </div>
            <div className={styles.statisticReport}>
                <ChartReport />
            </div>
        </div>
    )
}

export default OverView;