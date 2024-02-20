import React from 'react';
import { Tabs as TabsComponent } from 'antd';
import type { TabsProps } from 'antd';
import styles from '@/styles/tabs/Tab.module.scss'

interface Props {
    children?: React.ReactElement;
    className?: string;
    listItemTab: TabsProps['items'];
    activeKey?: string;
    onClickTab?: (key: string) => void;
    notAllowContent?: boolean;
}
const Tabs = (props: Props) => {
    const mapContent = props.listItemTab!.map((item) => {
        return {
            ...item,
            children: props.notAllowContent ? '' : item.children
        }
    });
    return <TabsComponent
        defaultActiveKey={props.listItemTab?.[0]?.key || ''}
        activeKey={props.activeKey as string}
        items={mapContent}
        onChange={props.onClickTab}
        className={`${props.className} ${styles.tabsCustomize} tabs-customize`}
    />
};

export default Tabs;