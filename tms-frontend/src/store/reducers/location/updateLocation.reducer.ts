import { METHOD } from "@/global/enum";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_UPDATE_LOCATION } from "../actions";
import { createAction } from "@reduxjs/toolkit";

export const queryUpdateLocation = createRequest(QUERY_UPDATE_LOCATION, '/api/v1/location/$params', METHOD.PUT);
const updateLocation = createSliceReducer('updateLocation', queryUpdateLocation);
export const clearUpdateLocation = createAction<void, string>(`${updateLocation.name}/clear`);
export default updateLocation.reducer;