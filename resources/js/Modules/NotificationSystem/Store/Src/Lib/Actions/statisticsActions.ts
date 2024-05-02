import { createAction } from "@reduxjs/toolkit";

export const statisticsRequested = createAction<string[]>(
    "documents/statisticsRequested"
);
