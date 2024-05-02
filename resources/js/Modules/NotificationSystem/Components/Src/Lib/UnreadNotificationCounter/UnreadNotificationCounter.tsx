import { Statistic, fetchStatistics } from "@NotificationSystem/API";
import { useEffect, useState } from "react";

export type UnreadNotificationCounterProps = {
    id: string;
};

export const UnreadNotificationCounter = (
    props: UnreadNotificationCounterProps
) => {
    const [statistic, setStatistic] = useState<Statistic | null>(null);

    useEffect(() => {
        fetchStatistics({ ids: [props.id] }).then((statistics) =>
            setStatistic(statistics.at(0) || null)
        );
    }, [props.id]);

    if (!statistic) {
        return null;
    }

    return (
        <div
            style={{
                border: "1px solid green",
                padding: "10px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
            }}
        >
            <div style={{ color: "green" }}>Unread Notification Counter</div>
            {statistic.unreadNotificationCount}
        </div>
    );
};
