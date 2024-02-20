import React from 'react';
import Highcharts from 'highcharts';
import Highcharts3D from 'highcharts/highcharts-3d';
Highcharts3D(Highcharts);
import { HighchartsReact } from 'highcharts-react-official';
import { Obj } from '@/global/interface';
import { RoundProcess } from '@/global/enum';
import { useGetListDataRecruitment } from '@/utils/hooks';
import styles from '@/styles/Overview.module.scss';

const ByCourse = () => {
    const listCandidate = useGetListDataRecruitment();
    const getDataListCandidate = ((listCandidate.data.response?.data as Obj)?.listData as Obj[]) || [];
    const mapDataByCourse: Obj = {};
    getDataListCandidate.forEach((item) => {
        mapDataByCourse[item.courseApply.courseName as string] = mapDataByCourse[item.courseApply.courseName as string] ? mapDataByCourse[item.courseApply.courseName as string] + 1 : 1;
        if (item.roundProcess !== RoundProcess.CV) {
            mapDataByCourse[`${item.courseApply.courseName as string}Pass`] = mapDataByCourse[`${item.courseApply.courseName as string}Pass`] ? mapDataByCourse[`${item.courseApply.courseName as string}Pass`] + 1 : 1;
        }
    });
    const options: Highcharts.Options = {
        chart: {
            type: 'column',
            options3d: {
                enabled: true,
                alpha: 2,
                beta: 20,
                viewDistance: 25,
                depth: 80
            },
        },
        title: {
            text: 'Chỉ số CV theo bộ môn',
            align: 'left'
        },
        subtitle: {
            text: '',
            align: 'left'
        },
        xAxis: {
            categories: ['Web', 'UI/UX', 'Data'],
            crosshair: true,
            accessibility: {
                description: 'Countries'
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            }
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        legend: {
            symbolRadius: 0
        },
        series: [
            {
                type: 'column',
                name: 'Tổng',
                data: [mapDataByCourse['Web'], mapDataByCourse['Data'], mapDataByCourse['UIUX']]
            },
            {
                type: 'column',
                name: 'Pass',
                data: [mapDataByCourse['WebPass'], mapDataByCourse['DataPass'], mapDataByCourse['UIUXPass']]
            }
        ]
    }
    return (
        <div className={styles.courseColumn}>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </div>
    )
}

export default ByCourse