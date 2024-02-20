import React from "react";
import { AxiosHeaders, Method, RawAxiosRequestHeaders } from "axios";
import { TableColumnsType } from "antd";
import { ComponentPage, KEY_ICON, PositionTe, ROLE_TEACHER, STATUS_CLASS } from "./enum";
import { StatusEvent } from "@/components/Calendar/Note/styles";

type MethodsHeaders = Partial<{
    [Key in Method as Lowercase<Key>]: AxiosHeaders;
} & { common: AxiosHeaders }>;
export interface Action {
    type?: string;
    isLoading?: boolean;
    componentId?: string;
    payload?: {
        success?: string;
        failed?: string;
        query?: Query
    },
    response?: Record<string, unknown> | null | any;
    success?: boolean;
}
export interface State {
    state: Action
}
export interface Obj {
    [k: string]: {} | undefined | any;
}
export interface Query {
    body?: Obj;
    query?: {
        [k: string]: {} | undefined | any;
        fields?: Array<string> | string;
    };
    params?: Array<string>;
    headers?: (RawAxiosRequestHeaders & MethodsHeaders) | AxiosHeaders;
}
export interface TabRoute {
    route: string;
    title: React.ReactElement | string | React.ReactNode | { (props?: Obj): React.ReactNode };
    key: string;
    keyIcon?: KEY_ICON;
    showIcon?: boolean;
    indexRoute: string;
    hide?: boolean;
    replaceTitle?: React.ReactElement | string;
    noReplaceTitle?: boolean;
    component?: ComponentPage;
    positionTE?: PositionTe;
    notRouting?: boolean;
    className?: string;
    hasBackPage?: boolean;
}
export interface SiderRoute {
    route: string;
    title: string | React.ReactNode;
    keyIcon?: keyof typeof KEY_ICON;
    replaceTitle?: React.ReactElement | string;
    noReplaceTitle?: boolean;
    component?: ComponentPage;
    indexroute: string;
    positionTE?: PositionTe;
    notRouting?: boolean;
    className?: string;
    hasBackPage?: boolean;
    hide?: boolean;
    showIcon?: boolean;
    children?: this[];
}
export interface Columns extends TableColumnsType<Record<string, unknown>> {

}
export interface RowData extends Record<string, any> {
    key: string;
}
export interface BaseInterfaceHookReducer extends Obj {
    data: Obj | Action;
    query?: (params: string | Array<string> | Obj) => void;
}
export interface EventCalendar {
    id?: string;
    title: string,
    start: Date,
    end: Date,
    allDay: boolean;
    status?: StatusEvent;
    resource?: {
        /**
         * @description
         * Status class with enum STATUS_CLASS
         */
        statusClass?: STATUS_CLASS
        /**
         * @description
         * For Teacher schedule
         */
        location?: string,
        /**
         * @description
         * For Teacher schedule
        */
        classSession?: number,
        /**
          * @description
          * For Teacher schedule
        */
        role?: ROLE_TEACHER,
        /**
            * @description
            * For Teacher schedule
          */
        checked?: boolean,
        /**
          * @description
          * For Teacher schedule
        */
        timeChecked?: number,
        [key: string]: any
    };
    [key: string]: any
}