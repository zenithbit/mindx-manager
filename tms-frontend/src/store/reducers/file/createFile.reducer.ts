import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_CREATE_FILE } from "../actions";
import { METHOD } from "@/global/enum";
import { createAction } from "@reduxjs/toolkit";

export const queryCreateFile = createRequest(QUERY_CREATE_FILE, '/api/v1/file', METHOD.POST);
const createFile = createSliceReducer('uploadFile', queryCreateFile);
export const clearCreateFile = createAction<void, string>(`${createFile.name}/clear`);
export default createFile.reducer;