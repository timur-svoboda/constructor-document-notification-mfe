import { fetchStatistics } from "@NotificationSystem/API";
import {
    connect,
    selectStatisticById,
    statisticsFetched,
    useDispatch,
    useSelector,
} from "@NotificationSystem/Store";
import { useEffect } from "react";

export type UnreadNotificationCounterProps = {
    id: string;
};

export const UnreadNotificationCounter = connect(
    (props: UnreadNotificationCounterProps) => {
        const dispatch = useDispatch();

        const statistic = useSelector((state) =>
            selectStatisticById(state, props.id)
        );

        useEffect(() => {
            fetchStatistics({ ids: [props.id] }).then((statistics) =>
                dispatch(statisticsFetched(statistics))
            );
        }, [dispatch, props.id]);

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
                <div style={{ color: "green" }}>
                    Unread Notification Counter
                </div>
                {statistic.unreadNotificationCount}
            </div>
        );
    }
);
