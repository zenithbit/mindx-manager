import React, { useMemo, useRef, useState } from 'react';
import 'moment/locale/en-gb';
import { Formats, Calendar as ReactBigCalendar, momentLocalizer, Components, View, NavigateAction } from 'react-big-calendar';
import moment from 'moment';
import { EventCalendar, Obj } from '@/global/interface';
import { formatDatetoString, getWeekday, uuid } from '@/utils';
import Toolbar from './Toolbar';
import CardCalendar from './Card';
import NoteCalendar from './Note';
import EventWrapper from './EventWrapper';
import { StatusEvent } from './Note/styles';
import styles from '@/styles/Calendar.module.scss';
import { ROLE_TEACHER } from '@/global/enum';

moment.locale('en-GB');
const localizer = momentLocalizer(moment) // or globalizeLocalizer

interface Props {
    className?: string;
    enabledCalendarCard?: boolean;
    enabledCalendarNote?: boolean;
    isTeacherCalendar?: boolean;
    listEvent: EventCalendar[];
    onNavigate?: (newDate: Date, view: View, action: NavigateAction) => void;
}
const enddate = new Date();
enddate.setDate((new Date()).getDate() + 4);
const events: EventCalendar[] = [
    {
        id: uuid(),
        end: new Date(),
        start: new Date(),
        title: 'TC-C4EJS140',
        status: StatusEvent.ACTIVE,
        allDay: false,
        resource: {
            location: '22c Thành Công, Ba Đình, Hà Nội',
            classSession: 12,
            role: ROLE_TEACHER.MT,
            checked: false,
            timeChecked: 1.5
        }
    },
    {
        id: uuid(),
        end: enddate,
        start: new Date(),
        title: 'Hôm nay bùng làm',
        status: StatusEvent.DAYOFF,
        allDay: true,
    },
]
const Calendar = (props: Props) => {
    const formats: Formats = useMemo(() => {
        return {
            weekdayFormat: (date: Date) => {
                return getWeekday(date.getDay(), true) as string;
            },
            monthHeaderFormat: (date, culture, localizer) => {
                return localizer?.format(date, 'MM yyyy', culture) as string;
            },
            dayHeaderFormat: (date, culture, localizer) => {
                return localizer?.format(date, `DD MM yyyy`, culture) as string;
            },
            dayRangeHeaderFormat: (date) => {
                return `${formatDatetoString(new Date(date.start), 'dd/MM')} - ${formatDatetoString(new Date(date.end), 'dd/MM')}`;
            },
            dayFormat: (date) => {
                return `${getWeekday(date.getDay(), true) as string}-${formatDatetoString(date, 'dd/MM')}`
            }
        }
    }, []);
    const components: Components<EventCalendar, object> = useMemo(() => {
        return {
            toolbar: Toolbar,
            eventWrapper: (propsEventWrapper) => {
                return EventWrapper({ ...propsEventWrapper, isTeacherCalendar: props.isTeacherCalendar })
            }
        }
    }, []);
    const calendarRef = useRef(null);
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [rangeTime] = useState<{
        min: Date,
        max: Date
    }>(() => {
        const min = new Date();
        const max = new Date();
        if (props.isTeacherCalendar) {
            min.setHours(14);
            min.setMinutes(0);
            min.setMilliseconds(0);

            max.setHours(23);
            max.setMinutes(0);
            max.setMilliseconds(0);
        }
        return {
            min, max
        };
    })

    const onDrillDown = (date: Date, view: View) => {
        // click date on cell
        (calendarRef.current as unknown as Obj).handleViewChange('day');
        setCurrentDate(date);
    }

    return (
        <div className={`${styles.calendar} calanderCustomize h-100 ${props.className ? props.className : ''}`}>
            {(props.enabledCalendarCard || props.enabledCalendarNote) &&
                <div className={styles.leftFnc}
                    style={{ height: '100%', width: '25%' }}
                >
                    {
                        props.enabledCalendarNote && <NoteCalendar />
                    }
                    {
                        props.enabledCalendarCard && <CardCalendar
                            date={currentDate}
                            onClickDay={onDrillDown}
                            localizer={localizer}
                        />
                    }
                </div>
            }
            <ReactBigCalendar
                min={rangeTime.min}
                max={rangeTime.max}
                ref={calendarRef}
                localizer={localizer}
                formats={formats}
                defaultDate={new Date()}
                onDrillDown={onDrillDown}
                components={components}
                events={props.listEvent}
                date={currentDate}
                onNavigate={(newDate, view, action) => {
                    props.onNavigate?.(newDate, view, action);
                    setCurrentDate(newDate);
                }}
                defaultView='month'
                style={{
                    flex: 1
                }}
                onView={() => { }}
            />
        </div>
    )
}

export default Calendar;