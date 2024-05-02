import axios from "axios";
import { Statistic } from "../Entities/Statistic";

export type FetchStatisticsRequest = {
    ids: string[];
};

export const fetchStatistics = async (
    request: FetchStatisticsRequest
): Promise<Statistic[]> => {
    return (
        await axios.get("/api/notificationSystem/fetchStatistics", {
            params: request,
        })
    ).data;
};
