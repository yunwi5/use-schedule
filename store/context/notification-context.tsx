import { createContext, useState, useEffect, useCallback } from "react";

interface NotificationData {
    title: string;
    message: string;
    status: string;
}

interface ContextValue {
    notification: NotificationData | null;
    showNotification: (data: NotificationData) => void;
    hideNotification: () => void;
}

const NotificationContext = createContext<ContextValue>({
    notification: null,
    showNotification: (data: NotificationData) => {},
    hideNotification: () => {},
});

export default NotificationContext;

export const NotificationContextProvider: React.FC = (props) => {
    const [activeNotification, setActiveNotification] = useState<NotificationData | null>(null);

    useEffect(() => {
        if (
            activeNotification &&
            (activeNotification.status === "success" || activeNotification.status === "error")
        ) {
            const timer = setTimeout(() => {
                setActiveNotification(null);
            }, 3500);
            return () => {
                clearTimeout(timer);
            };
        }
    }, [activeNotification]);

    const showNotificationHandler = useCallback((notificationData: NotificationData) => {
        setActiveNotification(notificationData);
        // console.log("notification data:", notificationData);
    }, []);

    const hideNotificationHandler = useCallback(() => {
        setActiveNotification(null);
    }, []);

    const context = {
        notification: activeNotification,
        showNotification: showNotificationHandler,
        hideNotification: hideNotificationHandler,
    };

    return (
        <NotificationContext.Provider value={context}>
            {props.children}
        </NotificationContext.Provider>
    );
};
