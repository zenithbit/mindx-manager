import React from 'react';
import { HighchartsReact } from 'highcharts-react-official';
import Highcharts from 'highcharts';
import Highcharts3D from 'highcharts/highcharts-3d';
Highcharts3D(Highcharts);
import { Obj } from '@/global/interface';
import { ResourceApply } from '@/global/enum';
import { useGetListDataRecruitment } from '@/utils/hooks';
import styles from '@/styles/Overview.module.scss';

const PiResourceApply = () => {
    const listCandidate = useGetListDataRecruitment();
    const getDataListCandidate = (listCandidate.data.response?.data as Obj)?.listData as Obj[] || [];
    const getDataResourceApply: Record<ResourceApply, number> = {
        AN: 0,
        FB: 0,
        LKD: 0,
        RF: 0,
        TCV: 0
    }
    getDataListCandidate.forEach((item) => {
        getDataResourceApply[item.resourceApply as ResourceApply]++
    });
    const options: Highcharts.Options = {
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }
        },
        title: {
            text: 'Thống kê theo nguồn',
            align: 'left',
            y: 10
        },
        subtitle: {
            text: '',
            align: 'left'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'Tỉ lệ',
            data: [
                ['Khác', getDataResourceApply.AN],
                ['TopCV', getDataResourceApply.TCV],
                ['Facebook', getDataResourceApply.FB],
                ['Refer', getDataResourceApply.RF],
                ['Linkedin', getDataResourceApply.LKD]
            ],
            dataLabels: {
                style: {
                    textOutline: 'none'
                }
            }
        }]
    }
    return (
        <div className={styles.pi3D}>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </div>
    )
}

export default PiResourceApply;