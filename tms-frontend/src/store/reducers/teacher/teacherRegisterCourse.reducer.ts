import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_TEACHER_REGISTER_COURSE } from "../actions";
import { METHOD } from "@/global/enum";

export const queryTeacherRegisterCourse: any = createRequest(QUERY_TEACHER_REGISTER_COURSE, '/api/v1/teacher-registercourse', METHOD.GET);
const teacherRegisterCourse = createSliceReducer('teacherRegisterCourse', queryTeacherRegisterCourse);
export default teacherRegisterCourse.reducer;