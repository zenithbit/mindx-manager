import React from 'react';
import { notification } from 'antd';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

// pending optimize
const Notification = () => {
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type: NotificationType) => {
        api[type]({
            message: 'Notification Title',
            description:
                'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        });
    };
    return (
        <div>Notification</div>
    )
}

export default Notification;