import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_CLASS_TEACHER_REGISTER } from "../actions";
import { METHOD } from "@/global/enum";

export const queryGetClassTeacherRegister: any = createRequest(QUERY_CLASS_TEACHER_REGISTER, '/api/v1/book-teacher/teacher/$params', METHOD.GET);
const getClassTeacherRegister = createSliceReducer('getClassTeacherRegister', queryGetClassTeacherRegister);
export default getClassTeacherRegister.reducer;