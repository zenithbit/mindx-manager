import { createAction } from "@reduxjs/toolkit";
import { State } from "@/global/interface";
import { createSliceReducer } from "@/utils/redux-toolkit";
import React from "react";

const message = createSliceReducer('message', undefined, {
    openMessage(state: State, action) {
        state.state.response = action?.payload;
    },
    clearMessage(state: State) {
        state.state.response = null;
    }
});
interface OpenMessage {
    type: 'success' | 'error' | 'warning',
    content: React.ReactNode | string
}
export const openMessage = createAction<OpenMessage, string>(`${message.name}/openMessage`);
export const clearMessage = createAction<void, string>(`${message.name}/clearMessage`);
export default message.reducer;