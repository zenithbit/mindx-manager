import { Columns, Obj, RowData } from "@/global/interface";
import { Gender } from "@/global/enum";
import { getColorTeacherPoint, getStringGender } from "@/global/init";
import { formatDatetoString, generateRowDataForMergeRowSingleField } from "@/utils";
import Loading from "@/components/loading";

const getColums = (styles?: Obj, area?: Obj[]): Columns => {
    return [
        {
            key: 'DATE',
            title: 'Ngày tham gia',
            fixed: 'left',
            className: 'header-border',
            dataIndex: 'dateStartWork',
            width: 120,
            render(value) {
                return formatDatetoString(value as Date, 'dd/MM/yyyy');
            },
            onCell(data) {
                return {
                    rowSpan: data.rowSpan as number,
                }
            }
        },
        {
            key: 'USERNAME',
            title: 'Họ tên',
            fixed: 'left',
            dataIndex: 'fullName',
            className: 'header-border',
            width: 160,
            onCell(data) {
                return {
                    rowSpan: data.rowSpan as number,
                }
            }
        },
        {
            key: 'EMAIL',
            title: 'Email',
            className: 'header-border',
            width: 200,
            dataIndex: 'email',
            onCell(data) {
                return {
                    rowSpan: data.rowSpan as number,
                }
            }
        },
        {
            key: 'NUMBERPHONE',
            title: 'Điện thoại',
            className: 'header-border',
            width: 180,
            dataIndex: 'phoneNumber',
            onCell(data) {
                return {
                    rowSpan: data.rowSpan as number,
                }
            }
        },
        {
            key: 'GENDER',
            title: 'Giới tính',
            className: 'header-border',
            width: 90,
            dataIndex: 'gender',
            render(value) {
                return getStringGender[value as Gender];
            },
            onCell(data) {
                return {
                    rowSpan: data.rowSpan as number,
                }
            }
        },
        {
            key: 'DOB',
            title: 'Ngày sinh',
            className: 'header-border',
            width: 120,
            dataIndex: 'dob',
            render(value) {
                return formatDatetoString(value as Date, 'dd/MM/yyyy');
            },
            onCell(data) {
                return {
                    rowSpan: data.rowSpan as number,
                }
            }
        },
        {
            key: 'FACEBOOK',
            title: 'Facebook',
            className: 'header-border',
            width: 90,
            dataIndex: 'facebookLink',
            render(value) {
                return <a href={value} style={{ textDecoration: 'underline' }} target="_blank">Link</a>
            },
            onCell(data) {
                return {
                    rowSpan: data.rowSpan as number,
                }
            }
        },
        {
            key: 'TAX',
            title: 'MST',
            className: 'header-border',
            width: 150,
            dataIndex: 'taxCode',
            onCell(data) {
                return {
                    rowSpan: data.rowSpan as number,
                }
            }
        },
        {
            key: 'IDENTIFY',
            title: 'CCCD/CMTND',
            children: [
                {
                    key: 'IDENTIFY_NUMBER',
                    title: 'Số',
                    width: 200,
                    className: 'header-border',
                    dataIndex: 'identify',
                    onCell(data) {
                        return {
                            rowSpan: data.rowSpan as number,
                        }
                    }
                },
                {
                    key: 'LICENSE_DATE',
                    title: 'Ngày cấp',
                    width: 120,
                    className: 'header-border',
                    dataIndex: 'licenseDate',
                    render(value) {
                        return formatDatetoString(value as Date, 'dd/MM/yyyy');
                    },
                    onCell(data) {
                        return {
                            rowSpan: data.rowSpan as number,
                        }
                    }
                },
                {
                    key: 'LICENSE_PLACEMENT',
                    title: 'Nơi cấp',
                    width: 120,
                    className: 'header-border',
                    dataIndex: 'licensePlace',
                    onCell(data) {
                        return {
                            rowSpan: data.rowSpan as number,
                        }
                    }
                },
            ],
            onCell(data) {
                return {
                    rowSpan: data.rowSpan as number,
                }
            }
        },
        {
            key: 'AREA',
            title: 'Khu vực',
            className: 'header-border',
            width: 120,
            dataIndex: 'area',
            render(value) {
                const getTitleArea = () => {
                    const crrArea = area?.find((item) => {
                        return item?._id === value
                    });
                    return crrArea?.name as string ?? ''
                }
                return getTitleArea();
            },
            onCell(data) {
                return {
                    rowSpan: data.rowSpan as number,
                }
            }
        },
        {
            key: 'EDUCATION',
            title: 'Trường học/ngành học',
            className: 'header-border',
            width: 250,
            dataIndex: 'educationInfo',
            onCell(data) {
                return {
                    rowSpan: data.rowSpan as number,
                }
            }
        },
        {
            key: 'WORKUNIT_INDEX',
            title: 'Đơn vị công tác/Vị trí',
            className: 'header-border',
            width: 250,
            dataIndex: 'companyInfo',
            onCell(data) {
                return {
                    rowSpan: data.rowSpan as number,
                }
            }
        },
        {
            key: 'BACKGROUND',
            title: 'Lý lịch nghề',
            className: 'header-border',
            width: 190,
            dataIndex: 'background',
            onCell(data) {
                return {
                    rowSpan: data.rowSpan as number,
                }
            }
        },
        {
            key: 'ADDRESSS',
            title: 'Địa chỉ hiện tại',
            className: 'header-border',
            width: 300,
            dataIndex: 'address',
            onCell(data) {
                return {
                    rowSpan: data.rowSpan as number,
                }
            }
        },
        {
            key: 'CV',
            title: 'CV',
            className: 'header-border',
            width: 70,
            dataIndex: 'CVfile',
            render(value) {
                return <a href={value} style={{ textDecoration: 'underline' }} target="_blank">Link</a>
            },
            onCell(data) {
                return {
                    rowSpan: data.rowSpan as number,
                }
            }
        },
        {
            key: 'BANKING',
            title: 'Thông tin ngân hàng',
            children: [
                {
                    key: 'BANKNAME',
                    title: 'Tên',
                    width: 120,
                    className: 'header-border',
                    dataIndex: 'bankName',
                    onCell(data) {
                        return {
                            rowSpan: data.rowSpan as number,
                        }
                    }
                },
                {
                    key: 'BANKNUMBERACCOUNT',
                    title: 'STK',
                    width: 120,
                    className: 'header-border',
                    dataIndex: 'bankNumber',
                    onCell(data) {
                        return {
                            rowSpan: data.rowSpan as number,
                        }
                    }
                },
                {
                    key: 'BANKHOLDERNAME',
                    title: 'Chủ TK',
                    width: 120,
                    className: 'header-border',
                    dataIndex: 'bankHolderName',
                    onCell(data) {
                        return {
                            rowSpan: data.rowSpan as number,
                        }
                    }
                },
            ],
        },
        {
            key: 'COURSE_REGISTER',
            title: 'Bộ môn ứng tuyển',
            children: [
                {
                    key: 'COURSE',
                    title: 'Bộ môn',
                    width: 90,
                    fixed: 'right',
                    className: 'header-border',
                    dataIndex: 'courseRegister',
                    render(value) {
                        return (value as Obj)?.idCourse.courseName || <Loading className="margin-auto" />
                    }
                },
                {
                    key: 'COURSE_LEVEL',
                    title: 'Cấp độ',
                    width: 120,
                    fixed: 'right',
                    className: 'header-border',
                    dataIndex: 'courseRegister',
                    render(value) {
                        return ((value as Obj)?.levelHandle as Array<Obj>)?.map((item, idx) => {
                            return idx < ((value as Obj)?.levelHandle as Array<Obj>).length - 1 ? item.levelCode + ', ' : item.levelCode
                        }) || <Loading className="margin-auto" />
                    },
                }
            ],
        },
        {
            key: 'TEACHERPOINT',
            title: 'Điểm GV',
            fixed: 'right',
            dataIndex: 'teacherPoint',
            className: 'text-center',
            width: 80,
            onCell(data: Obj) {
                return {
                    rowSpan: data.rowSpan as number,
                    style: {
                        color: getColorTeacherPoint(data.teacherPoint),
                        fontWeight: 'bold'
                    }
                }
            },
            render(value) {
                return Number(value).toFixed(2);
            }
        }
    ]
};
const mapRowData = (data: Array<Obj>, registerCourse: Array<Obj>): RowData[] => {
    const mappingData = data?.map((item, idx) => {
        return {
            ...item,
            key: item._id as string,
            courseRegister: registerCourse[idx]?.['coursesRegister']
        }
    });
    if (registerCourse.length !== 0) {
        return generateRowDataForMergeRowSingleField(mappingData, 'courseRegister');
    }
    return mappingData;
}
export {
    getColums,
    mapRowData
}