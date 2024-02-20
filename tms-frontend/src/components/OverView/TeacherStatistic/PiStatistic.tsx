import React, { memo, useEffect, useState } from 'react';
import { HighchartsReact } from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { FilterOutlined } from '@ant-design/icons';
import { Obj } from '@/global/interface';
import { useGetArea, useGetListCourse, useListTeacher, useTeacherRegisterCourse } from '@/utils/hooks';
import SelectBaseCourse from '@/components/SelectBaseCourse';
import { filterTeacherWithArea } from './config';
import styles from '@/styles/Overview.module.scss';

const PiChart = memo((props: { options: Highcharts.Options }) => {
    return <HighchartsReact
        highcharts={Highcharts}
        options={props.options}
    />
}, (prevProps, nextProps) => {
    return (JSON.stringify(prevProps) === JSON.stringify(nextProps));
});
PiChart.displayName = 'PiChart';
const PiStatistic = () => {
    const listTeacher = useListTeacher() as Obj;
    const getListTeacher = listTeacher.listTeacher?.response?.data?.listTeacher as Obj[] || [];
    const listArea = useGetArea();
    const getListArea = listArea.data.response?.data as Obj[];
    const { listCourse } = useGetListCourse();
    const getListCourse = listCourse?.data as Obj[];
    const courseApply = useTeacherRegisterCourse();
    const getListCourseApplyData = courseApply.listData.response?.data as Obj[];
    const [data, setData] = useState<(number | Highcharts.PointOptionsObject | [string, number | null] | null)[] | undefined>([]);
    const [valueCourse, setValueCourse] = useState<string>(getListCourse?.[0]?._id || '');
    const handleChangeCourse = (courseId: string) => {
        setValueCourse(courseId);
        const listLocation = filterTeacherWithArea(getListCourseApplyData, getListTeacher, getListArea, courseId)
        setData(listLocation);
    }
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
            text: 'Phân bổ giáo viên',
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
            data: data,
            dataLabels: {
                style: {
                    textOutline: 'none'
                }
            }
        }]
    }
    useEffect(() => {
        listArea.query();
    }, []);
    useEffect(() => {
        if (getListTeacher?.length !== 0 && getListCourse?.length !== 0 && getListArea) {
            const defaultCourse = getListCourse?.[0];
            if (defaultCourse && !valueCourse) {
                setValueCourse(defaultCourse?._id);
            }
            if (!courseApply.listData.response && !courseApply.listData.isLoading) {
                const listTeacherId = getListTeacher.map((item) => {
                    return item._id as string;
                });
                courseApply.query(listTeacherId);
            } else if (courseApply.listData.success) {
                const listLocation = filterTeacherWithArea(getListCourseApplyData, getListTeacher, getListArea, defaultCourse?._id)
                setData(listLocation);
            }
        }
    }, [getListTeacher, getListCourse, courseApply.listData, getListArea]);
    return (
        <div className={styles.teacherStatisticPiChart}>
            <div className={styles.filter}>
                <FilterOutlined />
                <SelectBaseCourse onChange={handleChangeCourse} disabledAll value={valueCourse} />
            </div>
            <PiChart options={options} />
        </div>
    )
}

export default PiStatistic;