import { Node } from "@Constructor/API";
import { createEntityAdapter } from "@reduxjs/toolkit";

export const nodeAdapter = createEntityAdapter({
    selectId: (node: Node) => node.id,
});
