import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Input } from 'antd';
import { Obj } from '@/global/interface';
import CombineRoute from '@/global/route';
import { getColorFromStatusClass, mapStatusToString } from '@/global/init';
import { KEY_ICON, PositionTe, STATUS_CLASS } from '@/global/enum';
import { MapIconKey } from '@/global/icon';
import { useComparePositionTE, useDetailClass, useUpdateClassBasicInfor } from '@/utils/hooks';
import { useHookMessage } from '@/utils/hooks/message';
import useGetDataRoute from '@/utils/hooks/getDataRoute';
import { TabDetailClass } from '../Detail';
import styles from '@/styles/class/TitleHeader.module.scss';

interface Props {
    title?: string;
    tabDetail: TabDetailClass;
    /**
   * @description
   * For title detail class overview
   */
    statusClass?: STATUS_CLASS;
    /**
   * @description
   * For title detail class overview
   */
    dateStart?: string;
    /**
    * @description
    * For title detail class overview
    */
    editTitle?: boolean;
    /**
    * @description
    * For attendance tab
    */
    isAttendance?: boolean;
    /**
    * @description
    * For attendance tab
    */
    dateAttendance?: boolean;
    /**
    * @description
    * For attendance tab
    */
    sessionAttendance?: boolean;

}
const TitleHeader = (props: Props) => {
    const detailClass = useDetailClass('GET');
    const hasRole = useComparePositionTE(PositionTe.LEADER, PositionTe.QC, PositionTe.ASSISTANT);
    const message = useHookMessage();
    const [title, settitle] = useState<string>('');
    const currentDataRoute = useGetDataRoute();
    useEffect(() => {
        settitle(props.title as string);
    }, [props.title]);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const updatedClass = useUpdateClassBasicInfor();
    useEffect(() => {
        if (updatedClass.updated.response && props.tabDetail === TabDetailClass.OVERVIEW) {
            if (String(updatedClass.updated.response.message).includes('E11000')) {
                message.open({
                    content: 'Mã lớp đã tồn tại!',
                    type: 'error'
                }, 2000);
                message.close(2000);
                settitle(props.title as string);
            }
        }
    }, [updatedClass]);
    const mapTabDetailBreadcrumb: Record<TabDetailClass, React.ReactNode> = {
        OVERVIEW: <span>{title}</span>,
        STUDENT: <span>{title}</span>,
        ATTENDANCE: <span>Buổi số: {currentDataRoute.moreData && currentDataRoute.moreData.isAttendance ? `${currentDataRoute.moreData.currentSession}` : '1'}</span>,
        BOOK_TEACHER: '',
        FEEDBACK: '',
        MANAGER_GROUP: '',
        TEXTBOOK: '',
        SYLLABUS: ''
    }
    return (
        <div className={styles.titleHeader}>
            {props.editTitle ?
                (!isEdit ?
                    <span className={`${styles.title} display-block`} style={{ fontSize: 22 }}>
                        {title}
                        {hasRole && <sup
                            className={styles.icon}
                            onClick={() => {
                                setIsEdit(true)
                            }}
                        >{MapIconKey[KEY_ICON.EDIT]}
                        </sup>}
                    </span>
                    :
                    <>
                        <Input value={title}
                            onChange={(e) => {
                                settitle(e.target.value);
                            }}
                        />
                        <div className={styles.btnFnc}>
                            <sup
                                className={styles.icon}
                                onClick={() => {
                                    if (title !== (detailClass.data?.response?.data as Obj).title) {
                                        updatedClass.handleUpdate({
                                            payload: {
                                                query: {
                                                    params: [(detailClass.data?.response?.data as Obj)._id as string],
                                                    body: {
                                                        title: title
                                                    }
                                                }
                                            }
                                        });
                                    }
                                    setIsEdit(false);
                                }}
                            >
                                {MapIconKey[KEY_ICON.TICK]}
                            </sup>
                            <span className={styles.close}
                                onClick={() => {
                                    settitle(props.title as string);
                                    setIsEdit(false);
                                }}
                            >
                                {MapIconKey[KEY_ICON.PLB]}
                            </span>
                        </div>
                    </>
                )
                :
                (<span className={`${styles.title} display-block`} style={{ fontSize: 22 }}>
                    {isEdit ? title : props.title}
                </span>)}

            {props.tabDetail === TabDetailClass.OVERVIEW && <span className={`${styles.statusClass}`} style={{ backgroundColor: getColorFromStatusClass[(detailClass.data.response?.data as Obj)?.status as STATUS_CLASS || props.statusClass], fontWeight: '500' }}>
                {mapStatusToString[(detailClass.data?.response?.data as Obj)?.status as STATUS_CLASS] || mapStatusToString[props.statusClass as STATUS_CLASS]}
            </span>}
            <div className={styles.breadCrumb}>
                <span className={`${styles.dateStart} color-placeholder`}>{props.dateStart}</span>
                <span>{MapIconKey[KEY_ICON.HTSL]}</span>
                <Link className="color-placeholder" href={hasRole ? CombineRoute['TE']['MANAGER']['CLASS'] : CombineRoute['TEACHER']['CLASS']}>Lớp học</Link>
                <span>{MapIconKey[KEY_ICON.CHEVRONRL]}</span>
                {mapTabDetailBreadcrumb[props.tabDetail]}
            </div>
        </div>
    )
}

export default TitleHeader;