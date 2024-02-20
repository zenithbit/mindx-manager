import { METHOD } from "@/global/enum";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_CALENDAR_TEST } from "../actions";

export const queryGetCalendar = createRequest(QUERY_CALENDAR_TEST, '/api/v1/recruitment/on-board/clautid/test', METHOD.GET);
const getCalendarTest = createSliceReducer('getCalendarTest', queryGetCalendar);
export default getCalendarTest.reducer;