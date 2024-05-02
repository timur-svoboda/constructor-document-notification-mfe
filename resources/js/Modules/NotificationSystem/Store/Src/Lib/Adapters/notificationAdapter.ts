import { Notification } from "@NotificationSystem/API";
import { createEntityAdapter } from "@reduxjs/toolkit";

export const notificationAdapter = createEntityAdapter({
    selectId: (notification: Notification) => notification.id,
    sortComparer: (a, b) => {
        const aCreatedAt = new Date(a.createdAt).valueOf();
        const bCreatedAt = new Date(b.createdAt).valueOf();
        return bCreatedAt - aCreatedAt;
    },
});
