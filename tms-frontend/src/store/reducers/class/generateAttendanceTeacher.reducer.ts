import { createAction } from "@reduxjs/toolkit";
import { METHOD } from "@/global/enum";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_GENERATE_ATTENDANCE_TEACHER } from "../actions";

export const queryGenerateAttendanceTeacher = createRequest(QUERY_GENERATE_ATTENDANCE_TEACHER, '/api/v1/class-session/attendance-teacher/generate', METHOD.POST)
const generateAttendanceTeacher = createSliceReducer('generateAttendanceTeacher', queryGenerateAttendanceTeacher);
export const clearGenerateAttendanceTeacher = createAction<void, string>(`${generateAttendanceTeacher.name}/clear`);
export default generateAttendanceTeacher.reducer;
