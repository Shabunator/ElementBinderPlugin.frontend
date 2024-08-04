import { resolve } from 'node:path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
    plugins: [react()],
    publicDir: 'packages/shell-chrome/public',
    build: {
        outDir: 'chrome-extension',
        rollupOptions: {
            input: {
                app: 'packages/shell-chrome/index.html',
                background: 'packages/shell-chrome/src/background.ts',
                // hook: 'packages/shell-chrome/src/hook.ts',
                // 'hook-exec': 'packages/shell-chrome/src/hook-exec.ts',
            },
            output: {
                entryFileNames: '[name].js',
            }
        }
    },
    resolve: {
        alias: {
            '@app': resolve(process.cwd(), 'packages/shell-chrome/src/app'),
            '@pages': resolve(process.cwd(), 'packages/shell-chrome/src/pages'),
            '@shared': resolve(process.cwd(), 'packages/shell-chrome/src/shared'),
        },
    },
})
