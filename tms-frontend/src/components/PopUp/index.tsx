import { Popover } from 'antd';
import React from 'react';

interface Props {
    children: React.ReactElement;
    content: React.ReactElement;
    open: boolean;
    handlePopUp: (open: boolean) => void;
}
const PopUp = (props: Props) => {

    return (
        <Popover
            content={props.content}
            trigger="click"
            open={props.open}
            onOpenChange={() => {
                props.handlePopUp(true);
            }}
            destroyTooltipOnHide
        >
            {props.children}
        </Popover>
    );
}

export default PopUp;