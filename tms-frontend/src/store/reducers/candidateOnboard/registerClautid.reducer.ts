import { METHOD } from "@/global/enum";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_REGISTER_CLAUTID } from "../actions";

export const queryRegisterClautid = createRequest(QUERY_REGISTER_CLAUTID, '/api/v1/recruitment/on-board/clautid', METHOD.POST);
const registerClautid = createSliceReducer('registerClautid', queryRegisterClautid);
export const clearRegisterClautid = registerClautid.actions.clear;
export default registerClautid.reducer;