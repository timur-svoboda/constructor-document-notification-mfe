import {
    Document as DocumentType,
    deleteDocument,
    fetchDocuments,
    updateDocument,
} from "@Documentation/API";
import React, { useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

export type DocumentProps = {
    id: string;
};

export const Document = (props: DocumentProps) => {
    const [document, setDocument] = useState<DocumentType | null>(null);

    const [title, setTitle] = useState("");

    const handleDeleteButtonClick = () => {
        deleteDocument({ id: props.id });
    };

    const handleTitleBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
        updateDocument({
            id: props.id,
            title: event.currentTarget.textContent || "",
        });
    };

    useEffect(() => {
        fetchDocuments({ ids: [props.id] }).then((documents) => {
            const document = documents.at(0);

            if (document) {
                setDocument(document || null);
                setTitle(document.title);
            }
        });
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
            <TextareaAutosize
                value={title}
                onChange={(event) => setTitle(event.currentTarget.value)}
                onBlur={handleTitleBlur}
                style={{
                    resize: "none",
                    border: "none",
                    fontSize: "16px",
                    fontFamily: "serif",
                    fontWeight: "bold",
                }}
            />
            <button onClick={handleDeleteButtonClick}>Delete</button>
        </div>
    );
};
