import axios from "axios";
import { Notification } from "../Entities/Notification";

export type FetchNotificationsRequest = {
    resourceId?: string;
    isRead?: string;
};

export const fetchNotifications = async (
    request: FetchNotificationsRequest
): Promise<Notification[]> => {
    return (await axios.get("/api/v1/notificationSystem/fetchNotifications", { params: request }))
        .data;
};
