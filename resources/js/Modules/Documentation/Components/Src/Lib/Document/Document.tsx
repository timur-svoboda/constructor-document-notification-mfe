import {
    Document as DocumentType,
    deleteDocument,
    fetchDocuments,
} from "@Documentation/API";
import { useEffect, useState } from "react";

export type DocumentProps = {
    id: string;
};

export const Document = (props: DocumentProps) => {
    const [document, setDocument] = useState<DocumentType | null>(null);

    const handleDeleteButtonClick = () => {
        deleteDocument({ id: props.id });
    };

    useEffect(() => {
        fetchDocuments({ ids: [props.id] }).then((documents) =>
            setDocument(documents.at(0) || null)
        );
    }, [props.id]);

    if (!document) {
        return null;
    }

    return (
        <div
            style={{
                border: "1px solid blue",
                padding: "10px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                width: "200px",
            }}
        >
            <div style={{ color: "blue" }}>Document</div>
            <div>Title: {document.title}</div>
            <button onClick={handleDeleteButtonClick}>Delete</button>
        </div>
    );
};
