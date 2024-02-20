import { METHOD } from "@/global/enum";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_ROUND_PROCESS_CANDIDATE } from "../actions";

export const queryRoundProcessCandidate = createRequest(QUERY_ROUND_PROCESS_CANDIDATE, '/api/v1/recruitment/round', METHOD.GET);
const roundProcess = createSliceReducer('roundProcess', queryRoundProcessCandidate);

export default roundProcess.reducer;