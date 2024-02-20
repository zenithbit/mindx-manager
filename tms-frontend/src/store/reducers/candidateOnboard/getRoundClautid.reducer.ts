import { METHOD } from "@/global/enum";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_CHECK_CLAUTID_INFO } from "../actions";

export const queryGetRoundCalautid = createRequest(QUERY_CHECK_CLAUTID_INFO, '/api/v1/recruitment/on-board/clautid', METHOD.GET);
const getRoundClautid = createSliceReducer('getRoundClautid', queryGetRoundCalautid);
export default getRoundClautid.reducer;