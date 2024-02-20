import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_ADD_DATA_BOOK_TEACHER } from "../actions";
import { METHOD } from "@/global/enum";
import { State } from "@/global/interface";
import { initState } from "@/global/init-data";
import { createAction } from "@reduxjs/toolkit";

export const queryAddRequestBookTeacher: any = createRequest(QUERY_ADD_DATA_BOOK_TEACHER, '/api/v1/book-teacher', METHOD.POST);
const addRequestBookTeacher = createSliceReducer('addRequestBookTeacher', queryAddRequestBookTeacher, {
    clear(state: State) {
        state.state = {
            ...initState.state
        }
    },
});

export const clearAddRequest = createAction<void, string>(`${addRequestBookTeacher.name}/clear`);
export default addRequestBookTeacher.reducer;