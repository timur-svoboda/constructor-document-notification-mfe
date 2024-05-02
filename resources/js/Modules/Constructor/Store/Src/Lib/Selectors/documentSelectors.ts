import { nodeAdapter } from "../Adapters/nodeAdapter";
import { RootState } from "../store";

export const { selectAll: selectAllNodes } =
    nodeAdapter.getSelectors<RootState>((state) => state.nodes);
