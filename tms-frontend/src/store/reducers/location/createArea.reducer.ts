import { METHOD } from "@/global/enum";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_CREATE_AREA } from "../actions";
import { createAction } from "@reduxjs/toolkit";

export const queryCreateArea = createRequest(QUERY_CREATE_AREA, '/api/v1/area', METHOD.POST);
const createArea = createSliceReducer('createArea', queryCreateArea);
export const clearCreateArea = createAction<void, string>(`${createArea.name}/clear`);
export default createArea.reducer;