import React from 'react';
import { Collapse as CollapseComponent, Tooltip } from 'antd';
import styles from '@/styles/Collapse.module.scss';
import { Obj } from '@/global/interface';

export interface ItemPanels {
    header: React.ReactNode,
    key: string,
    content: React.ReactElement
}
interface Props {
    panels: Array<ItemPanels>;
    handleChange?: (key: string | string[]) => void;
    expandIconPosition?: 'start' | 'end' | 'left' | 'right';
    className?: string;
    closedBar?: boolean;
    icon?: React.ReactNode;
}
const Collapse = (props: Props) => {
    const getPanels = props.panels[0];
    return (
        <div className={`customize-collapse ${props.className}`}>
            {props.closedBar ?
                <Tooltip
                    color="white"
                    title={<div>

                    </div>}
                    trigger={"hover"} placement={"right"}>
                    <div className={styles.tooltip}>{props.icon}</div>
                </Tooltip>
                :
                <CollapseComponent
                    expandIconPosition={props.expandIconPosition || 'end'}
                    onChange={(key) => {
                        props.handleChange?.(key);
                    }}
                >
                    {
                        props.panels.map((item) => {
                            return <CollapseComponent.Panel header={item.header} key={item.key} >
                                {item.content}
                            </CollapseComponent.Panel>
                        })
                    }
                </CollapseComponent>
            }
        </div >
    )
}

export default Collapse