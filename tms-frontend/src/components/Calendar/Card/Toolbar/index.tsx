import React from 'react';
import { ToolbarProps } from 'react-big-calendar';
import { MapIconKey } from '@/global/icon';
import { KEY_ICON } from '@/global/enum';
import styles from '@/styles/Calendar.module.scss';

const Toolbar = (props: ToolbarProps<Event, object>) => {
    return (
        <div className={styles.toolbarCardCalendar}>
            <span className={styles.labelCard}>
                Tháng {props.label}
            </span>
            <div className={styles.fncBtn}>
                <span className={`${styles.chevronL}`} onClick={() => {
                    props.onNavigate('PREV');
                }}>
                    {MapIconKey[KEY_ICON.CHEVRONLCAL]}
                </span>
                <span className={styles.chevronR} onClick={() => {
                    props.onNavigate('NEXT');
                }}>
                    {MapIconKey[KEY_ICON.CHEVRONLCAL]}
                </span>
            </div>
        </div>
    )
}

export default Toolbar;