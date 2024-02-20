import React, { useContext, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { Columns, Obj, RowData } from '@/global/interface';
import { ComponentPage, ResultInterview, RoundProcess, StatusProcessing } from '@/global/enum';
import { getColorByResultInterview, getLabelRoundProcess, getStringResultInterview } from '@/global/init';
import { formatDatetoString, getColorByCourseName } from '@/utils';
import { useGetListDataRecruitment } from '@/utils/hooks';
import { PayloadRoute, initDataRoute } from '@/store/reducers/global-reducer/route';
import { ContextRecruitment } from '../context';
import Table from '@/components/Table';
import Popup from '../Popup';
import CombineRoute from '@/global/route';
import NoProgress from '@/components/NoPress';
import Processing from '@/components/Processing';
import ProcessDone from '@/components/ProcessDone';
import styles from '@/styles/Recruitment/ManagerRecruitment.module.scss';

export const getStatusProcess: Record<StatusProcessing, React.ReactElement> = {
    DONE: <ProcessDone />,
    NOPROCESS: <NoProgress />,
    PROCESSING: <Processing />
}
const TableRecruitment = () => {
    const { modal, pagination, conditionFilter, isSearch } = useContext(ContextRecruitment);
    const getDataPagination = pagination.data;
    const router = useRouter();
    const dispatch = useDispatch();
    const listDataRecruitment = useGetListDataRecruitment();
    const rowData: RowData[] = ((listDataRecruitment.data.response?.data as Obj)?.listData as Array<Obj>)?.map((item) => {
        return {
            key: item._id,
            ...item
        }
    });
    const queryListData = (recordOnPage: number, page: number) => {
        listDataRecruitment.query(recordOnPage, page, ['_id', 'fullName', 'courseName', 'createdAt', 'updatedAt', 'email', 'phoneNumber', 'linkFacebook', 'linkCv', 'result', 'statusProcess', 'timeApply', 'roundProcess', 'sendMail', 'color'], conditionFilter.condition);
    }
    useEffect(() => {
        const getPayloadQuery = listDataRecruitment.data.payload;
        if (!listDataRecruitment.data.response || (getPayloadQuery && (Number(getPayloadQuery?.query?.query?.recordOnPage) !== getDataPagination.currentTotalRowOnPage || Number(getPayloadQuery?.query?.query?.currentPage)) !== getDataPagination.currentPage)) {
            queryListData(getDataPagination.currentTotalRowOnPage, getDataPagination.currentPage);
        }
    }, [pagination.data, listDataRecruitment.data.payload]);
    const columns: Columns = [
        {
            key: 'TIME',
            title: 'Thời gian ứng tuyển',
            dataIndex: 'timeApply',
            render(value, record) {
                return <div className={styles.viewDetail}>
                    {formatDatetoString(value, 'dd/MM/yyyy')}
                </div>;
            },
            fixed: 'left',
            width: 150
        },
        {
            key: 'FULLNAME',
            title: 'Họ và tên',
            dataIndex: 'fullName',
            fixed: 'left',
            width: 170
        },
        {
            key: 'COURSE_REGISTER',
            title: 'Bộ môn',
            dataIndex: 'courseApply',
            render(value) {
                return value ? <div className={styles.subject} style={{ backgroundColor: value.color }}>
                    {value.courseName}
                </div> : ''
            },
            fixed: 'left',
            width: 100
        },
        {
            key: 'CONTACT',
            title: 'Liên hệ',
            render(_, record: Obj) {
                return <div>
                    {record.phoneNumber && <p>{record.phoneNumber}</p>}
                    {record.email && <p>{record.email}</p>}
                </div>
            },
            width: 300
        },
        {
            key: 'PROGRESS',
            title: 'Trạng thái',
            dataIndex: 'statusProcess',
            render(value) {
                return <div className={styles.statusProcess}>
                    {getStatusProcess[value as StatusProcessing]}
                </div> || ''
            },
            width: 150
        },
        {
            key: 'PROCESSING',
            title: 'Vòng',
            dataIndex: 'roundProcess',
            render(value) {
                return <div>{getLabelRoundProcess[value as RoundProcess]}</div>
            },
            width: 90
        },
        {
            key: 'RESULT',
            title: 'Kết quả',
            dataIndex: 'result',
            render(value, record) {
                return <div className={styles.result} style={{
                    backgroundColor: getColorByResultInterview[value as ResultInterview]
                }} >
                    {getStringResultInterview[value as ResultInterview]}
                </div >
            },
            width: 120
        },
        {
            key: 'STATUS_MAIL',
            title: 'TT Mail',
            dataIndex: 'sendMail',
            render(value, record) {
                return record.result === ResultInterview.PASS ? 'Đã xong' : (!value ? 'Chưa gửi' : 'Đã gửi')
            },
            width: 80
        },
        {
            key: 'LASTUPDATE',
            title: 'Cập nhật',
            dataIndex: 'updatedAt',
            render(value) {
                return formatDatetoString(value, 'dd/MM/yyyy');
            },
            width: 120
        },
        {
            key: 'CV',
            title: 'CV',
            dataIndex: 'linkCv',
            render(value) {
                return <a target="_blank" style={{ color: 'blue' }} href={value}>Link</a>
            },
            fixed: 'right',
            width: 50
        },
    ];
    const handleRedirectDetail = (candidateId: string) => {
        const routerPayload: PayloadRoute = {
            payload: {
                component: ComponentPage.RECRUITMENT_DETAIL_CANDIDATE,
                route: CombineRoute['TE']['RECRUITMENT_DETAIL_CANDIDATE'],
                title: 'Chi tiết ứng viên',
                hasBackPage: true,
                replaceTitle: 'Chi tiết ứng viên',
            }
        };
        router.push(`/te/manager/recruitment/${candidateId}`);
        dispatch(initDataRoute(routerPayload));
    }
    return (
        <div className={styles.tableView}>
            <Table
                heightToScroll={600}
                hasFixedColumn
                disableDefaultPagination
                columns={columns}
                rowData={rowData}
                enablePaginationAjax={!isSearch}
                loading={listDataRecruitment.data.isLoading}
                hanldeClickRow={(record) => {
                    handleRedirectDetail(record._id as string);
                }}
                onChangeDataPagination={(data) => {
                    pagination.setDataPagination(data);
                }}
                crrPage={pagination.data.currentPage}
                rowOnPage={pagination.data.currentTotalRowOnPage}
                showSizePage
                maxPage={(listDataRecruitment.data.response?.data as Obj)?.totalPage as number}
            />
            {
                modal.config.isShow && <Popup
                    show={modal.config.isShow}
                    isCreate={modal.config.isCreate}
                    onHide={() => {
                        modal.update({
                            ...modal.config,
                            isShow: false
                        })
                    }}
                    title={modal.config.title}
                />
            }
        </div>
    )
}

export default TableRecruitment;