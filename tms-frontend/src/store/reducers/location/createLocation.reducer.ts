import { METHOD } from "@/global/enum";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_CREATE_LOCATION } from "../actions";
import { createAction } from "@reduxjs/toolkit";

export const queryCreateLocation = createRequest(QUERY_CREATE_LOCATION, '/api/v1/location', METHOD.POST);
const createLocation = createSliceReducer('createLocation', queryCreateLocation);
export const clearCreateLocation = createAction<void, string>(`${createLocation.name}/clear`);
export default createLocation.reducer;