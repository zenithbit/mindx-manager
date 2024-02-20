import { statusClass } from "@/global/init";
import { FieldPopUpFilter } from "../Tabs/ToolBar/PopUpFilter";
import { listMonth } from "@/utils";


const FieldOption: Record<string, Array<FieldPopUpFilter>> = {
    SUBJECT: [
        {
            key: 'UIUX',
            title: 'UI/UX'
        },
        {
            key: 'CODE',
            title: 'Code'
        },
        {
            key: 'PMBA',
            title: 'PM/BA'
        },
        {
            key: 'DATA',
            title: 'Data'
        },
        {
            key: 'BLOCKCHAIN',
            title: 'Block chain'
        },
    ],
    STATUS: [
        {
            key: statusClass.RUNNING,
            title: 'Đang học'
        },
        {
            key: statusClass.PREOPEN,
            title: 'Dự kiến'
        },
        {
            key: statusClass.DROP,
            title: 'Huỷ'
        },
        {
            key: statusClass.FINISH,
            title: 'Kết thúc'
        },
    ],
    CODE_CLASS_LEVEL: [
    ],
    STYLE: [
        {
            key: 'HYBRID',
            title: 'Hybrid'
        }
    ],
    TEACHER: [],
    OPEN_SCHEDULE: listMonth(),
    TIME_SCHEDULE: []
};
export default FieldOption;