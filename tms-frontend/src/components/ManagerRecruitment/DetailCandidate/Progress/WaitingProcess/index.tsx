import React from 'react';
import styles from '@/styles/Recruitment/ManagerRecruitment.module.scss';
import Loading from '@/components/loading';

interface Props {
    isLoading?: boolean;
}
const WaitingProcess = (props: Props) => {
    return (
        <div className={styles.processWaiting}>
            {props.isLoading ? <Loading /> : 'Ứng viên chưa đến bước này...'}
        </div>
    )
}

export default WaitingProcess;