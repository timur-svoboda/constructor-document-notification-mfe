import { configureStore } from "@reduxjs/toolkit";
import notificationsSlice from "./Slices/notificationsSlice";
import statisticSlice from "./Slices/statisticsSlice";
import { fetchStatistics } from "@NotificationSystem/API";
import {
    TypedStartListening,
    createListenerMiddleware,
} from "@reduxjs/toolkit";
import { statisticsRequested } from "./Actions/statisticsActions";
import { selectAllStatistics } from "./Selectors/statisticSelectors";
import { statisticsFetched } from "./Slices/statisticsSlice";

const listenerMiddleware = createListenerMiddleware();

const startAppListening =
    listenerMiddleware.startListening as TypedStartListening<
        RootState,
        AppDispatch
    >;

let requestedStatisticIds: string[] = [];

startAppListening({
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
