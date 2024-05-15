import { Notification, Statistic, fetchStatistics } from "@NotificationSystem/API";
import {
    TypedStartListening,
    configureStore,
    createListenerMiddleware,
} from "@reduxjs/toolkit";
import {
    notificationListeningCanceled,
    notificationListeningRequested,
} from "./Actions/notificationsActions";
import { statisticListeningCanceled, statisticListeningRequested, statisticsRequested } from "./Actions/statisticsActions";
import { selectAllStatistics } from "./Selectors/statisticSelectors";
import notificationsSlice, {
    notificationCreated,
} from "./Slices/notificationsSlice";
import statisticSlice, { statisticsFetched, statisticsUpdated } from "./Slices/statisticsSlice";

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
           window.Echo.channel("notificationSystem.notifications").listen(
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
            window.Echo.leave("notificationSystem.notifications");
        }
    },
});

let statisticListeningRequestorCount = 0;

startListening({
    actionCreator: statisticListeningRequested,
    effect: (action, listenerApi) => {
        if (statisticListeningRequestorCount === 0) {
            window.Echo.channel("notificationSystem.statistics").listen(
                ".statisticsUpdated",
                (event: { statisticResources: Statistic[] }) => {
                    listenerApi.dispatch(
                        statisticsUpdated(event.statisticResources)
                    );
                }
            );
        }

        statisticListeningRequestorCount += 1;
    },
});

startListening({
    actionCreator: statisticListeningCanceled,
    effect: () => {
        statisticListeningRequestorCount -= 1;

        if (statisticListeningRequestorCount === 0) {
            window.Echo.leave("notificationSystem.statistics");
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
