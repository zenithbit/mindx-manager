import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_CLASS_SESSION } from "../actions";
import { METHOD } from "@/global/enum";

export const queryClassSession: any = createRequest(QUERY_CLASS_SESSION, '/api/v1/class-session/detail/$params', METHOD.GET);
const classSession = createSliceReducer('classSession', queryClassSession);

export default classSession.reducer;