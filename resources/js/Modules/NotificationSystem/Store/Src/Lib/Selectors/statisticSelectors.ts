import { statisticAdapter } from "../Adapters/statisticAdapter";
import { RootState } from "../store";

export const {
    selectAll: selectAllStatistics,
    selectById: selectStatisticById,
} = statisticAdapter.getSelectors<RootState>((state) => state.statistics);
