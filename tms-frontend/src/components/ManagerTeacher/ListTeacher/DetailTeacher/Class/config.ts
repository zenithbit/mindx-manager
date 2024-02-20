import { Obj } from "@/global/interface"

const getMatchingTimeSchedule = (listTimeSchedule?: Array<Obj>, recordTimeRequest?: Array<Obj>) => {
    const mapTimeSchedule = listTimeSchedule?.filter((item) => {
        const data = recordTimeRequest?.find((time) => time === item._id);
        return data;
    }) || [];
    return mapTimeSchedule;
}
export {
    getMatchingTimeSchedule
}