import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Obj } from '@/global/interface';
import { useGetListCourse, useListTeacher, useTeacherRegisterCourse } from '@/utils/hooks';
import { getStatisticTeacher } from './config';
import styles from '@/styles/Overview.module.scss';

const Columns = () => {
    const listTeacher = useListTeacher() as Obj;
    const getListTeacher = listTeacher.listTeacher?.response?.data?.listTeacher as Obj[] || [];
    const { listCourse } = useGetListCourse();
    const getListCourse = listCourse?.data as Obj[];
    const courseApply = useTeacherRegisterCourse();
    const getListCourseApplyData = courseApply.listData.response?.data as Obj[];
    const listCourseMapName = getStatisticTeacher(getListCourse, getListCourseApplyData, getListTeacher);
    const options: Highcharts.Options = {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Số lượng đảm nhiệm Giảng viên, Mentor, Supporter',
            align: 'left'
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: listCourseMapName.categories?.map(item => item.name) ?? []
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            },
            stackLabels: {
                enabled: true
            }
        },
        legend: {
            enabled: true
        },
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true
                }
            }
        },
        series: [{
            name: 'Giáo viên',
            type: 'column',
            color: '#DA4646',
            data: listCourseMapName.data.ST,
            dataLabels: {
                enabled: false
            }
        }, {
            name: 'Mentor',
            type: 'column',
            color: '#6792F4',
            data: listCourseMapName.data.MT,
            dataLabels: {
                enabled: false
            }
        }, {
            name: 'Supporter',
            type: 'column',
            data: listCourseMapName.data.SP,
            dataLabels: {
                enabled: false
            }
        }]
    }
    return (
        <div className={styles.columnsStatistic}>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </div>
    )
}

export default Columns;