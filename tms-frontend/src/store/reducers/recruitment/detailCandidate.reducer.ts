import { METHOD } from "@/global/enum";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_GET_DETAIL_CANDIDATE } from "../actions";

export const queryDetailCandidate: any = createRequest(QUERY_GET_DETAIL_CANDIDATE, '/api/v1/recruitment/candidate/$params', METHOD.GET)
const detailCandidate = createSliceReducer('recruitment', queryDetailCandidate);
export default detailCandidate.reducer;