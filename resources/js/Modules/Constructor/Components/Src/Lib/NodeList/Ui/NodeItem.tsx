import { Node } from "@Constructor/API";
import { Document as DocumentResource } from "@Documentation/API";
import { Document } from "@Documentation/Components";
import { Statistic } from "@NotificationSystem/API";

export type NodeItemProps = {
    node: Node;
    initDocuments?: DocumentResource[];
    initialStatistics?: Statistic[];
};

export const NodeItem = (props: NodeItemProps) => {
    switch (props.node.type) {
        case "document":
            return (
                <Document
                    id={props.node.resourceId}
                    initDocument={props.initDocuments?.find(
                        (document) => props.node.resourceId === document.id
                    )}
                    initialStatistics={props.initialStatistics}
                />
            );
        default:
            return null;
    }
};
