import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useQuizzTestSocket } from '@/utils/hooks';
import { Button } from 'antd';
import { Obj } from '@/global/interface';
import { RoomTest } from '@/store/reducers/socket/socketQuizzTest.reducer';
import student from '@/assets/imgs/student.png';
import Skip from '@/icons/Skip';
import styles from '@/styles/Test.module.scss';
import CountingTime from '../CountingTime';

const Teacher = () => {
    const router = useRouter();
    const firstMount = useRef(true);
    const getRoom = router.query.codeClass as string;
    const quizzTest = useQuizzTestSocket();
    const getStateRoom = quizzTest.data.response as RoomTest;
    const getListStudent = quizzTest.data.response?.listStudent as Obj[] ?? [];
    const joinQuizz = quizzTest.data.response?.join;

    const handleStartExamination = () => {
        quizzTest.queryRoom(getRoom, {
            codeClass: getRoom,
            finish: false,
            start: true,
            join: true,
            duringInTheTest: false
        });
    }

    useEffect(() => {
        if (getRoom && !quizzTest.data.response && firstMount.current) {
            firstMount.current = false;
            quizzTest.queryRoom(getRoom, {
                codeClass: getRoom,
                finish: false,
                start: false,
                join: true,
                duringInTheTest: false
            });
        }
    }, [getRoom]);
    return (
        <div className={styles.containerTeacherQuizz}>
            <div className={styles.teacherQuizz}>
                {!joinQuizz ? quizzTest.data.response?.message :
                    <>
                        <div className={styles.title}>
                            <h1>Kiểm tra lớp: {router.query.codeClass as string}</h1>
                            <div className={styles.infoBase}>
                                <p>Mã phòng: {router.query.codeClass as string}</p>
                                <p>Thời gian: 5p</p>
                                <p>Số câu hỏi: 10</p>
                                <Button onClick={handleStartExamination}>Bắt đầu</Button>
                            </div>
                        </div>

                        {joinQuizz && getStateRoom?.start && Number(getStateRoom?.time) && !getStateRoom?.duringInTheTest ?
                            <CountingTime time={Number(getStateRoom?.time ?? 0)} /> : (
                                getStateRoom.duringInTheTest ? <div>Kiểm tra nè</div> :
                                    <div className={styles.listStudent}>
                                        {getListStudent?.length === 0 ?
                                            <div>
                                                Chưa có học sinh tham dự
                                            </div> : getListStudent?.map((item, idx) => {
                                                return <div key={item.email} className={styles.student}>
                                                    <Image src={student} alt='' width={50} height={50} />
                                                    <span>{item.studentName}</span>
                                                </div>
                                            })
                                        }
                                    </div>
                            )
                        }
                        {/* <div className={styles.question}>
                <div className={styles.action}>
                    <span className={styles.countingTime}>20s</span>
                    <span className={styles.skipButton}><Skip /></span>
                </div>
                <div className={styles.contentQuestion}>
                    <div className={styles.blockTitleQuestion}>
                        Câu 1. HTML là gì?
                    </div>
                </div>
            </div> */}
                    </>
                }
            </div>
        </div>
    )
}

export default Teacher;