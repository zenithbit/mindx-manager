import { createAction } from "@reduxjs/toolkit";
import { METHOD } from "@/global/enum";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_CREATE_DOCUMENT } from "../actions";

export const queryCreateDocument = createRequest(QUERY_CREATE_DOCUMENT, '/api/v1/document', METHOD.POST);
const createDocument = createSliceReducer('createDocument', queryCreateDocument);
export const clearCreateDocument = createAction<void, string>(`${createDocument.name}/clear`);
export default createDocument.reducer;