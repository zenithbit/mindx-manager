import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'antd';
import { Columns, Obj, RowData } from '@/global/interface';
import { getClassForm } from '@/global/init';
import { ClassForm } from '@/global/enum';
import { formatDatetoString } from '@/utils';
import { useGetDataRoundProcess, useGetFeedbackClautid } from '@/utils/hooks';
import { configColumns } from './config';
import UnCheck from '@/icons/UnCheck';
import Table from '@/components/Table';
import Expand from '@/icons/Expand';
import Tick from '@/icons/Tick';
import ModalCustomize from '@/components/ModalCustomize';
import ConfirmContext from '../context';
import styles from '@/styles/Recruitment/ManagerRecruitment.module.scss';

const listClassIdClautid: string[] = [];

const Clautid = () => {
    const router = useRouter();
    const dataRoundProcess = useGetDataRoundProcess();
    const getDataRoundProcess = (dataRoundProcess.data.response?.data as Array<Obj>)?.[0] as Obj;
    const feedbackClautid = useGetFeedbackClautid();
    const getFeedbackClautid = feedbackClautid.data.response?.data as Array<Obj> || [];
    const columns: Columns = configColumns(undefined, getDataRoundProcess);
    const columnsTablePopup: Columns = configColumns(true, getDataRoundProcess);
    const rowData: RowData[] = getFeedbackClautid.map((item, idx) => {
        return {
            ...item,
            key: idx.toString()
        }
    });
    const [modalFeedback, setModalFeedback] = useState<boolean>(false);
    const confirm = useContext(ConfirmContext);
    const handleModal = (pass?: boolean, type?: 'PASS' | 'FAIL') => {
        const getTitle = (pass ? <h3>Xác nhận <b className="passStep" style={{ fontSize: 'calc(1.3rem + 0.6vw)' }}>Đạt</b>!</h3> : <h3>Xác nhận <b className="failStep" style={{ fontSize: 'calc(1.3rem + 0.6vw)' }}>Trượt</b>!</h3>);
        confirm.handleModal?.(true, getTitle, type);
    }
    useEffect(() => {
        if (dataRoundProcess.data.response) {
            if (getDataRoundProcess?.classIdFirst?._id) {
                listClassIdClautid.push(getDataRoundProcess.classIdFirst._id as string);
            }
            if (getDataRoundProcess?.classIdSecond?._id) {
                listClassIdClautid.push(getDataRoundProcess.classIdSecond._id as string);
            }
            feedbackClautid.query({
                query: {
                    listCandidateId: [router.query.candidateId].toString(),
                    listClassId: listClassIdClautid.toString()
                }
            });
        }
    }, [dataRoundProcess.data.response]);
    return (
        <div className={`${styles.roundClautid} ${styles.infoRound}`}>
            <div className={styles.handleClautid}>
                <h2>Dự thính {(<sup style={{ color: !getDataRoundProcess?.result ? 'var(--light-red)' : 'var(--success)' }}>{getDataRoundProcess?.result ? 'Pass' : 'Pending'}</sup>)}</h2>
                <div className={styles.classClautid}>
                    <p>Đăng ký dự thính</p>
                    <div className={styles.classRegister}>
                        <div className={styles.class}>
                            {getDataRoundProcess && getDataRoundProcess.classIdFirst ? <span>
                                Lớp: {getDataRoundProcess.classIdFirst?.codeClass} - {formatDatetoString(new Date(getDataRoundProcess.timeFirst), 'dd/MM/yyyy')} - {getClassForm[getDataRoundProcess.formFirst as ClassForm]} {getDataRoundProcess.timeFirstDone ? <Tick className={`${styles.iconCheck} ${styles.checked}`} /> : <UnCheck className={`${styles.iconCheck} ${styles.unChecked}`} />}
                            </span> : <span>Chưa có thông tin lần dự thính 1</span>}
                        </div>
                        <div className={styles.class}>
                            {getDataRoundProcess && getDataRoundProcess.classIdSecond ? <span>
                                Lớp: {getDataRoundProcess.classIdSecond?.codeClass} - {formatDatetoString(new Date(getDataRoundProcess.timeSecond), 'dd/MM/yyyy')} - {getClassForm[getDataRoundProcess.formSecond as ClassForm]} {getDataRoundProcess.timeFirstDone ? <Tick className={`${styles.iconCheck} ${styles.checked}`} /> : <UnCheck className={`${styles.iconCheck} ${styles.unChecked}`} />}
                            </span> : <span>Chưa có thông tin lần dự thính 2</span>}
                        </div>
                    </div>
                </div>
                <div className={styles.function}>
                    {/* <span className={styles.handleSchedule} style={{ cursor: 'pointer' }}>
                        <CalendarAdd /> Tạo lịch
                    </span> */}
                    <div className={styles.handleStep}>
                        <Button
                            // disabled={getDataRoundProcess?.result}
                            className={styles.btnHandleStep}
                            onClick={() => {
                                // handleModal(false, 'FAIL');
                            }}
                        >
                            Trượt
                        </Button>
                        <Button
                            // disabled={getDataRoundProcess?.result}
                            className={styles.btnHandleStep}
                            onClick={() => {
                                handleModal(true, 'PASS');
                            }}
                        >
                            Bước tiếp theo
                        </Button>
                    </div>
                </div>
            </div>
            <div className={styles.table}>
                <Expand className={styles.iconExpand} onClick={() => {
                    setModalFeedback(true);
                }} />
                <Table
                    className={styles.tableData}
                    disableDefaultPagination
                    hasFixedColumn
                    columns={columns}
                    rowData={rowData}
                />
            </div>
            {modalFeedback && <ModalCustomize
                show={modalFeedback}
                size="xl"
                onHide={() => {
                    setModalFeedback(false);
                }}
                modalHeader={<p></p>}
            >
                <Table
                    className={styles.tableData}
                    disableDefaultPagination
                    hasFixedColumn
                    columns={columnsTablePopup}
                    rowData={rowData}
                />
            </ModalCustomize>}
        </div>
    )
}

export default Clautid;