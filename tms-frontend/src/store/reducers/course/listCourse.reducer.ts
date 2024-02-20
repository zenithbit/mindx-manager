import { METHOD } from "@/global/enum";
import { QUERY_GET_LIST_COURSE } from "../actions";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";

export const queryGetListCourse: any = createRequest(QUERY_GET_LIST_COURSE, '/api/v1/course', METHOD.GET);
const listCourse = createSliceReducer('listCourse', queryGetListCourse);
export default listCourse.reducer;