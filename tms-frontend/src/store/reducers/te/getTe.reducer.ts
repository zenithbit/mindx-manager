import { METHOD } from "@/global/enum";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_GET_ALL_TE } from "../actions";

export const queryGetAllTe = createRequest(QUERY_GET_ALL_TE, '/api/v1/te', METHOD.GET);
const getAllTe = createSliceReducer('getAllTe', queryGetAllTe);
export default getAllTe.reducer;