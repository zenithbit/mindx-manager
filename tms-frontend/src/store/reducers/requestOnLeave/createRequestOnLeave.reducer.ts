import { METHOD } from "@/global/enum";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { CREATE_REQUEST_ON_LEAVE } from "../actions";
import { createAction } from "@reduxjs/toolkit";

export const queryCreateRequestOnleave = createRequest(CREATE_REQUEST_ON_LEAVE, '/api/v1/request-on-leave', METHOD.POST);
const createRequestOnLeave = createSliceReducer('createRequestOnLeave', queryCreateRequestOnleave);

export const clearCreateRequestOnleave = createAction<void, string>(`${createRequestOnLeave.name}/clear`);
export default createRequestOnLeave.reducer;