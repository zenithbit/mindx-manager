import { METHOD } from "@/global/enum";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_GET_DETAIL_DOCUMENT } from "../actions";

export const queryGetDetailDoc = createRequest(QUERY_GET_DETAIL_DOCUMENT, '/api/v1/document/$params', METHOD.GET);
const getDetailDoc = createSliceReducer('getDetailDoc', queryGetDetailDoc);
export default getDetailDoc.reducer;