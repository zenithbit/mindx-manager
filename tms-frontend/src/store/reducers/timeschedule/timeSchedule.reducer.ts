import { METHOD } from "@/global/enum";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_GET_LIST_TIME_SCHEDULE } from "../actions";

export const queryGetListTimeSchedule = createRequest(QUERY_GET_LIST_TIME_SCHEDULE, '/api/v1/time-schedule', METHOD.GET);
const timeSchedule = createSliceReducer('timeSchedule', queryGetListTimeSchedule);
export default timeSchedule.reducer;