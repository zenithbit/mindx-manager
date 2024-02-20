import { METHOD } from "@/global/enum";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_UPDATE_AREA } from "../actions";
import { createAction } from "@reduxjs/toolkit";

export const queryUpdateArea = createRequest(QUERY_UPDATE_AREA, '/api/v1/area/$params', METHOD.PUT);
const updateArea = createSliceReducer('updateArea', queryUpdateArea);
export const clearUpdateArea = createAction<void, string>(`${updateArea.name}/clear`);
export default updateArea.reducer;