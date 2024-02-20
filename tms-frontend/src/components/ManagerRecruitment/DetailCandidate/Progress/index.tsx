import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { Obj } from '@/global/interface';
import { RoundProcess } from '@/global/enum';
import { getLabelRoundProcess } from '@/global/init';
import { useGetDataRoundComments, useGetDataRoundProcess, useGetDetailCandidate, useUpdateDataProcessRoundCandidate } from '@/utils/hooks';
import { useHookMessage } from '@/utils/hooks/message';
import ConfirmContext from './context';
import Step from '@/components/Step';
import WaitingProcess from './WaitingProcess';
import CV from './CV';
import Interview from './Interview';
import Clautid from './Clautid';
import Test from './Test';
import PopupConfirm from './PopupConfirm';
import Done from './DoneAndClassify';
import styles from '@/styles/Recruitment/ManagerRecruitment.module.scss';

const getStepByRound: Record<RoundProcess, number> = {
    CV: 0,
    INTERVIEW: 1,
    CLAUTID: 2,
    TEST: 3,
    CLASSIFY: 4,
    DONE: 5
}

const listRound = [{
    round: RoundProcess.CV,
    title: 'Vòng CV'
}, {
    round: RoundProcess.INTERVIEW,
    title: 'Phỏng vấn'
}, {
    round: RoundProcess.CLAUTID,
    title: 'Dự thính'
}, {
    round: RoundProcess.TEST,
    title: 'Dạy thử'
}, {
    round: RoundProcess.DONE,
    title: 'Kết thúc'
}];
const Progress = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();
    const getCandidateId = router.query;
    const crrCandidate = useGetDetailCandidate();
    const getDataCandidate = crrCandidate.data.response?.data as Obj;

    const [step, setStep] = useState<RoundProcess>(getDataCandidate.roundProcess as RoundProcess || RoundProcess.CV);
    const dataRoundProcess = useGetDataRoundProcess();
    const getDataRoundProcess = dataRoundProcess.data.response?.data as Array<Obj>;
    const getDataRound = getDataRoundProcess?.[0] as Obj;
    const roundComments = useGetDataRoundComments();
    const updateDataRoundProcessCandidate = useUpdateDataProcessRoundCandidate();

    const firstMount = useRef(true);

    const message = useHookMessage();
    const [confirmModal, setConfirmModal] = useState<{
        show?: boolean,
        title?: React.ReactElement | string;
        type?: 'PASS' | 'FAIL'
    }>({
        show: false,
        title: "",
        type: 'FAIL'
    });
    const handleModal = (show?: boolean, title?: React.ReactElement | string, type?: 'PASS' | 'FAIL', callback?: () => void) => {
        setConfirmModal({
            show,
            title,
            type
        });
    }
    const ContentRoundProgess: Record<RoundProcess, React.ReactElement> = {
        CV: <CV roundId={getDataRound?._id as string} />,
        CLAUTID: <Clautid />,
        CLASSIFY: <>Phân loại</>,
        INTERVIEW: <Interview roundId={getDataRound?._id as string} />,
        TEST: <Test roundId={getDataRound?._id as string} />,
        DONE: <Done/>
    };
    const queryHandleDataStep = (round: RoundProcess, roundId: string, result?: boolean, linkMeet?: string, time?: Date, doc?: string) => {
        updateDataRoundProcessCandidate.query({
            params: [roundId],
            body: {
                result, linkMeet, time, doc, round,
                ...getCandidateId.candidateId ? {
                    candidateId: getCandidateId.candidateId
                } : {}
            }
        });
    };
    useEffect(() => {
        if (getDataCandidate && firstMount.current) {
            firstMount.current = false;
            dataRoundProcess.query(getDataCandidate.roundProcess, [router.query.candidateId as string]);
        }
    }, [getDataCandidate]);
    useEffect(() => {
        if (!dataRoundProcess.data.isLoading && dataRoundProcess.data.response) {
            setLoading(false);
            if (getDataRoundProcess?.length !== 0) {
                roundComments.query(getDataRound?._id as string, ['roundId', 'teId', '_id', 'teName', 'positionTe', 'courseId', 'content', 'createdAt', 'updatedAt']);
            }
        }
    }, [dataRoundProcess.data]);
    useEffect(() => {
        if (updateDataRoundProcessCandidate.data.response && updateDataRoundProcessCandidate.data.success) {
            crrCandidate.query([String(getCandidateId.candidateId)]);
            message.open({
                content: 'Cập nhật thành công!',
                type: 'success',
            });
            message.close();
            updateDataRoundProcessCandidate.clear?.();
            dataRoundProcess.query(step, [router.query.candidateId as string]);
        }
    }, [updateDataRoundProcessCandidate.data, step]);
    const handleClickStep = (step: RoundProcess) => {
        setStep((prev) => {
            if (prev !== step) {
                dataRoundProcess.query(step, [router.query.candidateId as string]);
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                });
                setLoading(true);
            }
            return prev !== step ? step : prev;
        });
    };
    return (
        <ConfirmContext.Provider value={{
            ...confirmModal,
            onConfirm(round, confirm) {
                setConfirmModal({
                    ...confirmModal,
                    show: false
                });
                if (confirm) {
                    queryHandleDataStep(round, getDataRound?._id as string, confirmModal.type === 'PASS' ? true : false);
                }
            },
            handleModal,
            round: step
        }}>
            <div className={styles.progress}>
                <Step
                    currentStep={getStepByRound[getDataCandidate?.roundProcess as RoundProcess] || 0}
                    labelPlacement="vertical"
                    items={
                        listRound.map((item, index) => {
                            return {
                                description: <p key={index} className={styles.round} onClick={() => {
                                    handleClickStep(item.round);
                                }}>{item.title}</p>
                            }
                        })
                    }
                />
                <div className={styles.content}>
                    {loading ? <WaitingProcess isLoading={true} /> :
                        (dataRoundProcess.data.response?.data as Array<Obj>)?.length !== 0
                            ?
                            ContentRoundProgess[step] :
                            <WaitingProcess isLoading={dataRoundProcess.data.isLoading} />
                    }
                </div>
            </div>
            <PopupConfirm
                show={confirmModal.show}
                title={confirmModal.title}
            >
                <div>
                    <p>Xác nhận ứng viên <b>{getDataCandidate.fullName as string}</b> {confirmModal.type === 'PASS' ? 'đạt' : 'trượt'} vòng {getLabelRoundProcess[step]}!</p>
                </div>
            </PopupConfirm>
        </ConfirmContext.Provider>
    )
}

export default Progress;