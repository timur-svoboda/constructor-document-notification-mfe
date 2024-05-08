import { Link } from "@inertiajs/react";
import { NodeList } from "@Constructor/Components";
import { NotificationList } from "@NotificationSystem/Components";
import { Node } from "@Constructor/API";
import { Document } from "@Documentation/API";
import { Notification, Statistic } from "@NotificationSystem/API";

export type TemplatePageProps = {
    nodes: Node[];
    documents: Document[];
    statistics: Statistic[];
    notifications: Notification[];
};

export const TemplatePage = (props: TemplatePageProps) => {
    return (
        <div
            style={{
                border: "1px solid red",
                padding: "10px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
            }}
        >
            <div style={{ color: "red" }}>Constructor Template Page</div>
            <Link href="/constructor">Go to Home Page</Link>
            <NodeList
                initNodes={props.nodes}
                initDocuments={props.documents}
                initialStatistics={props.statistics}
            />
            <NotificationList initNotifications={props.notifications} />
        </div>
    );
};

export default TemplatePage;
