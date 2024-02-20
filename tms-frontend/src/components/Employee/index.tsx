import React from 'react';
import styles from '@/styles/employee/TE.module.scss';
import { Columns } from '@/global/interface';

const Employee = () => {
    const columns: Columns = [
        {
            title: 'Họ tên'
        },
        {
            title: 'Liên hệ'
        }
    ]
    return (
        <div className={styles.listTe}>
            <div className={styles.toolBar}>

            </div>
            <div className={styles.list}>

            </div>
        </div>
    )
}

export default Employee;