import { Document } from "@Documentation/API";
import { createEntityAdapter } from "@reduxjs/toolkit";

export const documentAdapter = createEntityAdapter({
    selectId: (document: Document) => document.id,
});
