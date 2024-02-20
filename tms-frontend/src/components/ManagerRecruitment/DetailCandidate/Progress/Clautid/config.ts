import { ClassForm } from "@/global/enum";
import { getClassForm } from "@/global/init";
import { Columns, Obj } from "@/global/interface";
import { formatDatetoString } from "@/utils";

const configColumns = (onPopup?: boolean, currentDataClautid?: Obj): Columns => {
    const configRenderComment = (comment: string) => {
        if (comment && comment.length > 50) {
            return `${(comment).toString().slice(0, 50)}...`
        }
        return comment;
    }
    return [
        {
            title: 'Mã lớp',
            fixed: 'left',
            width: 90,
            render(_, __, idx) {
                return !idx ? currentDataClautid?.classIdFirst?.codeClass : currentDataClautid?.classIdSecond?.codeClass
            }
        },
        {
            title: 'Ngày dự thính',
            render(_, __, idx) {
                return formatDatetoString(idx ? currentDataClautid?.timeSecond : currentDataClautid?.timeFirst, 'dd/MM/yyyy');
            },
            width: !onPopup ? 120 : 'auto',
            fixed: 'left',
        },
        {
            title: 'Hình thức',
            dataIndex: 'form',
            width: !onPopup ? 90 : 'auto',
            render(_, __, idx) {
                return getClassForm[idx ? currentDataClautid?.formSecond as ClassForm : currentDataClautid?.formFirst as ClassForm]
            }
        },
        {
            title: 'Nội dung buổi học',
            dataIndex: 'contentSession',
            width: 'auto',
            render(value) {
                return !onPopup ? configRenderComment(value) : value;
            }
        },
        {
            title: 'Nhận xét GV (1,5h đầu)',
            dataIndex: 'fbST',
            width: 'auto',
            render(value) {
                return !onPopup ? configRenderComment(value) : value;
            }
        },
        {
            title: 'Nhận xét Mentor (1,5h sau)',
            dataIndex: 'fbMT',
            width: 'auto',
            render(value) {
                return !onPopup ? configRenderComment(value) : value;
            }
        },
        {
            title: 'Góp ý về giáo trình, bài tập',
            dataIndex: 'fbDoc',
            width: 'auto',
            render(value) {
                return !onPopup ? configRenderComment(value) : value;
            }
        }
    ]
}
export {
    configColumns
}