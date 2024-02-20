import { createAction } from "@reduxjs/toolkit";
import { METHOD } from "@/global/enum";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_UPDATE_DOCUMENT } from "../actions";

export const queryUpdateDocument = createRequest(QUERY_UPDATE_DOCUMENT, '/api/v1/document/$params', METHOD.PUT);
const updateDocument = createSliceReducer('updateDocument', queryUpdateDocument);
export const clearUpdateDocument = createAction<void, string>(`${updateDocument.name}/clear`);
export default updateDocument.reducer;