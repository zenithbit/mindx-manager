import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Obj } from '@/global/interface';
import { useGetDetailCandidate } from '@/utils/hooks';
import IconBoard from '@/icons/IconBoard';
import IconFeedbackBorder from '@/icons/IconFeedbackBorder';
// import IconEdit2 from '@/icons/IconEdit2';
// import IconWhitePlus from '@/icons/IconWhitePlus';
import BaseInfo from './BaseInfo';
import Progress from './Progress';
import Info from './Info';
import Loading from '@/components/loading';
import NoData from '@/components/table-ant/NoData';
import styles from '@/styles/Recruitment/ManagerRecruitment.module.scss';

enum TabMain {
    PROGRESS = 'PROGRESS',
    INFO = 'INFO'
}

const DetailCandidate = () => {
    const [tabMain, setTabMain] = useState<TabMain>(TabMain.PROGRESS);
    const router = useRouter();
    const getCandidateId = router.query;
    const detailCandidate = useGetDetailCandidate();
    const [load, setLoad] = useState(true);
    useEffect(() => {
        detailCandidate.query([String(getCandidateId.candidateId)]);
    }, []);
    const contentTabMain: Record<TabMain, React.ReactElement> = {
        INFO: <Info />,
        PROGRESS: <Progress />
    };
    useEffect(() => {
        if (load && detailCandidate.data.response) {
            if (detailCandidate.data.success) {
                if ((detailCandidate.data.response.data as Obj)._id === router.query.candidateId) {
                    setLoad(false);
                }
            } else {
                setLoad(false);
            }
        }
    }, [detailCandidate, load, setLoad]);
    return (
        <div className={styles.detailCandidate}>
            {
                detailCandidate.data.isLoading && !detailCandidate.data.response || load ? <Loading isCenterScreen /> :
                    (!detailCandidate.data.success ? <NoData description={"Không có dữ liệu ứng viên"} className={styles.nodataCenter} /> : <>
                        <div className={styles.baseInfo}>
                            <BaseInfo />
                        </div>
                        <div className={styles.progressInfo}>
                            <div className={styles.headerFunction}>
                                <div className={styles.tab}>
                                    <button className={`${tabMain === TabMain.PROGRESS ? styles.active : ''}`}
                                        onClick={() => {
                                            setTabMain(TabMain.PROGRESS);
                                        }}
                                    >
                                        <IconBoard /> Tiến triển
                                    </button>
                                    <button className={`${tabMain === TabMain.INFO ? styles.active : ''}`}
                                        onClick={() => {
                                            setTabMain(TabMain.INFO);
                                        }}
                                    >
                                        <IconFeedbackBorder /> Thông tin
                                    </button>
                                </div>
                                {/* <div className={styles.btnFunction}>
                                    <button>
                                        <IconEdit2 /> Chỉnh sửa
                                    </button>
                                    <button>
                                        <IconWhitePlus /> Tạo tài khoản
                                    </button>
                                </div> */}
                            </div>
                            <div className={styles.mainContent}>
                                {contentTabMain[tabMain]}
                            </div>
                        </div>
                    </>)
            }
        </div>
    )
}

export default DetailCandidate;