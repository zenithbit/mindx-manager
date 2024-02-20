import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_GET_LIST_RESPONSE_FEEDBACK } from "../actions";
import { METHOD } from "@/global/enum";

export const queryGetListResponseFeedback: any = createRequest(QUERY_GET_LIST_RESPONSE_FEEDBACK, '/api/v1/feedback/response', METHOD.GET);
const listResponseFeedback = createSliceReducer('listResponseFeedback', queryGetListResponseFeedback);
export default listResponseFeedback.reducer;