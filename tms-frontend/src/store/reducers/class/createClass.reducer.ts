import { METHOD } from "@/global/enum";
import { initState } from "@/global/init-data";
import { State } from "@/global/interface";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { createAction } from "@reduxjs/toolkit";

export const queryCreateClass = createRequest('QUERY_CREATE_CLASS', '/api/v1/class', METHOD.POST)
const createClass = createSliceReducer('createClass', queryCreateClass, {
    clear: (state: State) => {
        state.state = initState.state;
    }
});
export const clearCreateClass = createAction<void, string>(`${createClass.name}/clear`);
export default createClass.reducer;