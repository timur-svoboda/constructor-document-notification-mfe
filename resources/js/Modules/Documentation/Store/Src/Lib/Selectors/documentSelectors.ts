import { documentAdapter } from "../Adapters/documentAdapter";
import { RootState } from "../store";

export const { selectById: selectDocumentById } =
    documentAdapter.getSelectors<RootState>((state) => state.documents);

