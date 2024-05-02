import { Statistic } from "@NotificationSystem/API";
import { createEntityAdapter } from "@reduxjs/toolkit";

export const statisticAdapter = createEntityAdapter({
    selectId: (statistic: Statistic) => statistic.id,
});
