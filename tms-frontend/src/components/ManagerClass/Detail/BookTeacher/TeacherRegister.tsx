import React, { useEffect, useState } from 'react';
import { Button, Radio } from 'antd';
import { ROLE_TEACHER } from '@/global/enum';
import { Obj } from '@/global/interface';
import { useHandleTeacherInRCBT } from '@/utils/hooks';
import useGetCrrUser from '@/utils/hooks/getUser';
import { useHookMessage } from '@/utils/hooks/message';
import styles from '@/styles/class/BookTeacher.module.scss';

interface Props {
    isRegister?: boolean;
    isCancel?: boolean;
    recordBookTeacherId?: string;
}
const TeacherRegister = (props: Props) => {
    const [role, setRole] = useState<ROLE_TEACHER>(ROLE_TEACHER.MT);
    const currentUser = useGetCrrUser()?.data as Obj;
    const register = useHandleTeacherInRCBT();
    const message = useHookMessage();
    const handleSubmit = () => {
        register.query({
            payload: {
                query: {
                    query: {
                        options: props.isRegister ? 'REGISTER' : 'CANCEL',
                        role: role,
                        idTeacher: currentUser?._id
                    },
                    params: [props.recordBookTeacherId as string]
                }
            }
        });
    }
    useEffect(() => {
        if (register.dataHandle.response) {
            message.open({
                content: register.dataHandle.response.message as string,
                type: register.dataHandle.success ? 'success' : 'error'
            });
            register.clear();
            message.close();
        }
    }, [register.dataHandle.response]);
    return (
        <div className={styles.registerClass}>
            <p>{props.isRegister ? 'Bạn muốn giảng dạy với vị trí nào?' : 'Xác nhận huỷ đăng ký lớp!'}</p>
            {props.isRegister && <Radio.Group value={role} onChange={(e) => {
                setRole(e.target.value)
            }}>
                <Radio value={ROLE_TEACHER.ST} /> <span className={styles.label}>ST</span>
                <Radio value={ROLE_TEACHER.MT} /> <span className={styles.label}>MT</span>
                <Radio value={ROLE_TEACHER.SP} /> <span className={styles.label}>SP</span>
            </Radio.Group>
            }
            <Button onClick={handleSubmit} loading={register.dataHandle.isLoading}>{props.isRegister ? 'Đăng ký' : 'Xác nhận huỷ'}</Button>
        </div>
    )
}

export default TeacherRegister;