import axios from "axios";
import { Document } from "../Entities/Document";

export type FetchDocumentsRequest = {
    ids?: string[];
};

export const fetchDocuments = async (
    request: FetchDocumentsRequest
): Promise<Document[]> => {
    return (await axios.get("/api/v1/documentation/fetchDocuments", { params: request }))
        .data;
};
