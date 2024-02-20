import { State } from "@/global/interface";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_UPDATE_LEVEL_COURSE } from "../actions";
import { METHOD } from "@/global/enum";
import { initState } from "@/global/init-data";
import { createAction } from "@reduxjs/toolkit";

export const queryUpdateLevelCourse = createRequest(QUERY_UPDATE_LEVEL_COURSE, '/api/v1/course/level/$params', METHOD.PUT);
const updateLevelCourse = createSliceReducer('updateLevelCourse', queryUpdateLevelCourse, {
    clear(state: State) {
        state.state = initState.state;
    }
});
export const clearUpdateLevelCourse = createAction<void, string>(`${updateLevelCourse.name}/clear`);
export default updateLevelCourse.reducer;