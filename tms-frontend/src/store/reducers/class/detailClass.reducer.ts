import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_DETAIL_CLASS } from "../actions";
import { METHOD } from "@/global/enum";
import { createAction } from "@reduxjs/toolkit";

export const queryDetailClass = createRequest(QUERY_DETAIL_CLASS, '/api/v1/class/$params', METHOD.GET);
const detailClass = createSliceReducer('detailClass', queryDetailClass);
export const clearDeatailClass = createAction(`${detailClass.name}/clear`);
export default detailClass.reducer;