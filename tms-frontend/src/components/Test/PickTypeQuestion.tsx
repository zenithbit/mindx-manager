import React, { useState } from 'react';
import Dropdown from '../Dropdown';
import { MenuProps } from 'antd';

interface Props {
    className?: string;
    type?: 'QUIZ' | 'BOOLEAN';
    onChange?: (key: string) => void;
}
export enum TypeQuestion {
    QUIZ = 'QUIZ',
    BOOLEAN = 'BOOLEAN'
}
const typeQuestion: Record<TypeQuestion, string> = {
    QUIZ: 'Quiz',
    BOOLEAN: 'True/False'
}
const PickTypeQuestion = (props: Props) => {
    const [type, setType] = useState(props.type ?? 'QUIZ');
    const list: MenuProps['items'] = [
        {
            key: 'QUIZ',
            label: 'Quiz'
        },
        {
            key: 'BOOLEAN',
            label: 'True/False'
        },
    ];
    const handleChangeType = (key: string) => {
        setType(() => {
            props.onChange?.(key);
            return key as any;
        });
    }
    return (
        <Dropdown
            activeKey={type}
            sizeButton="small"
            className={props.className}
            listSelect={list}
            trigger="click"
            title={typeQuestion[type]}
            onClickItem={(e) => {
                handleChangeType(e.key);
            }}
        />
    )
}

export default PickTypeQuestion;