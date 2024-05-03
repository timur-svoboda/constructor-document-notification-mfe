import { Node } from "@Constructor/API";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { nodeAdapter } from "../Adapters/nodeAdapter";

export const nodesSlice = createSlice({
    name: "nodes",
    initialState: nodeAdapter.getInitialState(),
    reducers: {
        nodesFetched(state, action: PayloadAction<Node[]>) {
            nodeAdapter.upsertMany(state, action.payload);
        },
        nodeCreated(state, action: PayloadAction<Node>) {
            nodeAdapter.addOne(state, action.payload);
        },
        nodeDeleted(state, action: PayloadAction<Node>) {
            nodeAdapter.removeOne(state, action.payload.id);
        },
    },
});

export const { nodesFetched, nodeCreated, nodeDeleted } = nodesSlice.actions;

export default nodesSlice.reducer;
