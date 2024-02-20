import { useRouter } from 'next/router';
import React from 'react';
interface Props {
    className?: string;
    icon?: React.ReactNode;
    title?: React.ReactNode;
    listChildRoute: string[];
}
const HeaderPanel = (props: Props) => {
    const router = useRouter();
    return (
        <div className={`${props.className} ${props.listChildRoute.includes(router.route) || props.listChildRoute.find((item) => router.route.includes(item)) ? 'headerPanelActive' : ''}`}>{props.icon} {props.title}</div>
    )
}

export default HeaderPanel;