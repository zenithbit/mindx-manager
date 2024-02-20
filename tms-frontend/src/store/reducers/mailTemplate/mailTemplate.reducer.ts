import { METHOD } from "@/global/enum";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_MAIL_TEMPLATE } from "../actions";

export const queryMailTemplate = createRequest(QUERY_MAIL_TEMPLATE, '/api/v1/mail-template', METHOD.GET);
const mailTemplate = createSliceReducer('mailTemplate', queryMailTemplate);

export default mailTemplate.reducer;