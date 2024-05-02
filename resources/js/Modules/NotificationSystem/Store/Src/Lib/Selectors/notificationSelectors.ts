import { notificationAdapter } from "../Adapters/notificationAdapter";
import { RootState } from "../store";

export const { selectAll: selectAllNotifications } =
    notificationAdapter.getSelectors<RootState>((state) => state.notifications);

