import React, { useState } from 'react';
import { TabsProps } from 'antd';
import Tabs from '@/components/Tabs';
import CalendarTab from './CalendarTab';
import TableTab from './Table';
import styles from '@/styles/Recruitment/CalendarInterview.module.scss';

enum Tab {
    TABLE = 'TABLE',
    CALENDAR = 'CALENDAR'
}
const Calendar = () => {
    const tabs: TabsProps['items'] = [
        {
            label: 'Bảng',
            key: Tab['TABLE']
        },
        {
            label: 'Lịch',
            key: Tab['CALENDAR']
        }
    ];
    const [contentTab, setContentTab] = useState<Tab>(Tab.TABLE);
    const content: Record<Tab, React.ReactElement> = {
        CALENDAR: <CalendarTab />,
        TABLE: <TableTab />
    }
    return (
        <div className={styles.calendarInterview}>
            <Tabs
                listItemTab={tabs}
                onClickTab={(e) => {
                    setContentTab(e as Tab);
                }}
                notAllowContent
            />
            {content[contentTab]}
        </div>
    )
}

export default Calendar;