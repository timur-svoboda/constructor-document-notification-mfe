import axios from "axios";
import { Document } from "../Entities/Document";

export type DeleteDocumentRequest = {
    id: string;
};

export const deleteDocument = async (
    request: DeleteDocumentRequest
): Promise<Document> => {
    return (
        await axios.delete("/api/documentation/deleteDocument", {
            params: request,
        })
    ).data;
};
