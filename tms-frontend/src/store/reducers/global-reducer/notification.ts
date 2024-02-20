import React from "react";
import { State } from "@/global/interface";
import { createSliceReducer } from "@/utils/redux-toolkit";
import { createAction } from "@reduxjs/toolkit";
import { NotificationPlacement } from "antd/es/notification/interface";

const notification = createSliceReducer('notifi', undefined, {
    open(state: State, action) {
        state.state = {
            ...state.state,
            response: {
                ...action?.payload
            }
        }
    }
});
interface Payload {
    message: React.ReactNode;
    description: React.ReactNode;
    placement: NotificationPlacement
}
export const openNotification = createAction<Payload, string>(`${notification.name}/open`);
export default notification.reducer;