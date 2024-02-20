import { METHOD } from "@/global/enum";
import { QUERY_GET_LIST_GROUP_CLASS_IN_FEEDBACK } from "../actions";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";

export const queryGetListGroupClassInFormFeedback: any = createRequest(QUERY_GET_LIST_GROUP_CLASS_IN_FEEDBACK, '/api/v1/feedback/form/class/$params/group', METHOD.GET);
const listGroupClassInFormFeedback = createSliceReducer('listGroupClassInFormFeedback', queryGetListGroupClassInFormFeedback);
export default listGroupClassInFormFeedback.reducer;