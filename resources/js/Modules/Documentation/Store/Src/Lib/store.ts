import { configureStore } from "@reduxjs/toolkit";
import { listenerMiddleware } from "./Listeners/listenerMiddleware";
import documentsSlice from "./Slices/documentsSlice";

export const store = configureStore({
    reducer: {
        documents: documentsSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
