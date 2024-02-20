import React, { useEffect, useState } from 'react';
import { Image, TabsProps } from 'antd';
import { useRouter } from 'next/router';
import { Obj } from '@/global/interface';
import { useGetTeById } from '@/utils/hooks';
import Tabs from '../../Tabs';
import OverView from './OverView';
import PersonalInfo from './PersonalInfo';
import Loading from '@/components/loading';
import Empty from '@/components/Empty';
import styles from '@/styles/employee/TE.module.scss';

enum Tab {
    OVER_VIEW = 'OVER_VIEW',
    PERSONAL_INFO = 'PERSONAL_INFO',
    REPORT = 'REPORT',
    SCHEDULE = 'SCHEDULE'
}
const TeInfo = () => {
    const listTabs: TabsProps['items'] = [
        {
            key: Tab.OVER_VIEW,
            label: "Tổng quan"
        },
        {
            key: Tab.REPORT,
            label: "Báo cáo"
        },
        {
            key: Tab.PERSONAL_INFO,
            label: "Cá nhân"
        },
        {
            key: Tab.SCHEDULE,
            label: "Lịch"
        }
    ];
    const router = useRouter();
    const currentTe = useGetTeById();
    const getCurrentTe = (currentTe.data.response as Obj)?.data as Obj;
    const [tab, setTab] = useState<Tab>(Tab.OVER_VIEW);
    const contentTab: Record<Tab, React.ReactNode> = {
        OVER_VIEW: <OverView />,
        PERSONAL_INFO: <PersonalInfo />,
        REPORT: <></>,
        SCHEDULE: <></>
    }
    useEffect(() => {
        if ((!currentTe.data.response || (currentTe.data.response && (currentTe.data.response as Obj).data?._id !== router.query.teId)) && !currentTe.data.isLoading) {
            currentTe.query({
                params: [router.query.teId as string],
                query:{
                    fields: '_id,teName,email,phoneNumber,positionTe,img,courseName,courseId,dob,activate,facebook'
                }
            });
        }
    }, [currentTe.data.response]);
    return (
        ((currentTe.data.isLoading || !currentTe.data.response) ? <Loading isCenterScreen /> :
            !currentTe.data.success ? <Empty /> : (<div className={styles.teInfo}>
                <div className={styles.leftInfo}>
                    <div className={styles.shortInfo}>
                        <Image alt='' className={styles.imageStaff} width={200} height={200} src={getCurrentTe?.img ?? 'https://res.cloudinary.com/dxo374ch8/image/upload/v1703584277/vsjqknadtdxqk4q05b7p.png'} />
                        <p className={styles.teName}>{getCurrentTe?.teName}</p>
                        <p>{getCurrentTe?.positionTe}{`${getCurrentTe?.courseId?`-${getCurrentTe?.courseId?.courseName}`:''}`}</p>
                        <p>{getCurrentTe?.email}</p>
                        <p>{getCurrentTe?.phoneNumber}</p>
                    </div>
                </div>
                <div className={styles.rightInfo}>
                    <Tabs
                        listItemTab={listTabs}
                        onClickTab={(key) => {
                            setTab(key as Tab);
                        }}
                        notAllowContent
                    />
                    <div className={styles.contentTab}>
                        {contentTab[tab]}
                    </div>
                </div>
            </div>)
        )
    )
}

export default TeInfo;