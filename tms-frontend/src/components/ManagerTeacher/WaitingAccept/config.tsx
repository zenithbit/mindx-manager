import { Columns } from "@/global/interface";
import { Gender, ROLE_TEACHER } from "@/global/enum";
import { getStringGender } from "@/global/init";
import { formatDatetoString } from "@/utils";
import ConfirmTeacher from "./Confirm";

const getConfigColumns = (): Columns => {
    return [
        {
            key: 'DATE',
            dataIndex: 'dateStartWork',
            title: 'Ngày tham gia',
            fixed: 'left',
            render(value) {
                return formatDatetoString(value as Date, 'dd/MM/yyyy');
            },
            width: 120
        },
        {
            key: 'NAME',
            dataIndex: 'fullName',
            title: 'Họ tên',
            fixed: 'left',
            width: 160,
        },
        {
            key: 'EMAIL',
            dataIndex: 'email',
            title: 'Email',
            width: 200,
        },
        {
            key: 'ROLE_REGISTER',
            dataIndex: 'role',
            title: 'Vị trí đăng ký',
            width: 120,
            render(value) {
                return (value as Array<ROLE_TEACHER>).toString();
            }
        },
        {
            key: 'PHONENUMBER',
            dataIndex: 'phoneNumber',
            title: 'SĐT',
            width: 180,
        },
        {
            key: 'GENDER',
            dataIndex: 'gender',
            title: 'Giới tính',
            width: 90,
            render(value, record, index) {
                return getStringGender[value as Gender]
            },
        },
        {
            key: 'DOB',
            dataIndex: 'dob',
            title: 'Ngày sinh',
            width: 120,
            render(value) {
                return formatDatetoString(value as Date, 'dd/MM/yyyy');
            }
        },
        {
            key: 'FB',
            dataIndex: 'facebookLink',
            title: 'Facebook',
            width: 90,
            render(value) {
                return <a href={value} style={{ textDecoration: 'underline' }} target="_blank">Link</a>
            }
        },
        {
            key: 'MST',
            dataIndex: 'taxCode',
            title: 'MST',
            width: 150,
        },
        {
            key: 'AREA',
            dataIndex: 'area',
            title: 'Khu vực',
            width: 120,
        },
        {
            key: 'EDU',
            dataIndex: 'educationInfo',
            title: 'Trường học/Ngành học',
            width: 250,
        },
        {
            key: 'COMPANY',
            dataIndex: 'companyInfo',
            title: 'Đơn vị công tác/vị trí',
            width: 250,
        },
        {
            key: 'BACKGROUND',
            dataIndex: 'background',
            title: 'Lý lịch nghề',
            width: 190,
        },
        {
            key: 'ADDRESS',
            dataIndex: 'address',
            title: 'Địa chỉ hiện tại',
            width: 300,
        },
        {
            key: 'CV',
            dataIndex: 'CVfile',
            title: 'CV',
            width: 90,
            render(value) {
                return <a href={value} style={{ textDecoration: 'underline' }} target="_blank">Link</a>
            }
        },
        {
            key: 'ACTION',
            title: 'Thao tác',
            className: 'text-center',
            width: 120,
            fixed: 'right',
            render(value, record) {
                return <ConfirmTeacher record={record} />
            }
        },
    ];
};
export {
    getConfigColumns
}