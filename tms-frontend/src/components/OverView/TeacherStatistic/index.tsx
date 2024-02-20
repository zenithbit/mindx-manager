import React from "react";
import PiStatistic from "./PiStatistic";
import Columns from "./Columns";
import TableOverViewTotalTeacher from "./TableOverViewTotalTeacher";
import Expand from "@/icons/Expand";
import { ExpandContent } from "..";
import styles from "@/styles/Overview.module.scss";
import { CloseOutlined, FullscreenOutlined } from "@ant-design/icons";

interface Props {
  setOpenExpand?: (open: boolean, type: ExpandContent) => void;
  isOnExpand?: boolean;
}
const TeacherStatistic = (props: Props) => {
  return (
    <div
      className={`${styles.teacherAnalystic} ${
        props.isOnExpand ? styles.teacherAnalysticOnExpand : ""
      }`}
    >
      <h2>
        Giáo viên
        {props.isOnExpand ? (
          <CloseOutlined
            className={styles.expandIcon}
            onClick={() => {
              props.setOpenExpand?.(!props.isOnExpand, ExpandContent.TEACHER);
            }}
          />
        ) : (
          <FullscreenOutlined
            className={styles.expandIcon}
            onClick={() => {
              props.setOpenExpand?.(!props.isOnExpand, ExpandContent.TEACHER);
            }}
          />
        )}
      </h2>
      <div className={styles.chart}>
        <div className={styles.item}>
          <PiStatistic />
          <Columns />
        </div>
        <div className={styles.item}>
          <TableOverViewTotalTeacher />
        </div>
      </div>
    </div>
  );
};

export default TeacherStatistic;
