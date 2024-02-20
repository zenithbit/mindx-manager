import React, { useState } from 'react';
import IndexOverViewBlock, { TypeOverView } from './IndexOverviewBlock';
import OverViewRecruitment from './Recruitment';
import TeacherStatistic from './TeacherStatistic';
import ModalCustomize from '../ModalCustomize';
import styles from '@/styles/Overview.module.scss';

export enum ExpandContent {
    RECRUITMENT = 'RECRUITMENT',
    TEACHER = 'TEACHER'
}
const OverView = () => {
    const [openExpand, setOpenExpand] = useState<{
        open: boolean;
        content: ExpandContent
    }>({
        open: false,
        content: ExpandContent.RECRUITMENT
    });
    const handleExpand = (open: boolean, type: ExpandContent) => {
        setOpenExpand({
            open: open,
            content: type
        });
    }
    const content: Record<ExpandContent, React.ReactElement> = {
        RECRUITMENT: <OverViewRecruitment isOnExpand={openExpand.open} setOpenExpand={handleExpand} />,
        TEACHER: <TeacherStatistic isOnExpand={openExpand.open} setOpenExpand={handleExpand} />
    }
    return (
        <div className={styles.containerOverView}>
            <div className={styles.listIndexOverview}>
                <IndexOverViewBlock title="Số giáo viên" type={TypeOverView.TEACHER} />
                <IndexOverViewBlock title="Teacherpoint" type={TypeOverView.TEACHERPOINT} />
                <IndexOverViewBlock title="Lớp học" type={TypeOverView.CLASS} />
                <IndexOverViewBlock title="Rank lương" type={TypeOverView.RANKSALARY} />
            </div>
            <div className={styles.general}>
                <OverViewRecruitment setOpenExpand={handleExpand} />
                <TeacherStatistic setOpenExpand={handleExpand} />
            </div>
            {
                openExpand.open && <ModalCustomize
                    dialogClassName={styles.dialogModalDashboard}
                    show={openExpand.open}
                    onHide={() => {
                        setOpenExpand({
                            ...openExpand,
                            open: false
                        });
                    }}
                    size="xl"
                >
                    {content[openExpand.content]}
                </ModalCustomize>
            }
        </div >
    )
}

export default OverView;