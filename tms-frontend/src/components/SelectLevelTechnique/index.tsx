import React from 'react'
import Dropdown, { ClickItem } from '../Dropdown';
import { MenuProps } from 'antd';
import { getStringByLevelTechnique } from '@/global/init';
import { LevelTechnique } from '@/global/enum';

interface Props {
    onSelect?: (e: ClickItem, key?: string) => void;
    className?: string;
    title: string | React.ReactNode;
    size?: "small" | 'middle' | 'large'
}
const SelectLevelTechnique = (props: Props) => {
    const listLevel: MenuProps['items'] = []
    for (const key in getStringByLevelTechnique) {
        const newItem = {
            key,
            label: getStringByLevelTechnique[key as LevelTechnique]
        };
        listLevel.push(newItem);
    }
    return (
        <Dropdown
            sizeButton={props.size}
            className={props.className}
            trigger="click"
            listSelect={listLevel}
            icon
            onClickItem={props.onSelect}
            title={props.title}
        />
    )
}

export default SelectLevelTechnique;