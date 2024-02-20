import React from 'react';
import styles from '@/styles/feedback/Feedback.module.scss';

const Question = () => {
    return (
        <div className={`${styles.managerQuestion} ${styles.child}`}>
            <div className={`${styles.headerQuestion} bg-white radius`}>
                <div className={`${styles.lineHead}`}></div>
                <div className={`${styles.title}`}>
                    <h2>
                        MINDX | KHẢO SÁT TRẢI NGHIỆM HỌC VIÊN
                    </h2>
                </div>
            </div>
        </div>
    )
}

export default Question;