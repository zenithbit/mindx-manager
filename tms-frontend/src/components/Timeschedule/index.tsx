import React, { useEffect } from "react";
import { Button } from "antd";
import { PositionTe } from "@/global/enum";
import { Columns, Obj, RowData } from "@/global/interface";
import Table from "../Table";
import { useComparePositionTE, useGetTimeSchedule } from "@/utils/hooks";
import styles from "@/styles/Timeschedule.module.scss";

const Timeschedule = () => {
  const listTimeSchedule = useGetTimeSchedule();
  const hasRole = useComparePositionTE(
    PositionTe.LEADER,
    PositionTe.QC,
    PositionTe.ASSISTANT
  );
  const columns: Columns = [
    {
      title: "STT",
      render(_, __, index) {
        return index + 1;
      },
    },
    {
      title: "Thứ",
      dataIndex: "weekday",
    },
    {
      title: "Khung giờ",
      render(_, record) {
        return record ? `${record.start}-${record.end}` : "";
      },
    },
    {
      title: "Hành động",
      render() {
        return (
          <div>
            <Button style={{ marginRight: "12px" }}>Cập nhật</Button>
            <Button>Xoá</Button>
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    if (!listTimeSchedule.data.response) {
      listTimeSchedule.query();
    }
  }, []);
  const rowData: RowData[] = (
    listTimeSchedule.data.response?.data as Obj[]
  )?.map((item) => {
    return {
      key: item._id as string,
      ...item,
    };
  });
  return (
    <div className={styles.timeSchedule}>
      {hasRole && (
        <div className={styles.btn}>
          <Button className={styles.btnCreateTimeRange}>Tạo khung giờ</Button>
        </div>
      )}
      <Table columns={columns} rowData={rowData} disableDefaultPagination />
    </div>
  );
};

export default Timeschedule;
