import { METHOD } from "@/global/enum";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_MAILER } from "./actions";
import { initState } from "@/global/init-data";
import { createAction } from "@reduxjs/toolkit";

export const queryMailer = createRequest(QUERY_MAILER, '/api/v1/mail', METHOD.POST);
const mailer = createSliceReducer('mailer', queryMailer, {
    clear(state) {
        state.state = initState.state
    }
});
export const clearMailer = createAction<void, string>(`${mailer.name}/clear`);
export default mailer.reducer;