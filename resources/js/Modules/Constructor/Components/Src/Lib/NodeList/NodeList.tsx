import { Node, fetchNodes } from "@Constructor/API";
import {
    connect,
    nodeListeningCanceled,
    nodeListeningRequested,
    nodesFetched,
    selectAllNodes,
    useDispatch,
    useSelector,
} from "@Constructor/Store";
import { CreateDocumentForm } from "@Documentation/Components";
import { useEffect } from "react";
import { NodeItem } from "./Ui/NodeItem";
import { Document } from "@Documentation/API";
import { Statistic } from "@NotificationSystem/API";

export type NodeListProps = {
    initNodes?: Node[];
    initDocuments?: Document[];
    initialStatistics?: Statistic[];
};

export const NodeList = connect((props: NodeListProps) => {
    const dispatch = useDispatch();

    const nodes = useSelector(selectAllNodes);

    useEffect(() => {
        if (!props.initNodes) {
            fetchNodes().then((nodes) => dispatch(nodesFetched(nodes)));
        } else {
            dispatch(nodesFetched(props.initNodes));
        }
    }, [dispatch, props.initNodes]);

    useEffect(() => {
        dispatch(nodeListeningRequested());

        return () => {
            dispatch(nodeListeningCanceled());
        };
    }, [dispatch]);

    return (
        <div
            style={{
                border: "1px solid red",
                padding: "10px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
            }}
        >
            <div style={{ color: "red" }}>Node List</div>
            <CreateDocumentForm requestor="constructor" />
            <div
                style={{
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap",
                }}
            >
                {nodes.map((node) => (
                    <NodeItem
                        key={node.id}
                        node={node}
                        initDocuments={props.initDocuments}
                        initialStatistics={props.initialStatistics}
                    />
                ))}
            </div>
        </div>
    );
});
