import { createAction } from "@reduxjs/toolkit";

export const documentsRequested = createAction<string[]>(
    "documents/documentsRequested"
);
