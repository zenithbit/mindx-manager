import React, { Context, useContext, useState } from 'react';
import { Button, Dropdown, Tag } from 'antd';
import type { MenuProps } from 'antd';
import { ContextInterface } from './interface';
import { fieldFilter } from '@/global/init';
import { MapIconKey } from '@/global/icon';
import { KEY_ICON } from '@/global/enum';
import PopUp from '@/components/PopUp';
import PopUpFilter from './PopUpFilter';
import FieldOption from '@/components/ManagerClass/listFieldByOption';
import styles from '@/styles/tabs/Toolbar.module.scss';

export interface ItemFilterField {
    key: string;
    title: string
}

interface Props {
    listFilter: ItemFilterField[];
    createButton?: boolean;
    createButtonClassName?: boolean;
    exportCSVButton?: boolean;
    exportCSVButtonClassName?: boolean;
    iconReload?: boolean;
    context: Context<ContextInterface>;
    enableFilter?: boolean;
    onClickCreateButton?: () => void;
    onClickExportCSVButton?: () => void;
    onClickReload?: () => void;
}
const ToolBar = (props: Props) => {
    const storeContext = useContext(props.context);

    const items: MenuProps['items'] = props.listFilter.filter((item) => {
        return (storeContext.listFieldFilter.findIndex((element) => element.key === item.key) < 0)
    }).map((item) => {
        return {
            label: <Tag key={item.key} className='tag-customize'>
                <span>{item.title}</span>
            </Tag>,
            key: item.key,
            onClick: () => {
                storeContext.listFieldFilter.push({
                    key: item.key,
                    title: item.title,
                    value: ''
                });
                storeContext.setContext({
                    crrKeyTab: storeContext.crrKeyTab,
                    listFieldFilter: storeContext.listFieldFilter
                })
            }
        }
    });
    const handleCloseTag = (key: string) => {
        let crrIndex = -1;
        const storeFindKey = storeContext.listFieldFilter.find((item, index) => {
            if (item.key === key) {
                crrIndex = index;
                return item;
            }
            return undefined;
        });
        if (storeFindKey) {
            storeContext.listFieldFilter.splice(crrIndex, 1);
            storeContext.setContext({
                crrKeyTab: storeContext.crrKeyTab,
                listFieldFilter: storeContext.listFieldFilter
            });
        }
    };
    const [openPopUp, setOpenPopUp] = useState({
        open: false,
        index: ''
    });
    return (
        <div className={`${styles.toolbar} toolbar-customize`}>
            {
                props.enableFilter && (
                    <div className="filter-list">
                        {
                            storeContext.listFieldFilter.map((item: { key: string; title: string }) => {
                                return (
                                    <PopUp
                                        open={item.key === openPopUp.index && openPopUp.open}
                                        handlePopUp={() => {
                                            setOpenPopUp({
                                                index: item.key,
                                                open: true
                                            });
                                        }} content={<PopUpFilter closeIcon handleClose={() => {
                                            setOpenPopUp({
                                                index: '',
                                                open: false
                                            })
                                        }} listFilter={FieldOption[item.key]} limit={2} />} key={item.key}>
                                        <Tag role='button' className="tag-customize">
                                            <span className={`${item.key === fieldFilter.OPEN_SCHEDULE || item.key === fieldFilter.TIME_SCHEDULE ? 'default' : ''}`}>
                                                {item.title}
                                                <span onClick={() => {
                                                    handleCloseTag(item.key);
                                                }}>{MapIconKey[KEY_ICON.PLCR]}</span>
                                            </span>
                                        </Tag>
                                    </PopUp>
                                )
                            })
                        }
                        <div className="dropdown-toolbar-manager-class">
                            <Dropdown menu={{ items }} trigger={['click']}>
                                <span>{MapIconKey[KEY_ICON.PL]} Thêm filter</span>
                            </Dropdown>
                        </div>
                    </div>
                )
            }
            <div className="right-fnc">
                <div className="search">
                    {MapIconKey[KEY_ICON.SRCH]}
                    {MapIconKey[KEY_ICON.DOT3VT]}
                </div>
                {props.createButton && <Button
                    className={`btn-toolbar mr-8 ${props.createButtonClassName}`}
                    onClick={() => {
                        props.onClickCreateButton?.();
                    }}
                >
                    <span>{MapIconKey[KEY_ICON.PLCR]} Tạo mới</span>
                </Button>}
                {
                    props.exportCSVButton && <Button
                        className={`btn-toolbar ${props.exportCSVButtonClassName}`}
                        onClick={() => {
                            props.onClickExportCSVButton?.()
                        }}
                    >
                        <span>{MapIconKey[KEY_ICON.EP]} Xuất file</span>
                    </Button>
                }
                {
                    props.iconReload &&
                    <Button
                        className={`btn-toolbar ${styles.btnReload}`}
                        onClick={() => {
                            props.onClickReload?.();
                        }}
                    >
                        <span className={styles.reload}>{MapIconKey[KEY_ICON.RELOAD]}</span>
                    </Button>
                }
            </div>
        </div>
    )
}

export default ToolBar