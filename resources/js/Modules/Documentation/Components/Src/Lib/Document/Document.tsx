import {
    Document as DocumentResource,
    deleteDocument,
    updateDocument,
} from "@Documentation/API";
import {
    connect,
    documentDeleted,
    documentUpdated,
    documentsFetched,
    documentsRequested,
    selectDocumentById,
    useDispatch,
    useSelector,
} from "@Documentation/Store";
import { Statistic } from "@NotificationSystem/API";
import { UnreadNotificationCounter } from "@NotificationSystem/Components";
import { useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

export type DocumentProps = {
    id: string;
    initDocument?: DocumentResource;
    initialStatistic?: Statistic;
};

export const Document = connect((props: DocumentProps) => {
    const dispatch = useDispatch();

    const document =
        useSelector((state) => selectDocumentById(state, props.id)) ||
        props.initDocument;

    const [title, setTitle] = useState(document?.title || "");

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
        if (!props.initDocument) {
            dispatch(documentsRequested([props.id]));
        } else {
            dispatch(documentsFetched([props.initDocument]));
        }
    }, [dispatch, props.id, props.initDocument]);

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
            <UnreadNotificationCounter
                statisticId={document.id}
                initStatistic={props.initialStatistic}
            />
        </div>
    );
});
