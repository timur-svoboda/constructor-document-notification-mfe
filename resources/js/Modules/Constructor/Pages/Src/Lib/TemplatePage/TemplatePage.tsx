import { Link } from "@inertiajs/react";
import { NodeList } from "@Constructor/Components";
import { NotificationList } from "@NotificationSystem/Components";

export const TemplatePage = () => {
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
            <Link href="/constructor">Go to Home Page</Link>
            <h1>Constructor Template Page</h1>
            <NodeList />
            <NotificationList />
        </div>
    );
};

export default TemplatePage;
