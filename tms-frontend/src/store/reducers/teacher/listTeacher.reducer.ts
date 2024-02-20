import { METHOD } from "@/global/enum";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_GET_LIST_TEACHER } from "../actions";

export const queryGetListTeacher: any = createRequest(QUERY_GET_LIST_TEACHER, '/api/v1/teacher', METHOD.GET);
const listTeacher = createSliceReducer('listTeacher', queryGetListTeacher);
export default listTeacher.reducer;