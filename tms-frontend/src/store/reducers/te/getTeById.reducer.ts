import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_TE_BY_ID } from "../actions";
import { METHOD } from "@/global/enum";

export const queryGetTeById = createRequest(QUERY_TE_BY_ID, '/api/v1/te/$params', METHOD.GET);
const getTeById = createSliceReducer('getTeById', queryGetTeById);
export default getTeById.reducer;