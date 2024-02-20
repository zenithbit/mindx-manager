import React, { useState } from 'react';
import { TabsProps } from 'antd';
import Tabs from '../Tabs';
import Statistic from './Statistic';
import ListTeacher from './ListTeacher';
import WaitingAccept from './WaitingAccept';
import styles from '@/styles/teacher/ManagerTeacher.module.scss';

export enum TabManagerTeacher {
    // STATISTIC = 'STATISTIC',
    LISTTEACHER = 'LISTTEACHER',
    WAITINGACCEPT = 'WAITINGACCEPT'
}
export const getLableTabManagerTeacher: Record<TabManagerTeacher, string> = {
    LISTTEACHER: 'Danh sách',
    // STATISTIC: 'Thống kê',
    WAITINGACCEPT: 'Đợi duyệt'
}
const listTab: TabsProps['items'] = [
    // {
    //     key: TabManagerTeacher.STATISTIC,
    //     label: getLableTabManagerTeacher[TabManagerTeacher.STATISTIC]
    // },
    {
        key: TabManagerTeacher.LISTTEACHER,
        label: getLableTabManagerTeacher[TabManagerTeacher.LISTTEACHER]
    },
    {
        key: TabManagerTeacher.WAITINGACCEPT,
        label: getLableTabManagerTeacher[TabManagerTeacher.WAITINGACCEPT]
    },
];

const getComponentTab: Record<TabManagerTeacher, React.ReactElement> = {
    // STATISTIC: <Statistic />,
    LISTTEACHER: <ListTeacher />,
    WAITINGACCEPT: <WaitingAccept />,
}

const ManagerTeacher = () => {
    const [tab, setTab] = useState<TabManagerTeacher>(TabManagerTeacher.LISTTEACHER);

    return (
        <div className={styles.managerTeacher}>
            <Tabs
                activeKey={tab}
                listItemTab={listTab}
                notAllowContent
                onClickTab={(key) => {
                    setTab(key as TabManagerTeacher);
                }}
            />
            {getComponentTab[tab]}
        </div>
    )
}

export default ManagerTeacher;