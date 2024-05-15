import { createInertiaApp } from "@inertiajs/react";
import createServer from "@inertiajs/react/server";
import ReactDOMServer from "react-dom/server";

createServer((page) =>
    createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
        resolve: (name) => {
            const pages = import.meta.glob("./Modules/**/*.tsx");
            return pages[`./Modules/${name}.tsx`]();
        },
        setup: ({ App, props }) => <App {...props} />,
    })
);
