import axios from "axios";
import { Notification } from "../Entities/Notification";

export type ReadNotificationsRequest = {
    ids?: string[];
};

export const readNotifications = async (
    request?: ReadNotificationsRequest
): Promise<Notification[]> => {
    return (
        await axios.patch("/api/notificationSystem/readNotifications", request)
    ).data;
};
