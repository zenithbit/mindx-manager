import React from 'react';
import Link from 'next/link';
import { Obj } from '@/global/interface';
import { useGetCandidateOnboard } from '@/utils/hooks';
import styles from '@/styles/Recruitment/Candidate.module.scss';

const FillForm = () => {
    const candidateInfo = useGetCandidateOnboard();
    const getCandidateInfo = (candidateInfo.data.response?.data as Array<Obj>)?.[0];
    return (
        <div className={styles.FillForm}>
            {!getCandidateInfo?.fillForm ? <p>Thực hiện điền form thông tin tại: <Link href={"/auth/form-register"}>Link</Link></p> : <p>Bạn đã hoàn thành</p>}
        </div>
    )
}

export default FillForm;