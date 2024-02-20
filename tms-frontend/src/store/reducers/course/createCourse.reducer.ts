import { METHOD } from "@/global/enum";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_CREATE_COURSE } from "../actions";
import { State } from "@/global/interface";
import { initState } from "@/global/init-data";
import { createAction } from "@reduxjs/toolkit";

export const queryCreateCourse: any = createRequest(QUERY_CREATE_COURSE, '/api/v1/course', METHOD.POST);
const createCourse = createSliceReducer('createCourse', queryCreateCourse, {
    clear(state: State) {
        state.state = initState.state;
    }
});
export const clearCreateCourse = createAction<void, string>(`${createCourse.name}/clear`);
export default createCourse.reducer;