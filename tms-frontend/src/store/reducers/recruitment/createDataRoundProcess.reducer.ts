import { METHOD } from "@/global/enum";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_CREATE_INFO_ROUND_PROCESS_CANDIDATE } from "../actions";

export const queryCreateDataRoundProcess = createRequest(QUERY_CREATE_INFO_ROUND_PROCESS_CANDIDATE, '/api/v1/recruitment/round', METHOD.POST);
const createDataRoundProcess = createSliceReducer('createDataRoundProcess', queryCreateDataRoundProcess);

export default createDataRoundProcess.reducer;