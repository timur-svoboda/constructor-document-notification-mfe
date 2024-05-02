import { Node } from "@Constructor/API";
import { Document } from "@Documentation/Components";

export type NodeItemProps = {
    node: Node;
};

export const NodeItem = (props: NodeItemProps) => {
    switch (props.node.type) {
        case "document":
            return <Document id={props.node.resourceId} />;
        default:
            return null;
    }
};
