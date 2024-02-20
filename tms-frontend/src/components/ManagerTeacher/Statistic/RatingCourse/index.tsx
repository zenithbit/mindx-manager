import React from 'react';
import { HighchartsReact } from 'highcharts-react-official';
import Highcharts from 'highcharts';
import Highcharts3D from 'highcharts/highcharts-3d';
import chartConfigOptions from './config';
Highcharts3D(Highcharts);
import styles from '@/styles/teacher/ManagerTeacher.module.scss'

const RatingCourse = () => {
    const options = chartConfigOptions();
    return (
        <div className={styles.ratingCourse}>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </div>
    )
}

export default RatingCourse;