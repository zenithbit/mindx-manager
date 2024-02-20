import React, { useState } from 'react';
import { TabsProps } from 'antd';
import { Obj } from '@/global/interface';
import Statistic from './Statistic';
import Synthetic from './Synthetic';
import styles from '@/styles/Test.module.scss';

enum ContentTest {
    STATISTIC = 'STATISTIC',
    SYNTHETIC = 'SYNTHETIC'
}
const Test = () => {
    const listTab: TabsProps['items'] = [
        {
            key: ContentTest.STATISTIC,
            label: 'Thống kê'
        },
        {
            key: ContentTest.SYNTHETIC,
            label: 'Tổng hợp'
        }
    ];
    const [crrTab, setCrrTab] = useState<ContentTest>(ContentTest.SYNTHETIC);
    const content: Record<ContentTest, React.ReactNode> = {
        STATISTIC: <Statistic />,
        SYNTHETIC: <Synthetic />
    };
    return (
        <div className={styles.containerTestCourse}>
            {/* <Tabs
                listItemTab={listTab}
                notAllowContent
                onClickTab={(key) => {
                    setCrrTab(key as ContentTest)
                }}
            /> */}
            <div className={styles.content}>
                {content[crrTab]}
            </div>
        </div>
    )
}

export default Test;