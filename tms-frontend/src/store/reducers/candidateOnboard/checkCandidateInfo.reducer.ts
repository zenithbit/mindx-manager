import { METHOD } from "@/global/enum";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_CHECK_CANDIDATE_INFO } from "../actions";

export const queryCheckCandidateInfo = createRequest(QUERY_CHECK_CANDIDATE_INFO, '/api/v1/recruitment/on-board', METHOD.GET);
const checkCandidateInfo = createSliceReducer('checkCandidateInfo', queryCheckCandidateInfo);
export default checkCandidateInfo.reducer;