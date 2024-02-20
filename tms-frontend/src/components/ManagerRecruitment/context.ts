import { Obj } from "@/global/interface";
import { createContext } from "react";

const ContextRecruitment = createContext<{
    modal: {
        config: {
            isShow: boolean;
            isCreate: boolean;
            title?: string;
        }
        update: ({
            isShow,
            isCreate,
            title
        }: {
            isShow: boolean;
            isCreate: boolean;
            title?: string;
        }) => void;
    },
    pagination: {
        data: {
            currentPage: number,
            currentTotalRowOnPage: number
        },
        setDataPagination: (data: {
            currentPage: number,
            currentTotalRowOnPage: number
        }) => void;
    },
    conditionFilter: {
        condition: Obj,
        setCondition: (condition: Obj) => void;
    },
    isSearch: Boolean;
    setIsSearch: (search: boolean) => void
}>({
    modal: {
        config: {
            isShow: false,
            isCreate: false,
            title: 'Thông tin',
        },
        update({ isShow,
            isCreate,
            title }) { }
    },
    pagination: {
        data: {
            currentPage: 1,
            currentTotalRowOnPage: 10
        },
        setDataPagination(data) {

        },
    },
    conditionFilter: {
        condition: {},
        setCondition(condition) {

        },
    },
    isSearch: false,
    setIsSearch(search) {

    },
});
export {
    ContextRecruitment
}