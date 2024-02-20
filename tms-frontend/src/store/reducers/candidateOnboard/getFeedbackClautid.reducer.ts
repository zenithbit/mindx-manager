import { METHOD } from "@/global/enum";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_GET_FEEDBACK_CLAUTID } from "../actions";

export const queryGetFeebackClautid = createRequest(QUERY_GET_FEEDBACK_CLAUTID, '/api/v1/recruitment/on-board/clautid/feedback', METHOD.GET);
const getFeedbackClautid = createSliceReducer("getFeedbackClautid", queryGetFeebackClautid);
export default getFeedbackClautid.reducer;