import React, { useEffect, useState } from "react";
import { Button, DatePicker } from "antd";
import dayjs from "dayjs";
import { Obj } from "@/global/interface";
import { MapIconKey } from "@/global/icon";
import { KEY_ICON } from "@/global/enum";
import { useGetListDataRecruitment } from "@/utils/hooks";
import TableIndex from "./TableIndex";
import PiResourceApply from "./PiResourceApply";
import ByCourse from "./ByCourse";
import Expand from "@/icons/Expand";
import Loading from "@/components/loading";
import { ExpandContent } from "..";
import styles from "@/styles/Overview.module.scss";
import {
  ArrowLeftOutlined,
  CloseOutlined,
  FullscreenOutlined,
} from "@ant-design/icons";

interface Props {
  setOpenExpand?: (open: boolean, type: ExpandContent) => void;
  isOnExpand?: boolean;
}
const OverViewRecruitment = (props: Props) => {
  const listCandidate = useGetListDataRecruitment();
  const currentDate = new Date();
  const getPrevMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 1,
    1
  );
  const [conditionDate, setConditionDate] = useState<{
    startDate: Date;
    endDate: Date;
  }>({
    startDate: getPrevMonth,
    endDate: currentDate,
  });
  const handleChangeDate = (
    value: Obj | null,
    type: "START_DATE" | "END_DATE"
  ) => {
    if (value !== null) {
      const getDate = new Date(value.$d);
      setConditionDate({
        startDate: type === "START_DATE" ? getDate : conditionDate.startDate,
        endDate: type === "END_DATE" ? getDate : conditionDate.endDate,
      });
    }
  };
  useEffect(() => {
    listCandidate.query(
      undefined,
      undefined,
      [
        "_id",
        "gender",
        "result",
        "roundProcess",
        "courseApply",
        "resourceApply",
        "statusProcess",
        "courseName",
        "dob",
        "createdAt",
        "updatedAt",
        "interviewDate",
        "failCVDate",
      ],
      {
        startDate: conditionDate.startDate,
        endDate: conditionDate.endDate,
      }
    );
  }, [conditionDate]);
  return (
    <div
      className={`${
        props.isOnExpand
          ? styles.recruitmentOnExpand
          : styles.overViewRecruitment
      }`}
    >
      <h2>
        Tuyển dụng{" "}
        {props.isOnExpand ? (
          <CloseOutlined
            className={styles.expandIcon}
            onClick={() => {
              props.setOpenExpand?.(
                !props.isOnExpand,
                ExpandContent.RECRUITMENT
              );
            }}
          />
        ) : (
          <FullscreenOutlined
            className={styles.expandIcon}
            onClick={() => {
              props.setOpenExpand?.(
                !props.isOnExpand,
                ExpandContent.RECRUITMENT
              );
            }}
          />
        )}
      </h2>
      <div className={`${styles.pickDate}`}>
        Lọc:{" "}
        <DatePicker
          value={dayjs(conditionDate.startDate)}
          size="small"
          placeholder="Từ ngày"
          format="DD/MM/YYYY"
          onChange={(value) => {
            handleChangeDate(value, "START_DATE");
          }}
        />
        <span className={styles.arrow} style={{ marginInline: "12px" }}>
          <ArrowLeftOutlined />
        </span>
        <DatePicker
          value={dayjs(conditionDate.endDate)}
          size="small"
          placeholder="Đến ngày"
          format="DD/MM/YYYY"
          onChange={(value) => {
            handleChangeDate(value, "END_DATE");
          }}
        />
        {listCandidate.data.isLoading && <Loading />}
      </div>
      <div className={styles.chartTable}>
        <TableIndex />
        <div className={styles.chart}>
          <PiResourceApply />
          <ByCourse />
        </div>
      </div>
    </div>
  );
};

export default OverViewRecruitment;
