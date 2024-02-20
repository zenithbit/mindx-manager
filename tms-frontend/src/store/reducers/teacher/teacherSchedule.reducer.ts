import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_TEACHER_SCHEDULE } from "../actions";
import { METHOD } from "@/global/enum";

export const queryTeacherSchedule: any = createRequest(QUERY_TEACHER_SCHEDULE, '/api/v1/teacher-schedule/$params', METHOD.GET);
const teacherSchedule = createSliceReducer('teacherSchedule', queryTeacherSchedule);
export default teacherSchedule.reducer;