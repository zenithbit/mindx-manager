import { createAction } from "@reduxjs/toolkit";
import { METHOD } from "@/global/enum";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_DELETE_FILE } from "../actions";

export const queryDeleteFile = createRequest(QUERY_DELETE_FILE, '/api/v1/file/$params', METHOD.DELETE);
const deleteFile = createSliceReducer('deleteFile', queryDeleteFile);
export const clearDeleteFile = createAction<void, string>(`${deleteFile.name}/clear`);
export default deleteFile.reducer;