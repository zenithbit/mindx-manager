import React, { useState } from 'react';
import { TabsProps } from 'antd';
import Tabs from '@/components/Tabs';
import Overview from './Overview';
import Schedule from './Schedule';
import TimeKeeping from './TimeKeeping';
import Class from './Class';
import styles from '@/styles/teacher/DetailTeacher.module.scss';

enum Content {
    OVERVIEW = 'OVERVIEW',
    SCHEDULE = 'SCHEDULE',
    TIMEKEEPING = 'TIMEKEEPING',
    CLASS = 'CLASS'
}
const listTab: TabsProps['items'] = [
    {
        key: Content.OVERVIEW,
        label: 'Thông tin tổng quan'
    },
    {
        key: Content.SCHEDULE,
        label: 'Lịch'
    },
    {
        key: Content.TIMEKEEPING,
        label: 'Chấm công'
    },
    {
        key: Content.CLASS,
        label: 'Lớp học'
    }
]
const currentContentTab: Record<Content, React.ReactElement> = {
    OVERVIEW: <Overview />,
    SCHEDULE: <Schedule />,
    TIMEKEEPING: <TimeKeeping />,
    CLASS: <Class />
}
const DetailTeacher = () => {
    const [tab, setTab] = useState<Content>(Content.OVERVIEW);
    return (
        <div className={`${styles.detailTeacher}`}>
            <Tabs
                listItemTab={listTab}
                notAllowContent
                onClickTab={(key) => {
                    setTab(key as Content)
                }}
            />
            {currentContentTab[tab]}
        </div>
    )
}

export default DetailTeacher;