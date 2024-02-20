import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { Action, Obj, State } from "@/global/interface";
import { METHOD } from "@/global/enum";
import { GET_TOKEN_LOGIN } from "./actions";
import { createAction } from "@reduxjs/toolkit";
import { initState } from "@/global/init-data";

export const queryToken = createRequest(GET_TOKEN_LOGIN, '/api/v1/account', METHOD.POST);

const getToken = createSliceReducer('token', queryToken, {
    clear: (state: State) => {
        state.state = initState.state;
    },
    update: (state: State, action?: Action) => {
        state.state.response = {
            ...state.state.response,
            ...action ? action?.payload : {}
        }
    }
});

export const clearToken = createAction<void, string>(`${getToken.name}/clear`);
export const update = createAction<Obj, string>(`${getToken.name}/update`);
export default getToken.reducer;