import { METHOD } from "@/global/enum";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_CREATE_CANDIDATE } from "../actions";
import { State } from "@/global/interface";
import { initState } from "@/global/init-data";
import { createAction } from "@reduxjs/toolkit";

export const queryCreateCandidate: any = createRequest(QUERY_CREATE_CANDIDATE, '/api/v1/recruitment', METHOD.POST);
const createCandidate = createSliceReducer('createCandidate', queryCreateCandidate, {
    clear(state: State) {
        state.state = initState.state;
    }
});
export const clearCreateCandidate = createAction<void, string>(`${createCandidate.name}/clear`);
export default createCandidate.reducer;