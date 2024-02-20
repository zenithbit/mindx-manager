import { METHOD } from "@/global/enum";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_UPDATE_TE_BY_ID } from "../actions";
import { createAction } from "@reduxjs/toolkit";

export const queryUpdateTe = createRequest(QUERY_UPDATE_TE_BY_ID, '/api/v1/te/$params', METHOD.PUT);
const updateTe = createSliceReducer('updateTe', queryUpdateTe);
export const clearUpdateTe = createAction<void, string>(`${updateTe.name}/clear`);
export default updateTe.reducer;