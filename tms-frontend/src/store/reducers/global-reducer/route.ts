import React from "react";
import { createAction } from "@reduxjs/toolkit";
import { Obj, State } from "@/global/interface";
import { ComponentPage, KEY_ICON } from "@/global/enum";
import { createSliceReducer } from "@/utils/redux-toolkit";
import { initState } from "@/global/init-data";

export interface StateRoute {
    route: string;
    title: React.ReactElement | string;
    icon?: KEY_ICON;
    replaceTitle?: React.ReactElement | string;
    hasBackPage?: boolean;
    moreData?: Record<string, unknown> | undefined;
    component: ComponentPage | undefined;
}
export interface PayloadRoute {
    payload: StateRoute;
}
const getDataRoute = createSliceReducer('dataRoute', undefined, {
    init: (state: State, action?: PayloadRoute) => {
        state.state = {
            ...state.state,
            response: {
                prevRouteState: {
                    ...(state.state.response as Obj)?.payload as StateRoute
                },
                ...(action ? action.payload : {}),
            }
        }
    },
    clear: (state: State) => {
        state.state = initState.state;
    }
});
export const initDataRoute = createAction<PayloadRoute, string>(`${getDataRoute.name}/init`);
export const clearDataRouter = createAction<void, string>(`${getDataRoute.name}/clear`);
export default getDataRoute.reducer;
