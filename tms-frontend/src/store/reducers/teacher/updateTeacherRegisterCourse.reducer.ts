import { createAction } from "@reduxjs/toolkit";
import { METHOD } from "@/global/enum";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_UPDATE_TEACHER_REGISTER_COURSE } from "../actions";

export const queryUpdateTeacherRegisterCourse = createRequest(QUERY_UPDATE_TEACHER_REGISTER_COURSE, '/api/v1/teacher-registercourse/$params', METHOD.PUT);
const updateTeacherRegisterCourse = createSliceReducer('updateTeacherRegisterCourse', queryUpdateTeacherRegisterCourse);
export const clearUpdateTeacherRegisterCourse = createAction<void, string>(`${updateTeacherRegisterCourse.name}/clear`);
export default updateTeacherRegisterCourse.reducer;