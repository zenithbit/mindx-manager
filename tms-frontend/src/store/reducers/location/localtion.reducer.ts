import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_GET_LOCATIONS } from "../actions";
import { METHOD } from "@/global/enum";

export const queryGetLocations: any = createRequest(QUERY_GET_LOCATIONS, '/api/v1/location', METHOD.GET);
const locations = createSliceReducer('localtions', queryGetLocations);
export default locations.reducer;