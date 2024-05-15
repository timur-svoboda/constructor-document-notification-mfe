import { Node } from "@Constructor/API";
import {
    TypedStartListening,
    configureStore,
    createListenerMiddleware,
} from "@reduxjs/toolkit";
import {
    nodeListeningCanceled,
    nodeListeningRequested,
} from "./Actions/nodesActions";
import nodesSlice, { nodeCreated, nodeDeleted } from "./Slices/nodesSlice";


const listenerMiddleware = createListenerMiddleware();

const startListening = listenerMiddleware.startListening as TypedStartListening<
    RootState,
    AppDispatch
>;

let nodeListeningRequestorCount = 0;

startListening({
    actionCreator: nodeListeningRequested,
    effect: (action, listenerApi) => {
        if (nodeListeningRequestorCount === 0) {
            window.Echo.channel("constructor.nodes")
                .listen(".nodeCreated", (event: { nodeResource: Node }) => {
                    listenerApi.dispatch(nodeCreated(event.nodeResource));
                })
                .listen(".nodeDeleted", (event: { nodeResource: Node }) => {
                    listenerApi.dispatch(nodeDeleted(event.nodeResource));
                });
        }

        nodeListeningRequestorCount += 1;
    },
});

startListening({
    actionCreator: nodeListeningCanceled,
    effect: () => {
        nodeListeningRequestorCount -= 1;

        if (nodeListeningRequestorCount === 0) {
            window.Echo.leave("constructor.nodes");
        }
    },
});

export const store = configureStore({
    reducer: {
        nodes: nodesSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
