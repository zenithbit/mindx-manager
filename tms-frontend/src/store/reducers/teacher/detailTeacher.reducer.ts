import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_TEACHER_DETAIL } from "../actions";
import { METHOD } from "@/global/enum";

export const queryDetailTeacher: any = createRequest(QUERY_TEACHER_DETAIL, '/api/v1/teacher/$params', METHOD.GET);
const detailTeacher = createSliceReducer('detailTeacher', queryDetailTeacher);
export default detailTeacher.reducer;