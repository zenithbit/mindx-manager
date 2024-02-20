import React, { useEffect, useState } from 'react';
import { MenuProps, InputNumber } from 'antd';
import { MapIconKey } from '@/global/icon';
import { KEY_ICON } from '@/global/enum';
import Dropdown, { ClickItem } from '../Dropdown';
import styles from '@/styles/SelectInputNumber.module.scss';

interface Props {
    className?: string;
    max?: number;
    min?: number;
    size?: 'small' | 'large' | 'middle';
    value?: number;
    open?: boolean;
    step?: number;
    inputClassName?: string;
    onHandlerNumber?: (type: 'INCRE' | 'DECRE') => void;
    formatLabel?: (number: number) => string;
    onSelect?: (e: ClickItem, keyIndex?: string) => void;
    onChange?: (number: number) => void;
}
const SelectInputNumber = (props: Props) => {
    const listSelectNumber: MenuProps['items'] = [];
    for (let i = props.min ?? 1; i <= (props.max as number || 10); i++) {
        listSelectNumber.push({
            key: i,
            label: props.formatLabel?.(i) || i
        });
    }
    const [value, setValue] = useState(props.value ?? props.min ?? 1);
    return (
        <div className={styles.selectInputNumber}>
            <Dropdown
                onClickItem={(e) => {
                    props.onSelect?.(e);
                    setValue(Number(e.key));
                }}
                className={`${styles.selectNumberDropdown} selectNumberCustom ${props.className}`}
                overlayClassName={styles.overlaySelectNumer}
                title={<InputNumber
                    step={props.step}
                    size={props.size || 'small'}
                    min={props.min ?? 1}
                    max={props.max}
                    className={`${styles.inputNumber} inputNumberCustom ${props.inputClassName}`}
                    value={value}
                    upHandler={<span className={styles.iconChevron} onClick={() => {
                        props.onHandlerNumber?.('INCRE');
                        if (props.max) {
                            if (value < Number(props.max)) {
                                props.onChange?.(props.step ? value + props.step : value + 1);
                                setValue(props.step ? value + props.step : value + 1);
                            }
                        } else {
                            if (value < 10) {
                                props.onChange?.(props.step ? value + props.step : value + 1);
                                setValue(props.step ? value + props.step : value + 1);
                            }
                        }
                    }}>{MapIconKey[KEY_ICON.CHEVRONU]}</span>}
                    downHandler={< span className={styles.iconChevron} onClick={() => {
                        props.onHandlerNumber?.('DECRE');
                        if (value > 1 || (typeof props.min === 'number' && value > Number(props.min))) {
                            props.onChange?.(props.step ? value - props.step : value - 1);
                            setValue(props.step ? value - props.step : value - 1);
                        }
                    }}> {MapIconKey[KEY_ICON.CHEVROND]}</span >}
                />}
                trigger={'click'}
                open={props.open}
                listSelect={listSelectNumber}
            />
        </div >
    )
}

export default SelectInputNumber;