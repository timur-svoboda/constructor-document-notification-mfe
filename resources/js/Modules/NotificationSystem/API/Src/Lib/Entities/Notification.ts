export type Notification = {
    id: string;
    message: string;
    resourceId: string | null;
    isRead: boolean;
};