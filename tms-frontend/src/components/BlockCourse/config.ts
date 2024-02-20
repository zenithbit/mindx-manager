import { Obj } from "@/global/interface";

const getTotalTeacher = (courseId?: string, listTeacher?: Obj[]) => {
    const data = {
        total: 0
    };
    listTeacher?.forEach((item) => {
        const checkRegistered = (item.coursesRegister as Obj[])?.find((record) => {
            return record.idCourse._id === courseId;
        });
        if (checkRegistered) {
            data['total']++
        }
    });
    return {
        data
    }
}
export {
    getTotalTeacher
};