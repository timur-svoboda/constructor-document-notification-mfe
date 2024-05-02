import { Notification, readNotification } from "@NotificationSystem/API";

export type NotificationItemProps = {
    notification: Notification;
};

export const NotificationItem = (props: NotificationItemProps) => {
    const handleReadButtonClick = () => {
        readNotification({ id: props.notification.id });
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
