import { createAction } from "@reduxjs/toolkit";

export const statisticsRequested = createAction<string[]>(
    "documents/statisticsRequested"
);

export const statisticListeningRequested = createAction(
    "documents/statisticListeningRequested"
);

export const statisticListeningCanceled = createAction(
    "documents/statisticListeningCanceled"
);
