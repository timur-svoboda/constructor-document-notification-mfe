import axios from "axios";
import { Node } from "../Entities/Node";

export const fetchNodes = async (): Promise<Node> => {
    return (await axios.get("/api/v1/constructor/fetchNodes")).data;
};
