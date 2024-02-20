import { METHOD } from "@/global/enum";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_CREATE_FEEDBACK_CLAUTID } from "../actions";

export const queryCreateFeebackClautid = createRequest(QUERY_CREATE_FEEDBACK_CLAUTID, '/api/v1/recruitment/on-board/clautid/feedback', METHOD.POST);
const createFeedbackClautid = createSliceReducer("createFeedbackClautid", queryCreateFeebackClautid);
export const clearCreateFeedbackClautid = createFeedbackClautid.actions.clear;
export default createFeedbackClautid.reducer;