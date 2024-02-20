import { createAction } from "@reduxjs/toolkit";
import { METHOD } from "@/global/enum";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_UPDATE_FILE } from "../actions";

export const queryUpdateFile = createRequest(QUERY_UPDATE_FILE, '/api/v1/file/$params', METHOD.PUT);
const updateFile = createSliceReducer('updateFile', queryUpdateFile);
export const clearUpdateFile = createAction<void, string>(`${updateFile.name}/clear`);
export default updateFile.reducer;