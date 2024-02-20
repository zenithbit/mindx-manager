import { METHOD } from "@/global/enum";
import { State } from "@/global/interface";
import { initState } from "@/global/init-data";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_UPDATE_INFO_ROUND_PROCESS_CANDIDATE } from "../actions";
import { createAction } from "@reduxjs/toolkit";

export const queryUpdateDataRoundProcessCandidate = createRequest(QUERY_UPDATE_INFO_ROUND_PROCESS_CANDIDATE, '/api/v1/recruitment/round/$params', METHOD.PUT);
const updateDataRoundProcessCandidate = createSliceReducer('updateDataRoundProcessCandidate', queryUpdateDataRoundProcessCandidate, {
    clear(state: State) {
        state.state = initState.state
    }
});
export const clearQueryUpdateDataRoundProcessCandidate = createAction<void, string>(`${updateDataRoundProcessCandidate.name}/clear`);
export default updateDataRoundProcessCandidate.reducer;