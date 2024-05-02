import { fetchNotifications, readNotifications } from "@NotificationSystem/API";
import {
    connect,
    notificationsFetched,
    notificationsRead,
    selectAllNotifications,
    useDispatch,
    useSelector,
} from "@NotificationSystem/Store";
import { useEffect, useMemo } from "react";
import { NotificationItem } from "./Ui/NotificationItem";

export const NotificationList = connect(() => {
    const dispatch = useDispatch();

    const notifications = useSelector((state) => selectAllNotifications(state));

    const unreadNotifications = useMemo(() => {
        return notifications.filter(({ isRead }) => !isRead);
    }, [notifications]);

    const handleReadAllButtonClick = async () => {
        dispatch(notificationsRead(await readNotifications()));
    };

    useEffect(() => {
        fetchNotifications({ isRead: false }).then((notifications) => {
            dispatch(notificationsFetched(notifications));
        });
    }, [dispatch]);

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
            {unreadNotifications.length > 0 && (
                <button onClick={handleReadAllButtonClick}>Read all</button>
            )}
            {unreadNotifications.length === 0 && (
                <div style={{ display: "flex", justifyContent: "center" }}>
                    Empty
                </div>
            )}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                }}
            >
                {unreadNotifications.map((notification) => (
                    <NotificationItem
                        key={notification.id}
                        notification={notification}
                    />
                ))}
            </div>
        </div>
    );
});
