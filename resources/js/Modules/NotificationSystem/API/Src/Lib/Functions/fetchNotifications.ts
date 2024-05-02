import axios from "axios";
import { Notification } from "../Entities/Notification";

export type FetchNotificationsRequest = {
    resourceId?: string;
    isRead?: boolean;
};

export const fetchNotifications = async (
    request?: FetchNotificationsRequest
): Promise<Notification[]> => {
    return (await axios.get("/api/notificationSystem/fetchNotifications", { params: request }))
        .data;
};
