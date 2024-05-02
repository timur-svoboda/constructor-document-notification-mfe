import { useState } from "react";
import { createDocument } from "@Documentation/API";

export type CreateDocumentFormProps = {
    requestor?: string;
};

export const CreateDocumentForm = (props: CreateDocumentFormProps) => {
    const [title, setTitle] = useState("");

    const handleCreateButtonClick = async () => {
        setTitle("");

        await createDocument({ title, requestor: props.requestor });
    };

    return (
        <div
            style={{
                border: "1px solid blue",
                padding: "10px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                width: "300px",
            }}
        >
            <div style={{ color: 'blue' }}>Create Document Form</div>
            <input
                value={title}
                onChange={(event) => setTitle(event.currentTarget.value)}
            />
            <button onClick={handleCreateButtonClick}>Create</button>
        </div>
    );
};
