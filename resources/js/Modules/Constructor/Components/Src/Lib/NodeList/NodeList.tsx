import { Node, fetchNodes } from "@Constructor/API";
import { CreateDocumentForm } from "@Documentation/Components";
import { useEffect, useState } from "react";
import { NodeItem } from "./Ui/NodeItem";

export const NodeList = () => {
    const [nodes, setNodes] = useState<Node[]>([]);

    useEffect(() => {
        fetchNodes().then(setNodes);
    }, []);

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
                }}
            >
                {nodes.map((node) => (
                    <NodeItem key={node.id} node={node} />
                ))}
            </div>
        </div>
    );
};
