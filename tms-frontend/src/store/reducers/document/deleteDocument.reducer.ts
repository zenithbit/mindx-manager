import { createAction } from "@reduxjs/toolkit";
import { METHOD } from "@/global/enum";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_DELETE_DOCUMENT } from "../actions";

export const queryDeleteDocument = createRequest(QUERY_DELETE_DOCUMENT, '/api/v1/document/$params', METHOD.DELETE);
const deleteDocument = createSliceReducer('deleteDocument', queryDeleteDocument);
export const clearDeleteDocument = createAction<void, string>(`${deleteDocument.name}/clear`);
export default deleteDocument.reducer;