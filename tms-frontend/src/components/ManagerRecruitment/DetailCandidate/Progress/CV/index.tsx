import React, { useContext } from 'react';
import { Button } from 'antd';
import { Obj } from '@/global/interface';
import { RoundProcess } from '@/global/enum';
import { useGetDataRoundProcess, useGetDetailCandidate } from '@/utils/hooks';
import IconArrowView from '@/icons/IconArrowView';
import ListComment from '../Comment';
import ConfirmContext from '../context';
import SendingMail from '../SendingMail';
import styles from '@/styles/Recruitment/ManagerRecruitment.module.scss';

interface Props {
    roundId?: string;
}
const CV = (props: Props) => {
    const crrCandidate = useGetDetailCandidate();
    const getDataCandidate = crrCandidate.data.response?.data as Obj;
    const confirm = useContext(ConfirmContext);

    const dataRoundProcess = useGetDataRoundProcess();
    const getDataRoundProcess = (dataRoundProcess.data.response?.data as Array<Obj>)?.[0];
    const handleModal = (pass?: boolean, type?: 'PASS' | 'FAIL') => {
        const getTitle = (pass ? <h3>Xác nhận <b className="passStep" style={{ fontSize: 'calc(1.3rem + 0.6vw)' }}>Đạt</b>!</h3> : <h3>Xác nhận <b className="failStep" style={{ fontSize: 'calc(1.3rem + 0.6vw)' }}>Trượt</b>!</h3>);
        confirm.handleModal?.(true, getTitle, type);
    }
    return (
        <div className={styles.roundCv}>
            <div className={`${styles.infoRound} ${styles.infoCv}`}>
                <h2>Vòng CV {getDataRoundProcess?.processed && (<sup style={{ color: !getDataRoundProcess?.result ? 'var(--light-red)' : 'var(--success)' }}>{getDataRoundProcess?.result ? 'Pass' : 'Failed'}</sup>)}</h2>
                <div>
                    <label className={styles.linkCv} onClick={(() => {
                        window.open(`${getDataCandidate.linkCv}`, 'blank');
                    })}>
                        Link CV <IconArrowView />
                    </label>
                    {getDataRoundProcess?.processed && !getDataRoundProcess?.result && <SendingMail pass={false} round={RoundProcess.CV} />}

                </div>
                <div className={styles.handleStep}>
                    <Button className={styles.btnHandleStep} onClick={() => {
                        handleModal(false, 'FAIL');
                    }}>
                        Trượt
                    </Button>
                    <Button className={styles.btnHandleStep} onClick={() => {
                        handleModal(true, 'PASS');
                    }}>
                        Bước tiếp theo
                    </Button>
                </div>
            </div>
            <ListComment className={styles.comments} roundId={props.roundId} />
        </div>
    )
}

export default CV;