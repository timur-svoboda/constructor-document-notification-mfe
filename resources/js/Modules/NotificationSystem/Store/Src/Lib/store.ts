import { configureStore } from "@reduxjs/toolkit";
import notificationsSlice from "./Slices/notificationsSlice";
import statisticSlice from "./Slices/statisticsSlice";

export const store = configureStore({
    reducer: {
        notifications: notificationsSlice,
        statistics: statisticSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
