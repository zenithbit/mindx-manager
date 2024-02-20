import { State } from "@/global/interface";
import { METHOD } from "@/global/enum";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_ROUND_CREATE_COMMENTS_CANDIDATE } from "../actions";
import { initState } from "@/global/init-data";
import { createAction } from "@reduxjs/toolkit";

export const queryCreateComment = createRequest(QUERY_ROUND_CREATE_COMMENTS_CANDIDATE, '/api/v1/recruitment/round/comment', METHOD.POST);
const createComment = createSliceReducer('createComment', queryCreateComment, {
    clear(state: State) {
        state.state = initState.state;
    }
});
export const clearReducerCreateComment = createAction<void, string>(`${createComment.name}/clear`);
export default createComment.reducer;