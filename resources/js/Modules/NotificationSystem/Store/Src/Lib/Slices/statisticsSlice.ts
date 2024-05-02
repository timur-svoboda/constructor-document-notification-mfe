import { Statistic } from "@NotificationSystem/API";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { statisticAdapter } from "../Adapters/statisticAdapter";

export const statisticSlice = createSlice({
    name: "statistic",
    initialState: statisticAdapter.getInitialState(),
    reducers: {
        statisticsFetched(state, action: PayloadAction<Statistic[]>) {
            statisticAdapter.upsertMany(state, action.payload);
        },
    },
});

export const { statisticsFetched } = statisticSlice.actions;

export default statisticSlice.reducer;
