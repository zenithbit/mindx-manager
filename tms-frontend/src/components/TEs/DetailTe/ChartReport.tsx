import React from 'react';
import Highcharts from 'highcharts';
import { HighchartsReact } from 'highcharts-react-official';

const ChartReport = () => {
    const options: Highcharts.Options = {
        chart: {
            type: 'spline'
        },
        title: {
            text: 'Báo cáo'
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            accessibility: {
                description: ''
            }
        },
        legend: {
            enabled: false
        },
        yAxis: {
            title: {
                text: ''
            },
            labels: {
                format: '{value}'
            }
        },
        tooltip: {
            shared: true
        },
        plotOptions: {
            spline: {
                marker: {
                    radius: 4,
                    lineColor: '#666666',
                    lineWidth: 1
                }
            }
        },
        series: [{
            name: 'Tokyo',
            type: "spline",
            marker: {
                symbol: 'none',
                enabled: false
            },
            data: [5.2, 5.7, 8.7, 13.9, 18.2, 21.4, 25.0, {
                y: 26.4,
            }, 22.8, 17.5, 12.1, 0]

        },
        {
            type: "column",
            data: [5.2, 5.7, 8.7, 13.9, 18.2, 21.4, 25.0, {
                y: 26.4,
            }, 22.8, 17.5, 12.1, 0]
        }]
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

export default ChartReport;