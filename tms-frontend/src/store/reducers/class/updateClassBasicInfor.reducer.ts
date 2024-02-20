import { State } from "@/global/interface";
import { METHOD } from "@/global/enum";
import { initState } from "@/global/init-data";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_UPDATE_CLASS_BASIC_INFOR } from "../actions";
import { createAction } from "@reduxjs/toolkit";

export const queryUpdateClassBasicInfor: any = createRequest(QUERY_UPDATE_CLASS_BASIC_INFOR, '/api/v1/class/$params', METHOD.PUT);
const updateClassBasicInfor = createSliceReducer('updateClassBasicInfor', queryUpdateClassBasicInfor, {
    clear(state: State) {
        state.state = {
            ...initState.state
        }
    }
});

export const clearUpdatedDataClassBasicInfor = createAction<void, string>(`${updateClassBasicInfor.name}/clear`);
export default updateClassBasicInfor.reducer;