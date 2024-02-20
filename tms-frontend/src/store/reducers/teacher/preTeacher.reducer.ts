import { METHOD } from "@/global/enum";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_PRE_TEACHER } from "../actions";

export const queryPreTeacher: any = createRequest(QUERY_PRE_TEACHER, '/api/v1/pre-teacher', METHOD.GET);
const preTeacher = createSliceReducer('preTeacher', queryPreTeacher);

export default preTeacher.reducer;