import { METHOD } from "@/global/enum";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_GET_ATTENDANCE_TEACHER } from "../actions";

export const queryAttendanceTeacherInClassSession: any = createRequest(QUERY_GET_ATTENDANCE_TEACHER, '/api/v1/class-session/attendance-teacher', METHOD.GET);
const attendanceTeacherInClassSession = createSliceReducer('attendanceTeacher', queryAttendanceTeacherInClassSession);
export default attendanceTeacherInClassSession.reducer;