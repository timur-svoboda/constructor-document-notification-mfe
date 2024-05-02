import {
    TypedStartListening,
    createListenerMiddleware,
} from "@reduxjs/toolkit";
import { documentsRequested } from "../Actions/documentsActions";
import { AppDispatch, RootState } from "../store";
import { fetchDocuments } from "@Documentation/API";
import { documentsFetched } from "../Slices/documentsSlice";
import { selectAllDocuments } from "../Selectors/documentSelectors";

export const listenerMiddleware = createListenerMiddleware();

export const startAppListening =
    listenerMiddleware.startListening as TypedStartListening<
        RootState,
        AppDispatch
    >;

let requestedDocumentIds: string[] = [];

startAppListening({
    actionCreator: documentsRequested,
    effect: async (action, listenerApi) => {
        listenerApi.cancelActiveListeners();

        requestedDocumentIds = [
            ...new Set([...requestedDocumentIds, ...action.payload]),
        ];

        await listenerApi.delay(100);

        const fetchedDocumentIds = selectAllDocuments(
            listenerApi.getState()
        ).map(({ id }) => id);

        const uniqueRequestedDocumentIds = requestedDocumentIds.filter(
            (id) => !fetchedDocumentIds.includes(id)
        );

        if (uniqueRequestedDocumentIds.length > 0) {
            listenerApi.dispatch(
                documentsFetched(
                    await fetchDocuments({ ids: requestedDocumentIds })
                )
            );
        }

        requestedDocumentIds = [];
    },
});
