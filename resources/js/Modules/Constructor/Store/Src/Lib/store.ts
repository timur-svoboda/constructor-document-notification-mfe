import { Node } from "@Constructor/API";
import {
    TypedStartListening,
    configureStore,
    createListenerMiddleware,
} from "@reduxjs/toolkit";
import Echo from "laravel-echo";
import "pusher-js";
import {
    nodeListeningCanceled,
    nodeListeningRequested,
} from "./Actions/nodesActions";
import nodesSlice, { nodeCreated, nodeDeleted } from "./Slices/nodesSlice";

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

let nodeListeningRequestorCount = 0;

startListening({
    actionCreator: nodeListeningRequested,
    effect: (action, listenerApi) => {
        if (nodeListeningRequestorCount === 0) {
            echo.channel("constructor.nodes")
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
            echo.leave("constructor.nodes");
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
