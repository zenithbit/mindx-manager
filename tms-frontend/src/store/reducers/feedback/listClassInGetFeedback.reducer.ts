import { METHOD } from "@/global/enum";
import { QUERY_GET_LIST_CLASS_IN_FEEDBACK } from "../actions";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";

export const queryGetListClassInFormFeedback: any = createRequest(QUERY_GET_LIST_CLASS_IN_FEEDBACK, '/api/v1/feedback/form/class', METHOD.GET);
const listClassInFormFeedback = createSliceReducer('listClassOnFormFeedback', queryGetListClassInFormFeedback);
export default listClassInFormFeedback.reducer;