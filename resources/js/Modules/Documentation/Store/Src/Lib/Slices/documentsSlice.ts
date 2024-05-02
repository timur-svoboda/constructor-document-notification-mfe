import { Document } from "@Documentation/API";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { documentAdapter } from "../Adapters/documentAdapter";

export const documentsSlice = createSlice({
    name: "documents",
    initialState: documentAdapter.getInitialState(),
    reducers: {
        documentsFetched(state, action: PayloadAction<Document[]>) {
            documentAdapter.upsertMany(state, action.payload);
        },
        documentCreated(state, action: PayloadAction<Document>) {
            documentAdapter.addOne(state, action.payload);
        },
        documentUpdated(state, action: PayloadAction<Document>) {
            documentAdapter.updateOne(state, {
                id: action.payload.id,
                changes: action.payload,
            });
        },
        documentDeleted(state, action: PayloadAction<Document>) {
            documentAdapter.removeOne(state, action.payload.id);
        },
    },
});

export const {
    documentsFetched,
    documentCreated,
    documentUpdated,
    documentDeleted,
} = documentsSlice.actions;

export default documentsSlice.reducer;
