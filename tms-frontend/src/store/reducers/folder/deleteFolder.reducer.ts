import { createAction } from "@reduxjs/toolkit";
import { METHOD } from "@/global/enum";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_DELETE_FOLDER } from "../actions";

export const queryDeleteFolder = createRequest(QUERY_DELETE_FOLDER, '/api/v1/folder/$params', METHOD.DELETE);
const deleteFolder = createSliceReducer('deleteFolder', queryDeleteFolder);
export const clearDeleteFolder = createAction<void, string>(`${deleteFolder.name}/clear`);
export default deleteFolder.reducer;