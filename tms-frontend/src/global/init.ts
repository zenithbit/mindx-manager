import { ClassForm, Gender, LevelTechnique, ObjectTeach, PositionTe, ROLE_TEACHER, Region, ResourceApply, ResultInterview, RoundProcess, STATUS_CLASS, StatusProcessing, TemplateMail, Weekday } from "./enum";

const statusClass: Record<STATUS_CLASS, STATUS_CLASS> = {
    RUNNING: STATUS_CLASS.RUNNING,
    DROP: STATUS_CLASS.DROP,
    FINISH: STATUS_CLASS.FINISH,
    PREOPEN: STATUS_CLASS.PREOPEN
}
const fieldFilter = {
    SUBJECT: 'SUBJECT',
    STATUS: 'STATUS',
    CODE_CLASS_LEVEL: 'CODE_CLASS_LEVEL',
    STYLE: 'STYLE',
    TEACHER: 'TEACHER',
    OPEN_SCHEDULE: 'OPEN_SCHEDULE',
    TIME_SCHEDULE: 'TIME_SCHEDULE'
};
const mapStatusToString: Record<STATUS_CLASS, string> = {
    RUNNING: 'Đang học',
    DROP: 'Huỷ',
    FINISH: 'Kết thúc',
    PREOPEN: 'Sắp mở'
};
const getColorFromStatusClass: Record<STATUS_CLASS, string> = {
    RUNNING: '#00FF00',
    DROP: '#CF575A',
    FINISH: '#B4A7D6',
    PREOPEN: '#FF9902'
}
const getClassForm: Record<ClassForm, string> = {
    HYBRID: 'Hybrid',
    OFFLINE: 'Offline',
    ONLINE: 'Online'
}
const getOrderWeekday: Record<Weekday, number> = {
    T2: 0,
    T3: 1,
    T4: 2,
    T5: 3,
    T6: 4,
    T7: 5,
    CN: 6,
}
const mapRoleToString: Record<ROLE_TEACHER, string> = {
    MT: 'Mentor',
    SP: 'Supporter',
    ST: 'Super Teacher'
}
const getStringGender: Record<Gender, string> = {
    MALE: 'Nam',
    FEMALE: 'Nữ',
    NA: 'Khác'
}
const getColorTeacherPoint = (teacherPoint: number) => {
    if (teacherPoint >= 2 && teacherPoint < 4) {
        return '#FF9902'
    } else if (teacherPoint >= 4) {
        return '#13734B'
    } else if (teacherPoint > 0 && teacherPoint < 2) {
        return '#CF575A'
    }
}
const getStringObjectTeach: Record<ObjectTeach, string> = {
    K12: 'Kid & teen',
    K18: '18+'
}
const getStringStatusProcess: Record<StatusProcessing, string> = {
    DONE: 'Đã xử lý',
    NOPROCESS: 'Chưa xử lý',
    PROCESSING: 'Đang xử lý'
}
const getStringResourceApply: Record<ResourceApply, string> = {
    AN: 'Khác',
    FB: "Facebook",
    LKD: "Linkedin",
    RF: 'Gợi ý (tham khảo)',
    TCV: 'Top CV'
}
const getStringResultInterview: Record<ResultInterview, string> = {
    NOTPASS: 'Trượt',
    PASS: 'Đạt',
    PENDING: 'Đợi xử lý'
}
const getColorByResultInterview: Record<ResultInterview, string> = {
    NOTPASS: '#C00000',
    PASS: '#69A84F',
    PENDING: '#F1C233'
}
const getStringByLevelTechnique: Record<LevelTechnique, string> = {
    INTERN: 'Intern',
    FRESHER: 'Fresher',
    JUNIOR: 'Junior',
    MIDDLE: 'Middle',
    SENIOR: 'Senior',
    LEADER: 'Leader'
}
const getLabelRoundProcess: Record<RoundProcess, string> = {
    CV: 'CV',
    CLASSIFY: 'Đánh giá',
    CLAUTID: 'Dự thính',
    DONE: 'Xong',
    INTERVIEW: 'Phỏng vấn',
    TEST: 'Dạy thử'
}
const getLabelPositionTe: Record<PositionTe, string> = {
    ASSISTANT: 'Trợ lý',
    HR: 'HR',
    LEADER: 'Leader',
    QC: 'QC'
}
const getLabelMailTemplate: Record<TemplateMail, string> = {
    FAILCV: 'Fail CV',
    FAILINTERVIEW: ' Fail PV',
    NOCONNECT: 'Không liên hệ được',
    PASSINTERVIEW: 'Pass PV'
}
const getLabelRegion: Record<Region, string> = {
    MB: 'Miền Bắc',
    MT: 'Miền Trung',
    MN: 'Miền Nam',
    ONL: 'Online'
}
const mapLevelToLabel: Record<number, string> = {
    1: 'Beginner',
    2: 'Intermediate',
    3: 'Advanced',
    4: 'Expert'
}
const mapLevelToColor: Record<number, string> = {
    1: '#3498db',
    2: '#2ecc71',
    3: '#f39c12',
    4: '#e74c3c'
}

const mapLevelToColor2: Record<number, string> = {
    1: '#ecf0f1',
    2: '#d1f2eb',
    3: '#fef5d9',
    4: '#f4d3c5'
}
export {
    statusClass,
    fieldFilter,
    mapStatusToString,
    getColorFromStatusClass,
    getClassForm,
    getOrderWeekday,
    mapRoleToString,
    getStringGender,
    getStringObjectTeach,
    getStringStatusProcess,
    getStringResourceApply,
    getStringResultInterview,
    getColorByResultInterview,
    getStringByLevelTechnique,
    getLabelRoundProcess,
    getLabelPositionTe,
    getLabelMailTemplate,
    getColorTeacherPoint,
    getLabelRegion,
    mapLevelToLabel,
    mapLevelToColor,
    mapLevelToColor2
}