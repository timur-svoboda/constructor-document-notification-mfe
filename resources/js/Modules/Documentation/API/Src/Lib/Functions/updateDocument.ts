import axios from "axios";
import { Document } from "../Entities/Document";

export type UpdateDocumentRequest = {
    id: string;
    title?: string;
};

export const updateDocument = async (
    request: UpdateDocumentRequest
): Promise<Document> => {
    return (await axios.patch("/api/documentation/updateDocument", request))
        .data;
};
