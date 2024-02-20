import React from 'react';
import { ToolbarProps, View } from 'react-big-calendar';
import styles from '@/styles/Calendar.module.scss';
import { MapIconKey } from '@/global/icon';
import { KEY_ICON } from '@/global/enum';

const getViewString: Record<View, string> = {
    month: 'Tháng',
    week: 'Tuần',
    day: 'Ngày',
    agenda: 'Lịch trình',
    work_week: 'Công việc trong tuần'
}
const Toolbar = (props: ToolbarProps<Event, object>) => {
    // console.log(props);
    return (
        <div className={`${styles.toolbar}`}>
            <div className={`${styles.left}`}>
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
                <span className={styles.month}>{getViewString[props.view as View]} {props.label}</span>
                <button className={styles.btnToday} onClick={() => {
                    props.onNavigate('TODAY')
                }}>Hôm nay</button>
            </div>
            <div className={styles.right}>
                {(props.views as Array<string>).slice(0, (props.views as Array<string>).length - 1).map((item, idx) => {
                    return <button
                        key={idx}
                        className={`${props.view === item ? styles.active : ''}`}
                        onClick={() => {
                            props.onView(`${item as View}`)
                        }}
                    >
                        {
                            getViewString[item as 'month' | 'week' | 'day']
                        }
                    </button>
                })}
            </div>
        </div>
    )
}

export default Toolbar;