import {
    Notification,
    fetchNotifications,
    readNotifications,
} from "@NotificationSystem/API";
import { useEffect, useState } from "react";
import { NotificationItem } from "./Ui/NotificationItem";

export const NotificationList = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const handleReadAllButtonClick = () => {
        readNotifications();
    };

    useEffect(() => {
        fetchNotifications({ isRead: false }).then(setNotifications);
    }, []);

    return (
        <div
            style={{
                border: "1px solid green",
                padding: "10px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                width: "300px",
            }}
        >
            <div style={{ color: "green" }}>Notification List</div>
            <button onClick={handleReadAllButtonClick}>Read all</button>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                }}
            >
                {notifications.map((notification) => (
                    <NotificationItem
                        key={notification.id}
                        notification={notification}
                    />
                ))}
            </div>
        </div>
    );
};
