import React from "react";
import { createAction } from "@reduxjs/toolkit";
import { Obj, State } from "@/global/interface";
import { createSliceReducer } from "@/utils/redux-toolkit";
import { DrawerProps } from "antd";

const drawer = createSliceReducer('drawer', undefined, {
    openDrawer(state: State, action) {
        state.state.response = action?.payload;
    },
    clearDrawer(state: State) {
        state.state.response = null;
    }
});
export interface OpenDrawer extends DrawerProps {
    className?: string;
    title?: React.ReactNode;
    size?: "default" | "large";
    open?: boolean;
    componentDirection: string;
    props?: Obj
}
export const openDrawer = createAction<OpenDrawer, string>(`${drawer.name}/openDrawer`);
export const closeDrawer = createAction<void, string>(`${drawer.name}/clearDrawer`);
export default drawer.reducer;