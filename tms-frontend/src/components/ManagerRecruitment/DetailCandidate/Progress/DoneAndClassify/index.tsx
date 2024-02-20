import React, { useEffect, useState } from 'react';
import { MenuProps } from 'antd';
import { Obj } from '@/global/interface';
import { useGetDetailCandidate, useGetDetailCourse, useUpdateCandidate } from '@/utils/hooks';
import Dropdown from '@/components/Dropdown';
import styles from '@/styles/Recruitment/ManagerRecruitment.module.scss';
import { mapRoleToString } from '@/global/init';
import { ROLE_TEACHER } from '@/global/enum';

const Done = () => {
    const crrCandidate = useGetDetailCandidate();
    const getDataCandidate = crrCandidate.data.response?.data as Obj;
    const crrCourse = useGetDetailCourse();
    const getCourse = crrCourse.data.response?.data as Obj;
    const updateCandidate = useUpdateCandidate();
    const [levelClassify, setLevelClassify] = useState<string>(getDataCandidate?.classifyLevel || '');
    const [roleClassify, setRoleClassify] = useState<string>(getDataCandidate?.classifyRole || '');
    const getListLevel: MenuProps['items'] = (getCourse?.courseLevel as Obj[])?.map((item) => {
        return {
            key: item._id,
            label: item.levelCode
        }
    });
    const getListRole: MenuProps['items'] = [ROLE_TEACHER.ST, ROLE_TEACHER.MT, ROLE_TEACHER.SP].map((item) => {
        return {
            key: item,
            label: mapRoleToString[item]
        }
    })
    const getCurrentClassify = (getListLevel?.find(item => item?.key === levelClassify)) as Obj;
    const getCurrentClassifyRole = (getListRole?.find(item => item?.key === roleClassify)) as Obj;
    useEffect(() => {
        if (getDataCandidate) {
            crrCourse.query(getDataCandidate.courseApply._id as string);
        }
    }, []);
    useEffect(() => {
        if (levelClassify || roleClassify) {
            updateCandidate.query({
                body: {
                    classifyLevel: levelClassify,
                    ...roleClassify ? {
                        classifyRole: roleClassify,
                    } : {}
                },
                params: [getDataCandidate._id as string]
            })
        }
    }, [levelClassify, roleClassify]);
    useEffect(() => {
        if (updateCandidate.data.response) {
            updateCandidate.clear?.();
        }
    }, [updateCandidate.data]);
    return (
        <div className={styles.doneAndClassify}>
            <div>
                <h2>Hoàn tất quá trình xử lý ứng viên</h2>
                <p>Vị trí giảng dạy: </p>
                <div className={styles.selectCourse}>
                    <Dropdown
                        icon
                        loading={updateCandidate.data.isLoading}
                        sizeButton="small"
                        trigger='click'
                        onClickItem={(e) => {
                            setRoleClassify(e.key);
                        }}
                        listSelect={getListRole}
                        title={getCurrentClassifyRole?.label || 'Chọn vị trí'}
                    />
                </div>
                <p>Phân loại cấp độ: </p>
                <div className={styles.selectCourse}>
                    <b>{getCourse?.courseName}</b>
                    <Dropdown
                        loading={updateCandidate.data.isLoading}
                        icon
                        sizeButton="small"
                        trigger='click'
                        onClickItem={(e) => {
                            setLevelClassify(e.key);
                        }}
                        listSelect={getListLevel}
                        title={getCurrentClassify?.label || 'Chọn cấp độ'}
                    />
                </div>
            </div>
        </div>
    )
}

export default Done;