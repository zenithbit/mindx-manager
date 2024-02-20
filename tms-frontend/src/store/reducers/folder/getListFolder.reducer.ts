import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_GET_LIST_FOLDER } from "../actions";
import { METHOD } from "@/global/enum";

export const queryListFolder = createRequest(QUERY_GET_LIST_FOLDER, '/api/v1/folder', METHOD.GET);
const listFolder = createSliceReducer('listFolder', queryListFolder);
export default listFolder.reducer;