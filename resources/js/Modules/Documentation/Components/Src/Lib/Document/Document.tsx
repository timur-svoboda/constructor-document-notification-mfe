import {
    deleteDocument,
    updateDocument
} from "@Documentation/API";
import {
    connect,
    documentDeleted,
    documentUpdated,
    documentsRequested,
    selectDocumentById,
    useDispatch,
    useSelector
} from "@Documentation/Store";
import { UnreadNotificationCounter } from "@NotificationSystem/Components";
import { useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

export type DocumentProps = {
    id: string;
};

export const Document = connect((props: DocumentProps) => {
    const dispatch = useDispatch();

    const document = useSelector((state) =>
        selectDocumentById(state, props.id)
    );

    const [title, setTitle] = useState("");

    const handleDeleteButtonClick = async () => {
        dispatch(documentDeleted(await deleteDocument({ id: props.id })));
    };

    const handleTitleBlur = async () => {
        dispatch(
            documentUpdated(
                await updateDocument({
                    id: props.id,
                    title,
                })
            )
        );
    };

    useEffect(() => {
        dispatch(documentsRequested([props.id]));
    }, [dispatch, props.id]);

    useEffect(() => {
        if (document) {
            setTitle(document.title);
        }
    }, [document]);

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
                width: "300px",
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
            <UnreadNotificationCounter id={document.id} />
        </div>
    );
});
