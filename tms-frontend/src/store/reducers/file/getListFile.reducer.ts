import { METHOD } from "@/global/enum";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_GET_LIST_FILE } from "../actions";

export const queryListFile = createRequest(QUERY_GET_LIST_FILE, '/api/v1/file', METHOD.GET);
const listFile = createSliceReducer('listFile', queryListFile);
export default listFile.reducer;