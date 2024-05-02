import { fetchStatistics } from "@NotificationSystem/API";
import {
    TypedStartListening,
    createListenerMiddleware,
} from "@reduxjs/toolkit";
import { statisticsRequested } from "../Actions/statisticsActions";
import { selectAllStatistics } from "../Selectors/statisticSelectors";
import { statisticsFetched } from "../Slices/statisticsSlice";
import { AppDispatch, RootState } from "../store";

export const listenerMiddleware = createListenerMiddleware();

export const startAppListening =
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
