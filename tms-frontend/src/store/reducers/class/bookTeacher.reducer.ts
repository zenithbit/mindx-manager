import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_GET_CURRENT_DATA_BOOK_TEACHER } from "../actions";
import { METHOD } from "@/global/enum";
import { Obj, State } from "@/global/interface";
import { createAction } from "@reduxjs/toolkit";

export const queryGetCurrentBookTeacher: any = createRequest(QUERY_GET_CURRENT_DATA_BOOK_TEACHER, '/api/v1/book-teacher/$params', METHOD.GET);
const bookTeacher = createSliceReducer('bookTeacher', queryGetCurrentBookTeacher, {
    update(state: State, action) {
        state.state = {
            ...state.state,
            response: {
                ...state.state.response,
                data: action?.payload
            }
        }
    }
});

export const updateListBookTeacher = createAction<Obj, string>(`${bookTeacher.name}/update`);
export default bookTeacher.reducer;