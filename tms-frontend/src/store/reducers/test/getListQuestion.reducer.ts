import { METHOD } from "@/global/enum";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { GET_LIST_QUESTION } from "../actions";

export const queryGetlistQuestion = createRequest(GET_LIST_QUESTION, '/api/v1/question', METHOD.GET);
const getListQuestion = createSliceReducer('getListQuestion', queryGetlistQuestion);
export default getListQuestion.reducer;