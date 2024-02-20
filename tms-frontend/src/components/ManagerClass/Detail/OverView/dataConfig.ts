import { Obj } from "@/global/interface";

const configDataClassSession = (response: Record<string, unknown> | null) => {
    const listClassSession: Record<string, unknown>[] = [];
    const dt = response?.data as Array<Obj> || [];
    const dataRemoveDuplicatte: Obj[] = dt.filter((item, index) => {
        return dt.findIndex((rc) => (rc.sessionNumber) === item.sessionNumber) === index;
    });

    dataRemoveDuplicatte.forEach((item) => {
        const filterSessionNumber = (response?.data as Array<Obj>)!.filter((data) => {
            return data.sessionNumber === item.sessionNumber
        }).map((data) => {
            return {
                document: data.document,
                location: data.locationId
            }
        });
        const newRecordSession = {
            classId: item.classId,
            date: item.date,
            isOH: item.isOH,
            ran: item.ran,
            sessionNumber: item.sessionNumber,
            weekdayTimeScheduleId: item.weekdayTimeScheduleId,
            _id: item._id,
            listLocation: filterSessionNumber
        }
        listClassSession.push(newRecordSession);
    }
    );
    listClassSession.sort((a, b) => {
        return Number(a.sessionNumber) - Number(b.sessionNumber);
    })
    return listClassSession;
};
export {
    configDataClassSession,
}