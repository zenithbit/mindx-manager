import React from 'react';
import RatingCourse from './RatingCourse';
import Ranking from './Rank';
import styles from '@/styles/teacher/ManagerTeacher.module.scss';

const Statistic = () => {
    return (
        <div className={styles.statisticOverView}>
            <div className={`${styles.row}`}>
                <RatingCourse />
                <Ranking />
            </div>
        </div>
    )
}

export default Statistic;