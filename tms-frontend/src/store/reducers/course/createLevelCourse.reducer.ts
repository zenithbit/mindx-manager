import { METHOD } from "@/global/enum";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_CREATE_LEVEL_COURSE } from "../actions";
import { State } from "@/global/interface";
import { initState } from "@/global/init-data";
import { createAction } from "@reduxjs/toolkit";

export const queryCreateLevelCourse = createRequest(QUERY_CREATE_LEVEL_COURSE, '/api/v1/course/level', METHOD.POST);
const createLevelCourse = createSliceReducer('createLevelCourse', queryCreateLevelCourse, {
    clear(state: State) {
        state.state = initState.state;
    }
});
export const clearCreateLevelCourse = createAction<void, string>(`${createLevelCourse.name}/clear`);
export default createLevelCourse.reducer;