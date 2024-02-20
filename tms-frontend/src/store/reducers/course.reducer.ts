import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { METHOD } from "@/global/enum";
import { GET_ALL_COURSE } from "./actions";

export const getCourses: any = createRequest(GET_ALL_COURSE, 'api/v1/course', METHOD.GET);

const courses = createSliceReducer('course', getCourses);
export default courses.reducer;