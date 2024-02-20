import { State } from "@/global/interface";
import { METHOD } from "@/global/enum";
import { initState } from "@/global/init-data";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_ACCEPT_PRE_TEACHER } from "../actions";
import { createAction } from "@reduxjs/toolkit";

export const queryAcceptPreTeacher: any = createRequest(QUERY_ACCEPT_PRE_TEACHER, '/api/v1/pre-teacher/$params', METHOD.PUT);
const acceptPreTeacher = createSliceReducer('acceptPreTeacher', queryAcceptPreTeacher, {
    clear(state: State) {
        state.state = initState.state;
    }
});
export const clear = createAction<void, string>(`${acceptPreTeacher.name}/clear`);
export default acceptPreTeacher.reducer;