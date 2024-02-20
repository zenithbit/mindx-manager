import { AsyncThunk, PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Action, State } from "@/global/interface";
import { METHOD } from "@/global/enum";
import { initState } from "@/global/init-data";
import actionRequest from "./restApi";

interface Reducer {
    [k: string]: (state: any, action?: PayloadAction<any>) => void
}

const createRequest = (type: string, api: string, method: METHOD): any => {
    return createAsyncThunk(type, async (action: Action | any) => {
        const rs = await actionRequest(api, method, action);
        return rs.data;
    })
}
const createSliceReducer = (nameState: string, asyncThunk?: AsyncThunk<any, Action | undefined, any> | undefined, reducers?: Reducer) => {
    return createSlice({
        initialState: initState,
        name: nameState,
        reducers: reducers || {
            clear(state) {
                state.state = initState.state;
            }
        },
        ...asyncThunk ? {
            extraReducers(builder) {
                builder.addCase(asyncThunk.pending, (state, _) => {
                    (state as State).state = {
                        ...(state as State).state,
                        isLoading: true,
                    }
                })
                builder.addCase(asyncThunk.fulfilled, (state, action) => {
                    (state as State).state = {
                        isLoading: false,
                        response: {
                            ...action.payload,
                        },
                        success: action.payload.status,
                        payload: {
                            query: action.payload.query
                        }
                    }
                })
                builder.addCase(asyncThunk.rejected, (state, _) => {
                    (state as State).state = {
                        isLoading: false,
                        response: {
                            data: null,
                            message: 'Có lỗi xảy ra!',
                            status: false
                        },
                        success: false,
                    }
                })
            },
        } : {}
    })
}
export {
    createRequest,
    createSliceReducer
};