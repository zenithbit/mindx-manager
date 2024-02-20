import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Button, Input } from 'antd';
import { Obj } from '@/global/interface';
import { useGetCandidateOnboard } from '@/utils/hooks';
import { useHookMessage } from '@/utils/hooks/message';
import VisualStep from './VisualStep';
import logo from '@/assets/imgs/mindx.png';
import styles from '@/styles/Recruitment/Candidate.module.scss';

const Candidate = () => {

    const [email, setEmail] = useState<string>('');
    const message = useHookMessage();

    const candidateInfo = useGetCandidateOnboard();
    const getCandidateInfo = (candidateInfo.data.response?.data as Array<Obj>)?.[0];

    const handleQueryCandidate = () => {
        candidateInfo.query({
            query: {
                email,
                fields: 'roundProcess,fillForm,email'
            }
        });
    }

    useEffect(() => {
        if (candidateInfo.data.response && !getCandidateInfo) {
            message.open({
                content: 'Không tìm thấy dữ liệu ứng viên!',
                type: 'error'
            });
        }
    }, [candidateInfo.data.response]);
    return (
        <div className={styles.candidatePage}>
            <Image src={logo} alt='' />
            <h1>Chào mừng ứng viên đến với quy trình onboard</h1>
            <h2>Vui lòng nhập email để kiểm tra</h2>
            <div className={styles.checkCandidate}>
                <Input value={email} onChange={(e) => {
                    setEmail(e.target.value);
                }} />
                <Button
                    onClick={() => {
                        handleQueryCandidate()
                    }}
                    loading={candidateInfo.data.isLoading}
                >Kiểm tra</Button>
            </div>
            {getCandidateInfo && <VisualStep />}
        </div>
    )
}

export default Candidate;