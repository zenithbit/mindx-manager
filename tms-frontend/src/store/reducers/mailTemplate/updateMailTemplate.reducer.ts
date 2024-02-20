import { createAction } from "@reduxjs/toolkit";
import { METHOD } from "@/global/enum";
import { initState } from "@/global/init-data";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_UPDATE_MAIL_TEMPLATE } from "../actions";

export const queryUpdateMailTemplate = createRequest(QUERY_UPDATE_MAIL_TEMPLATE, '/api/v1/mail-template/$params', METHOD.PUT)
const updateMailTemplate = createSliceReducer('updateMailTemplate', queryUpdateMailTemplate, {
    clear(state) {
        state.state = initState.state;
    }
});
export const clearUpdateMailTemplate = createAction<void, string>(`${updateMailTemplate.name}/clear`);
export default updateMailTemplate.reducer;
