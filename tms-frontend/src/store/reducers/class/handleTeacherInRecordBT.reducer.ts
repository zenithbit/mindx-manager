import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_HANDLE_TEACHER_IN_RECORD_BT } from "../actions";
import { METHOD } from "@/global/enum";
import { State } from "@/global/interface";
import { initState } from "@/global/init-data";
import { createAction } from "@reduxjs/toolkit";

export const queryHandleTeacherInRecordBT: any = createRequest(QUERY_HANDLE_TEACHER_IN_RECORD_BT, '/api/v1/book-teacher/$params', METHOD.PUT);
const handleTeacherInRecordBT = createSliceReducer('handleTeacherInRecordBT', queryHandleTeacherInRecordBT, {
    clear(state: State) {
        state.state = {
            ...initState.state
        }
    }
});
export const clearStateHanldeTeacherInRecordBT = createAction<void, string>(`${handleTeacherInRecordBT.name}/clear`);
export default handleTeacherInRecordBT.reducer;