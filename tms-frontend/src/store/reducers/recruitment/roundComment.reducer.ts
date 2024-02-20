import { METHOD } from "@/global/enum";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_ROUND_COMMENTS_CANDIDATE } from "../actions";

export const queryRoundComments = createRequest(QUERY_ROUND_COMMENTS_CANDIDATE, '/api/v1/recruitment/round/comment', METHOD.GET);
const roundComments = createSliceReducer('roundComments', queryRoundComments);
export default roundComments.reducer;