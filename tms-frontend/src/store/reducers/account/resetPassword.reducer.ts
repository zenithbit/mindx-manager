import { METHOD } from "@/global/enum";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_RESET_PASSWORD } from "../actions";
import { createAction } from "@reduxjs/toolkit";

export const queryResetPassword = createRequest(QUERY_RESET_PASSWORD, '/api/v1/account/reset-password/$params', METHOD.PUT)
const resetPassword = createSliceReducer('resetPassword', queryResetPassword);
export const clearResetPassword = createAction<void, string>(`${resetPassword.name}/clear`);
export default resetPassword.reducer;