import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { QUERY_GET_LIST_CLASS } from "../actions";
import { METHOD } from "@/global/enum";
import { Obj, State } from "@/global/interface";
import { createAction } from "@reduxjs/toolkit";

export const queryGetListClass: any = createRequest(QUERY_GET_LIST_CLASS, '/api/v1/class', METHOD.GET);
const listClass = createSliceReducer('listClass', queryGetListClass, {
    insert(state: State, actions) {
        state.state = {
            ...state.state,
            response: {
                ...state.state.response,
                data: {
                    ...(state.state.response?.data as Obj),
                    classes: [actions?.payload, ...(state.state.response?.data as Obj)?.classes]
                }
            }
        }
    }
});
export const insertListClass = createAction<Obj, string>(`${listClass.name}/insert`);
export default listClass.reducer;