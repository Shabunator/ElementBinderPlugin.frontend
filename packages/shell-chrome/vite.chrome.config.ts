import { defineConfig } from 'vite';

export default defineConfig({
    publicDir: 'packages/shell-chrome/public',
    build: {
        outDir: 'chrome-extension',
        rollupOptions: {
            input: {
                background: 'packages/shell-chrome/src/background.ts',
                hook: 'packages/shell-chrome/src/hook.ts',
                'hook-exec': 'packages/shell-chrome/src/hook-exec.ts',
            },
            output: {
                entryFileNames: '[name].js',
            }
        }
    }
})
