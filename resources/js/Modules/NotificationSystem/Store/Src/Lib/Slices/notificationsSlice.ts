import { Notification } from "@NotificationSystem/API";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { notificationAdapter } from "../Adapters/notificationAdapter";

export const notificationsSlice = createSlice({
    name: "notifications",
    initialState: notificationAdapter.getInitialState(),
    reducers: {
        notificationsFetched(state, action: PayloadAction<Notification[]>) {
            notificationAdapter.upsertMany(state, action.payload);
        },
        notificationsRead(state, action: PayloadAction<Notification[]>) {
            notificationAdapter.updateMany(
                state,
                action.payload.map((notification) => ({
                    id: notification.id,
                    changes: notification,
                }))
            );
        },
        notificationCreated(state, action: PayloadAction<Notification>) {
            notificationAdapter.addOne(state, action.payload);
        },
    },
});

export const { notificationsFetched, notificationsRead, notificationCreated } =
    notificationsSlice.actions;

export default notificationsSlice.reducer;
