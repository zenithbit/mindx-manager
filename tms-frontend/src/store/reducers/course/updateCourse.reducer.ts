import { METHOD } from "@/global/enum";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_UPDATE_COURSE } from "../actions";
import { State } from "@/global/interface";
import { initState } from "@/global/init-data";
import { createAction } from "@reduxjs/toolkit";

export const queryUpdateCourse = createRequest(QUERY_UPDATE_COURSE, '/api/v1/course/$params', METHOD.PUT);
const updateCourse = createSliceReducer('updateCourse', queryUpdateCourse, {
    clear(state: State) {
        state.state = initState.state;
    }
});
export const clearUpdateCourse = createAction<void, string>(`${updateCourse.name}/clear`);
export default updateCourse.reducer;