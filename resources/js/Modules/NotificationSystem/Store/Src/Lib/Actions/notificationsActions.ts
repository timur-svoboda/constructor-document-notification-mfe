import { createAction } from "@reduxjs/toolkit";

export const notificationListeningRequested = createAction(
    "documents/notificationListeningRequested"
);

export const notificationListeningCanceled = createAction(
    "documents/notificationListeningCanceled"
);
