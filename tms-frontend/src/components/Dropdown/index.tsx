import React from 'react';
import { Button, Dropdown as DropdownComponent, MenuProps } from 'antd';
import { Obj } from '@/global/interface';
import { MapIconKey } from '@/global/icon';
import { KEY_ICON } from '@/global/enum';

export interface ClickItem {
    key: string;
    keyPath: string[];
    item: React.ReactInstance;
    domEvent: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
}
interface Props {
    trigger: 'click' | 'hover' | 'contextMenu';
    listSelect: MenuProps['items'];
    className?: string;
    disabled?: boolean;
    keyIndex?: string;
    title?: React.ReactNode | string;
    open?: boolean;
    activeKey?: string;
    activeClass?: string;
    overlayClassName?: string;
    sizeButton?: 'small' | 'large' | 'middle';
    icon?: boolean;
    onOpenChange?: (open: boolean) => void;
    onClickItem?: (e: ClickItem, keyIndex?: string) => void;
    loading?: boolean;
}
const Dropdown = (props: Props) => {
    const mapListSelect: any = props.listSelect?.map((item) => {
        return {
            ...item,
            className: props.activeKey === item!.key ? props.activeClass : '',
            onClick(e: ClickItem) {
                props.onClickItem?.(e, props.keyIndex);
            }
        }
    });
    return (
        <div className={props.className}>
            <DropdownComponent
                disabled={props.disabled}
                menu={mapListSelect ? { items: mapListSelect } : undefined}
                open={props.open}
                onOpenChange={(open) => {
                    props.onOpenChange?.(open);
                }}
                trigger={[props.trigger]}
                className={`dropdownCustomize ${props.className}`}
                rootClassName='open-dropdown-custommize'
                dropdownRender={(origin) => {
                    const getArrayItems = ((origin as unknown as Obj)?.props as Obj)?.items as Array<Obj>;
                    if (getArrayItems.length === 0) return <span style={{ backgroundColor: 'white', padding: '4px' }}>Ôi, không có gì để chọn hết!</span>
                    return origin
                }}
                overlayClassName={props.overlayClassName}
            >
                {typeof props.title === 'string' ?
                    (<Button loading={props.loading} size={props.sizeButton}>{props.title} {props.icon && MapIconKey[KEY_ICON.CHEVROND]}</Button>) :
                    (props.title || <Button></Button>)
                }
            </DropdownComponent>
        </div>
    )
}

export default Dropdown;