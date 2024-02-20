import { METHOD } from "@/global/enum";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_GET_LIST_CLASS_FEEDBACK_ACTION } from "../actions";

export const queryListClassFeedbackView: any = createRequest(QUERY_GET_LIST_CLASS_FEEDBACK_ACTION, '/api/v1/feedback/list-class', METHOD.GET);
const listClassActionFeedback = createSliceReducer('listClassActionFeedback', queryListClassFeedbackView);
export default listClassActionFeedback.reducer;