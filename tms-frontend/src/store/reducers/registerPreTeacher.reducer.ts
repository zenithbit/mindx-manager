import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_REGISTER_PRETEACHER } from "./actions";
import { METHOD } from "@/global/enum";
import { State } from "@/global/interface";
import { initState } from "@/global/init-data";
import { createAction } from "@reduxjs/toolkit";

export const queryRegisterPreTeacher = createRequest(QUERY_REGISTER_PRETEACHER, '/api/v1/pre-teacher', METHOD.POST);
const registerPreTeacher = createSliceReducer('registerFormCollection', queryRegisterPreTeacher, {
    clean: (state: State) => {
        state.state = initState.state;
    }
});
export const clean = createAction<void, string>(`${registerPreTeacher.name}/clean`);
export default registerPreTeacher.reducer;