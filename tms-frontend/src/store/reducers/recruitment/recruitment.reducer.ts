import { METHOD } from "@/global/enum";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_GET_LIST_DATA_RECRUITMENT } from "../actions";

export const queryGetListDataRecruitment: any = createRequest(QUERY_GET_LIST_DATA_RECRUITMENT, '/api/v1/recruitment', METHOD.GET)
const recruitment = createSliceReducer('recruitment', queryGetListDataRecruitment);
export default recruitment.reducer;