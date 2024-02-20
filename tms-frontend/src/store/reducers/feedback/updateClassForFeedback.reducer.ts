import { METHOD } from "@/global/enum";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_UPDATE_CLASS_FEEDBACK } from "../actions";
import { State } from "@/global/interface";
import { initState } from "@/global/init-data";
import { createAction } from "@reduxjs/toolkit";

export const queryUpdateClassForFeedback: any = createRequest(QUERY_UPDATE_CLASS_FEEDBACK, '/api/v1/feedback/$params', METHOD.PUT);
const updateClassForFeedback = createSliceReducer('updateClassForFeedback', queryUpdateClassForFeedback, {
    clear(state: State) {
        state.state = initState.state;
    }
});
export const clearResUpdateClassForFeedback = createAction<void, string>(`${updateClassForFeedback.name}/clear`);
export default updateClassForFeedback.reducer;