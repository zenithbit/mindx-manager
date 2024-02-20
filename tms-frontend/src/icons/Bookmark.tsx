import React, { HTMLAttributes } from 'react';

const Bookmark = (props: HTMLAttributes<HTMLElement | any>) => {
    return (
        <svg {...props} width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#BB0409">
            <g id="SVGRepo_bgCarrier" strokeWidth="0" />
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
            <g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M18 4H6V20H8.06066L12 16.0607L15.9393 20H18V4ZM7.5 18.4393V5.5H16.5V18.4393L12 13.9393L7.5 18.4393Z" fill="#BB0409" /> </g>
        </svg>
    )
}

export default Bookmark;