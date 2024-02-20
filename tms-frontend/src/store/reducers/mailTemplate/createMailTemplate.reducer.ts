import { METHOD } from "@/global/enum";
import { State } from '@/global/interface';
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_CREATE_MAIL_TEMPLATE } from "../actions";
import { initState } from "@/global/init-data";
import { createAction } from "@reduxjs/toolkit";

export const queryCreateMailTemplate = createRequest(QUERY_CREATE_MAIL_TEMPLATE, '/api/v1/mail-template', METHOD.POST);
const createMailTemplate = createSliceReducer('createMailTemplate', queryCreateMailTemplate, {
    clear(state: State) {
        state.state = initState.state;
    }
});
export const clearCreateMailTemplate = createAction<void, string>(`${createMailTemplate.name}/clear`);
export default createMailTemplate.reducer;