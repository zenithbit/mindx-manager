import React, { useState } from 'react';
import { TabsProps } from 'antd';
import Tabs from '../Tabs';
import ListTE from './ListTe';
import TreeGraphic from './TreeGraphic';
import styles from '@/styles/employee/TE.module.scss';

enum Tab {
    LIST = 'LIST',
    TREE = 'TREE'
}
const TEs = () => {
    const listTab: TabsProps['items'] = [
        {
            key: Tab.LIST,
            label: 'Danh sách'
        },
        {
            key: Tab.TREE,
            label: 'Sơ đồ'
        }
    ];
    const contentMain: Record<Tab, React.ReactNode> = {
        LIST: <ListTE />,
        TREE: <TreeGraphic />
    }
    const [content, setContent] = useState<Tab>(Tab.LIST);
    return (
        <div className={styles.containerPageTe}>
            <Tabs
                listItemTab={listTab}
                notAllowContent
                onClickTab={(key) => {
                    setContent(key as Tab);
                }}
            />
            <div className={styles.contentMain}>
                {contentMain[content]}
            </div>
        </div>
    )
}

export default TEs;