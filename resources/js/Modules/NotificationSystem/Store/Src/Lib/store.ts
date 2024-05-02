import { configureStore } from "@reduxjs/toolkit";
import notificationsSlice from "./Slices/notificationsSlice";
import statisticSlice from "./Slices/statisticsSlice";
import { listenerMiddleware } from "./Listeners/listenerMiddleware";

export const store = configureStore({
    reducer: {
        notifications: notificationsSlice,
        statistics: statisticSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
