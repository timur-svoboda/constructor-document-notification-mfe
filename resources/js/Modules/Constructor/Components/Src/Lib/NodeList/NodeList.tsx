import { fetchNodes } from "@Constructor/API";
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

export const NodeList = connect(() => {
    const dispatch = useDispatch();

    const nodes = useSelector(selectAllNodes);

    useEffect(() => {
        fetchNodes().then((nodes) => dispatch(nodesFetched(nodes)));
    }, [dispatch]);

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
                    <NodeItem key={node.id} node={node} />
                ))}
            </div>
        </div>
    );
});
