import React from 'react';
import styles from '@/styles/tabs/Content.module.scss';

interface Props {
    children?: React.ReactElement;
    toolBar?: React.ReactElement;
}
const Content = (props: Props) => {
    return (
        <div className={styles.contentTab}>
            {props.toolBar &&
                <div className={styles.toolbar}>
                    {props.toolBar}
                </div>
            }
            {props.children}
        </div>
    )
}

export default Content