import Highcharts from 'highcharts';
import { Obj } from "@/global/interface";

const chartConfigOptions = (data?: Array<Obj>): Highcharts.Options => {
    return {
        chart: {
            type: 'column',
            options3d: {
                enabled: true,
                alpha: 15,
                beta: 15,
                viewDistance: 25,
                depth: 80
            },
        },
        title: {
            text: 'Thông tin GV 18+',
            align: 'left'
        },

        xAxis: {
            labels: {
                skew3d: true,
                style: {
                    fontSize: '16px'
                }
            },
            categories: ['Tất cả', 'ST', 'MT', 'SP']
        },
        yAxis: {
            allowDecimals: false,
            min: 0,
            title: {
                text: 'Số lượng',
                skew3d: true,
                style: {
                    fontSize: '16px'
                }
            },
        },

        tooltip: {
            headerFormat: '<b>{point.key}</b><br>',
            pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y} / {point.stackTotal}'
        },

        plotOptions: {
            series: {
                stacking: 'normal',
            },
            column: {
                stacking: 'normal',
                depth: 20
            }
        },

        series: [{
            type: 'column',
            name: 'South Korea',
            data: [563, 567, 590, 582, 571],
            stack: 'Asia',
            color: 'red'
        },
        {
            type: 'column',
            name: 'Saudi Arabia',
            data: [368, 378, 378, 367, 363],
            stack: 'Asia'
        },
        {
            type: 'column',
            name: 'Germany',
            data: [650, 654, 643, 612, 572],
            stack: 'Asia'
        },
        {
            type: 'column',
            name: 'France',
            data: [564, 562, 582, 571, 533],
            stack: 'Asia'
        }
        ]
    }
};
export default chartConfigOptions;