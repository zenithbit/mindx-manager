import { Obj } from "@/global/interface";

const destructureBookTeacher = (data: Obj[]) => {
    const getData = data?.map((item) => {
        return {
            ...item,
            ...item.classSessionId.bookTeacher as Obj
        }
    });
    return getData || [];
}
export {
    destructureBookTeacher
}