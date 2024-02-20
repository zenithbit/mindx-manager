import React, { useEffect } from "react";
import Calendar from "../Calendar";
import { useTeacherTimeSchedule } from "@/utils/hooks";
import { useRouter } from "next/router";
import { Action } from "@reduxjs/toolkit";
import useGetCrrUser from "@/utils/hooks/getUser";
import { EventCalendar, Obj } from "@/global/interface";
import { STATUS_CLASS } from "@/global/enum";

const TeacherCalendar = () => {
  const timeSchedule = useTeacherTimeSchedule();

  const mapScheduleForCalendar: EventCalendar[] =
    (timeSchedule.listSchedule.response?.data as Array<Obj>)?.map((item) => {
      const currentDateSchedule = new Date(
        (item.classSessionId as Obj).date as Date
      );
      // set start time:
      const getTimeStart = (
        (item.classSessionId as Obj).weekdayTimeScheduleId?.start as string
      ).split(" ")[0];
      currentDateSchedule.setHours(Number(getTimeStart.split("h")[0]));
      currentDateSchedule.setMinutes(Number(getTimeStart.split("h")[1]));
      const timeStart = new Date(currentDateSchedule);

      const getTimeEnd = (
        (item.classSessionId as Obj).weekdayTimeScheduleId?.end as string
      ).split(" ")[0];
      currentDateSchedule.setHours(Number(getTimeEnd.split("h")[0]));
      currentDateSchedule.setMinutes(Number(getTimeEnd.split("h")[1]));

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
          statusClass: item.classSessionId.classId.status as STATUS_CLASS,
        },
      };
    }) || [];

  const currentUserId = useGetCrrUser();
  useEffect(() => {
    const currentDate = new Date();
    const payload: any = {
      payload: {
        query: {
          query: {
            year: currentDate.getFullYear(),
            month: currentDate.getMonth(),
            option: "MONTH",
          },
          params: [currentUserId?.data?._id as string],
        },
      },
    };
    timeSchedule.queryGetListTeacherSchedule(payload);
  }, []);

  return (
    <div style={{ height: "100%" }}>
      <Calendar
        listEvent={mapScheduleForCalendar}
        enabledCalendarCard
        enabledCalendarNote
        isTeacherCalendar
      />
    </div>
  );
};

export default TeacherCalendar;
