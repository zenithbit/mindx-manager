import { v4 as uid } from 'uuid';
import { format } from 'date-fns';
import { Action, Obj, Query, RowData, State } from '@/global/interface';
import { StatusProcessing, Weekday } from '@/global/enum';
import { AppDispatch, RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';

const uuid = () => {
    return uid() as string;
}
const listMonth = () => {
    const list = [];
    for (let i = 1; i <= 12; i++) {
        const newMonth = {
            key: `MONTH_${i}`,
            title: `Tháng ${i}`
        }
        list.push(newMonth);
    }
    return list;
}
const sortByString = (forthStr: string, behindStr: string) => {
    if (forthStr > behindStr) {
        return 1
    }
    if (forthStr < behindStr) {
        return -1
    }
    return 0;
}
const logout = () => {
    localStorage.removeItem('access_token');
    window.location.assign('/auth/login');
}
const formatDatetoString = (date: Date | string | number, formatString?: string) => {
    return date ? format(new Date(date), formatString || 'MM/dd/yyyy') : '';
}

const generateRowDataForMergeRowSingleField = (data: Obj[], fieldForMerge: string): RowData[] => {
    const mapping: RowData[] = [];
    data.forEach((element: Obj) => {
        const arr = (element[fieldForMerge] as Array<Obj>) || [];
        if (arr.length !== 0) {
            arr.forEach((item, crrIndex) => {
                const catchedRecord = {
                    ...element,
                    key: uuid(),
                    [fieldForMerge]: {
                        ...item
                    },
                    rowSpan: (element[fieldForMerge] as Array<Obj>).length !== 0 ? (crrIndex === 0 ? (element[fieldForMerge] as Array<Obj>).length : 0) : 1,
                    recordId: element._id as string
                };
                mapping.push(catchedRecord);
            });
        } else {
            const record = {
                ...element,
                key: uuid(),
                recordId: element._id as string
            }
            mapping.push(record);
        }
    });
    return mapping;
}
const getWeekday = (day: number, vi?: boolean, short?: boolean) => {
    if (short) {
        switch (day) {
            case 1:
                return "T2";
            case 2:
                return "T3";
            case 3:
                return "T4";
            case 4:
                return "T5";
            case 5:
                return "T6";
            case 6:
                return "T7";
            case 0:
                return "CN";
            default:
                return "CN"
        }
    } else if (!vi) {
        switch (day) {
            case 1:
                return Weekday.T2;
            case 2:
                return Weekday.T3;
            case 3:
                return Weekday.T4;
            case 4:
                return Weekday.T5;
            case 5:
                return Weekday.T6;
            case 6:
                return Weekday.T7;
            case 0:
                return Weekday.CNB;
            default:
                return Weekday.CNB;
        }
    } else {
        switch (day) {
            case 1:
                return "TH 2";
            case 2:
                return "TH 3";
            case 3:
                return "TH 4";
            case 4:
                return "TH 5";
            case 5:
                return "TH 6";
            case 6:
                return "TH 7";
            case 0:
                return "CN";
            default:
                return "CN"
        }
    }
}
const formatNumberPhone = (str: string) => {
    let getString = '';
}
const getColor3Point = (point: number) => {
    const MAXPOINT = 5;
    const getRatePoint = Math.round(MAXPOINT / 2);
    if (point > getRatePoint) {
        return '#02bf34';
    } else if (2 < point && point <= getRatePoint) {
        return '#FF9902';
    }
    return '#CF575A';
}
const getColorByCourseName: Obj = {
    'Data': '#6792F4',
    'Web': '#DA4646',
    'UIUX': '#917EF1'
}
const getColorByStatusProcess: Record<StatusProcessing, string> = {
    DONE: '#69A84F',
    NOPROCESS: '#E06666',
    PROCESSING: '#F1C233'
}
const createHookQueryReducer = (reducer: keyof RootState, queryThunk: Function, clear?: Function) => {
    return () => {
        const data = useSelector((state: RootState) => (state[reducer] as State).state);
        const dispatch = useDispatch<AppDispatch>();
        const query = (query?: Query) => {
            const payload: Action = {
                payload: {
                    query
                }
            }
            dispatch(queryThunk(payload));
        }
        const clearReducer = () => {
            dispatch(clear?.());
        }
        return {
            data,
            query,
            ...clear ? { clear: clearReducer } : {}
        }
    }
}
const shortenName = (fullName: string) => {
    const words = fullName?.split(' ');
    if (words && words.length >= 2) {
        const initials = words.map(word => word[0]).join('');

        const lastName = words.slice(-1)[0].substring(1);
        let str = '';
        for (let i = 0; i < initials.length; i++) {
            if (i < initials.length - 1) {
                str += initials[i] + '.'
            } else {
                str += initials[i]
            }
        }
        const shortenedName = str + lastName;

        return shortenedName;
    } else {
        return fullName;
    }
}
function calculateAge(dob: Date) {
    const today = new Date();
    const birthDate = new Date(dob);

    // Chuyển đổi thành timestamp bằng cách lấy giây từ Epoch
    const todayTimestamp = today.getTime();
    const birthDateTimestamp = birthDate.getTime();

    // Tính toán tuổi
    const age = Math.floor((todayTimestamp - birthDateTimestamp) / (1000 * 60 * 60 * 24 * 365.25));
    return age;
}
const useGetComponentIdByReducer = (reducer: keyof RootState) => {
    const data = useSelector((state: RootState) => (state[reducer] as State).state);
    return data.payload?.query?.query?.componentId as string
}

function getFileInfoFromBase64(base64String: string) {
    const fileInfo = base64String.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,/);

    if (fileInfo && fileInfo[1]) {
        const fileType = fileInfo[1];
        const fileExtension = fileType.split('/')[1];
        const fileName = "file." + fileExtension;

        return { fileName, fileType };
    }

    return null;
}

const compareRefData = (ref1: Obj, ref2: Obj) => {
    return (JSON.stringify(ref1) === JSON.stringify(ref2))
};

export {
    uuid,
    listMonth,
    sortByString,
    logout,
    formatDatetoString,
    generateRowDataForMergeRowSingleField,
    getWeekday,
    getColor3Point,
    createHookQueryReducer,
    shortenName,
    getColorByCourseName,
    getColorByStatusProcess,
    calculateAge,
    getFileInfoFromBase64,
    compareRefData
}