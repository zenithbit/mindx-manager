import { METHOD } from "@/global/enum";
import { QUERY_FIND_TEACHER_BY_EMAIL } from "./actions";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";

export const querySearchTeacherByEmail = createRequest(QUERY_FIND_TEACHER_BY_EMAIL, '/api/v1/teacher/find', METHOD.GET);
const searchTeacher = createSliceReducer('searchTeacher', querySearchTeacherByEmail);
export default searchTeacher.reducer;