import { createAction } from "@reduxjs/toolkit";
import { METHOD } from "@/global/enum";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_UPDATE_CANDIDATE } from "../actions";

export const queryUpdateCandidate = createRequest(QUERY_UPDATE_CANDIDATE, '/api/v1/recruitment/candidate/$params', METHOD.PUT);
const updateCandidate = createSliceReducer('updateCandidate', queryUpdateCandidate);
export const clearUpdateCandidate = createAction<void, string>(`${updateCandidate.name}/clear`);
export default updateCandidate.reducer;