import React, { useEffect } from 'react';
import { Obj } from '@/global/interface';
import { useGetCalendarTest, useGetCandidateOnboard } from '@/utils/hooks';
import { formatDatetoString } from '@/utils';
import Loading from '@/components/loading';
import styles from '@/styles/Recruitment/Candidate.module.scss';

const Test = () => {
    const candidateInfo = useGetCandidateOnboard();
    const getCandidateInfo = (candidateInfo.data.response?.data as Array<Obj>)?.[0];

    const calendarTest = useGetCalendarTest();
    const getCalendarTest = calendarTest.data.response?.data as Obj;
    useEffect(() => {
        if (candidateInfo.data.response) {
            calendarTest.query({
                query: {
                    candidateId: getCandidateInfo._id as string
                }
            })
        }
    }, [candidateInfo.data.response]);
    return (
        <div className={styles.testClautid}>
            {getCalendarTest && <h2 style={{ textAlign: 'center' }}>Hãy liên hệ với TE khi cần trợ giúp!</h2>}
            {!getCalendarTest && !calendarTest.data.isLoading || calendarTest.data.isLoading ? <Loading /> :

                !getCalendarTest ? 'Chưa có lịch dạy thử, vui lòng liên hệ với TE để được hỗ trợ!' :
                    <div>
                        <p>Link meet: <a href={getCalendarTest.linkMeet} target="_blank">{getCalendarTest.linkMeet}</a></p>
                        <p>Thời gian: {formatDatetoString(getCalendarTest.time, "iii, hh:mm-aa, dd/MM/yyyy")}</p>
                        <p>Tài liệu: {getCalendarTest.doc ? <a href={getCalendarTest.doc} target="_blank">{getCalendarTest.doc}</a> : 'Chưa có tài liệu!'}</p>
                    </div>
            }
        </div>
    )
}

export default Test;