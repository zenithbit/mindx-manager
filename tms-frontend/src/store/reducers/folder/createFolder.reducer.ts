import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_CREATE_FOLDER } from "../actions";
import { METHOD } from "@/global/enum";
import { createAction } from "@reduxjs/toolkit";

export const queryCreateFolder = createRequest(QUERY_CREATE_FOLDER, '/api/v1/folder', METHOD.POST);
const createFolder = createSliceReducer('createFolder', queryCreateFolder);
export const clearCreateFolder = createAction<void, string>(`${createFolder.name}/clear`);
export default createFolder.reducer;