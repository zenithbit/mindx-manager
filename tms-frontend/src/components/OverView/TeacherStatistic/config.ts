import { Obj } from "@/global/interface";
import { ROLE_TEACHER } from "@/global/enum";

const filterTeacherWithCourse = (listRecordCourseApply?: Obj[], listDataTeacher?: Obj[], courseId?: string) => {
    const listTeacherWithCourse = listRecordCourseApply?.filter((item: Obj) => {
        return (item?.coursesRegister as Obj[])?.find((course: Obj) => {
            return course?.idCourse?._id === courseId
        })
    });
    const listTeacher = listTeacherWithCourse?.map((item) => {
        return listDataTeacher?.find((teacher) => teacher._id === item.idTeacher)
    }) as Obj[];
    return listTeacher;
}
const filterTeacherWithArea = (listRecordCourseApply?: Obj[], listDataTeacher?: Obj[], listArea?: Obj[], courseId?: string) => {
    const listTeacher = filterTeacherWithCourse(listRecordCourseApply, listDataTeacher, courseId);
    const dataLocationTotal: Obj = {}
    listTeacher.map((item) => {
        if (!dataLocationTotal[item?.area]) {
            dataLocationTotal[item?.area] = 0;
        }
        dataLocationTotal[item?.area] += 1;
    });
    const listLocation = listArea?.map((item) => {
        const getNameArea = item.name; 
        const getCountTeacher = dataLocationTotal[item._id] ?? 0;
        return [getNameArea, getCountTeacher]
    });
    return listLocation
}
const getStatisticTeacher = (listCourse?: Obj[], getListCourseApply?: Obj[], getListTeacher?: Obj[]) => {
    const mappingData: Record<ROLE_TEACHER, number[]> = {
        MT: [],
        SP: [],
        ST: []
    };
    const getTotalTeacherByCourse: Obj = {};
    const listCourseMapName = listCourse?.map((item) => {
        const countTeacherByLevelHandle: Obj = {
            lv1: 0,
            lv2: 0,
            lv3: 0,
            lv4: 0
        }
        for (let i = 0; i < (getListCourseApply || []).length; i++) {
            const record = getListCourseApply?.[i];
            if (record) {
                const getRecordCourseApply = record?.coursesRegister as Obj[];
                for (let j = 0; j < getRecordCourseApply.length; j++) {
                    const data = getRecordCourseApply[j];
                    if (data.idCourse._id === item._id) {
                        (data.levelHandle as Obj[]).forEach((lv) => {
                            countTeacherByLevelHandle[`lv${lv.levelNumber}`]++;
                        });
                        break;
                    }
                }
            }
        }
        const listTeacherWithCourse = filterTeacherWithCourse(getListCourseApply, getListTeacher, item._id);
        let getCount: Record<ROLE_TEACHER, number> = {
            MT: 0,
            SP: 0,
            ST: 0
        };
        listTeacherWithCourse?.forEach((tc) => {
            if (tc?.roleIsMT) {
                getCount['MT']++;
            }
            if (tc?.roleIsST) {
                getCount['ST']++;
            }
            if (tc?.roleIsSP) {
                getCount['SP']++;
            }
        });
        for (const key in mappingData) {
            mappingData[key as ROLE_TEACHER].push(getCount[key as ROLE_TEACHER]);
        }
        getTotalTeacherByCourse[item._id] = countTeacherByLevelHandle;
        return {
            name: item.courseName,
            id: item._id,
            getTotalTeacherByCourse
        };
    });
    return {
        data: mappingData,
        categories: listCourseMapName
    }
}
export {
    filterTeacherWithArea,
    filterTeacherWithCourse,
    getStatisticTeacher
}