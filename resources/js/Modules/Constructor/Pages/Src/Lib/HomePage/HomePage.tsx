import { Link } from "@inertiajs/react";

export const HomePage = () => {
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
            <Link href="/constructor/template">Go to Template Page</Link>
        </div>
    );
};

export default HomePage;
