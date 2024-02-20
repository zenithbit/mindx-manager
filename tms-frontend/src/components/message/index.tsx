import React, { useEffect } from 'react';
import { message } from 'antd';
import { useSelector } from 'react-redux';
import { Obj } from '@/global/interface';
import { useHookMessage } from '@/utils/hooks/message';
import { RootState } from '@/store';

const Message = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const messageReducer = useSelector((state: RootState) => (state.message as Obj)?.state);
    const { close } = useHookMessage();
    useEffect(() => {
        if (messageReducer.response && messageReducer.response.content) {
            messageApi.open({
                type: messageReducer.response.type,
                content: messageReducer.response.content,
            }).then(() => {
                close();
            })
        }
    }, [messageReducer, messageApi, close]);
    return (
        contextHolder
    )
}

export default Message;