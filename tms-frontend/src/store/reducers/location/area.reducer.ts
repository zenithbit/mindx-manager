import { METHOD } from "@/global/enum";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_GET_AREA } from "../actions";

export const queryArea = createRequest(QUERY_GET_AREA, '/api/v1/area', METHOD.GET);
const area = createSliceReducer('area', queryArea);
export default area.reducer;
