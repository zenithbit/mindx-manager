import { State } from "@/global/interface";
import { METHOD } from "@/global/enum";
import { initState } from "@/global/init-data";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_RESPONSE_FEEDBACK } from "../actions";
import { createAction } from "@reduxjs/toolkit";

export const queryResponseFeedback: any = createRequest(QUERY_RESPONSE_FEEDBACK, '/api/v1/feedback/response', METHOD.POST);
const responseFeedback = createSliceReducer('responseFeedback', queryResponseFeedback, {
    clear(state: State) {
        state.state = initState.state;
    }
});
export const clearResponseFeedback = createAction<void, string>(`${responseFeedback.name}/clear`);
export default responseFeedback.reducer;