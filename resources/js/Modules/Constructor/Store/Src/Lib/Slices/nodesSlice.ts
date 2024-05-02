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
    },
});

export const { nodesFetched } = nodesSlice.actions;

export default nodesSlice.reducer;
