import React, { useEffect } from 'react';
import { Button, Popconfirm } from 'antd';
import { Obj } from '@/global/interface';
import { useAcceptPreTeacher, useGetPreTeacher } from '@/utils/hooks';
import { useHookMessage } from '@/utils/hooks/message';

interface Props {
    record?: Obj;
}
const ConfirmTeacher = (props: Props) => {
    const accept = useAcceptPreTeacher();
    const message = useHookMessage();

    const listPreTeacher = useGetPreTeacher();
    const handleAccept = () => {
        accept.query(props.record?._id);
    }
    useEffect(() => {
        if (accept.data) {
            if (accept.data.response) {
                if (accept.data.success) {
                    // pending get current data pagination
                    listPreTeacher.query(10, 1);
                }
                message.open({
                    content: accept.data.response.message as string,
                    type: accept.data.success ? 'success' : 'error'
                });
                accept.clear();
                message.close();
            }
        }
    }, [accept.data])
    return (
        <Popconfirm title='Xác nhận thông tin' onConfirm={() => {
            handleAccept();
        }}>
            <Button size="small" loading={accept.data.isLoading}>Xác nhận</Button>
        </Popconfirm>
    )
}

export default ConfirmTeacher;