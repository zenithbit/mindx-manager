import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_PREDICT_CANDiDATE } from "../actions";
import { METHOD } from "@/global/enum";
import { createAction } from "@reduxjs/toolkit";

export const queryPredictCandidate = createRequest(QUERY_PREDICT_CANDiDATE, '/api/v1/recruitment/candidate/$params/predict', METHOD.GET);
const predictCandidate = createSliceReducer('predictCandidate', queryPredictCandidate);
export const clearPredictCandidate = createAction(`${predictCandidate.name}/clear`);
export default predictCandidate.reducer