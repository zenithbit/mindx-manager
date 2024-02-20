import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'antd';
import { useRouter } from 'next/router';
import { Obj } from '@/global/interface';
import { RoundProcess } from '@/global/enum';
import { useGetDataRoundProcess, useGetDetailCandidate, useUpdateDataProcessRoundCandidate } from '@/utils/hooks';
import { formatDatetoString } from '@/utils';
import ListComment from '../Comment';
import CalendarAdd from '@/icons/CalendarAdd';
import ModalCustomize from '@/components/ModalCustomize';
import CreateCalendar from '../CreateCalendar';
import ConfirmContext from '../context';
import styles from '@/styles/Recruitment/ManagerRecruitment.module.scss';

interface Props {
    roundId?: string;
}
const Test = (props: Props) => {
    const router = useRouter();
    const currentCandidate = useGetDetailCandidate();
    const getCandidateId = router.query;
    const candidate = currentCandidate.data.response?.data as Obj;
    const dataRoundProcess = useGetDataRoundProcess();
    const getDataRoundProcess = (dataRoundProcess.data.response?.data as Array<Obj>)?.[0];
    const [modalCalendar, setModalSetCalendar] = useState(false);
    const confirm = useContext(ConfirmContext);

    const updateDataRoundProcessCandidate = useUpdateDataProcessRoundCandidate();
    useEffect(() => {
        if (updateDataRoundProcessCandidate.data.response) {
            setModalSetCalendar(false);
        }
    }, [updateDataRoundProcessCandidate.data]);
    const handleModal = (pass?: boolean, type?: 'PASS' | 'FAIL') => {
        const getTitle = (pass ? <h3>Xác nhận <b className="passStep" style={{ fontSize: 'calc(1.3rem + 0.6vw)' }}>Đạt</b>!</h3> : <h3>Xác nhận <b className="failStep" style={{ fontSize: 'calc(1.3rem + 0.6vw)' }}>Trượt</b>!</h3>);
        confirm.handleModal?.(true, getTitle, type);
    }
    return (
        <div className={styles.roundTest}>
            <div className={`${styles.handleTest} ${styles.infoRound}`}>
                <h2>Vòng kiểm tra dạy thử</h2>
                <div className={styles.infoRoundTest}>
                    <p>Link meet: {getDataRoundProcess?.linkMeet as string ? <a href={getDataRoundProcess.linkMeet || '#'} className="link" target="_blank">{getDataRoundProcess?.linkMeet}</a> : <span className="error">Chưa có link!</span>}</p>
                    <p>Tài liệu: {getDataRoundProcess?.doc as string ? <a href={getDataRoundProcess.doc || '#'} className="link" target="_blank">{getDataRoundProcess?.doc}</a> : <span className="error">Chưa có tài liệu!</span>}</p>
                    <p>Thời gian: {getDataRoundProcess?.time as string ? formatDatetoString(new Date(getDataRoundProcess.time as string), 'dd/MM/yyyy, HH:mm:a') : <span className="error">Chưa có lịch!</span>}</p>
                    <p>TE: {getDataRoundProcess?.te ? (`${getDataRoundProcess.te.teName}-${getDataRoundProcess.te.positionTe}${getDataRoundProcess.te.courseId ? ` ${getDataRoundProcess.te.courseId.courseName}` : ''}`) : (<span className="error">Chưa có thông tin TE!</span>)}</p>
                </div>
                <div className={styles.function}>
                    <span className={`${styles.handleCalendar} link`} onClick={() => {
                        setModalSetCalendar(true);
                    }}>
                        <CalendarAdd /> {getDataRoundProcess?.linkMeet ? 'Cập nhật' : 'Tạo lịch'}
                    </span>
                    <div className={styles.handleStep}>
                        <Button className={styles.btnHandleStep}>
                            Trượt
                        </Button>
                        <Button className={styles.btnHandleStep} onClick={() => {
                            handleModal(true, 'PASS');
                        }}>
                            Bước tiếp theo
                        </Button>
                    </div>
                </div>
            </div>
            <ListComment className={styles.comments} roundId={props.roundId} />
            <ModalCustomize
                show={modalCalendar}
                onHide={() => {
                    setModalSetCalendar(false);
                }}
                centered
                modalHeader={
                    <div>
                        Tạo lịch dạy thử: <b>{candidate?.fullName as string}</b>
                    </div>
                }
            >
                <CreateCalendar
                    hasDoc
                    handleSubmit={(values) => {
                        updateDataRoundProcessCandidate.query({
                            params: [props.roundId as string],
                            body: {
                                ...values,
                                round: RoundProcess.TEST,
                                ...getCandidateId.candidateId ? {
                                    candidateId: getCandidateId.candidateId
                                } : {}
                            }
                        })
                    }}
                    handleModal={() => {
                        setModalSetCalendar(false);
                    }}
                />
            </ModalCustomize>
        </div>
    )
}

export default Test;