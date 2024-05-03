import { Notification, fetchStatistics } from "@NotificationSystem/API";
import {
    TypedStartListening,
    configureStore,
    createListenerMiddleware,
} from "@reduxjs/toolkit";
import Echo from "laravel-echo";
import "pusher-js";
import {
    notificationListeningCanceled,
    notificationListeningRequested,
} from "./Actions/notificationsActions";
import { statisticsRequested } from "./Actions/statisticsActions";
import { selectAllStatistics } from "./Selectors/statisticSelectors";
import notificationsSlice, {
    notificationCreated,
} from "./Slices/notificationsSlice";
import statisticSlice, { statisticsFetched } from "./Slices/statisticsSlice";

const echo = new Echo({
    broadcaster: "reverb",
    key: import.meta.env.VITE_REVERB_APP_KEY,
    wsHost: import.meta.env.VITE_REVERB_HOST,
    wsPort: import.meta.env.VITE_REVERB_PORT ?? 80,
    wssPort: import.meta.env.VITE_REVERB_PORT ?? 443,
    forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? "https") === "https",
    enabledTransports: ["ws", "wss"],
});

const listenerMiddleware = createListenerMiddleware();

const startListening = listenerMiddleware.startListening as TypedStartListening<
    RootState,
    AppDispatch
>;

let requestedStatisticIds: string[] = [];

startListening({
    actionCreator: statisticsRequested,
    effect: async (action, listenerApi) => {
        listenerApi.cancelActiveListeners();

        requestedStatisticIds = [
            ...new Set([...requestedStatisticIds, ...action.payload]),
        ];

        await listenerApi.delay(100);

        const fetchedStatisticIds = selectAllStatistics(
            listenerApi.getState()
        ).map(({ id }) => id);

        const uniqueRequestedDocumentIds = requestedStatisticIds.filter(
            (id) => !fetchedStatisticIds.includes(id)
        );

        if (uniqueRequestedDocumentIds.length > 0) {
            listenerApi.dispatch(
                statisticsFetched(
                    await fetchStatistics({ ids: requestedStatisticIds })
                )
            );
        }

        requestedStatisticIds = [];
    },
});

let notificationListeningRequestorCount = 0;

startListening({
    actionCreator: notificationListeningRequested,
    effect: (action, listenerApi) => {
        if (notificationListeningRequestorCount === 0) {
            echo.channel("notificationSystem.notifications").listen(
                ".notificationCreated",
                (event: { notificationResource: Notification }) => {
                    listenerApi.dispatch(
                        notificationCreated(event.notificationResource)
                    );
                }
            );
        }

        notificationListeningRequestorCount += 1;
    },
});

startListening({
    actionCreator: notificationListeningCanceled,
    effect: () => {
        notificationListeningRequestorCount -= 1;

        if (notificationListeningRequestorCount === 0) {
            echo.leave("notificationSystem.notifications");
        }
    },
});

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
