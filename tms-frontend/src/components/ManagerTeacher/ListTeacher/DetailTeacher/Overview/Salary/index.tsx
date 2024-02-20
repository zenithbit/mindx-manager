import React, { useState } from "react";
import { Button, Tooltip } from "antd";
import { Columns, Obj, RowData } from "@/global/interface";
import { formatDatetoString } from "@/utils";
import { useGetTeacherDetail } from "@/utils/hooks";
import Table from "@/components/Table";
import styles from "@/styles/teacher/DetailTeacher.module.scss";
import ModalCustomize from "@/components/ModalCustomize";
import PopupSalary from "./PopupSalary";

const Salary = () => {
  const detailTeacher = useGetTeacherDetail();
  const getDetailTeacher = (detailTeacher.data.response as Obj)?.data as Obj;
  const getListSalary = (getDetailTeacher?.salaryPH as Obj[]) || [];
  const [modalSalary, setModalSalary] = useState<{
    show: boolean;
    idSalary: string;
    currentSalary: number;
    typeModel: "UPDATE" | "ADD";
  }>({
    currentSalary:
      (getListSalary[getListSalary.length - 1]?.rank as number) || 0,
    idSalary: getListSalary[getListSalary.length - 1]?._id as string,
    show: false,
    typeModel: "UPDATE",
  });
  const rowData: RowData[] = getListSalary?.map((item) => {
    return {
      key: item.index as string,
      ...item,
    };
  });
  const columns: Columns = [
    {
      title: "Ngày cập nhật",
      dataIndex: "updateAt",
      render(value) {
        return value ? formatDatetoString(value as string, "dd/MM/yyyy") : "";
      },
    },
    {
      title: "Mức lương",
      children: [
        {
          title: (
            <span>
              {" "}
              Super Teacher{" "}
              <Tooltip title="Lương/75%">
                <sup>i</sup>
              </Tooltip>
            </span>
          ),
          dataIndex: "rank",
          render(value) {
            return Math.round(Number(value) / 0.75).toLocaleString();
          },
        },
        {
          title: "Mentor",
          dataIndex: "rank",
          render(value) {
            return Number(value).toLocaleString();
          },
        },
        {
          title: "Supporter",
          dataIndex: "rank",
          render(value) {
            return Number(value).toLocaleString();
          },
        },
      ],
    },
    {
      title: "Hành động",
      render(_, record) {
        return (
          <div className={styles.btnAction}>
            <Button
              size="small"
              style={{ marginRight: "12px" }}
              onClick={() => {
                setModalSalary({
                  idSalary: record._id as string,
                  show: true,
                  typeModel: "UPDATE",
                  currentSalary:
                    (getListSalary[getListSalary.length - 1]?.rank as number) ||
                    0,
                });
              }}
            >
              Cập nhật
            </Button>
            <Button size="small">Xoá</Button>
          </div>
        );
      },
    },
  ];
  return (
    <div className={styles.salary}>
      <div className={styles.btnAction}>
        <Button
          size="small"
          onClick={() => {
            setModalSalary({
              idSalary: "",
              show: true,
              typeModel: "ADD",
              currentSalary: 0,
            });
          }}
        >
          Thêm mức lương
        </Button>
      </div>
      <Table columns={columns} disableDefaultPagination rowData={rowData} />
      {modalSalary.show && (
        <ModalCustomize
          centered
          show={modalSalary.show}
          onHide={() => {
            setModalSalary({
              ...modalSalary,
              show: false,
            });
          }}
          modalHeader={
            <h3>
              {modalSalary.typeModel === "ADD"
                ? "Thêm mức lương"
                : "Cập nhật mức lương"}
            </h3>
          }
        >
          <PopupSalary
            listSalary={getListSalary}
            idSalary={modalSalary.idSalary}
            currentSalary={modalSalary.currentSalary}
            type={modalSalary.typeModel}
          />
        </ModalCustomize>
      )}
    </div>
  );
};

export default Salary;
