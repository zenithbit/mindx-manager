import { createAction } from "@reduxjs/toolkit";
import { METHOD } from "@/global/enum";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_UPDATE_FOLDER } from "../actions";

export const queryUpdateFolder = createRequest(QUERY_UPDATE_FOLDER, '/api/v1/folder/$params', METHOD.PUT);
const updateFolder = createSliceReducer('updateFolder', queryUpdateFolder);
export const clearUpdateFolder = createAction<void, string>(`${updateFolder.name}/clear`);
export default updateFolder.reducer;