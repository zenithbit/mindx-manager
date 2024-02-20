import { Obj } from "@/global/interface";

const getListTeacherIdOfCourse = (listCourse?: Obj[], listTeacherRegisterCourse?: Obj[]) => {
    const listTeacherApplyCourse: Record<string, string[]> = {};
    listCourse?.forEach(element => {
        const filterTeacher = listTeacherRegisterCourse?.filter((item) => {
            const getCurrentCourseRegister = item.coursesRegister as Obj[];
            return getCurrentCourseRegister?.find((record) => {
                return (record.idCourse?._id as string) === element?._id as string
            });
        });
        listTeacherApplyCourse[element?._id as string] = filterTeacher?.map((item) => item.idTeacher) || [];
    });
    return listTeacherApplyCourse;
}
export {
    getListTeacherIdOfCourse
}