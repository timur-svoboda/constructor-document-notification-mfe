import axios from "axios";
import { Notification } from "../Entities/Notification";

export type ReadNotificationRequest = {
    id: string;
};

export const readNotification = async (
    request: ReadNotificationRequest
): Promise<Notification> => {
    return (
        await axios.patch(
            "/api/v1/notificationSystem/readNotification",
            request
        )
    ).data;
};
