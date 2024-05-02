import { Notification, readNotifications } from "@NotificationSystem/API";
import { notificationsRead, useDispatch } from "@NotificationSystem/Store";

export type NotificationItemProps = {
    notification: Notification;
};

export const NotificationItem = (props: NotificationItemProps) => {
    const dispatch = useDispatch();

    const handleReadButtonClick = () => {
        readNotifications({ ids: [props.notification.id] }).then(
            (notifications) => dispatch(notificationsRead(notifications))
        );
    };

    return (
        <div
            style={{
                padding: "10px",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
            }}
        >
            <div>Message: {props.notification.message}</div>
            <button onClick={handleReadButtonClick}>Read</button>
        </div>
    );
};
