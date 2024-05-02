import axios from "axios";
import { Document } from "../Entities/Document";

export type CreateDocumentRequest = {
    title: string;
    requestor?: string;
};

export const createDocument = async (
    request: CreateDocumentRequest
): Promise<Document> => {
    return (await axios.post("/api/documentation/createDocument", request))
        .data;
};
