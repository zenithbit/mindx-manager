import { useRouter } from 'next/router';
import React from 'react';

export interface ItemContentPanel {
    title: string;
    route: string;
};
interface Props {
    className?: string;
    listItem: ItemContentPanel[];
};

const ContentPanel = (props: Props) => {
    const router = useRouter();

    return (
        <div className="content-panel">
            {props.listItem.map((item, idx) => {
                return <div
                    className={`item ${router.route === item.route || router.route.includes(item.route) ? 'activeChild' : ''}`}
                    key={idx}
                    onClick={() => {
                        router.push(item.route)
                    }}
                >
                    {item.title}
                </div>
            })}
        </div>
    )
}

export default ContentPanel;