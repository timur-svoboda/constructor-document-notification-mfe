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
            <Link href="/constructor/template">Go to Template Page</Link>
            <h1>Constructor Home Page</h1>
        </div>
    );
};

export default HomePage;
