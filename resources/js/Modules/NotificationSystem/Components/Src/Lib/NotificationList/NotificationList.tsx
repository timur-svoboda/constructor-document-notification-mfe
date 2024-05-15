import {
    Notification,
    fetchNotifications,
    readNotifications,
} from "@NotificationSystem/API";
import {
    connect,
    notificationListeningCanceled,
    notificationListeningRequested,
    notificationsFetched,
    notificationsRead,
    selectAllNotifications,
    useDispatch,
    useSelector,
} from "@NotificationSystem/Store";
import { useEffect, useMemo } from "react";
import { NotificationItem } from "./Ui/NotificationItem";

export type NotificationListProps = {
    initNotifications?: Notification[];
};

export const NotificationList = connect((props: NotificationListProps) => {
    const dispatch = useDispatch();

    const notifications = useSelector((state) => selectAllNotifications(state));

    const unreadNotifications = useMemo(() => {
        if (notifications.length === 0) {
            return props.initNotifications || [];
        }

        return notifications.filter(({ isRead }) => !isRead);
    }, [notifications, props.initNotifications]);

    const handleReadAllButtonClick = async () => {
        dispatch(notificationsRead(await readNotifications()));
    };

    useEffect(() => {
        if (!props.initNotifications) {
            fetchNotifications({ isRead: false }).then((notifications) => {
                dispatch(notificationsFetched(notifications));
            });
        } else {
            dispatch(notificationsFetched(props.initNotifications));
        }
    }, [dispatch, props.initNotifications]);

    useEffect(() => {
        dispatch(notificationListeningRequested());

        return () => {
            dispatch(notificationListeningCanceled());
        };
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
