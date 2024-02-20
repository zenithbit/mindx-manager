import React, { useMemo, useRef } from 'react';
import { HighchartsReact } from 'highcharts-react-official';
import Highcharts, { PointOptionsObject } from 'highcharts';
import HeatMap from 'highcharts/modules/heatmap';
import TreeMap from 'highcharts/modules/treemap';
import TreeGraph from 'highcharts/modules/treegraph';
HeatMap(Highcharts);
TreeMap(Highcharts);
TreeGraph(Highcharts);
import { Obj } from '@/global/interface';
import { getLabelPositionTe } from '@/global/init';
import { PositionTe } from '@/global/enum';
import { useComponentSize, useFindGetAllTe } from '@/utils/hooks';
import styles from '@/styles/employee/TE.module.scss';

const TreeGraphic = () => {
    const listTe = useFindGetAllTe();
    const component = useRef(null);
    const getComponentSize = useComponentSize(component);
    const getListTe = listTe.data.response?.data as Obj[];
    const teLeader = getListTe?.find((item) => item.positionTe === PositionTe.LEADER);
    const getListGraph = useMemo(() => {
        const list = getListTe?.map((item) => {
            const data: PointOptionsObject | Obj = {
                parent: item.positionTe === PositionTe.LEADER ? '' : teLeader?.teName,
                name: item.teName,
                id: item.teName,
                color: item.positionTe === PositionTe.LEADER ? '#f39c12' : 'pink',
                dataLabels: {
                    style: {
                        color: 'black'
                    }
                },
                marker: {
                    symbol: item.positionTe === PositionTe.LEADER ? 'diamond' : 'circle',
                    radius: 50,
                },
                positionTe: item.positionTe,
                imgSrc: item.img ?? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxIAjHQ4xc94bnLmRhvxQFdAuS6xje_jwseA&usqp=CAU",
                ...item.courseId ? {
                    course: item.courseId.courseName
                } : {}
            };
            return data
        });
        return list;
    }, [getListTe]);
    const options: Highcharts.Options = {
        chart: {
            spacingBottom: 30,
            inverted: true,
            height: getComponentSize.height
        },
        title: {
            text: 'Sơ đồ cấu trúc team Teaching'
        },
        tooltip: {
            useHTML: true,
            style: {
                height: 500,
                padding: "0"
            },
            backgroundColor: "transparent"
        },
        series: [
            {
                type: 'treegraph',
                data: getListGraph,
                tooltip: {
                    pointFormatter() {
                        const ref = this as unknown as Obj;
                        return `<div class="${styles.tooltipPoint}">
                            <img alt="ảnh" src="${ref.imgSrc}" class="${styles.imgTe}"/>
                            <p>Vị trí: ${getLabelPositionTe[ref.positionTe as PositionTe]}${ref.course ? `-${ref.course}` : ''}</p>
                            <p>Họ tên: ${ref.name}</p>
                        </div>`
                    },
                },
                marker: {
                    width: 120,
                    height: 120,
                    radius: 5,
                },
                dataLabels: {
                    style: {
                        whiteSpace: 'nowrap',
                        textOutline: 'none',
                    },
                },
            }
        ]
    }
    return (
        <div ref={component}>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </div>
    )
}

export default TreeGraphic