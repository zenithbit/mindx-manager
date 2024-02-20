import React, { HTMLAttributes } from 'react';

const IconArrowView = (props: HTMLAttributes<HTMLElement | any>) => {
    return (
        <svg className={props.className} {...props} width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.1667 1.3335L0.833414 10.6668" stroke="#222222" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10.1667 8.18016V1.3335H3.32008" stroke="#222222" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

    )
}

export default IconArrowView;