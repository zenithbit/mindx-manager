import React, { useEffect } from 'react';
import { View } from 'react-big-calendar';
import { useRouter } from 'next/router';
import { Action, EventCalendar, Obj } from '@/global/interface';
import { STATUS_CLASS } from '@/global/enum';
import { useTeacherTimeSchedule } from '@/utils/hooks';
import Calendar from '@/components/Calendar';

const Schedule = () => {
    const timeSchedule = useTeacherTimeSchedule();
    const router = useRouter();
    useEffect(() => {
        const currentDate = new Date();
        const payload: Action = {
            payload: {
                query: {
                    query: {
                        year: currentDate.getFullYear(),
                        month: currentDate.getMonth(),
                        option: 'MONTH'
                    },
                    params: [router.query.teacherId as string]
                }
            }
        }
        timeSchedule.queryGetListTeacherSchedule(payload);
    }, []);
    const mapScheduleForCalendar: EventCalendar[] = (timeSchedule.listSchedule.response?.data as Array<Obj>)?.map((item) => {
        const currentDateSchedule = new Date((item.classSessionId as Obj).date as Date);
        // set start time:
        const getTimeStart = (((item.classSessionId as Obj).weekdayTimeScheduleId)?.start as string).split(' ')[0];
        currentDateSchedule.setHours(Number(getTimeStart.split('h')[0]));
        currentDateSchedule.setMinutes(Number(getTimeStart.split('h')[1]));
        const timeStart = new Date(currentDateSchedule);

        const getTimeEnd = (((item.classSessionId as Obj).weekdayTimeScheduleId)?.end as string).split(' ')[0];
        currentDateSchedule.setHours(Number(getTimeEnd.split('h')[0]));
        currentDateSchedule.setMinutes(Number(getTimeEnd.split('h')[1]));

        const timeEnd = new Date(currentDateSchedule);
        return {
            id: item._id,
            allDay: false,
            end: timeEnd,
            start: timeStart,
            title: item.classSessionId.classId.codeClass,
            status: item.checked,
            resource: {
                ...item,
                statusClass: item.classSessionId.classId.status as STATUS_CLASS
            }
        }
    }) || [];
    const handleNavigateCalendarForQueryData = (date: Date, view: View) => {
        const getDate = new Date(date);
        const getMonth = getDate.getMonth();
        const getYear = getDate.getFullYear();
        switch (view) {
            case 'month':
                const payload: Action = {
                    payload: {
                        query: {
                            query: {
                                year: getYear,
                                month: getMonth,
                                option: 'MONTH'
                            },
                            params: [router.query.teacherId as string]
                        }
                    }
                }
                timeSchedule.queryGetListTeacherSchedule(payload);
                break;
            default:
                break;
        }
    }
    return (
        <div className="h-100">
            <Calendar
                onNavigate={(newDate, view) => {
                    handleNavigateCalendarForQueryData(newDate, view);
                }}
                listEvent={mapScheduleForCalendar}
                enabledCalendarCard
                enabledCalendarNote
                isTeacherCalendar
            />
        </div>
    )
}

export default Schedule;