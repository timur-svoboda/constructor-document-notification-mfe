import { Statistic } from "@NotificationSystem/API";
import {
    connect,
    selectStatisticById,
    statisticListeningCanceled,
    statisticListeningRequested,
    statisticsFetched,
    statisticsRequested,
    useDispatch,
    useSelector,
} from "@NotificationSystem/Store";
import { useEffect } from "react";

export type UnreadNotificationCounterProps = {
    statisticId: string;
    initStatistic?: Statistic;
};

export const UnreadNotificationCounter = connect(
    (props: UnreadNotificationCounterProps) => {
        const dispatch = useDispatch();

        const statistic =
            useSelector((state) =>
                selectStatisticById(state, props.statisticId)
            ) || props.initStatistic;

        useEffect(() => {
            if (!props.initStatistic) {
                dispatch(statisticsRequested([props.statisticId]));
            } else {
                dispatch(statisticsFetched([props.initStatistic]));
            }
        }, [dispatch, props.initStatistic, props.statisticId]);

        useEffect(() => {
            dispatch(statisticListeningRequested());

            return () => {
                dispatch(statisticListeningCanceled());
            };
        }, [dispatch]);

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
