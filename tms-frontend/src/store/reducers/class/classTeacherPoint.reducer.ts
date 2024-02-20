import { METHOD } from "@/global/enum";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_CLASS_TEACHERPOINT } from "../actions";

export const queryClassTeacherPoint: any = createRequest(QUERY_CLASS_TEACHERPOINT, '/api/v1/class-teacher-point', METHOD.GET);
const classTeacherPoint = createSliceReducer('classTeacherPoint', queryClassTeacherPoint);
export default classTeacherPoint.reducer;