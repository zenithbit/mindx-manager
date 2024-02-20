import { createAction } from "@reduxjs/toolkit";
import { METHOD } from "@/global/enum";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_REQUEST_RESET_PASSWORD } from "../actions";

export const queryRequestOtp = createRequest(QUERY_REQUEST_RESET_PASSWORD, '/api/v1/account/reset-password', METHOD.GET);
const requestOtpRP = createSliceReducer('requestOtpRP', queryRequestOtp);
export const clearRequestOtpRQ = createAction<void, string>(`${requestOtpRP.name}/clear`);
export default requestOtpRP.reducer;