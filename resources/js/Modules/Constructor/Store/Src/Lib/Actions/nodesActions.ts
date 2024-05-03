import { createAction } from "@reduxjs/toolkit";

export const nodeListeningRequested = createAction(
    "documents/nodeListeningRequested"
);

export const nodeListeningCanceled = createAction(
    "documents/nodeListeningCanceled"
);
