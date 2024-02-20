import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { Avatar, Badge, Input, Tooltip } from 'antd';
import { AppDispatch } from '@/store';
import { clearDataRouter } from '@/store/reducers/global-reducer/route';
import { UserOnline, onReceivedData, queryEmitSocket, queryReceiveConnection } from '@/store/reducers/socket/socketConnection.reducer';
import { Obj } from '@/global/interface';
import { MapIconKey } from '@/global/icon';
import { ComponentPage, KEY_ICON, ROLE, ROLE_USER } from '@/global/enum';
import CombineRoute from '@/global/route';
import useGetCrrUser from '@/utils/hooks/getUser';
import useGetStateRouter from '@/utils/hooks/stateRouter';
import { findRoute } from '@/layouts/containerPage/containerPage';
import { siderByRole } from '@/layouts/containerPage/tab';
import { useSocketConnection } from '@/utils/hooks';
import styles from '@/styles/ContainerPage.module.scss';

const PageHeader = () => {
    const stateRouter = useGetStateRouter();
    const currentUser = useGetCrrUser()?.data as Obj;
    const crrRole = currentUser?.roleAccount as ROLE_USER;
    const socketConnection = useSocketConnection();
    const getListUserConnection = socketConnection.data.response as unknown as Obj[] ?? [];
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const getCrrSiderRoute = findRoute(siderByRole[crrRole], router.route);
    const handlePrevPage = () => {
        switch (stateRouter?.component) {
            case ComponentPage.DETAILCLASS:
                if (currentUser?.roleAccount === ROLE.TEACHER) {
                    router.push(CombineRoute['TEACHER']['CLASS']);
                } else {
                    router.push(CombineRoute['TE']['MANAGER']['CLASS']);
                }
                break;
            case ComponentPage.TEACHER_DETAIL:
                router.push(CombineRoute['TE']['MANAGER']['TEACHER']);
                break;
            case ComponentPage.RECRUITMENT_DETAIL_CANDIDATE:
                router.push(CombineRoute['TE']['RECRUITMENT']);
                break;
            case ComponentPage.TE_STAFF:
                router.push(CombineRoute['TE']['MANAGER']['STAFF']);
                break;
            default:
                router.back();
                break;
        }
        dispatch(clearDataRouter());
    }
    const handleReceivedMsg = (data: UserOnline) => {
        dispatch(onReceivedData(data));
    }
    const handleEmitSocket = (disconnect?: boolean) => {
        return queryEmitSocket({
            role: crrRole,
            userName: currentUser?.fullName ?? currentUser?.teName ?? 'Anonymous',
            img: currentUser?.img,
            id: currentUser?._id,
            ...currentUser?.positionTe ? {
                position:
                    currentUser.positionTe
            } : {},
            isDisconnect: !!disconnect
        })
    }
    useEffect(() => {
        if (currentUser) {
            queryReceiveConnection(handleReceivedMsg);
            dispatch(handleEmitSocket(false));
        }
    }, [currentUser]);
    return (
        <div className={`${styles.pageHeader} ${styles.bgWhite} pageHeader`}>
            {
                <div className={styles.titleHeader}>
                    <h2>{
                        getCrrSiderRoute?.hasBackPage && <span className={styles.backPage} onClick={() => {
                            handlePrevPage();
                        }}>{MapIconKey[KEY_ICON.ARROWL]}</span>
                    }
                        {(!getCrrSiderRoute?.hasBackPage ? stateRouter?.title : stateRouter?.replaceTitle) ?? getCrrSiderRoute?.title}
                    </h2>
                </div>
            }
            <div className={styles.listUserConnection}>
                {getListUserConnection?.map((item, idx) => {
                    return !item.isDisconnect && <Tooltip key={idx} trigger={"hover"} title={<div>
                        {item.id === currentUser?._id ? 'Bạn' : item.userName}
                    </div>}>
                        <Avatar src={item.img} className={styles.user} />
                    </Tooltip>
                })}
            </div>
            <div className={styles.featFnc}>
                <Input className={styles.input} placeholder='Search' size='large' prefix={MapIconKey[KEY_ICON.SRCH]} />
                <div className="badge">
                    <Badge count={5} color='#F59638'>
                        <Avatar shape="square" size="large">
                            {MapIconKey[KEY_ICON.ML]}
                        </Avatar>
                    </Badge>
                </div>
            </div>
        </div >
    )
}

export default PageHeader