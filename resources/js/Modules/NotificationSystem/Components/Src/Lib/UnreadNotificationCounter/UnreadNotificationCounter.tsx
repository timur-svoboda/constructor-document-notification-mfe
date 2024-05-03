import {
    connect,
    selectStatisticById,
    statisticListeningCanceled,
    statisticListeningRequested,
    statisticsRequested,
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
            dispatch(statisticsRequested([props.id]));
        }, [dispatch, props.id]);

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
