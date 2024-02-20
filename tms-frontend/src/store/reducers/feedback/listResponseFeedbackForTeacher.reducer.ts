import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_GET_LIST_RESPONSE_FEEDBACK_FOR_TEACHER } from "../actions";
import { METHOD } from "@/global/enum";

export const queryListResponseFeedbackForTeacher: any = createRequest(QUERY_GET_LIST_RESPONSE_FEEDBACK_FOR_TEACHER, '/api/v1/feedback/teacher/response', METHOD.GET);
const listResponseFeedbackForTeacher = createSliceReducer('listResponseFeedbackForTeacher', queryListResponseFeedbackForTeacher);
export default listResponseFeedbackForTeacher.reducer;