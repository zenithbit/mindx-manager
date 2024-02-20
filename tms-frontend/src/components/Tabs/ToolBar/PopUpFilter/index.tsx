import React, { useEffect, useState } from 'react';
import { Checkbox, Input } from 'antd';
import { KEY_ICON, STATUS_CLASS } from '@/global/enum';
import { MapIconKey } from '@/global/icon';
import styles from '@/styles/tabs/Popup.module.scss';
import { getColorFromStatusClass } from '@/global/init';

export interface FieldPopUpFilter {
    key: string,
    title: string
}
interface Props {
    listFilter: Array<FieldPopUpFilter>;
    limit?: number;
    closeIcon?: boolean;
    handleClose?: (visible: boolean) => void;
}

const PopUpFilter = (props: Props) => {
    const [more, setMore] = useState<boolean>(false);
    const limit = props.limit || 5;
    const [filter, setFilter] = useState<Array<FieldPopUpFilter>>([]);
    const [strSeach, setStrSearch] = useState<string>('');
    const [listSelect, setListSelect] = useState<string[]>([]);

    const handleSearch = (str: string) => {
        setStrSearch(str);
    };
    useEffect(() => {
        const list = props.listFilter.filter((item) => {
            return item.title.toLowerCase().includes(strSeach.toLowerCase());
        });
        setFilter(list);
    }, [strSeach]);
    const onSelectCheckBox = (value: string) => {
        const findIdx = listSelect.findIndex((item) => item === value);
        if (findIdx >= 0) {
            listSelect.splice(findIdx, 1)
        } else {
            listSelect.push(value);
        }
        setListSelect([...listSelect]);
    }
    return (
        <div className={`${styles.popupFilter} popup-filter`}>
            <div className={styles.input}>
                <Input size='large' prefix={MapIconKey[KEY_ICON.SRCH]} className={styles.inputPopup} onChange={(e) => {
                    handleSearch(e.target.value);
                }} />
                {props.closeIcon && <span className={styles.rt45} onClick={(() => {
                    props.handleClose?.(false);
                })}>{MapIconKey[KEY_ICON.PLCR]}</span>}
            </div>
            <div className={styles.listRender}>
                {
                    strSeach ? (filter.length > 0 ? filter.map((item) => {
                        return <Checkbox
                            key={item.key}
                            value={item.key}
                            checked={listSelect.findIndex((e) => e === item.key) >= 0}
                            onChange={(e) => {
                                onSelectCheckBox(e.target.value);
                            }}>
                            <span className={`tagCheckbox ${item.key} ${item.key.includes('MONTH') ? 'default' : ''}`}>{item.title}</span>
                        </Checkbox>
                    }) :
                        <span className="clGrey text-center">Không có dữ liệu</span>) :
                        (props.listFilter!.slice(0, (!more ? ((Number(props.limit)) || 6) : props.listFilter.length)).map((item) => {
                            return <Checkbox
                                key={item.key}
                                value={item.key}
                                checked={listSelect.findIndex((e) => e === item.key) >= 0}
                                onChange={(e) => {
                                    onSelectCheckBox(e.target.value);
                                }}>
                                <span className={`tagCheckbox ${item.key} ${item.key.includes('MONTH') ? 'default' : ''}`}>{item.title}</span>
                            </Checkbox>
                        }))
                }
                {!more &&
                    (props.listFilter.length > limit) &&
                    <span
                        className={styles.showMore}
                        onClick={() => {
                            setMore(true);
                        }}
                    >
                        {MapIconKey[KEY_ICON.DOT3HT]}
                        <span>Xem thêm</span>
                    </span>}
            </div>
        </div >
    )
}

export default PopUpFilter;