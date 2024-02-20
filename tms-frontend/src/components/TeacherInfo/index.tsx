import React, { useEffect, useState } from "react";
import { Avatar, Badge, TabsProps, Tooltip } from "antd";
import { getColorTeacherPoint } from "@/global/init";
import { Obj } from "@/global/interface";
import useGetCrrUser from "@/utils/hooks/getUser";
import { useTeacherRegisterCourse } from "@/utils/hooks";
import Tabs from "../Tabs";
import About from "./About";
import Account from "./Account";
import Salary from "./Salary";
import Edit from "@/icons/Edit";
import styles from '@/styles/teacher/TeacherInfo.module.scss';

export enum Tab {
  ABOUT = 'ABOUT',
  ACCOUNT = 'ACCOUNT',
  SALARY = 'SALARY'
}
const TeacherInfo = () => {
  const currentUser = useGetCrrUser()?.data as Obj;
  const dataTeacherRegisterCourse = useTeacherRegisterCourse();
  const getRecordRegisterCourse = ((dataTeacherRegisterCourse.listData.response?.data as Obj)?.coursesRegister as Obj[]);
  const getSalaryTeacher = currentUser?.salaryPH as Array<Obj>;
  const [edit, setEdit] = useState<{
    isEdit: boolean,
    tabEdit: Tab
  }>({
    isEdit: false,
    tabEdit: Tab.ABOUT
  });
  const [contentType, setContentType] = useState<Tab>(Tab.ABOUT);
  const content: Record<Tab, React.ReactElement> = {
    ABOUT: <About isEdit={edit.isEdit} tabEdit={edit.tabEdit} onConfirm={() => {
      setEdit({
        isEdit: false,
        tabEdit: Tab.ABOUT
      })
    }} />,
    ACCOUNT: <Account />,
    SALARY: <Salary />
  }
  const listTab: TabsProps['items'] = [
    {
      key: Tab.ABOUT,
      label: 'Thông tin',
    },
    {
      key: Tab.ACCOUNT,
      label: 'Tài khoản',
    },
    {
      key: Tab.SALARY,
      label: 'Lương',
    },
  ]
  useEffect(() => {
    dataTeacherRegisterCourse.query([]);
  }, []);
  return <div className={styles.teacherInfo}>
    <div className={styles.header}>
      <Avatar size={150} />
      <div className={styles.baseInfo}>
        <Tooltip title={`Điểm GV: ${Number(currentUser?.teacherPoint || 0).toFixed(2)}`}>
          <Badge count={Number(currentUser?.teacherPoint || 0).toFixed(2)} offset={[25, 0]} color={getColorTeacherPoint(Number(currentUser?.teacherPoint || 0))}>
            {currentUser?.fullName}
          </Badge>
        </Tooltip>
        {currentUser?.taxCode && <p>MST: {currentUser?.taxCode}</p>}
        <div className={styles.obj}>
          <div>
            <p className='bold'>Vị trí:</p>
            <ul>
              {currentUser?.roleIsST && <li>Giảng viên</li>}
              {currentUser?.roleIsMT && <li>Mentor</li>}
              {currentUser?.roleIsSP && <li>Supporter</li>}
            </ul>
          </div>
          <div className={styles.subject}>
            <p className='bold'>Bộ môn</p>
            {getRecordRegisterCourse?.map((item, idx) => {
              return <ul key={idx} className={styles.courseRegister}>
                <li className='bold'>{item.idCourse?.courseName as string}:</li>
                <div className={styles.listLevel}>
                  {
                    (item.levelHandle as Obj[])?.map((level) => {
                      return <li key={level._id as string}>{level?.levelCode as string}</li>
                    })
                  }
                </div>
              </ul>
            })}
          </div>
        </div>
        <div className={styles.salary}><b>Lương</b>: {(getSalaryTeacher?.[getSalaryTeacher.length - 1]?.rank as number || 0).toLocaleString()}</div>
      </div>
    </div>
    <div className={styles.mainInfo}>
      <div className={styles.toolHeader}>
        <Tabs
          onClickTab={(key) => {
            setContentType(key as any);
          }}
          listItemTab={listTab}
          notAllowContent
        />
        {contentType === 'ABOUT' && <Edit className={styles.iconEdit} onClick={(() => {
          setEdit({
            isEdit: !edit.isEdit,
            tabEdit: contentType
          })
        })} />}
      </div>
      {content[contentType]}
    </div>
  </div>;
};

export default TeacherInfo;
