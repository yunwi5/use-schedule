import { useCallback, useContext, useEffect, useState } from 'react';

import NotificationContext from '../store/context/notification-context';
import { NotifStatus } from '../components/ui/Notification';

interface NotificationData {
    title: string;
    message: string;
    status: NotifStatus;
}

const useNotification = () => {
    const [notificationData, setNotificationData] = useState<NotificationData | null>(null);
    const { showNotification } = useContext(NotificationContext);

    const notifyHandler = useCallback((status: NotifStatus, message: string = '') => {
        const title = status[0].toUpperCase() + status.slice(1);

        // Handle display message
        // Display default status message if the argument was not passed
        if (!message) {
            if (status === NotifStatus.PENDING) {
                message = 'Currently processing your request!';
            }
            if (status === NotifStatus.SUCCESS) {
                message = 'Your request was successful processed!';
            }
            if (status === NotifStatus.ERROR) {
                message = 'Sorry, your request process went wrong...';
            }
        }

        setNotificationData({
            title,
            message,
            status,
        });
        // console.log(`new notification ${title}, ${message}, ${status}`);
    }, []);

    useEffect(() => {
        if (notificationData) showNotification(notificationData);
    }, [notificationData, showNotification]);

    return {
        setNotification: notifyHandler,
    };
};

export default useNotification;
