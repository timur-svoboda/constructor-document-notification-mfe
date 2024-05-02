import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    plugins: [
        laravel({
            input: [],
            refresh: true,
        }),
        react(),
        tsconfigPaths(),
    ],
});
