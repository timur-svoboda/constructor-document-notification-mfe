import { documentAdapter } from "../Adapters/documentAdapter";
import { RootState } from "../store";

export const { selectAll: selectAllDocuments, selectById: selectDocumentById } =
    documentAdapter.getSelectors<RootState>((state) => state.documents);

