import { METHOD } from "@/global/enum";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_GET_LIST_DOCUMENT } from "../actions";

export const queryListDocument = createRequest(QUERY_GET_LIST_DOCUMENT, '/api/v1/document', METHOD.GET);
const getListDocument = createSliceReducer('getListDocument', queryListDocument);
export default getListDocument.reducer;