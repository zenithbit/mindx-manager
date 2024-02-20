import React, { useEffect, useRef, useState } from "react";
import ResizeObserver from "react-resize-observer";
import Image from "next/image";
import chronometer from "@/assets/imgs/chronometer.png";
import styles from "@/styles/Test.module.scss";
import TickDone from "@/icons/TickDone";

const getBreakPoint = (size: number) => {
  if (size < 768) return styles.small;
  if (size > 768 && size < 991) return styles.middle;
  return styles.large;
}
const StudentQuizzUI = () => {
  const firstRender = useRef<boolean>(true);
  const [size, setSize] = useState(0);
  useEffect(() => {
    firstRender.current = false;
  }, []);
  return (
    <div className={`${styles.containerStudentQuizz} ${!firstRender.current && getBreakPoint(size)}`}>
      <ResizeObserver
        onResize={(rect) => {
          setSize(rect.width);
        }}
      />
      <div className={styles.studentQuizzWrapper}>
        <div className={styles.background}></div>
        <div className={styles.contentWrapper}>
          <div className={styles.quizzTime}>
            <Image width={45} src={chronometer} alt="" />
            <span>11:45</span>
          </div>
          <div className={styles.quizz}>
            <div className={styles.quizz_quesstion}>
              <div className={styles.questionCount}>Câu số 1 / 10</div>
              <div>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Perferendis odio voluptatem enim iste quibusdam in tenetur
                libero? Eius corporis repellat, nobis itaque ullam error placeat
                reiciendis quibusdam, iste, dignissimos fuga.
              </div>
            </div>
            <div className={styles.answer}>
              <div
                className={styles.parent}
              >
                {[1, 2, 3, 4].map((item, idx) => {
                  return <div key={item} className={`${styles[`div${idx + 1}`]} ${styles.answer}`}>
                    <span className={styles.textAnswer}>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </span>
                    <TickDone className={styles.iconTick} />
                  </div>
                })}
              </div>
            </div>
            <button>Trả lời</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentQuizzUI;
