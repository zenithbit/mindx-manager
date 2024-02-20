import { METHOD } from "@/global/enum";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_GET_DETAIL_COURSE } from "../actions";

export const queryDetailCourse = createRequest(QUERY_GET_DETAIL_COURSE, '/api/v1/course/$params', METHOD.GET);
const detailCourse = createSliceReducer('detailCourse', queryDetailCourse);
export default detailCourse.reducer;