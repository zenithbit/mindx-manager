import React, { memo } from 'react';
import { HighchartsReact } from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { Obj } from '@/global/interface';
import { TypeOverView } from '.';

const mapKeyForStatusClass: Obj = {
    R: 'Mở',
    D: 'Huỷ',
    P: 'Đợi',
    F: 'Kết thúc'
};
interface Props {
    color?: string;
    data?: (number | [string | number, number | null] | Highcharts.PointOptionsObject | null)[] | undefined;
    type?: TypeOverView;
}
const dataExample = [
    {
        name: 'Chrome',
        y: 30,
        drilldown: 'Chrome'
    },
    {
        name: 'Safari',
        y: 19.84,
        drilldown: 'Safari'
    },
    {
        name: 'Firefox',
        y: 4.18,
        drilldown: 'Firefox'
    },
    {
        name: 'Target',
        y: 4.18,
        drilldown: 'Firefox'
    },
    {
        name: 'Contribution',
        y: 4.18,
        drilldown: 'Firefox'
    },
]
const ChartColumn = (props: Props) => {
    const getData = props.data ?? dataExample;
    const mapTitleToolTip: Record<TypeOverView, string> = {
        CLASS: 'Lớp',
        RANKSALARY: 'Rank',
        TEACHER: 'Số lượng',
        TEACHERPOINT: 'Điểm GV'
    }
    const options: Highcharts.Options = {
        chart: {
            type: 'column',
            height: 100
        },
        title: {
            align: 'left',
            text: ''
        },
        subtitle: {
            align: 'left',
            text: ''
        },
        accessibility: {
            announceNewData: {
                enabled: true
            }
        },
        xAxis: {
            type: 'category',
            labels: {
                enabled: false,
            }
        },
        yAxis: {
            title: {
                text: ''
            }
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: false,
                    format: '{point.y:.1f}%'
                }
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: `<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b><br/>`,
            pointFormatter() {
                return `<span style="color:${this.color}">${mapKeyForStatusClass[this.name] ?? this.name}</span>: <b>${this.y?.toLocaleString()}</b><br/>`
            }
        },
        series: [
            {
                name: `${mapTitleToolTip[props.type as TypeOverView]}`,
                type: 'column',
                // colorByPoint: true,
                data: getData,
            }
        ]
    }
    return (
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </div>
    )
}

export default memo(ChartColumn, (prevProps, nextProps) => {
    return !(JSON.stringify(prevProps) !== JSON.stringify(nextProps));
});