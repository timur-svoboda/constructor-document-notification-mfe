import { Link } from '@inertiajs/react'
import { NodeList } from '@Constructor/Components';

export const TemplatePage = () => {
    return (
        <div>
            <Link href="/constructor">Go to Home Page</Link>
            <h1>Constructor Template Page</h1>
            <NodeList />
        </div>
    );
};

export default TemplatePage;
