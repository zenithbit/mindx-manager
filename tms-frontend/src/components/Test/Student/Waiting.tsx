import React from 'react';
import Image from 'next/image';
import { Obj } from '@/global/interface';
import { useQuizzTestSocket } from '@/utils/hooks';
import student from '@/assets/imgs/student.png';
import { RoomTest } from '@/store/reducers/socket/socketQuizzTest.reducer';
import styles from "@/styles/Test.module.scss";
import StudentQuizzUI from './DoQuizz';
import CountingTime from '../CountingTime';

interface Props {
    currentStudent: Obj;
}
const Waiting = (props: Props) => {
    const quizzTest = useQuizzTestSocket();
    const filterStudent = (quizzTest.data.response?.listStudent as Obj[] ?? []).filter((item) => {
        return item.email !== props.currentStudent.email;
    });
    const getStateRoom = quizzTest.data.response as RoomTest;
    return (
        !getStateRoom?.duringInTheTest ? <div className={styles.waitingStart}>
            <h2>Phòng đợi</h2>
            <div className={`${styles.student} ${styles.me}`}>
                <Image src={student} alt='' width={50} height={50} />
                <span>{props.currentStudent.studentName}</span>
            </div>
            <hr />
            {Number(getStateRoom?.time) ? <CountingTime className={styles.coutingTimeOnStudentUI} time={Number(getStateRoom?.time ?? 0)} /> : <div className={styles.listStudent}>
                {filterStudent.map((item) => {
                    return <div key={item.email} className={`${styles.student} ${styles.me}`}>
                        <Image src={student} alt='' width={50} height={50} />
                        <span>{item.studentName}</span>
                    </div>
                })}
            </div>}
        </div> : <StudentQuizzUI />
    )
}

export default Waiting;