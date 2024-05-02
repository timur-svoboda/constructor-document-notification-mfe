import { statisticAdapter } from "../Adapters/statisticAdapter";
import { RootState } from "../store";

export const { selectById: selectStatisticById } =
    statisticAdapter.getSelectors<RootState>((state) => state.statistics);
