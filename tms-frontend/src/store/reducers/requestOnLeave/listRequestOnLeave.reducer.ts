import { METHOD } from "@/global/enum";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { GET_LIST_REQUEST_ON_LEAVE } from "../actions";

export const queryListRequestOnLeave = createRequest(GET_LIST_REQUEST_ON_LEAVE, '/api/v1/request-on-leave', METHOD.GET);
const listRequestOnLeave = createSliceReducer('listRequestOnLeave', queryListRequestOnLeave);
export default listRequestOnLeave.reducer;