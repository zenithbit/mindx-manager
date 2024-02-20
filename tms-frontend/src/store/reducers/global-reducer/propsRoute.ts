import { createAction } from "@reduxjs/toolkit";
import { Obj, State } from "@/global/interface";
import { createSliceReducer } from "@/utils/redux-toolkit";

const propsPassRoute = createSliceReducer('propsPassRoute', undefined, {
    setProps(state: State, action) {
        state.state.response = action?.payload;
    },
    clearProps(state: State) {
        state.state.response = null;
    }
});
export const setPropsRoute = createAction<Obj,string>(`${propsPassRoute.name}/setProps`);
export const clearPropsRoute = createAction<void,string>(`${propsPassRoute.name}/clearProps`);
export default propsPassRoute.reducer;