import { METHOD } from "@/global/enum";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_UPDATE_RECORD_CLAUTID } from "../actions";

export const queryUpdateClassClautid = createRequest(QUERY_UPDATE_RECORD_CLAUTID, '/api/v1/recruitment/on-board/clautid/$params', METHOD.PUT);
const updateClassClautid = createSliceReducer('updateClassClautid', queryUpdateClassClautid);
export const clearQueryUpdateClassClautid = updateClassClautid.actions.clear;
export default updateClassClautid.reducer;