import { METHOD } from "@/global/enum";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { createAction } from "@reduxjs/toolkit";
import { QUERY_UPDATE_TEACHER } from "../actions";

export const queryUpdateTeacher = createRequest(QUERY_UPDATE_TEACHER, '/api/v1/teacher/$params', METHOD.PUT);
const updateTeacher = createSliceReducer('updateTeacher', queryUpdateTeacher);
export const clearUpdateTeacher = createAction<void, string>(`${updateTeacher.name}/clear`);
export default updateTeacher.reducer;